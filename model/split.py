import os
import random
import shutil
import dotenv

dotenv.load_dotenv()

ROOT = os.getenv("DATASET_ROOT")

# Paths
current_directory = os.path.join(ROOT, 'IMG_CLASSES')
train_directory = os.path.join(ROOT, 'dataset', 'train')
test_directory = os.path.join(ROOT, 'dataset', 'test')

# Make sure train and test directories exist
os.makedirs(train_directory, exist_ok=True)
os.makedirs(test_directory, exist_ok=True)

print(f"Starting dataset split...\n")

# For each disease type (class folder)
for disease_type_folder in os.listdir(current_directory):
    disease_folder_path = os.path.join(current_directory, disease_type_folder)

    if not os.path.isdir(disease_folder_path):
        print(f"Skipping non-folder item: {disease_type_folder}")
        continue

    images = os.listdir(disease_folder_path)
    if not images:
        print(f"No images found in {disease_type_folder}. Skipping...")
        continue

    random.shuffle(images)  # Shuffle images randomly

    # 80% train, 20% test
    split_idx = int(0.8 * len(images))
    train_images = images[:split_idx]
    test_images = images[split_idx:]

    # Create subfolders for each class if they don't exist
    train_class_folder = os.path.join(train_directory, disease_type_folder)
    test_class_folder = os.path.join(test_directory, disease_type_folder)
    os.makedirs(train_class_folder, exist_ok=True)
    os.makedirs(test_class_folder, exist_ok=True)

    # Copy images
    for img in train_images:
        src_path = os.path.join(disease_folder_path, img)
        dst_path = os.path.join(train_class_folder, img)
        shutil.copy2(src_path, dst_path)

    for img in test_images:
        src_path = os.path.join(disease_folder_path, img)
        dst_path = os.path.join(test_class_folder, img)
        shutil.copy2(src_path, dst_path)

    print(f"✅ Finished copying {len(train_images)} train and {len(test_images)} test images for class '{disease_type_folder}'.")

print("\n🎉 Dataset split into train and test folders successfully!")