"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Code2, ArrowRight, BookOpen } from "lucide-react";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import Loader from "@/components/ui/Loader";

type Topic = {
  id: number;
  _id?: string;
  name: string;
  slug: string;
  color: string;
  problems: number;
};

export default function DsaPage() {
  const router = useRouter();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch("/api/dsa/topics");
        const data = await res.json();
        if (data.topics && data.topics.length > 0) {
          setTopics(data.topics);
        }
      } catch (err) {
        console.error("Failed to load topics", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

  if (loading) {
    return (
      <div className="p-8 max-w-7xl mx-auto min-h-[60vh] flex items-center justify-center">
        <Loader text="Loading DSA topics..." />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader
        title="DSA Preparation"
        description="Master Data Structures and Algorithms with curated topics and problems. Track your progress and crack coding interviews."
        icon={Code2}
        showBackButton
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic, idx) => (
          <GlassCard key={topic._id || topic.id} delay={idx * 0.05}>
            <div
              onClick={() => router.push(`/dashboard/dsa/${topic.slug}`)}
              className="p-6 cursor-pointer h-full flex flex-col group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl ${topic.color} shadow-lg text-white transform group-hover:scale-110 transition-transform duration-300`}>
                  <BookOpen size={24} />
                </div>

                <div className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  {topic.problems} Problems
                </div>
              </div>

              <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {topic.name}
              </h2>

              <div className="mt-auto pt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Topic {idx + 1}
                </span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  Explore <ArrowRight size={16} />
                </span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
