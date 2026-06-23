"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { modules } from "../data/modules";
import { motion } from "framer-motion";
import { Flame, Code2, Brain, Mic, ArrowRight, Quote, Clock, Target, CalendarDays, Activity } from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";

type User = {
  id: string;
  email: string;
  name?: string;
};

type Stats = {
  dsa: number;
  aptitude: number;
  mockInterview: number;
};

const quotes = [
  "Success does not come from what you do occasionally. It comes from what you do consistently.",
  "The expert in anything was once a beginner. Keep practicing.",
  "Your future is created by what you do today, not tomorrow.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never come from comfort zones.",
];

export default function Dashboard() {
  const router = useRouter();

  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    dsa: 0,
    aptitude: 0,
    mockInterview: 0
  });

  const [activity, setActivity] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);
  const [quoteOfDay, setQuoteOfDay] = useState(quotes[0]);

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/dashboard", {
          credentials: "include",
        });

        // Handle unauthorized access
        if (res.status === 401 || res.status === 403) {
          setLoading(false);
          router.push("/login");
          return;
        }
        const data = await res.json();

        setUserData(data.user);
        setStreak(data.streak || 0);

        if (data.stats) {
          setStats(data.stats);
        }
        setActivity(data.activity || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user: ", error);
        setLoading(false);
      }
    };
    fetchUser();
    
    // Set random quote on load
    setQuoteOfDay(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [router]);

  // Loading UI
  if (loading) {
    return (
      <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
        <div className="h-40 rounded-3xl skeleton" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-32 rounded-2xl skeleton" />
          <div className="h-32 rounded-2xl skeleton" />
          <div className="h-32 rounded-2xl skeleton" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 rounded-3xl skeleton" />
          <div className="h-96 rounded-3xl skeleton" />
        </div>
      </div>
    );
  }

  const quickActions = [
    { title: "Practice DSA", path: "/dashboard/dsa", icon: Code2, color: "from-blue-500 to-indigo-600", shadow: "shadow-blue-500/20" },
    { title: "Practice Aptitude", path: "/dashboard/aptitude", icon: Brain, color: "from-emerald-500 to-green-600", shadow: "shadow-emerald-500/20" },
    { title: "Mock Interview", path: "/dashboard/interview", icon: Mic, color: "from-purple-500 to-violet-600", shadow: "shadow-purple-500/20" },
    { title: "View Analytics", path: "/dashboard/analytics", icon: Target, color: "from-amber-500 to-orange-600", shadow: "shadow-amber-500/20" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      
      {/* Welcome Hero */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden mb-8 shadow-xl shadow-blue-500/10"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700" />
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl transform -translate-x-1/2 translate-y-1/2" />
        
        <div className="relative z-10 p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-4">
              <CalendarDays size={14} />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">
              Welcome Back{userData?.name ? `, ${userData.name.split(' ')[0]}` : ''} 👋
            </h1>
            <p className="text-blue-100 max-w-lg text-lg">
              Keep practicing consistently and crack your dream placement 🚀
            </p>
          </div>

          {/* Streak Badge */}
          <div className="shrink-0">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/30">
                <Flame size={24} className="text-white" />
              </div>
              <div>
                <p className="text-blue-100 text-sm font-medium">Current Streak</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{streak}</span>
                  <span className="text-white/80 font-medium">Days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10">
        <StatCard
          icon={Code2}
          label="DSA Problems Solved"
          value={stats.dsa}
          gradient="bg-gradient-to-br from-blue-500 to-blue-600"
          delay={0.1}
        />
        <StatCard
          icon={Brain}
          label="Aptitude Questions"
          value={stats.aptitude}
          gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
          delay={0.2}
        />
        <StatCard
          icon={Mic}
          label="Interview Questions"
          value={stats.mockInterview}
          gradient="bg-gradient-to-br from-purple-500 to-purple-600"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Column - Modules & Actions */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Quick Actions */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
              <Activity className="text-blue-500" size={20} />
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => router.push(action.path)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow group text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${action.color} shadow-lg ${action.shadow}`}>
                      <action.icon size={20} className="text-white" />
                    </div>
                    <span className="font-semibold text-slate-700 dark:text-slate-200 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {action.title}
                    </span>
                  </div>
                  <ArrowRight size={18} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 group-hover:translate-x-1 transition-all" />
                </motion.button>
              ))}
            </div>
          </section>

          {/* All Modules Grid */}
          <section>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">
              Preparation Modules
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {modules.map((module, idx) => {
                const Icon = module.icon;
                return (
                  <GlassCard key={module.id} delay={0.4 + idx * 0.1}>
                    <div className="p-6 h-full flex flex-col">
                      <div className="flex items-start justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          <Icon size={24} />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                        {module.title}
                      </h3>
                      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow">
                        {module.description}
                      </p>
                      <button
                        onClick={() => router.push(module.route)}
                        className="w-full py-2.5 rounded-xl font-semibold text-sm
                          bg-slate-100 dark:bg-slate-700/50 
                          text-slate-700 dark:text-slate-300
                          hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500
                          transition-colors duration-300 flex items-center justify-center gap-2 group"
                      >
                        Open Module
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </section>

        </div>

        {/* Right Column - Activity & Motivation */}
        <div className="space-y-8">
          
          {/* Motivation Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-3xl p-6 bg-gradient-to-br from-pink-500 via-rose-500 to-orange-500 text-white shadow-xl shadow-rose-500/20 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-20">
              <Quote size={80} />
            </div>
            <div className="relative z-10">
              <h3 className="font-semibold text-rose-100 mb-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Daily Motivation
              </h3>
              <p className="text-lg font-medium leading-relaxed mb-2">
                "{quoteOfDay}"
              </p>
            </div>
          </motion.div>

          {/* Activity Feed */}
          <GlassCard delay={0.6} className="flex-grow">
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                <Clock className="text-indigo-500" size={20} />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {activity.length > 0 ? (
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-slate-200 dark:bg-slate-700" />
                    
                    <div className="space-y-6">
                      {activity.slice().reverse().map((item, index) => (
                        <div key={index} className="relative pl-8">
                          {/* Timeline Dot */}
                          <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border-2 border-blue-500 flex items-center justify-center z-10">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                          </div>
                          
                          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 text-sm text-slate-700 dark:text-slate-300 shadow-sm">
                            {item}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3">
                      <Activity size={20} className="text-slate-400" />
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No activity yet</p>
                    <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">Start practicing to see your timeline!</p>
                  </div>
                )}
              </div>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}