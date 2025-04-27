from tensorflow import keras
from PIL import Image
import numpy as np

# Load the Keras model from the specified checkpoint
model_path = 'checkpoint/cnn_model.keras'
model = keras.models.load_model(model_path)

print("Model loaded successfully from", model_path)

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

image_path = 'test/ringworm.png'  # Replace with your image path
image = Image.open(image_path)
image = image.resize((224, 224))  # Resize to match the model's input size
print("Image preprocessed successfully.")
predictions = model.predict(np.expand_dims(image, axis=0))
predicted_class = np.argmax(predictions, axis=1)[0]
print("Predicted class:", predicted_class)

for i, name in enumerate(names):
    print(f"Probability of {name}: {predictions[0][i]:.4f}")