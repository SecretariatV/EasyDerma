from flask import Flask, jsonify, request
from flask_cors import cross_origin
from auth import AuthError, requires_auth
from db import recommendations
from gemini import generate_response

app = Flask(__name__)

@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response

@app.route("/private")
@cross_origin(headers=["Content-Type", "Authorization"])
@requires_auth
def private():
    response = "Hello from a private endpoint! You need to be authenticated to see this."
    return jsonify(message=response)

@app.route("/hello")
@cross_origin(headers=["Content-Type", "Authorization"])
def hello():
    return jsonify(message="Hello world!")

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
    data = request.get_json()
    generated = generate_response(data["prompt"])
    return jsonify(generated)


app.run(host="0.0.0.0", port=8080)