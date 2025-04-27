import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Apple, Beef, Carrot, Salad, Utensils, Wheat } from "lucide-react"
import type { ThemeMode } from "@/app/page"

interface DietaryCardProps {
  icon: React.ReactNode
  title: string
  recommendation: string
  description: string
  color: string
  morningColor: string
  themeMode: ThemeMode
}

function DietaryCard({ icon, title, recommendation, description, color, morningColor, themeMode }: DietaryCardProps) {
  const isMorning = themeMode === "morning"

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm overflow-hidden">
      <div className={`h-1 transition-colors duration-300 ${isMorning ? morningColor : color}`}></div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle
          className={`text-sm font-medium transition-colors duration-300 ${
            isMorning ? "text-amber-900" : "text-indigo-900"
          }`}
        >
          {title}
        </CardTitle>
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
            isMorning ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"
          }`}
        >
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div
          className={`text-xl font-bold transition-colors duration-300 ${
            isMorning ? "text-amber-800" : "text-indigo-800"
          }`}
        >
          {recommendation}
        </div>
        <CardDescription className="text-xs mt-1">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

interface InfoSectionProps {
  themeMode: ThemeMode
}

export function Article({ themeMode }: InfoSectionProps) {
  const isMorning = themeMode === "morning"

  return (
    <section className="w-full mt-8 mb-6">
      <Card
        className={`border-none shadow-xl overflow-hidden transition-colors duration-300 ${
          isMorning ? "bg-gradient-to-r from-amber-50 to-orange-50" : "bg-gradient-to-r from-indigo-50 to-purple-50"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`text-2xl transition-colors duration-300 ${isMorning ? "text-amber-900" : "text-indigo-900"}`}
          >
            Diagnosis Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={` p-6 rounded-lg shadow-inner transition-colors duration-300 ${
              isMorning ? "bg-amber-50/90" : "bg-white/90"
            }`}
          >
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                      isMorning ? "text-amber-700" : "text-indigo-700"
                    }`}
                  >place holder for diagnosis details
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        
      </Card>
    </section>
  )
}
