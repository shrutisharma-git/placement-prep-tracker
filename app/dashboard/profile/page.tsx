"use client";

import { useEffect, useState } from "react";

type UserData = {
    email: string;
};

type Stats = {
    dsa: number;
    aptitude: number;
    mockInterview: number;
};

export default function ProfilePage() {

    const [user, setUser] = useState<UserData | null>(null);
    const [stats, setStats] = useState<Stats>({
        dsa: 0,
        aptitude: 0,
        mockInterview: 0
    });

    const [streak, setStreak] = useState(0);

    useEffect(() => {

        const fetchProfile = async () => {

            const res = await fetch("/api/dashboard");

            const data = await res.json();

            setUser(data.user);
            setStats(data.stats);
            setStreak(data.streak);

        };

        fetchProfile();

    }, []);

    return (

        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-8">

                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
                    Profile
                </h1>

                <div className="space-y-6">

                    <div>
                        <h2 className="text-gray-500">
                            Email
                        </h2>

                        <p className="text-xl font-semibold text-gray-800 dark:text-white">
                            {user?.email}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-gray-500">
                            DSA Solved
                        </h2>

                        <p className="text-2xl font-bold text-blue-600">
                            {stats.dsa}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-gray-500">
                            Aptitude Solved
                        </h2>

                        <p className="text-2xl font-bold text-green-600">
                            {stats.aptitude}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-gray-500">
                            Interview Questions
                        </h2>

                        <p className="text-2xl font-bold text-purple-600">
                            {stats.mockInterview}
                        </p>
                    </div>

                    <div>
                        <h2 className="text-gray-500">
                            Daily Streak
                        </h2>

                        <p className="text-2xl font-bold text-orange-500">
                            🔥 {streak} Days
                        </p>
                    </div>

                </div>

            </div>

        </div>

    );
}