"use client";

import { useEffect, useState } from "react";
import { Article } from "@/components/article";

import { Header } from "@/components/header";
import { ImageUpload } from "@/components/image-upload";
import { TodoList } from "@/components/todo-list";
import { InfoSection } from "@/components/info-section";
import type { Todo } from "@/types/todo";
import { useAuth0 } from "@auth0/auth0-react";
import { GeminiResponse, useAnalysisAPI, useTodosAPI } from "@/lib/api";

export type ThemeMode = "morning" | "night";

export default function Home() {
  const [name, setName] = useState("Easy Derma");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();
  const [themeMode, setThemeMode] = useState<ThemeMode>("night");

  const [showSaveNotification, setShowSaveNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  const todosAPI = useTodosAPI();
  const analysisAPI = useAnalysisAPI();
  const [data, setData] = useState<GeminiResponse>();

  const [isImageUploaded, setIsImageUploaded] = useState(false);

  async function onLogin() {
    setIsLoading(true);
    const lastData = await analysisAPI.last()
    setIsLoading(false);
    setData(lastData)
    const todoList: Todo[] = await todosAPI.get()
    setTodos(todoList);
    const base64Image = lastData?.image;
    console.log("base64Image", base64Image)
    if (base64Image) {
      const imageBlob = await fetch(base64Image).then((res) => res.blob())
      const url = URL.createObjectURL(imageBlob)
      setImageUrl(url)
    }
    setIsImageUploaded(true);
  }

  useEffect(() => {
    if (isAuthenticated) {
      onLogin();
    }
  }, [isAuthenticated]);

  const handleImageUpload = async (url: string, file: File) => {
    setImageUrl(url);
    setIsLoading(true);
    const newData = await analysisAPI.create(file);
    setIsLoading(false);
    setData(newData);
    console.log("data", newData);
    const todoList: Todo[] = [];

    async function addTodo(text: string, type: "morning" | "night") {
      const todoObj = {
        text: text,
        completed: false,
        time: type,
      }

      const {id} = await todosAPI.add(todoObj as Todo);
      todoList.push({
        ...todoObj,
        id: id,
      } as Todo);
    }

    todosAPI.deleteAll()

    if (newData) {
      await Promise.all(
        newData.generated.skin_care_product_list_morning.map((todo) => addTodo(todo, "morning"))
      )

      await Promise.all(
        newData.generated.skin_care_product_list_night.map((todo) => addTodo(todo, "night"))
      )
    }
    setTodos(todoList);
    
    setIsImageUploaded(true)
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => {
      if (todo.id === id) {
        todosAPI.update("" + id, { ...todo, completed: !todo.completed });
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    }));
    setShowSaveNotification(true)
  }

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  return (
    <main className={`min-h-screen p-4 md:p-8 transition-colors duration-300`}>
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

        <Article
          themeMode={themeMode}
          isImageUploaded={isImageUploaded}
          cardHeader="Diagnosis Report"
          cardDescription={data ? data.generated.diagnosis : ""}
        />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/5">
            <ImageUpload
              imageUrl={imageUrl}
              onImageUpload={handleImageUpload}
              themeMode={themeMode}
              isAuthenticated={isAuthenticated}
              loginWithRedirect={loginWithRedirect}
              logout={logout}
            />
          </div>

          <div className="w-full md:w-2/5">
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              themeMode={themeMode}
              onThemeChange={handleThemeChange}
            />
          </div>
        </div>
        <Article
          themeMode={themeMode}
          isImageUploaded={isImageUploaded}
          cardHeader="Skin care instructions"
          cardDescription={
            data ? data.generated.skin_care_usage_instructions : ""
          }
        />
        {data && data.generated.lunch.length > 0 && (
          <InfoSection themeMode={themeMode} data={data} />
        )}
      </div>
      {isLoading && <div className="fixed inset-0 backdrop-blur-sm bg-gray-900/30 flex items-center justify-center">
        <p className="text-3xl text-white">Loading...</p>
      </div>}

      <Article
        themeMode={themeMode}
        isImageUploaded={isImageUploaded}
        cardHeader="Our Raw AI Model's Prediction"
        cardDescription=
        {data && <div className="flex-col w-full">
          {data.predictions.map((prediction, i) => (
            <div key={i} className="flex flex-col">
              <div
                className="border-blue-500 border-b-4 rounded-t h-10 whitespace-nowrap flex ml-4 items-center"
                style={{
                  width: `${prediction.probability * 100}%`,
                }}
              >
                {prediction.name + " " + Math.round(prediction.probability * 100) + "%"}
              </div>
            </div>
          ))}
        </div>}
      />


    </main>
  );
}
