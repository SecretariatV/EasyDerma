from flask import Flask, jsonify, request
from flask_cors import cross_origin
from auth import AuthError, requires_auth
from db import recommendations
from gemini import generate_response_with_image, generate_response  # Assuming you'll create this function

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
    if 'image' in request.files:
        image_file = request.files['image']

        if image_file:
            try:
                image_bytes = image_file.read()

                # Updated internal prompt based on the new schema
                internal_prompt = (
                "Please analyze the skin image shown in the provided image and generate the following details in JSON format:\n\n"
                "1. **Skin Care Products (Morning)**: Provide a short list of skin care products that are suitable for use in the morning to address the skin condition shown in the image.\n"
                "2. **Skin Care Products (Night)**: Provide a short list of skin care products that are suitable for use at night to address the skin condition.\n"
                "3. **Skin Care Usage Instructions**: Provide a detailed description on how to use the recommended skin care products, including the correct way to apply them and any important tips based on the specific skin condition.\n"
                "4. **Breakfast**: Provide a list of recommended foods for breakfast to help nourish the skin and body.\n"
                "5. **Lunch**: Provide a list of recommended foods for lunch to help maintain good skin health and nutrition.\n"
                "6. **Dinner**: Provide a list of recommended foods for dinner to support skin healing and overall health.\n\n"
                "The response should be in JSON format with the following structure:\n\n"
                "```json\n"
                "{\n"
                "    \"skin_care_product_list_morning\": [\"Product 1\", \"Product 2\", \"Product 3\"],\n"
                "    \"skin_care_product_list_night\": [\"Product 1\", \"Product 2\", \"Product 3\"],\n"
                "    \"skin_care_usage_instructions\": \"Instruction on how to apply the products for skin care.\",\n"
                "    \"breakfast\": [\"Food 1\", \"Food 2\", \"Food 3\"],\n"
                "    \"lunch\": [\"Food 1\", \"Food 2\", \"Food 3\"],\n"
                "    \"dinner\": [\"Food 1\", \"Food 2\", \"Food 3\"]\n"
                "}\n"
                "```"
            )

                generated = generate_response_with_image(internal_prompt, image_bytes)
                return jsonify(generated)
            except Exception as e:
                return jsonify(error=f"Error processing image: {str(e)}"), 400
        else:
            return jsonify(error="Image file is required."), 400
    else:
        return jsonify(error="Missing 'image' in the request."), 400




app.run(host="0.0.0.0", port=8080, debug=True)