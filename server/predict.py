from tensorflow import keras
from PIL import Image
import numpy as np
import os
import io

MODEL_PATH = os.getenv('MODEL_PATH', '../model/checkpoint/cnn_model.keras')
model = keras.models.load_model(MODEL_PATH)

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