"use client";

import { interviewQuestions } from "@/app/data/interviewQuestions";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mic, Trophy, Eye, EyeOff, CheckCircle2, Circle, AlertCircle, RefreshCw, MessageSquare } from "lucide-react";
import ProgressBar from "@/components/ui/ProgressBar";
import SearchInput from "@/components/ui/SearchInput";
import GradientButton from "@/components/ui/GradientButton";
import EmptyState from "@/components/ui/EmptyState";

export default function InterviewCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const questions = interviewQuestions[category] || [];

  const [search, setSearch] = useState("");
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showAnswer, setShowAnswer] = useState<number[]>([]);
  const [checkedAnswers, setCheckedAnswers] = useState<number[]>([]);
  const [solvedQuestions, setSolvedQuestions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const filteredQuestions = questions.filter((question) =>
    question.question.toLowerCase().includes(search.toLowerCase())
  );

  const solvedCount = questions.filter((question) =>
    solvedQuestions.includes(question.question)
  ).length;

  const progressPercentage = questions.length > 0 ? (solvedCount / questions.length) * 100 : 0;
  const accuracy = attempts > 0 ? Math.round((score / attempts) * 100) : 0;
  const isCategoryCompleted = solvedCount === questions.length && questions.length > 0;

  useEffect(() => {
    const fetchSolvedQuestions = async () => {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      setSolvedQuestions(data.solvedInterviewQuestions || []);
    };
    fetchSolvedQuestions();
  }, []);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      
      {/* Header & Progress */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-sm font-semibold mb-3">
              <Mic size={14} />
              Interview Prep
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white uppercase">
              {category}
            </h1>
          </div>

          <div className="md:w-64">
            <ProgressBar 
              percentage={progressPercentage} 
              label="Progress"
              sublabel={`${solvedCount} / ${questions.length} Solved`}
              variant="purple"
            />
          </div>
        </div>

        {/* Completion Banner */}
        {isCategoryCompleted && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg shadow-purple-500/20 flex items-center gap-3 mb-6"
          >
            <div className="p-2 bg-white/20 rounded-xl">
              <Trophy size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-lg">Category Mastered!</p>
              <p className="text-purple-100 text-sm">You've covered all questions in this category.</p>
            </div>
          </motion.div>
        )}

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl">
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
            <div className="p-3 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl">
              <MessageSquare size={24} />
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
          placeholder="Search interview questions..." 
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
                    <span className="text-sm font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 px-3 py-1 rounded-full uppercase">
                      Q{question.id} • {category}
                    </span>
                    {isSolved && (
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
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
                    <textarea
                      rows={3}
                      placeholder="Type your answer here..."
                      value={answers[question.id] || ""}
                      onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                      disabled={isChecked && isCorrect}
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500/40 focus:border-purple-500 transition-all disabled:opacity-70 resize-none"
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
                        className="mt-3 p-4 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 rounded-lg"
                      >
                        <p className="text-sm font-semibold text-purple-600 dark:text-purple-400 mb-1">Expected Answer Concept:</p>
                        <p className="text-lg font-bold text-slate-800 dark:text-white">{question.answer}</p>
                      </motion.div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-3">
                    <GradientButton
                      variant="purple"
                      onClick={() => {
                        if (checkedAnswers.includes(question.id)) return;
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
                          const res = await fetch("/api/interview/solve", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ questionName: question.question })
                          });
                          const data = await res.json();
                          if (data.message !== "Already solved!") {
                            setSolvedQuestions((prev) => [...prev, question.question]);
                          }
                        }}
                        className="px-4 py-2 rounded-xl text-sm font-semibold border border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors flex items-center gap-2"
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