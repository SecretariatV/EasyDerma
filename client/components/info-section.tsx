import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Salad, Utensils, Wheat } from "lucide-react";
import type { ThemeMode } from "@/app/page";
import { GeminiResponse } from "@/lib/api";

interface InfoSectionProps {
  themeMode: ThemeMode;
  data: GeminiResponse;
}

export function InfoSection({ themeMode, data }: InfoSectionProps) {
  const isMorning = themeMode === "morning";

  return (
    <section className="w-full mt-8">
      <Card
        className={`border-none shadow-xl overflow-hidden transition-colors duration-300 ${
          isMorning
            ? "bg-gradient-to-r from-amber-50 to-orange-50"
            : "bg-gradient-to-r from-indigo-50 to-purple-50"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`text-2xl transition-colors duration-300 ${
              isMorning ? "text-amber-900" : "text-indigo-900"
            }`}
          >
            General Dietary Recommendations
          </CardTitle>
          <CardDescription>
            Personalized nutrition guidelines for a balanced and healthy diet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={` p-6 rounded-lg shadow-inner transition-colors duration-300 ${
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
                      <span>
                        Maintain a caloric balance appropriate for your age,
                        gender, and activity level
                      </span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>
                        Include a variety of foods from all food groups
                      </span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>
                        Limit intake of added sugars, sodium, and saturated fats
                      </span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>
                        Stay hydrated by drinking plenty of water throughout the
                        day
                      </span>
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
                      <span>
                        Eat a rainbow of colorful fruits and vegetables for
                        diverse nutrients
                      </span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>
                        Choose lean proteins and plant-based protein sources
                        when possible
                      </span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>
                        Include healthy fats from sources like avocados, nuts,
                        and olive oil
                      </span>
                    </li>
                    <li className="text-gray-600 flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mt-1.5 mr-2 flex-shrink-0 transition-colors duration-300 ${
                          isMorning ? "bg-amber-500" : "bg-indigo-500"
                        }`}
                      ></span>
                      <span>
                        Limit processed foods and opt for whole, unprocessed
                        alternatives
                      </span>
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
                      {data.generated.breakfast.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
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
                      {data.generated.lunch.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
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
                      {data.generated.dinner.map((item, index) => (
                        <li key={index}>• {item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
