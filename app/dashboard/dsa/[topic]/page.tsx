"use client";
import { dsaProblems } from "@/app/data/dsaProblems";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function DSATopicPage(){
    const params = useParams();
    const topic = params.topic as string;
    const problems = dsaProblems[topic] || [];

    const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
    const [search, setSearch] = useState("");

    const [difficultyFilter, setDifficultyFilter] = useState("All");

    const difficultyOrder = {
        Easy: 1,
        Medium: 2,
        Hard: 3
    };
    
    const filteredProblems = problems
        .filter((problem) => {
    
            const matchesSearch =
                problem.name.toLowerCase().includes(search.toLowerCase());
    
            const matchesDifficulty =
                difficultyFilter === "All" ||
                problem.difficulty === difficultyFilter;
    
            return matchesSearch && matchesDifficulty;
        })
    
        .sort(
            (a, b) =>
                difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
                difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
        );


    const solvedCount = problems.filter((problem) =>
        solvedProblems.includes(problem.name)
    ).length;

    const progressPercentage =
    problems.length > 0
        ? (solvedCount / problems.length) * 100
        : 0;

    const isTopicCompleted = solvedCount === problems.length && problems.length > 0;
   

    useEffect(() => {

        const fetchSolvedProblems = async () => {
    
            const res = await fetch("/api/dashboard");
    
            const data = await res.json();
    
            setSolvedProblems(data.solvedProblems || []);
        };
    
        fetchSolvedProblems();
    
    }, []);


    return(
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 ">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                {topic.toUpperCase()}
            </h1>

            <div className="mb-8">

                <div className="flex justify-between mb-2">
                    <span className="font-medium text-gray-700 dark:text-white">
                        Progress
                    </span>

                    <span className="text-gray-600 dark:text-gray-300">
                        {solvedCount} / {problems.length} Solved
                        ({Math.round(progressPercentage)}%)
                    </span>
                </div>

                {/* Progress Bar */}
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
                        isTopicCompleted ? (
                            <div className="bg-yellow-500 text-white p-4 rounded-xl font-semibold">
                                🏆 {topic.toUpperCase()} Mastered
                            </div>
                        ) : (
                            <div className="bg-blue-600 text-white p-4 rounded-xl font-semibold ">
                                🚀 Keep Practicing
                            </div>
                        )
                    }
                </div>
                

            </div>

            <input 
                type="text"
                placeholder="Search Problems"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-3 mb-6 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="p-3 mb-6 rounded-lg border dark:bg-gray-800 dark:text-white"
            >
                <option value="All">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
            </select>


            <div className="space-y-4">
                {
                    filteredProblems.length > 0 ? (
                        filteredProblems.map((problem) => (
                            <div
                            key={problem.id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {problem.name}
                                </h2>

                                <div className="mt-3">

                                    <span
                                        className={`px-3 py-1 rounded-full text-white text-sm

                                        ${
                                            problem.difficulty === "Easy"
                                                ? "bg-green-500"

                                                : problem.difficulty === "Medium"
                                                ? "bg-yellow-500"

                                                : "bg-red-500"
                                        }`}
                                    >
                                        {problem.difficulty}
                                    </span>

                                </div>

                                <p className="mt-2 text-gray-500">
                                    Problem :
                                    <span className="text-amber-500">
                                        {problem.platform}
                                    </span>
                                </p>

                                <div className="mt-4 flex gap-4">
                                    <button
                                    onClick={() => window.open(problem.url,"_blank")}
                                    className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                    >
                                        Open Problem
                                    </button>

                                    {
                                        solvedProblems.includes(problem.name) ? (

                                            <button
                                            className="px-4 py-2 bg-gray-600 text-white rounded-lg">
                                                ✔ Solved
                                            </button>

                                        ) : (

                                            <button
                                            onClick={async () => {

                                                const res = await fetch("/api/dsa/solve",{
                                                    method:"POST",

                                                    headers:{
                                                        "Content-Type":"application/json"
                                                    },

                                                    body: JSON.stringify({
                                                        problemName: problem.name
                                                    })
                                                });

                                                const data = await res.json();

                                                alert(data.message);

                                                if (data.message !== "Already solved!") {
                                                    setSolvedProblems((prev) => [...prev, problem.name]);
                                                }

                                            }}

                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">

                                                Mark Solved

                                            </button>
                                        )
                                    }
                                </div>

                            </div>
                        ))
                    ) : 
                    (
                        <p>No Problems available</p>
                    )
                }
            </div>

           
        </div>
    )
}
