import { Checkbox } from "@/components/ui/checkbox"
import type { Todo } from "@/types/todo"
import type { ThemeMode } from "@/app/page"

interface TodoItemProps {
  todo: Todo
  onToggle: (id: number) => void
  themeMode: ThemeMode
}

export function TodoItem({ todo, onToggle, themeMode }: TodoItemProps) {
  const isMorning = themeMode === "morning"

  return (
    <li
      className={`flex items-center space-x-3 p-3 border-b rounded-md todo-item select-none transition-all duration-300 ${
        isMorning
          ? `border-amber-200 ${todo.completed ? "completed-todo-morning" : ""} hover:bg-amber-100/70`
          : `border-indigo-100 ${todo.completed ? "completed-todo" : ""} hover:bg-indigo-50`
      }`}
    >
      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className={`transition-colors duration-300 ${
          isMorning
            ? "border-amber-400 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500"
            : "border-indigo-300 data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600"
        }`}
      />
      <label
        htmlFor={`todo-${todo.id}`}
        className={`flex-grow cursor-pointer transition-all duration-300 select-none ${
          todo.completed
            ? isMorning
              ? "line-through text-amber-400"
              : "line-through text-indigo-300"
            : isMorning
              ? "text-amber-800"
              : "text-indigo-700"
        }`}
      >
        {todo.text}
      </label>
    </li>
  )
}
