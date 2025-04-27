"use client"

import { useEffect, useState } from "react"
import { SaveNotification } from "@/components/save-notification"
import { Article } from "@/components/article"

import { Header } from "@/components/header"
import { ImageUpload } from "@/components/image-upload"
import { TodoList } from "@/components/todo-list"
import { InfoSection } from "@/components/info-section"
import type { Todo } from "@/types/todo"
import { useAuth0 } from "@auth0/auth0-react"
import { GeminiResponse, useAnalysisAPI, useTodosAPI } from "@/lib/api"

export type ThemeMode = "morning" | "night"

export default function Home(){
  const [name, setName] = useState("Easy Derma")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [themeMode, setThemeMode] = useState<ThemeMode>("night")

  const [showSaveNotification, setShowSaveNotification] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)
  const todosAPI = useTodosAPI();
  const analysisAPI = useAnalysisAPI()
  const [data, setData] = useState<GeminiResponse>()

  const [isImageUploaded, setIsImageUploaded] = useState(false)

  async function onLogin() {
    const lastData = await analysisAPI.last()
    setData(lastData)
    console.log("data", lastData);
  }

  useEffect(() => {
    if (isAuthenticated) {
      onLogin()      
    }
  }, [isAuthenticated])

  const handleImageUpload = async (url: string, file: File) => {
    setImageUrl(url)
    const newData = await analysisAPI.create(file)
    setData(newData)
    console.log("data", newData);
    const todoList: Todo[] = []
    if(newData){
      for(const todo of newData.generated.skin_care_product_list_morning){
        todoList.push({ id: todoList.length + 1, text: todo, completed: false, time: "morning" })
      }
      for(const todo of newData.generated.skin_care_product_list_night){
        todoList.push({ id: todoList.length + 1, text: todo, completed: false, time: "night" })
      }
    }
    console.log("to do list", todoList)
    setTodos(todoList);
    setIsImageUploaded(true)
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)))
    setShowSaveNotification(true)
  }

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode)
  }

  return (
    <main
      className={
        `min-h-screen p-4 md:p-8 transition-colors duration-300`
      }
    >
      <div className="container mx-auto max-w-6xl">
        <Header
          name={name}
          isLoggedIn={isLoggedIn}
          onLogin={handleLogin}
          onLogout={handleLogout}
          themeMode={themeMode}
          loginWithRedirect={loginWithRedirect} 
          logout={logout}
          isAuthenticated={isAuthenticated}
        />

        <Article themeMode={themeMode} isImageUploaded={isImageUploaded} cardHeader="Diagnosis details" cardDescription={data ? data.generated.diagnosis : ""}/>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/5">
          <ImageUpload
            imageUrl={imageUrl} onImageUpload={handleImageUpload} themeMode={themeMode}
            isAuthenticated={true}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
          />
          </div>

          <div className="w-full md:w-2/5">
            <TodoList todos={todos} onToggle={toggleTodo} themeMode={themeMode} onThemeChange={handleThemeChange} />
          </div>
        </div>
        <Article themeMode={themeMode} isImageUploaded={isImageUploaded} cardHeader="Skin care instructions" cardDescription={data ? data.generated.skin_care_usage_instructions : ""}/>
        <InfoSection themeMode={themeMode} />
      </div>
    </main>
  )
}
