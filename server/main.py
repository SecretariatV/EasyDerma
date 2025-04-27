import json
from flask import Flask, jsonify, request
from flask_cors import cross_origin
from server.auth.auth import AuthError, requires_auth
from server.db.db import recommendations
from server.models.gemini import generate_response_with_image
from server.ai_utils.utils import generate_prompt, model_predict

app = Flask(__name__)

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

@app.get("/recommendations")
@cross_origin(headers=["Content-Type", "Authorization"])
# @requires_auth
def get_recommendations():
    output = recommendations.find({
        "user_id": request.args.get("user_id")
    }).to_list()
    return jsonify(recommendations=output)

@app.post("/recommendations")
@cross_origin(headers=["Content-Type", "Authorization"])
# @requires_auth
def post_recommendations():
    user_id = request.args.get("user_id")
    data = request.get_json()
    data["user_id"] = user_id
    recommendations.insert_one(data)
    return jsonify(message="Recommendation added successfully")

@app.post("/gemini")
@cross_origin()
def post_gemini():
    if 'image' in request.files:
        image_file = request.files['image']

        if image_file:
            try:
                image_bytes = image_file.read()
                
                predictions = model_predict(image_bytes)
                predictions_json = json.dumps(predictions)
                
                internal_prompt = generate_prompt(predictions_json)
                
                generated = generate_response_with_image(internal_prompt, image_bytes)
                return jsonify(dict(generated=generated, predictions=predictions)), 200
            except Exception as e:
                return jsonify(error=f"Error processing image: {str(e)}"), 400
        else:
            return jsonify(error="Image file is required."), 400
    else:
        return jsonify(error="Missing 'image' in the request."), 400




app.run(host="0.0.0.0", port=8080, debug=True)
