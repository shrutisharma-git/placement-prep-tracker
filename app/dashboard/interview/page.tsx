"use client";

import { interviewCategories } from "@/app/data/interviewCategories";
import { useRouter } from "next/navigation";
import { Mic, ArrowRight, MessageSquare } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";

export default function InterviewPage() {
  const router = useRouter();

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="Interview Preparation"
        description="Master technical concepts and HR questions to confidently clear your interviews."
        icon={Mic}
        iconColor="text-purple-500"
      />

      {/* categories grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {interviewCategories.map((category, idx) => (
          <GlassCard key={category.id} delay={idx * 0.05}>
            <div
              onClick={() => router.push(`/dashboard/interview/${category.name.toLowerCase()}`)}
              className="p-6 cursor-pointer h-full flex flex-col group"
            >
              <div className="flex items-start justify-between mb-4">
                {/* Color badge */}
                <div className={`p-3 rounded-xl ${category.color} shadow-lg text-white transform group-hover:scale-110 transition-transform duration-300`}>
                  <MessageSquare size={24} />
                </div>
                
                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {category.questions} Questions
                </div>
              </div>

              {/* Category Name */}
              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors uppercase">
                {category.name}
              </h2>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Category {category.id}
                </span>
                <span className="text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  Practice <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}