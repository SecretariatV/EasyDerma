import { Todo } from "@/types/todo"
import { useAuth0 } from "@auth0/auth0-react"

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
        }
        
    }
}