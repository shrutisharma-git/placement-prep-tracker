"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function AnalyticsPage() {

    const [stats,setStats] = useState({
        dsa: 0,
        aptitude: 0,
        mockInterview: 0
    });

    useEffect(() => {
      const fetchStats = async () => {
         const res = await fetch("/api/dashboard");
         const data = await res.json();

         setStats(data.stats);
      };
      fetchStats();
      
    }, [])
    

    const data = [
        {
            name: "DSA",
            value: stats.dsa,
        },
        {
            name: "Aptitude",
            value: stats.aptitude,
        },
        {
            name: "Interview",
            value: stats.mockInterview,
        },
    ];

    const weeklyData = [
        {
            week: "Week 1",
            problems: 2
        },
    
        {
            week: "Week 2",
            problems: 5
        },
    
        {
            week: "Week 3",
            problems: 8
        },
    
        {
            week: "Week 4",
            problems: 12
        }
    ];

    return (


        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                Analytics Dashboard
            </h1>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
                
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 ">
                    Progress Overview
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                        <h3 className="text-gray-500">
                            DSA Solved
                        </h3>

                        <p className="text-3xl font-bold text-blue-600">
                            {stats.dsa}
                        </p>

                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                        <h3 className="text-gray-500">
                            Aptitude
                        </h3>

                        <p className="text-3xl font-bold text-green-600">
                            {stats.aptitude}
                        </p>

                    </div>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">

                        <h3 className="text-gray-500">
                            Mock Interview
                        </h3>

                        <p className="text-3xl font-bold text-purple-600">
                            {stats.mockInterview}
                        </p>

                    </div>

                </div>

                {/* Bar Chart */}
                <div className="h-80">

                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>

                            <Bar
                             dataKey="value"
                             fill="#3b82f6"/>

                        </BarChart>

                    </ResponsiveContainer>


                </div>

                {/* Pie Chart */}

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mt-8">

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                        Distribution
                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer width="100%" height="100%">

                            <PieChart>

                                <Pie
                                    data={data}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={100}
                                    label
                                />


                                <Tooltip />

                                <Legend />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* Line Chart */}

                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl mt-8">

                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                        Weekly Progress
                    </h2>

                    <div className="h-80">

                        <ResponsiveContainer width="100%" height="100%">

                            <LineChart data={weeklyData}>

                                <CartesianGrid strokeDasharray="3 3" />

                                <XAxis dataKey="week" />

                                <YAxis />

                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="problems"
                                    stroke="#3b82f6"
                                />

                            </LineChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>
    );
}