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

export function InfoSection({ themeMode }: InfoSectionProps) {
  const isMorning = themeMode === "morning"

  return (
    <section className="w-full mt-8">
      <Card
        className={`border-none shadow-xl overflow-hidden transition-colors duration-300 ${
          isMorning ? "bg-gradient-to-r from-amber-50 to-orange-50" : "bg-gradient-to-r from-indigo-50 to-purple-50"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`text-2xl transition-colors duration-300 ${isMorning ? "text-amber-900" : "text-indigo-900"}`}
          >
            Dietary Recommendations
          </CardTitle>
          <CardDescription>Personalized nutrition guidelines for a balanced and healthy diet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DietaryCard
              icon={<Beef size={18} />}
              title="Proteins"
              recommendation="0.8g per kg of body weight"
              description="Focus on lean meats, fish, eggs, and plant-based proteins"
              color="bg-red-400"
              morningColor="bg-amber-500"
              themeMode={themeMode}
            />
            <DietaryCard
              icon={<Wheat size={18} />}
              title="Carbohydrates"
              recommendation="45-65% of daily calories"
              description="Choose whole grains and complex carbohydrates"
              color="bg-amber-400"
              morningColor="bg-amber-400"
              themeMode={themeMode}
            />
            <DietaryCard
              icon={<Carrot size={18} />}
              title="Vegetables"
              recommendation="3-5 servings daily"
              description="Aim for variety and different colors for diverse nutrients"
              color="bg-green-400"
              morningColor="bg-amber-300"
              themeMode={themeMode}
            />
            <DietaryCard
              icon={<Apple size={18} />}
              title="Fruits"
              recommendation="2-4 servings daily"
              description="Focus on whole fruits rather than juices for fiber"
              color="bg-purple-400"
              morningColor="bg-amber-600"
              themeMode={themeMode}
            />
          </div>

          <div
            className={`mt-8 p-6 rounded-lg shadow-inner transition-colors duration-300 ${
              isMorning ? "bg-amber-50/90" : "bg-white/90"
            }`}
          >
            <h3
              className={`text-lg font-semibold mb-4 transition-colors duration-300 ${
                isMorning ? "text-amber-800" : "text-indigo-800"
              }`}
            >
              Daily Meal Planning
            </h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4
                    className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                      isMorning ? "text-amber-700" : "text-indigo-700"
                    }`}
                  >
                    <Utensils className="w-4 h-4" /> Balanced Diet Principles
                  </h4>
                  <ul className="mt-2 space-y-2">
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Maintain a caloric balance appropriate for your age, gender, and activity level</span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Include a variety of foods from all food groups</span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Limit intake of added sugars, sodium, and saturated fats</span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Stay hydrated by drinking plenty of water throughout the day</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4
                    className={`text-sm font-medium flex items-center gap-2 transition-colors duration-300 ${
                      isMorning ? "text-amber-700" : "text-indigo-700"
                    }`}
                  >
                    <Salad className="w-4 h-4" /> Nutritional Tips
                  </h4>
                  <ul className="mt-2 space-y-2">
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Eat a rainbow of colorful fruits and vegetables for diverse nutrients</span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Choose lean proteins and plant-based protein sources when possible</span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Include healthy fats from sources like avocados, nuts, and olive oil</span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>Limit processed foods and opt for whole, unprocessed alternatives</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div
                className={`pt-4 border-t transition-colors duration-300 ${
                  isMorning ? "border-amber-200" : "border-indigo-100"
                }`}
              >
                <h4
                  className={`text-sm font-medium mb-3 transition-colors duration-300 ${
                    isMorning ? "text-amber-700" : "text-indigo-700"
                  }`}
                >
                  Sample Meal Plan
                </h4>
                <div className="grid gap-4 md:grid-cols-3">
                  <div
                    className={`p-4 rounded-lg transition-colors duration-300 ${
                      isMorning ? "bg-amber-100" : "bg-indigo-50"
                    }`}
                  >
                    <h5
                      className={`font-medium mb-2 transition-colors duration-300 ${
                        isMorning ? "text-amber-800" : "text-indigo-800"
                      }`}
                    >
                      Breakfast
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Oatmeal with berries and nuts</li>
                      <li>• Greek yogurt with honey</li>
                      <li>• Whole grain toast with avocado</li>
                      <li>• Green tea or coffee</li>
                    </ul>
                  </div>
                  <div
                    className={`p-4 rounded-lg transition-colors duration-300 ${
                      isMorning ? "bg-amber-100" : "bg-indigo-50"
                    }`}
                  >
                    <h5
                      className={`font-medium mb-2 transition-colors duration-300 ${
                        isMorning ? "text-amber-800" : "text-indigo-800"
                      }`}
                    >
                      Lunch
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Grilled chicken salad with mixed greens</li>
                      <li>• Quinoa bowl with roasted vegetables</li>
                      <li>• Whole grain wrap with hummus and vegetables</li>
                      <li>• Water with lemon</li>
                    </ul>
                  </div>
                  <div
                    className={`p-4 rounded-lg transition-colors duration-300 ${
                      isMorning ? "bg-amber-100" : "bg-indigo-50"
                    }`}
                  >
                    <h5
                      className={`font-medium mb-2 transition-colors duration-300 ${
                        isMorning ? "text-amber-800" : "text-indigo-800"
                      }`}
                    >
                      Dinner
                    </h5>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Baked salmon with steamed vegetables</li>
                      <li>• Lentil soup with whole grain bread</li>
                      <li>• Stir-fry with tofu and brown rice</li>
                      <li>• Herbal tea or water</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
