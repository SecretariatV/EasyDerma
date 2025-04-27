import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Apple, Beef, Carrot, Salad, Utensils, Wheat } from "lucide-react";
import type { ThemeMode } from "@/app/page";

interface InfoSectionProps {
  themeMode: ThemeMode;
  isImageUploaded: boolean;
  cardHeader?: string;
  cardDescription?: string | string[];
}

export function Article({
  themeMode,
  isImageUploaded,
  cardHeader,
  cardDescription,
}: InfoSectionProps) {
  const isMorning = themeMode === "morning";

  // Conditional rendering based on isImageUploaded
  if (!isImageUploaded) {
    return null; // Or render a placeholder if no image is uploaded
  }

  return (
    <section className="w-full mt-8 mb-6">
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
            {cardHeader}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className={`p-6 rounded-lg shadow-inner transition-colors duration-300 ${
              isMorning ? "bg-amber-50/90" : "bg-white/90"
            }`}
          >
            <div className="space-y-6">
              <div>
                <div>
                  {Array.isArray(cardDescription) && cardDescription.length > 0 ? (
                    cardDescription.map((item, index) => (
                      <ol key={index} className="list-disc list-inside">
                        <li>{item}</li>
                      </ol>
                    ))
                  ) : (
                    <h4
                      className={`text-md font-medium flex items-center gap-2 w-full transition-colors duration-300 ${
                        isMorning ? "text-amber-700" : "text-indigo-700"
                      }`}
                    >
                      {cardDescription}
                    </h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
