"use client";

import { interviewQuestions } from "@/app/data/interviewQuestions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function InterviewCategoryPage() {
    const params = useParams();
    const category = params.category as string;

    const questions = interviewQuestions[category] || [];

    const [search, setSearch] = useState("");
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [showAnswer, setShowAnswer] = useState<number[]>([]);
    const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);
    const [solvedQuestions, setSolvedQuestions] = useState<string[]>([]);
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    

    const filteredQuestions = questions.filter((question) =>
        question.question.toLowerCase().includes(search.toLowerCase())
    );

    const solvedCount = questions.filter((question) =>
        solvedQuestions.includes(question.question)
    ).length;
    
    const progressPercentage =
        questions.length > 0
            ? (solvedCount / questions.length) * 100
            : 0;
    
    const accuracy =
        attempts > 0
            ? Math.round((score / attempts) * 100)
            : 0;
    
    const isCategoryCompleted =
        solvedCount === questions.length &&
        questions.length > 0;

        useEffect(() => {

            const fetchSolvedQuestions = async () => {
        
                const res = await fetch("/api/dashboard");
        
                const data = await res.json();
        
                setSolvedQuestions(data.solvedInterviewQuestions || []);
        
            };
        
            fetchSolvedQuestions();
        
        }, []);

    return (
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">

            {/* Heading */}
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                {category.toUpperCase()}
            </h1>

            {/* Progress Section */}
            <div className="mb-8">

                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700 dark:text-white">
                        Progress
                    </span>

                    <span className="text-gray-600 dark:text-gray-300">
                        {solvedCount} / {questions.length} Solved
                        ({Math.round(progressPercentage)}%)
                    </span>
                </div>

                <div className="w-full h-4 bg-gray-300 rounded-full">
                    <div
                        className="h-4 bg-green-500 rounded-full"
                        style={{
                            width: `${progressPercentage}%`
                        }}
                    ></div>
                </div>

                <div className="mt-4">
                    {
                        isCategoryCompleted ? (
                            <div className="bg-yellow-500 text-white p-4 rounded-xl font-semibold">
                                🏆 {category.toUpperCase()} Mastered
                            </div>
                        ) : (
                            <div className="bg-blue-600 text-white p-4 rounded-xl font-semibold">
                                🚀 Keep Practicing
                            </div>
                        )
                    }
                </div>

            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="bg-green-100 dark:bg-green-900 p-4 rounded-xl">
                    <h2 className="font-bold text-lg">
                        Score : {score}
                    </h2>
                </div>

                <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-xl">
                    <h2 className="font-bold text-lg">
                        Attempts : {attempts}
                    </h2>
                </div>

                <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-xl">
                    <h2 className="font-bold text-lg">
                        Accuracy : {accuracy}%
                    </h2>
                </div>

            </div>

            {/* Search Box */}
            <input
                type="text"
                placeholder="Search Questions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 mb-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            

            {/* Questions */}
            <div className="space-y-6">

                {
                    filteredQuestions.length > 0 ? (

                        filteredQuestions.map((question) => (

                            <div
                                key={question.id}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition"                            >

                                {/* Question Number */}
                                <div className="text-sm text-blue-500 font-semibold mb-2">
                                    Question #{question.id}
                                </div>
                                <div className="mb-3">
                                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm">
                                        {category.toUpperCase()}
                                    </span>
                                </div>

                                {/* Question */}
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {question.question}
                                </h2>

                                {/* Answer Input */}
                                <input
                                    type="text"
                                    placeholder="Type your answer..."
                                    value={answers[question.id] || ""}
                                    onChange={(e) =>
                                        setAnswers({
                                            ...answers,
                                            [question.id]: e.target.value
                                        })
                                    }
                                    className="w-full mt-4 p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-white"
                                />

                                {
                                    checkedAnswers.includes(question.id) && (

                                        answers[question.id]?.trim().toLowerCase() ===
                                        question.answer.toLowerCase()

                                            ? (

                                                <div className="mt-3 text-green-600 font-semibold">
                                                    ✅ Correct Answer
                                                </div>

                                            )

                                            : (

                                                <div className="mt-3 text-red-500 font-semibold">
                                                    ❌ Incorrect Answer
                                                </div>

                                            )

                                    )
                                }
                                

                                {/* Show Answer */}
                                {
                                    showAnswer.includes(question.id) && (

                                        <div className="mt-4 bg-green-100 dark:bg-green-900 p-4 rounded-lg border border-green-500">

                                            <p className="font-semibold text-green-700 dark:text-green-300">
                                                Correct Answer
                                            </p>

                                            <p className="mt-2 text-lg font-bold text-green-700 dark:text-green-300">
                                                {question.answer}
                                            </p>

                                        </div>

                                    )
                                }

                                {/* Buttons */}
                                <div className="mt-5 flex flex-wrap gap-4">

                                    {/* Check Answer */}
                                    <button
                                        onClick={() => {

                                            if (checkedAnswers.includes(question.id)) return;
                                        
                                            setCheckedAnswers((prev) => [...prev, question.id]);
                                        
                                            setAttempts((prev) => prev + 1);
                                        
                                            if (
                                                answers[question.id]?.trim().toLowerCase() ===
                                                question.answer.toLowerCase()
                                            ) {
                                                setScore((prev) => prev + 1);
                                            }
                                        
                                        }}

                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                    >
                                        Check Answer
                                    </button>

                                    {/* Show Answer */}
                                    <button
                                        onClick={() =>
                                            setShowAnswer((prev) => [...prev, question.id])
                                        }
                                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                    >
                                        Show Answer
                                    </button>

                                    {/* Reset */}
                                    <button
                                        onClick={() => {

                                            setAnswers((prev) => ({
                                                ...prev,
                                                [question.id]: ""
                                            }));

                                            setCheckedAnswers(
                                                checkedAnswers.filter(
                                                    (id) => id !== question.id
                                                )
                                            );
                                            
                                            setShowAnswer(
                                                showAnswer.filter(
                                                    (id) => id !== question.id
                                                )
                                            );

                                        }}

                                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                                    >
                                        Reset
                                    </button>

                                    {/* Mark Solved */}
                                    {
                                        solvedQuestions.includes(question.question) ? (

                                            <button
                                                className="px-4 py-2 bg-gray-600 text-white rounded-lg"
                                            >
                                                ✔ Solved
                                            </button>

                                        ) : (

                                            <button
                                                onClick={async () => {

                                                    const res = await fetch("/api/interview/solve", {
                                                        method: "POST",

                                                        headers: {
                                                            "Content-Type": "application/json"
                                                        },

                                                        body: JSON.stringify({
                                                            questionName: question.question
                                                        })

                                                    });

                                                    const data = await res.json();

                                                    alert(data.message);

                                                    if (data.message !== "Already solved!") {

                                                        setSolvedQuestions((prev) => [
                                                            ...prev,
                                                            question.question
                                                        ]);

                                                    }

                                                }}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                Mark Solved
                                            </button>

                                            

                                        )
                                    }

                                </div>

                                

                            </div>

                        ))

                    ) : (

                        <p className="text-gray-500">
                            No Questions Available
                        </p>

                    )
                }

            </div>

        </div>
    );
}