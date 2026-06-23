"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { BarChart3, Code2, Brain, Mic } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import GlassCard from "@/components/ui/GlassCard";

export default function AnalyticsPage() {
  const [stats, setStats] = useState({
    dsa: 0,
    aptitude: 0,
    mockInterview: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      if (data.stats) setStats(data.stats);
    };
    fetchStats();
  }, []);

  const data = [
    { name: "DSA", value: stats.dsa, color: "#3b82f6" }, // blue-500
    { name: "Aptitude", value: stats.aptitude, color: "#10b981" }, // emerald-500
    { name: "Interview", value: stats.mockInterview, color: "#a855f7" }, // purple-500
  ];

  // Dummy data representing progress over time
  const weeklyData = [
    { week: "W1", problems: 2 },
    { week: "W2", problems: 5 },
    { week: "W3", problems: 8 },
    { week: "W4", problems: 12 }
  ];

  const totalSolved = stats.dsa + stats.aptitude + stats.mockInterview;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Analytics Dashboard"
        description="Track your performance, analyze your strengths, and visualize your preparation journey."
        icon={BarChart3}
        iconColor="text-amber-500"
      />

      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={Code2}
          label="DSA Problems Solved"
          value={stats.dsa}
          gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
          delay={0.1}
        />
        <StatCard
          icon={Brain}
          label="Aptitude Questions"
          value={stats.aptitude}
          gradient="bg-gradient-to-br from-emerald-500 to-teal-600"
          delay={0.2}
        />
        <StatCard
          icon={Mic}
          label="Mock Interviews"
          value={stats.mockInterview}
          gradient="bg-gradient-to-br from-purple-500 to-violet-600"
          delay={0.3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <GlassCard delay={0.4}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
              Progress Overview
            </h2>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </GlassCard>

        {/* Pie Chart */}
        <GlassCard delay={0.5}>
          <div className="p-6">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
              Category Distribution
            </h2>
            {totalSolved === 0 ? (
              <div className="h-72 flex flex-col items-center justify-center text-slate-400">
                <BarChart3 size={48} className="mb-4 opacity-50" />
                <p>No data available yet</p>
                <p className="text-sm mt-1">Start practicing to see your distribution!</p>
              </div>
            ) : (
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={110}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="none"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}
                      itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Line Chart - Full Width */}
        <div className="lg:col-span-2">
          <GlassCard delay={0.6}>
            <div className="p-6">
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
                Weekly Activity Trend
              </h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.2} />
                    <XAxis dataKey="week" tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: '#64748b' }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="problems"
                      stroke="#3b82f6"
                      strokeWidth={4}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6, stroke: '#fff' }}
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}