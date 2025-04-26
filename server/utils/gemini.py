import os
from google import genai
from dotenv import load_dotenv

def generate_response(client: genai.Client, prompt: str) -> str:
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents=[prompt]
    )
    return response.text

# def main():
#     load_dotenv()

#     api_key = os.getenv("GEMINI_API_KEY")
#     if not api_key:
#         raise ValueError("GEMINI_API_KEY environment variable is not set")
        
#     client = genai.Client(api_key=api_key)

#     response = generate_response(client, "Hi")
#     print(response)