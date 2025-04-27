const API_URL = "https://driving-summary-piranha.ngrok-free.app"

export async function generate(image: Blob): Promise<string> {
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
