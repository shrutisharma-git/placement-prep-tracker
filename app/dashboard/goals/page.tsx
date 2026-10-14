"use client";

import { useEffect, useState } from "react";
import { Target, CheckCircle2, Circle, Flame, Trophy, Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import ProgressBar from "@/components/ui/ProgressBar";
import GradientButton from "@/components/ui/GradientButton";

type Goal = {
  id: number;
  text: string;
  category: "DSA" | "Aptitude" | "Interview" | "General";
  completed: boolean;
};

const defaultGoals: Goal[] = [
  { id: 1, text: "Solve 2 Medium DSA problems", category: "DSA", completed: false },
  { id: 2, text: "Practice 5 Quantitative Aptitude questions", category: "Aptitude", completed: false },
  { id: 3, text: "Prepare 1 HR & 1 Technical interview answer", category: "Interview", completed: false },
  { id: 4, text: "Revise OOPs concepts (Polymorphism & Abstraction)", category: "General", completed: false },
];

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoalText, setNewGoalText] = useState("");
  const [newGoalCat, setNewGoalCat] = useState<Goal["category"]>("DSA");
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem("daily_goals");
    if (saved) {
      try {
        setGoals(JSON.parse(saved));
      } catch (e) {
        setGoals(defaultGoals);
      }
    } else {
      setGoals(defaultGoals);
    }

    fetch("/api/dashboard")
      .then((res) => res.json())
      .then((data) => {
        if (data.streak) setStreak(data.streak);
      })
      .catch(() => {});
  }, []);

  const saveGoals = (updated: Goal[]) => {
    setGoals(updated);
    localStorage.setItem("daily_goals", JSON.stringify(updated));
  };

  const toggleGoal = (id: number) => {
    const updated = goals.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g));
    saveGoals(updated);
  };

  const addGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalText.trim()) return;
    const newGoal: Goal = {
      id: Date.now(),
      text: newGoalText.trim(),
      category: newGoalCat,
      completed: false,
    };
    saveGoals([...goals, newGoal]);
    setNewGoalText("");
  };

  const deleteGoal = (id: number) => {
    saveGoals(goals.filter((g) => g.id !== id));
  };

  const completedCount = goals.filter((g) => g.completed).length;
  const progressPercent = goals.length > 0 ? (completedCount / goals.length) * 100 : 0;

  const categoryColors = {
    DSA: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 border-blue-200 dark:border-blue-500/30",
    Aptitude: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30",
    Interview: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400 border-purple-200 dark:border-purple-500/30",
    General: "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30",
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <PageHeader
        title="Daily Goals & Targets"
        description="Stay consistent with clear daily preparation objectives. Check off tasks as you accomplish them."
        icon={Target}
        iconColor="text-amber-500"
        showBackButton
      />

      {/* Progress & Streak Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard className="md:col-span-2">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">Today's Progress</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {completedCount} of {goals.length} targets completed
                </p>
              </div>
              {progressPercent === 100 && goals.length > 0 && (
                <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-sm flex items-center gap-1.5">
                  <Trophy size={16} /> All Completed!
                </div>
              )}
            </div>
            <ProgressBar
              percentage={progressPercent}
              label="Goal Completion"
              variant="blue"
            />
          </div>
        </GlassCard>

        <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-xl shadow-orange-500/20 flex items-center gap-5">
          <div className="p-4 bg-white/20 rounded-2xl">
            <Flame size={32} />
          </div>
          <div>
            <p className="text-orange-100 font-medium">Daily Streak</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold">{streak}</span>
              <span className="text-orange-100 font-semibold">Days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Goal Form */}
      <GlassCard>
        <form onSubmit={addGoal} className="p-6 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Add a new daily target (e.g. Practice 3 Trees questions)..."
            value={newGoalText}
            onChange={(e) => setNewGoalText(e.target.value)}
            className="flex-grow px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <select
            value={newGoalCat}
            onChange={(e) => setNewGoalCat(e.target.value as Goal["category"])}
            className="px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          >
            <option value="DSA">DSA</option>
            <option value="Aptitude">Aptitude</option>
            <option value="Interview">Interview</option>
            <option value="General">General</option>
          </select>
          <GradientButton type="submit">
            <Plus size={18} />
            Add Goal
          </GradientButton>
        </form>
      </GlassCard>

      {/* Goal Items List */}
      <div className="space-y-3">
        {goals.map((goal) => (
          <div
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`flex items-center justify-between p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
              goal.completed
                ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40 opacity-80"
                : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-md"
            }`}
          >
            <div className="flex items-center gap-4">
              <button
                type="button"
                className={`p-1 rounded-full transition-colors ${
                  goal.completed ? "text-emerald-500" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {goal.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </button>
              <div>
                <span
                  className={`text-base font-semibold ${
                    goal.completed
                      ? "line-through text-slate-400 dark:text-slate-500"
                      : "text-slate-800 dark:text-white"
                  }`}
                >
                  {goal.text}
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${categoryColors[goal.category]}`}
                  >
                    {goal.category}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteGoal(goal.id);
              }}
              className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors"
              title="Delete Goal"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}