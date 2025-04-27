"use client"

import { useState } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { SaveNotification } from "@/components/save-notification"

import { Header } from "@/components/header"
import { ImageUpload } from "@/components/image-upload"
import { TodoList } from "@/components/todo-list"
import { InfoSection } from "@/components/info-section"
import type { Todo } from "@/types/todo"
import { useAuth0 } from "@auth0/auth0-react"
import { generate } from "@/lib/api"

export type ThemeMode = "morning" | "night"

export default function Home(){
  const [name, setName] = useState("Easy Derma")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", [
    { id: 1, text: "Complete project proposal", completed: true, time: "morning" },
    { id: 2, text: "Schedule team meeting", completed: false, time: "morning" },
    { id: 3, text: "Research new technologies", completed: false, time: "morning" },
    { id: 4, text: "Update documentation", completed: false, time: "night" },
  ])
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [themeMode, setThemeMode] = useState<ThemeMode>("night")

  const [showSaveNotification, setShowSaveNotification] = useState(false)

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => setIsLoggedIn(false)

  const [data, setData] = useState<string | null>(null)

  const handleImageUpload = async (url: string, file: File) => {
    setImageUrl(url)
    setData(await generate(file))
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

        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/5">
          <ImageUpload
            imageUrl={imageUrl} onImageUpload={handleImageUpload} themeMode={themeMode}
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
          />
          </div>

          <div className="w-full md:w-2/5">
            <TodoList todos={todos} onToggle={toggleTodo} themeMode={themeMode} onThemeChange={handleThemeChange} />
          </div>
        </div>

        <InfoSection themeMode={themeMode} />
        <SaveNotification show={showSaveNotification} themeMode={themeMode} />
      </div>
    </main>
  )
}
