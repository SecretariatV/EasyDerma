import { Todo } from "@/types/todo"
import { useAuth0 } from "@auth0/auth0-react"

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
  skin_care_usage_instructions: string[];
  diagnosis: string;
}

export interface GeminiResponse {
  generated: DiagnosisResponse;
  predictions: Prediction[];
  image: string;
  timestamp: string;
}

export function useAnalysisAPI() {
    const auth0 = useAuth0()

    return {
        create: async (image: Blob): Promise<GeminiResponse> => {
            const formData = new FormData()
            formData.append("image", image)
            const response = await fetch(`${API_URL}/analysis`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                    "Accept": "application/json",
                },
            })
            return response.json()
        },
        last: async (): Promise<GeminiResponse | undefined> => {
            const response = await fetch(`${API_URL}/analysis`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                    "Accept": "application/json",
                },
            })
            
            if (!response.ok) {
                return undefined;
            }

            return response.json()
        },
    }
}

export function useTodosAPI() {
    const auth0 = useAuth0()
    
    return {
        get: async (): Promise<Todo[]> => {
            const response = await fetch(`${API_URL}/todos`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                },
            })
            return response.json()
        },
        add: async (todo: Todo) => {
            const response = await fetch(`${API_URL}/todos`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            })
            return response.json()
        },
        update: async (id: string, todo: Todo) => {
            const response = await fetch(`${API_URL}/todos/${id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(todo),
            })
            return response.json()
        },
        deleteAll: async () => {
            const response = await fetch(`${API_URL}/todos`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${await auth0.getAccessTokenSilently()}`,
                },
            })
            return response.json()
        }
    }
}