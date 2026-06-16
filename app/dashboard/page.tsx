"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { modules } from "../data/modules";
import { BookOpen } from "lucide-react";


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
  const [problemName, setProblemName] = useState<string>("");

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
      <div className="mb-6">
        <h2 className="text-xl text-gray-700 dark:text-gray-300">
          Welcome,{" "}
          <span className="font-semibold">
            {userData?.email || "User"}
            </span>
            👋
        </h2>
      </div>

      {/* Stats Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-gray-500">DSA Solved</h3>
          <p className="text-2xl font-bold text-blue-600">{stats.dsa}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-gray-500">Aptitude</h3>
          <p className="text-2xl font-bold text-green-600">{stats.aptitude}</p>
        </div>
        <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow">
          <h3 className="text-gray-500">Mock Interview</h3>
          <p className="text-2xl font-bold text-purple-600">{stats.mockInterview}</p>
        </div>

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
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
          Recent Activity
        </h3>

        <ul className="space-y-2 text-gray-600 dark:text-gray-300">
          {activity.length > 0 ?(
            activity.map((item,index) =>(
              <li key={index} className="flex items-center gap-2">
                ✅ {item}
              </li>
            ))
          ) : (
            <li className="text-gray-500">No recent activity!</li>
          )}
        </ul>
      </div>

      {/* Quick Actions */}

      <div className="mt-8 flex gap-4 flex-wrap">

      </div>


    </div>
  )
}