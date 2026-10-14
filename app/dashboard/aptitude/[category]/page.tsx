"use client";

import { aptitudeQuestions } from "@/app/data/aptitudeQuestions";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, Trophy, Flame, Eye, EyeOff, CheckCircle2, Circle, AlertCircle, RefreshCw, Target } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import SearchInput from "@/components/ui/SearchInput";
import GradientButton from "@/components/ui/GradientButton";
import EmptyState from "@/components/ui/EmptyState";
import StatCard from "@/components/ui/StatCard";
import Loader from "@/components/ui/Loader";

export default function AptitudeCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const questions = aptitudeQuestions[category] || [];

  const [solvedQuestions, setSolvedQuestions] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswer, setShowAnswer] = useState<number[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(search.toLowerCase())
  );

  const solvedCount = questions.filter((question) =>
    solvedQuestions.includes(question.question)
  ).length;

  const progressPercentage = questions.length > 0 ? (solvedCount / questions.length) * 100 : 0;
  const isCategoryCompleted = solvedCount === questions.length && questions.length > 0;

  useEffect(() => {
    const fetchSolvedQuestions = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const data = await res.json();
        setSolvedQuestions(data.solvedQuestions || []);
      } catch (error) {
        console.error("Failed to fetch", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSolvedQuestions();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-[60vh] flex items-center justify-center">
        <Loader text="Loading aptitude practice..." />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">

      {/* Header & Progress */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-3">
              Aptitude Practice
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white capitalize">
              {category}
            </h1>
          </div>

          <div className="md:w-64">
            <ProgressBar
              percentage={progressPercentage}
              label="Progress"
              sublabel={`${solvedCount} / ${questions.length} Solved`}
              variant="green"
            />
          </div>
        </div>

        {/* Completion Banner */}
        {isCategoryCompleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/20 flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Category Mastered!</p>
              <p className="text-emerald-50 text-sm">You've solved all questions in this category.</p>
            </div>
          </motion.div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Score</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{score}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-xl">
              <RefreshCw size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Attempts</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{attempts}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl">
              <Target size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Accuracy</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-white">{accuracy}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <SearchInput
          value={search}
          onChange={setSearch}
          placeholder="Search questions..."
        />
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question, idx) => {
            const isSolved = solvedQuestions.includes(question.question);
            const isChecked = checkedAnswers.includes(question.id);
            const isCorrect = answers[question.id]?.trim().toLowerCase() === question.answer.toLowerCase();
            const isShowingAnswer = showAnswer.includes(question.id);

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-3 py-1 rounded-full">
                      Question #{question.id}
                    </span>
                    {isSolved && (
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 size={16} /> Solved
                      </span>
                    )}
                  </div>

                  {/* Question */}
                  <h2 className="text-lg sm:text-xl font-semibold text-slate-800 dark:text-white mb-6">
                    {question.question}
                  </h2>

                  {/* Answer Input Area */}
                  <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700/50 mb-6">
                    <input
                      type="text"
                      placeholder="Type your answer here..."
                      value={answers[question.id] || ""}
                      onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                      disabled={isChecked && isCorrect}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500 transition-all disabled:opacity-70"
                    />

                    {/* Check Result */}
                    {isChecked && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`mt-3 flex items-center gap-2 text-sm font-semibold p-3 rounded-lg ${isCorrect ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}
                      >
                        {isCorrect ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        {isCorrect ? "Correct Answer!" : "Incorrect Answer, try again."}
                      </motion.div>
                    )}

                    {/* Show Answer Reveal */}
                    {isShowingAnswer && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 rounded-lg"
                      >
                        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1">Correct Answer:</p>
                        <p className="text-lg font-bold text-slate-800 dark:text-white">{question.answer}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <GradientButton
                      variant="success"
                      onClick={() => {
                        setCheckedAnswers((prev) => [...prev, question.id]);
                        setAttempts((prev) => prev + 1);
                        if (answers[question.id]?.trim().toLowerCase() === question.answer.toLowerCase()) {
                          setScore((prev) => prev + 1);
                        }
                      }}
                      disabled={isChecked && isCorrect}
                    >
                      <CheckCircle2 size={18} />
                      Check Answer
                    </GradientButton>

                    <button
                      onClick={() => setShowAnswer((prev) => [...prev, question.id])}
                      disabled={isShowingAnswer}
                      className="px-4 py-2 rounded-xl text-sm font-semibold bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {isShowingAnswer ? <Eye size={18} /> : <EyeOff size={18} />}
                      {isShowingAnswer ? "Answer Revealed" : "Show Answer"}
                    </button>

                    <button
                      onClick={() => {
                        setAnswers((prev) => ({ ...prev, [question.id]: "" }));
                        setCheckedAnswers(checkedAnswers.filter((id) => id !== question.id));
                        setShowAnswer(showAnswer.filter((id) => id !== question.id));
                      }}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                      <RefreshCw size={18} />
                      Reset
                    </button>

                    <div className="flex-grow" />

                    {!isSolved && (
                      <button
                        onClick={async () => {
                          const res = await fetch("/api/aptitude/solve", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ questionName: question.question })
                          });
                          const data = await res.json();
                          if (data.message !== "Already solved!") {
                            setSolvedQuestions((prev) => [...prev, question.question]);
                          }
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-semibold border border-emerald-500 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 transition-colors flex items-center gap-2"
                      >
                        <Circle size={18} />
                        Mark Solved
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <EmptyState
            message="No questions found"
            submessage="Try adjusting your search."
          />
        )}
      </div>
    </div>
  );
}