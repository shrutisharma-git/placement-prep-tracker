"use client";
import { dsaProblems } from "@/app/data/dsaProblems";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ExternalLink, CheckCircle2, Circle, Trophy, Flame } from "lucide-react";
import { motion } from "framer-motion";
import ProgressBar from "@/components/ui/ProgressBar";
import SearchInput from "@/components/ui/SearchInput";
import GradientButton from "@/components/ui/GradientButton";
import EmptyState from "@/components/ui/EmptyState";

export default function DSATopicPage() {
  const params = useParams();
  const topic = params.topic as string;
  const problems = dsaProblems[topic] || [];

  const [solvedProblems, setSolvedProblems] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("All");

  const difficultyOrder = {
    Easy: 1,
    Medium: 2,
    Hard: 3
  };

  const filteredProblems = problems
    .filter((problem) => {
      const matchesSearch = problem.name.toLowerCase().includes(search.toLowerCase());
      const matchesDifficulty = difficultyFilter === "All" || problem.difficulty === difficultyFilter;
      return matchesSearch && matchesDifficulty;
    })
    .sort(
      (a, b) =>
        difficultyOrder[a.difficulty as keyof typeof difficultyOrder] -
        difficultyOrder[b.difficulty as keyof typeof difficultyOrder]
    );

  const solvedCount = problems.filter((problem) =>
    solvedProblems.includes(problem.name)
  ).length;

  const progressPercentage = problems.length > 0 ? (solvedCount / problems.length) * 100 : 0;
  const isTopicCompleted = solvedCount === problems.length && problems.length > 0;

  useEffect(() => {
    const fetchSolvedProblems = async () => {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setSolvedProblems(data.solvedProblems || []);
    };
    fetchSolvedProblems();
  }, []);

  const getDifficultyColor = (diff: string) => {
    if (diff === "Easy") return "text-emerald-600 bg-emerald-100 dark:bg-emerald-500/20 dark:text-emerald-400";
    if (diff === "Medium") return "text-amber-600 bg-amber-100 dark:bg-amber-500/20 dark:text-amber-400";
    if (diff === "Hard") return "text-rose-600 bg-rose-100 dark:bg-rose-500/20 dark:text-rose-400";
    return "text-slate-600 bg-slate-100 dark:bg-slate-800 dark:text-slate-400";
  };

  const getDifficultyBorder = (diff: string) => {
    if (diff === "Easy") return "border-l-emerald-500";
    if (diff === "Medium") return "border-l-amber-500";
    if (diff === "Hard") return "border-l-rose-500";
    return "border-l-slate-500";
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      
      {/* Header & Progress */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-3">
              DSA Practice
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white capitalize">
              {topic}
            </h1>
          </div>

          <div className="md:w-64">
            <ProgressBar 
              percentage={progressPercentage} 
              label="Progress"
              sublabel={`${solvedCount} / ${problems.length} Solved`}
              variant="green"
            />
          </div>
        </div>

        {/* Completion Banner */}
        {isTopicCompleted ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg shadow-orange-500/20 flex items-center gap-3"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Topic Mastered!</p>
              <p className="text-amber-50 text-sm">You've solved all problems in this topic.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 flex items-center gap-3"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Flame size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold">Keep Practicing!</p>
              <p className="text-blue-100 text-sm">Solve {problems.length - solvedCount} more problems to master this topic.</p>
            </div>
          </motion.div>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-grow">
          <SearchInput 
            value={search} 
            onChange={setSearch} 
            placeholder="Search problems..." 
          />
        </div>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-xl self-start sm:self-auto overflow-x-auto">
          {["All", "Easy", "Medium", "Hard"].map((diff) => (
            <button
              key={diff}
              onClick={() => setDifficultyFilter(diff)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap
                ${difficultyFilter === diff 
                  ? "bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm" 
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
            >
              {diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problems List */}
      <div className="space-y-4">
        {filteredProblems.length > 0 ? (
          filteredProblems.map((problem, idx) => {
            const isSolved = solvedProblems.includes(problem.name);
            
            return (
              <motion.div
                key={problem.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow border-l-4 ${getDifficultyBorder(problem.difficulty)}`}
              >
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-lg font-bold text-slate-800 dark:text-white">
                      {problem.name}
                    </h2>
                    {isSolved && (
                      <CheckCircle2 size={18} className="text-emerald-500" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      via <span className="text-amber-500 dark:text-amber-400">{problem.platform}</span>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
                  <button
                    onClick={() => window.open(problem.url, "_blank")}
                    className="px-4 py-2 rounded-xl text-sm font-semibold
                      bg-slate-100 dark:bg-slate-700
                      text-slate-700 dark:text-slate-200
                      hover:bg-slate-200 dark:hover:bg-slate-600
                      transition-colors flex items-center gap-2"
                  >
                    Solve
                    <ExternalLink size={16} />
                  </button>

                  {isSolved ? (
                    <div className="px-4 py-2 rounded-xl text-sm font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center gap-2 border border-emerald-200 dark:border-emerald-500/20">
                      <CheckCircle2 size={16} />
                      Done
                    </div>
                  ) : (
                    <GradientButton
                      variant="success"
                      onClick={async () => {
                        const res = await fetch("/api/dsa/solve", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ problemName: problem.name })
                        });
                        const data = await res.json();
                        if (data.message !== "Already solved!") {
                          setSolvedProblems((prev) => [...prev, problem.name]);
                        }
                      }}
                    >
                      <Circle size={16} />
                      Mark Done
                    </GradientButton>
                  )}
                </div>
              </motion.div>
            );
          })
        ) : (
          <EmptyState 
            message="No problems found" 
            submessage="Try adjusting your search or difficulty filter."
          />
        )}
      </div>
    </div>
  );
}
