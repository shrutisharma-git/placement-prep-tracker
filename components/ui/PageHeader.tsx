"use client";

import { motion } from "framer-motion";
import { LucideIcon, ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  showBackButton?: boolean;
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  iconColor = "text-blue-500",
  showBackButton = false,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {showBackButton && (
        <button
          onClick={() => router.back()}
          className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      )}
      <div className="flex items-center gap-3 mb-2">
        {Icon && (
          <div className={`p-2.5 rounded-xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 dark:from-blue-500/20 dark:to-indigo-500/20 ${iconColor}`}>
            <Icon size={24} />
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-slate-500 dark:text-slate-400 text-lg mt-2 max-w-2xl">
          {description}
        </p>
      )}
    </motion.div>
  );
}
