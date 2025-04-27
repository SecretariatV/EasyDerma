from tensorflow import keras
from PIL import Image
import numpy as np
import os
import io


def generate_prompt(predictions: str):
    return (
                "Please analyze the skin image shown in the provided image and generate the following details in JSON format:\n\n"
                "1. **Diagnosis**: Provide your diagnosis based on the provided image\n\n"
                "2. **Skin Care Products (Morning)**: Provide a short list of skin care products that are suitable for use in the morning to address the skin condition shown in the image.\n"
                "3. **Skin Care Products (Night)**: Provide a short list of skin care products that are suitable for use at night to address the skin condition.\n"
                "4. **Skin Care Usage Instructions**: Provide a detailed description on how to use the recommended skin care products, including the correct way to apply them and any important tips based on the specific skin condition.\n"
                "5. **Breakfast**: Provide a list of recommended foods for breakfast to help nourish the skin and body.\n"
                "6. **Lunch**: Provide a list of recommended foods for lunch to help maintain good skin health and nutrition.\n"
                "7. **Dinner**: Provide a list of recommended foods for dinner to support skin healing and overall health.\n\n"
                "The response should be in JSON format with the following structure:\n\n"
                "```json\n"
                "{\n"
                "    \"diagnosis\": \"Detailed analysis of the skin issue if any\",\n"
                "    \"skin_care_product_list_morning\": [\"Product 1\", \"Product 2\", \"Product 3\"],\n"
                "    \"skin_care_product_list_night\": [\"Product 1\", \"Product 2\", \"Product 3\"],\n"
                "    \"skin_care_usage_instructions\": [\"Step 1\", \"Step 2\", \"Step 3\"],\n"
                "    \"breakfast\": [\"Food 1\", \"Food 2\", \"Food 3\"],\n"
                "    \"lunch\": [\"Food 1\", \"Food 2\", \"Food 3\"],\n"
                "    \"dinner\": [\"Food 1\", \"Food 2\", \"Food 3\"]\n"
                "}\n"
                "```\n\n"
                f'By the way, take these predictions into account only if you are unsure: {predictions}\n\n'
                "If you do not see skin, please say that the image is not a skin image. Do not use markdown in the response. Also, do not enumerate with numbers in the lists"
            )
    
model_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), "..", "models", "cnn_model.keras")
model = keras.models.load_model(model_path)

names = [
    'Atopic Dermatitis',
    'Basal Cell Carcinoma',
    'Benign Keratosis-like Lesions',
    'Eczema',
    'Melanocytic Nevi',
    'Melanoma',
    'Psoriasis pictures Lichen Planus and related diseases',
    'Seborrheic Keratoses and other Benign Tumors',
    'Tinea Ringworm Candidiasis and other Fungal Infections',
    'Warts Molluscum and other Viral Infections'
]

def model_predict(raw: bytes):
    image = Image.open(io.BytesIO(raw))
    image = image.resize((224, 224))
    predictions = model.predict(np.expand_dims(image, axis=0))

    output = []
    for i, name in enumerate(names):
        output.append({
            "name": name,
            "probability": float(predictions[0][i])
        })

    return output