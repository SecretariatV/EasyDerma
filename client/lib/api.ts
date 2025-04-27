const API_URL = "https://driving-summary-piranha.ngrok-free.app"

interface Prediction {
  name: string;
  probability: number;
}

interface DiagnosisResponse {
  skin_care_product_list_morning: string[];
  skin_care_product_list_night: string[];
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  skin_care_usage_instructions: string;
  diagnosis: string;
}

export interface GeminiResponse {
  generated: DiagnosisResponse;
  predictions: Prediction[];
}



export async function generate(image: Blob): Promise<GeminiResponse> {
    const formData = new FormData()
    formData.append("image", image)
    const out = await fetch(`${API_URL}/gemini`, {
      method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json",
      },
    })

    return out.json()
}
