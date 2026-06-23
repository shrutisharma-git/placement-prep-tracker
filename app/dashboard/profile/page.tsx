"use client";

import { useEffect, useState } from "react";
import { User as UserIcon, Mail, Flame, Code2, Brain, Mic, Shield, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";

type UserData = {
  name?: string;
  email: string;
  role?: string;
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
      if (data.stats) setStats(data.stats);
      if (data.streak) setStreak(data.streak);
    };
    fetchProfile();
  }, []);

  const totalSolved = stats.dsa + stats.aptitude + stats.mockInterview;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <PageHeader
        title="My Profile"
        description="View your personal information and overall platform statistics."
        icon={UserIcon}
        iconColor="text-blue-500"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left Column: User Identity */}
        <div className="md:col-span-1 space-y-6">
          <GlassCard delay={0.1}>
            <div className="p-8 text-center flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 p-1 mb-4 shadow-lg shadow-blue-500/20">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center border-4 border-white dark:border-slate-800">
                  {user?.name ? (
                    <span className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  ) : (
                    <UserIcon size={40} className="text-blue-500" />
                  )}
                </div>
              </div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {user?.name || "Student"}
              </h2>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-sm font-medium mb-6">
                <Shield size={14} className="text-emerald-500" />
                {user?.role === 'admin' ? 'Administrator' : 'Standard User'}
              </div>

              <div className="w-full flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50 text-left">
                <Mail size={18} className="text-slate-400 shrink-0" />
                <div className="truncate">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Email Address</p>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {user?.email || "Loading..."}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-3xl p-6 bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-xl shadow-orange-500/20 flex items-center gap-5"
          >
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
              <Flame size={32} className="text-white" />
            </div>
            <div>
              <p className="font-medium text-orange-100">Daily Streak</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-bold">{streak}</span>
                <span className="text-orange-50 font-medium">Days</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Statistics */}
        <div className="md:col-span-2 space-y-6">
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">Preparation Journey</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Total */}
            <GlassCard delay={0.3} className="sm:col-span-2">
              <div className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 font-medium mb-1">Total Activities Completed</p>
                  <p className="text-4xl font-bold text-slate-900 dark:text-white">{totalSolved}</p>
                </div>
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                  <Trophy size={32} className="text-amber-500" />
                </div>
              </div>
            </GlassCard>

            {/* DSA */}
            <GlassCard delay={0.4}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
                    <Code2 size={20} />
                  </div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300">DSA Practice</h4>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stats.dsa}</span>
                  <span className="text-slate-500 dark:text-slate-400 mb-1 font-medium text-sm">Solved</span>
                </div>
              </div>
            </GlassCard>

            {/* Aptitude */}
            <GlassCard delay={0.5}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                    <Brain size={20} />
                  </div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300">Aptitude</h4>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stats.aptitude}</span>
                  <span className="text-slate-500 dark:text-slate-400 mb-1 font-medium text-sm">Questions</span>
                </div>
              </div>
            </GlassCard>

            {/* Interview */}
            <GlassCard delay={0.6}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400">
                    <Mic size={20} />
                  </div>
                  <h4 className="font-semibold text-slate-700 dark:text-slate-300">Mock Interviews</h4>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">{stats.mockInterview}</span>
                  <span className="text-slate-500 dark:text-slate-400 mb-1 font-medium text-sm">Completed</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

      </div>
    </div>
  );
}