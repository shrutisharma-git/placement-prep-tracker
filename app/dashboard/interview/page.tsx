"use client";

import { interviewCategories } from "@/app/data/interviewCategories";
import { useRouter } from "next/navigation";

export default function InterviewPage() {

    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

            <div className="mb-8">

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                    Interview Preparation
                </h1>

                <p className="text-gray-600 dark:text-gray-300 mt-2">
                    Practice Technical and HR interview questions.
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {interviewCategories.map((category) => (

                    <div
                        key={category.id}
                        onClick={() =>
                            router.push(
                                `/dashboard/interview/${category.name.toLowerCase()}`
                            )
                        }
                        className="cursor-pointer bg-white dark:bg-gray-800 rounded-2xl shadow p-6 hover:scale-105 transition"
                    >

                        <div
                            className={`w-14 h-14 rounded-xl ${category.color} mb-4`}
                        ></div>

                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                            {category.name}
                        </h2>

                        <p className="text-gray-500 mt-2">
                            {category.questions} Questions
                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}