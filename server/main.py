import json
from flask import Flask, jsonify, request
from flask_cors import cross_origin
from auth.auth import AuthError, requires_auth
from db.db import todos, generations
from models.gemini import generate_response_with_image
from ai_utils.utils import generate_prompt, model_predict

app = Flask(__name__)

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

@app.get("/todos")
@cross_origin()
@requires_auth
def get_todos():
    output = todos.find({
        "user_id": request.args.get("user_id")
    }).to_list()
    return jsonify(output)

@app.post("/todos")
@cross_origin()
@requires_auth
def post_todos():
    user_id = request.args.get("user_id")
    data = request.get_json()
    data["user_id"] = user_id
    data["id"] = todos.count_documents({}) + 1
    todos.insert_one(data)
    return jsonify(message="ok")

@app.put("/todos/<todo_id>")
@cross_origin()
@requires_auth
def put_todos(todo_id):
    user_id = request.args.get("user_id")
    data = request.get_json()
    data["user_id"] = user_id
    todos.update_one({"id": int(todo_id), "user_id": user_id}, {"$set": data})
    return jsonify(message="ok")

@app.get("/analysis")
@cross_origin()
@requires_auth
def get_analysis():
    user_id = request.args.get("user_id")
    last_generation = generations.find_one({"user_id": user_id})
    if last_generation:
        last_generation['_id'] = str(last_generation['_id'])
        return jsonify(last_generation)
    else:
        return jsonify(error="No previous generation found."), 404

@app.post("/analysis")
@cross_origin()
@requires_auth
def post_analysis():
    if 'image' in request.files:
        image_file = request.files['image']

        if image_file:
            try:
                image_bytes = image_file.read()
                
                predictions = model_predict(image_bytes)
                predictions_json = json.dumps(predictions)
                
                internal_prompt = generate_prompt(predictions_json)
                
                generated = generate_response_with_image(internal_prompt, image_bytes)
                out = dict(generated=generated, predictions=predictions)
                generations.replace_one(
                    {"user_id": request.args.get("user_id")},
                    {
                        "user_id": request.args.get("user_id"),
                        "predictions": predictions,
                        "generated": generated
                    },
                    upsert=True
                )
                return jsonify(out), 200
            except Exception as e:
                return jsonify(error=f"Error processing image: {str(e)}"), 400
        else:
            return jsonify(error="Image file is required."), 400
    else:
        return jsonify(error="Missing 'image' in the request."), 400




app.run(host="0.0.0.0", port=8080)
