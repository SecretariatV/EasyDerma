from collections import Counter
import numpy as np
from tensorflow import keras
from keras.src.callbacks import EarlyStopping, ReduceLROnPlateau, ModelCheckpoint
from keras import regularizers
from sklearn.utils.class_weight import compute_class_weight
import dotenv
import os
dotenv.load_dotenv()

import tensorflow as tf
print("Num GPUs Available: ", len(tf.config.list_physical_devices('GPU')))

DATASET_ROOT = os.getenv("DATASET_ROOT")

print("Starting CNN model training...")

# Run this script from the back-end directory of the project e.i. OncoVision/back-end

train_data_dir = os.path.join(DATASET_ROOT, 'dataset/train')

img_height = 224
img_width = 224
num_classes = 10  # Number of classes (e.g., Malignant and Benign)

train_ds = keras.utils.image_dataset_from_directory(
    directory = train_data_dir,
    image_size = (img_height, img_width),
    seed = 123,
    validation_split = 0.2,
    subset = "training"
)
print("Training dataset loaded.")

validation_ds = keras.utils.image_dataset_from_directory(
    directory = train_data_dir,
    image_size = (img_height, img_width),
    seed = 123,
    validation_split = 0.2,
    subset = "validation"
)
print("Validation dataset loaded.")

all_labels = []
for images, labels in train_ds.unbatch():
    all_labels.append(labels.numpy().item())

# Define classes
classes = np.unique(all_labels)
class_weights = compute_class_weight(
    class_weight='balanced',
    classes=classes,
    y=all_labels
)

# Convert to dict format
class_weight_dict = {
    int(k): float(v) for k, v in zip(classes, class_weights)
}
print("Class weights computed.")

early_stopping = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=5, min_lr=1e-6)

model = keras.Sequential([
    keras.Input(shape=(img_height, img_width, 3)),
    keras.layers.RandomFlip("horizontal"),
    keras.layers.RandomRotation(0.1),
    keras.layers.RandomZoom(0.1),
    keras.layers.RandomContrast(0.2),
    keras.layers.Rescaling(1./255),
    keras.layers.Conv2D(16, 3, padding='same', activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D(),
    keras.layers.Conv2D(32, 3, padding='same', activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D(),
    keras.layers.Conv2D(64, 3, padding='same', activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D(),
    keras.layers.Conv2D(128, 3, padding='same', activation='relu'),
    keras.layers.BatchNormalization(),
    keras.layers.MaxPooling2D(),
    keras.layers.Dropout(0.2),
    keras.layers.Flatten(),
    keras.layers.Dense(128, activation='relu', kernel_regularizer=regularizers.l2(0.01)),
    keras.layers.Dense(num_classes, activation='softmax')
])



model.compile(optimizer="adam",
              loss="sparse_categorical_crossentropy",
              metrics=['accuracy'])

print("Model compiled.")

checkpoint = ModelCheckpoint('./checkpoint/cnn_model.keras', save_best_only=True, monitor='val_loss', mode='min')

epochs = 60
print("Starting model training...")

print("Class weights: ", class_weight_dict)

cancer_cnn_model = model.fit(
    train_ds,
    validation_data=validation_ds,
    epochs=epochs,
    class_weight=class_weight_dict,
    callbacks=[early_stopping, reduce_lr, checkpoint]
)