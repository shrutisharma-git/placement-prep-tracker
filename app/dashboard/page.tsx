"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { modules } from "../data/modules";


type User = {
  id: string;
  email: string;
};

type Stats = {
  dsa: number;
  aptitude: number;
  mockInterview: number;
};

export default function Dashboard(){

  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  

  
  const [stats, setStats] = useState<Stats>({
    dsa : 0,
    aptitude: 0,
    mockInterview: 0
  });

  const [activity, setActivity] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  //Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/dashboard",{
          credentials: "include",
        });

        // Handle unauthorized access
        if(res.status === 401 || res.status === 403){
          setLoading(false);
          router.push("/login");
          return;
        }
        const data = await res.json();
        
        setUserData(data.user);
        console.log(userData)
        setStreak(data.streak || 0);

        if (data.stats) {
          setStats(data.stats);
        }
        setActivity(data.activity || []);
        setLoading(false);
        console.log(data.activity);
      }
      catch (error) {
        console.error("Error fetching user: ", error);
        setLoading(false);
      }
    };
    fetchUser();
  },[router]);
  

  // Logout
  const handleLogout = async () => {
    await fetch("/api/logout",{
      method: "POST",
      credentials: "include",
    });
    
    router.push("/login");
  };
  
  //Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }
  

  return(
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h1>
        
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
          >
          Logout
        </button>

      </div>

      {/* Welcome */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl shadow-lg mb-8">

        <h1 className="text-3xl font-bold">
            Welcome Back 👋
        </h1>

        <p className="mt-3 text-lg">
            Keep practicing consistently and crack your dream placement 🚀
        </p>

      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold">DSA Solved</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.dsa}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold">Aptitude</h3>
          <p className="text-2xl font-bold text-green-600">{stats.aptitude}</p>
        </div>
        <div className="bg-purple-500 text-white p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold">Mock Interview</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.mockInterview}</p>
        </div>

      </div>

      {/* Daily Streak */}
      <div className="mt-8 bg-orange-500 text-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold">
            🔥 Daily Streak
        </h2>

        <p className="text-xl mt-2">
            {streak} Days
        </p>

    </div>

      {/* Modules */}
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white m-4">
        Modules
      </h1>
      <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {modules.map((module)=>{
          const Icon = module.icon;
            
          return(

            <div
            key={module.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl ">
              <Icon
                size={40}
                className="text-blue-500 mb-4"
                />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {module.title}
              </h3>

              <p className="text-gray-500 mt-2">
                {module.description}
              </p>

              <button
              onClick={()=>router.push(module.route)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Open Module
              </button>
            </div>
          );
        })}

      </div>

      {/* Activity Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">

        <h2 className="text-2xl font-bold mb-4 dark:text-white">
            Recent Activity
        </h2>

        {
            activity.length > 0 ? (

                activity.slice().reverse().map((item, index) => (

                    <div
                        key={index}
                        className="mb-3 p-3 bg-gray-100 dark:bg-gray-700 rounded-xl"
                    >
                        {item}
                    </div>

                ))

            ) : (

                <p>No activity yet.</p>

            )
        }

    </div>

      {/* Quick Actions */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">

      <h2 className="text-2xl font-bold mb-4 dark:text-white">
          Quick Access
      </h2>

      <div className="flex gap-4 flex-wrap">
        <button
          className="bg-blue-600 text-white px-5 py-3 rounded-xl"
        >
          DSA
        </button>

        <button
          className="bg-green-600 text-white px-5 py-3 rounded-xl"
        >
          Aptitude
        </button>

        <button
          className="bg-purple-600 text-white px-5 py-3 rounded-xl"
        >
          Interview
        </button>
      </div>

    </div>

      <div className="mt-8 bg-gradient-to-r from-pink-500 to-red-500 text-white p-6 rounded-2xl shadow">

          <h2 className="text-2xl font-bold">
              Daily Motivation 💡
          </h2>

          <p className="mt-3">
              Success does not come from what you do occasionally.
              It comes from what you do consistently.
          </p>

      </div>


    </div>

    
  )
}