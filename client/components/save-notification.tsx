"use client"

import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import type { ThemeMode } from "@/app/page"

interface SaveNotificationProps {
  show: boolean
  themeMode: ThemeMode
}

export function SaveNotification({ show, themeMode }: SaveNotificationProps) {
  const [visible, setVisible] = useState(false)
  const isMorning = themeMode === "morning"

  useEffect(() => {
    if (show) {
      setVisible(true)
      const timer = setTimeout(() => {
        setVisible(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [show])

  if (!visible) return null

  return (
    <div
      className={`fixed bottom-4 right-4 text-white px-4 py-3 rounded-lg flex items-center shadow-lg animate-in slide-in-from-bottom duration-300 transition-colors ${
        isMorning ? "bg-gradient-to-r from-amber-500 to-orange-500" : "bg-gradient-to-r from-indigo-600 to-purple-600"
      }`}
    >
      <div className="bg-white rounded-full p-1 mr-2">
        <Check className={`w-3 h-3 ${isMorning ? "text-amber-500" : "text-indigo-600"}`} />
      </div>
      <span className="font-medium">Todos saved</span>
    </div>
  )
}
