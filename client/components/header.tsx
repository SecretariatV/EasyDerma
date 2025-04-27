"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { ThemeMode } from "@/app/page"
import { AuthButtons } from "@/AuthButtons"
import Image from "next/image"
import logo from "@/public/logo.png"

interface HeaderProps {
  name: string
  isLoggedIn: boolean
  onLogin: () => void
  onLogout: () => void
  themeMode: ThemeMode
  loginWithRedirect: () => void
  logout: () => void
  isAuthenticated: boolean
}

export function Header({ 
  name, isLoggedIn, onLogin, onLogout, themeMode,
  loginWithRedirect, logout, isAuthenticated
 }: HeaderProps) {
  const isMorning = themeMode === "morning"

  return (
    <Card
      className={`flex flex-row w-full items-center justify-between px-2 h-32 
        mb-6 overflow-hidden border-none shadow-lg transition-colors duration-300 
        ${
        isMorning ? "bg-gradient-to-r from-amber-300 to-orange-300" : 
        "bg-gradient-to-r from-indigo-50 to-purple-50"
      }`}
    >
        <div className="flex flex-row items-center justify-left w-full h-full">
          <Image src={logo} className="w-auto h-full" alt="Uploaded image"/>
        </div>
        <h1
              className={`text-3xl font-bold drop-shadow-sm transition-colors duration-300 whitespace-nowrap ${
                isMorning ? "text-amber-900" : "text-indigo-900"
              }`}
          >
              {name}
          </h1>
        <div className="flex flex-row items-center justify-end w-full h-full pr-4">
          <AuthButtons
            isMorning={isMorning}
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
          />
        </div>
    </Card>
  )
}
