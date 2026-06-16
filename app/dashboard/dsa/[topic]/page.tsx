"use client";
import { dsaProblems } from "@/app/data/dsaProblems";
import { useParams } from "next/navigation";

export default function DSATopicPage(){
    const params = useParams();
    const topic = params.topic as string;
    const problems = dsaProblems[topic] || []; 
    return(
        <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 ">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                {topic.toUpperCase()}
            </h1>

            <div className="space-y-4">
                {
                    problems.length > 0 ? (
                        problems.map((problem) => (
                            <div
                            key={problem.id}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {problem.name}
                                </h2>

                                <p className="mt-2">
                                    Difficulty :
                                    <span className="ml-2 font-medium">
                                        {problem.difficulty}
                                    </span>
                                </p>
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

                                    <button
                                    onClick={async () =>{
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
                                        console.log(data)
                                        alert(data.message);
                            
                                    }}

                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                        Mark Solved
                                    </button>
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