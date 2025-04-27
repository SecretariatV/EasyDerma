"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { TodoItem } from "@/components/todo-item"
import { Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Todo } from "@/types/todo"
import type { ThemeMode } from "@/app/page"

interface TodoListProps {
  todos: Todo[]
  onToggle: (id: number) => void
  themeMode: ThemeMode
  onThemeChange: (mode: ThemeMode) => void
}

export function TodoList({ todos, onToggle, themeMode, onThemeChange }: TodoListProps) {
  const [activeTime, setActiveTime] = useState<ThemeMode>("morning")

  // Sync the local state with the global theme
  useEffect(() => {
    setActiveTime(themeMode)
  }, [themeMode])

  const filteredTodos = todos.filter((todo) => todo.time === activeTime)

  const handleTimeToggle = (time: ThemeMode) => {
    setActiveTime(time)
    onThemeChange(time)
  }

  const isMorning = themeMode === "morning"

  return (
    <Card
      className={`h-[500px] flex flex-col shadow-xl border-none overflow-hidden transition-colors duration-300 ${
        isMorning ? "bg-gradient-to-r from-amber-50 to-orange-50" : "bg-gradient-to-r from-indigo-50 to-purple-50"
      }`}
    >
      <div className="p-4 pb-0">
        <h2
          className={`text-2xl font-bold mb-4 border-b pb-2 transition-colors duration-300 ${
            isMorning ? "text-amber-800 border-amber-200" : "text-indigo-800 border-indigo-200"
          }`}
        >
          {isMorning ? "Morning" : "Night"} Routine
        </h2>

        {/* Time Toggle */}
        <div
          className={`flex rounded-lg overflow-hidden border transition-colors duration-300 mb-4 ${
            isMorning ? "border-amber-200" : "border-indigo-200"
          }`}
        >
          <Button
            type="button"
            variant="ghost"
            className={`flex-1 flex items-center justify-center gap-2 rounded-none py-2 transition-colors duration-300 ${
              activeTime === "morning"
                ? "bg-amber-200 text-amber-800 hover:bg-amber-200 hover:text-amber-800"
                : "bg-transparent text-amber-600 hover:bg-amber-50"
            }`}
            onClick={() => handleTimeToggle("morning")}
          >
            <Sun className="w-4 h-4" />
            Morning
          </Button>
          <Button
            type="button"
            variant="ghost"
            className={`flex-1 flex items-center justify-center gap-2 rounded-none py-2 transition-colors duration-300 ${
              activeTime === "night"
                ? "bg-indigo-200 text-indigo-800 hover:bg-indigo-200 hover:text-indigo-800"
                : "bg-transparent text-indigo-600 hover:bg-indigo-50"
            }`}
            onClick={() => handleTimeToggle("night")}
          >
            <Moon className="w-4 h-4" />
            Night
          </Button>
        </div>
      </div>

      {/* Todo List */}
      <div className="px-4 pb-4 flex-1 overflow-hidden">
        <div
          className={`h-full overflow-y-auto rounded-md p-2 transition-colors duration-300 ${
            isMorning ? "bg-amber-100/50" : "bg-indigo-50/50"
          }`}
        >
          {filteredTodos.length > 0 ? (
            <ul className="space-y-2">
              {filteredTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onToggle={onToggle} themeMode={themeMode} />
              ))}
            </ul>
          ) : (
            <div
              className={`text-center py-8 italic select-none transition-colors duration-300 ${
                isMorning ? "text-amber-700/70" : "text-indigo-600/70"
              }`}
            >
              No {activeTime} tasks available
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}
