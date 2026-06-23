"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, ArrowRight, Code2, Brain, Mic, BarChart3 } from "lucide-react";

export default function Home() {
  const features = [
    {
      icon: Code2,
      title: "DSA Preparation",
      description: "Master Data Structures and Algorithms with curated topic-wise problem sets.",
      color: "bg-blue-500",
    },
    {
      icon: Brain,
      title: "Aptitude Tests",
      description: "Sharpen your quantitative and logical reasoning skills for online assessments.",
      color: "bg-emerald-500",
    },
    {
      icon: Mic,
      title: "Mock Interviews",
      description: "Practice technical and HR questions commonly asked in interviews.",
      color: "bg-purple-500",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track your progress with detailed analytics and daily streaks.",
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col overflow-hidden bg-slate-50 dark:bg-[#0B1120]">
      
      {/* Background decorations */}
      <div className="absolute top-0 inset-x-0 h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 grid-pattern opacity-50" />
      </div>

      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10 py-20">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-400 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-500 animate-ping" />
            Your Ultimate Placement Companion
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
            Crack Your <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Dream Placement
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            A comprehensive platform to practice Data Structures, Algorithms, Aptitude, and Mock Interviews. Track your progress and build your streak.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-500 hover:to-indigo-500
                shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                transition-all duration-300 hover:-translate-y-1
                flex items-center justify-center gap-2 group"
            >
              Get Started for Free
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link
              href="/login"
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-semibold
                text-slate-700 dark:text-slate-200
                bg-white dark:bg-slate-800/50 backdrop-blur-sm
                border border-slate-200 dark:border-slate-700
                hover:bg-slate-50 dark:hover:bg-slate-800
                transition-all duration-300 hover:-translate-y-1
                flex items-center justify-center gap-2"
            >
              Log in to Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-24 max-w-7xl mx-auto"
        >
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-white/60 dark:bg-slate-800/40 backdrop-blur-md rounded-2xl p-6
                border border-slate-200/50 dark:border-slate-700/50
                shadow-xl shadow-black/5 dark:shadow-black/10
                hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg ${feature.color} group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

    </div>
  );
}