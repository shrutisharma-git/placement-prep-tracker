"use client";

import { aptitudeCategories } from "@/app/data/aptitudeCategories";
import { useRouter } from "next/navigation";

export default function AptitudePage() {
  const router = useRouter();

  return(
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      {/* heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Aptitude Preparation
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
           Prepare for your aptitude interviews with our curated list of topics and problems. Click on any topic to start practicing and improve your problem-solving skills!
        </p>
      </div>
      {/* topics grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {aptitudeCategories.map((category) =>(
          <div 
            key={category.id}
            onClick={() =>
              router.push(`/dashboard/aptitude/${category.name.toLowerCase()}`)
            }
            className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow p-6 hover:shadow-lg hover:scale-105 transition duration-300"
          >
            

            {/* Color badge */}

            <div
              className={`w-14 h-14 rounded-xl ${category.color} mb-4`}
            ></div>

            {/* Topic Name */}
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              {category.name}
            </h2>

            {/* Problems Count */}
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {category.questions} Questions
            </p>

            <p className="text-sm text-blue-500 mt-2">
              Click to explore →
            </p>
            
          </div>
        ))}

      </div>
    </div>
  )
}