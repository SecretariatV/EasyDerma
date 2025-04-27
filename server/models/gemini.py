import os
import json
from google import genai
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

class Analysis(BaseModel):
    diagnosis: str
    skin_care_product_list_morning: list[str]
    skin_care_product_list_night: list[str]
    skin_care_usage_instructions: list[str]
    breakfast: list[str]
    lunch: list[str]
    dinner: list[str]
    healthy: bool

def generate_response_with_image(prompt, image_bytes):
    temp_filename = "temp_uploaded_image.jpg"
    with open(temp_filename, "wb") as f:
        f.write(image_bytes)

    uploaded_file = client.files.upload(file=temp_filename)

    os.remove(temp_filename)

    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[uploaded_file, "\n\n", prompt],
        config={
            "response_mime_type": "application/json",
            "response_schema": Analysis
        }
    )
    
    prefix = "```json\n"
    suffix = "\n```"

    if response.text.startswith(prefix) and response.text.endswith(suffix):
        json_string = response.text[len(prefix):-len(suffix)]
        json_string = json_string.strip()
    else:
        start_index = response.text.find('{')
        end_index = response.text.rfind('}')
        if start_index != -1 and end_index != -1:
            json_string = response.text[start_index : end_index + 1]
        else:
            json_string = response.text

    try:
        data_dict = json.loads(json_string)

        expected_keys = [
            "diagnosis",
            "skin_care_product_list_morning",
            "skin_care_product_list_night",
            "skin_care_usage_instructions",
            "breakfast",
            "lunch",
            "dinner"
        ]
        return data_dict

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        # Print the string that was attempted to be parsed for debugging
        print("\nAttempted to parse this string:")
        print(json_string)
