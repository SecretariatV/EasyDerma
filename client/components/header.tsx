"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ThemeMode } from "@/app/page"
import { AuthButtons } from "@/AuthButtons"

interface HeaderProps {
  name: string
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  themeMode: ThemeMode
}

export function Header({ name, isLoggedIn, onLogin, onLogout, themeMode }: HeaderProps) {
  const isMorning = themeMode === "morning"

  return (
    <Card
      className={`w-full h-32 mb-6 overflow-hidden border-none shadow-lg transition-colors duration-300 ${
        isMorning ? "bg-gradient-to-r from-amber-300 to-orange-300" : "bg-gradient-to-r from-indigo-50 to-purple-50"
      }`}
    >
      <AuthButtons />
      <div className="flex items-center justify-between px-8 h-full">
        <div className="w-24" /> {/* Spacer for balance */}
        <h1
          className={`text-3xl font-bold drop-shadow-sm transition-colors duration-300 ${
            isMorning ? "text-amber-900" : "text-indigo-900"
          }`}
        >
          {name}
        </h1>
        <div className="space-x-2">
          {isLoggedIn ? (
            <Button onClick={onLogout} variant="secondary" className="shadow-md hover:shadow-lg transition-all">
              Logout
            </Button>
          ) : (
            <Button
              onClick={onLogin}
              className={`shadow-md hover:shadow-lg transition-all ${
                isMorning
                  ? "bg-amber-600 hover:bg-amber-700 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </Card>
    
  )
}
