"use client";

import { motion } from "framer-motion";
import { LucideIcon, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon;
  iconColor?: string;
  showBack?: boolean;
}

export default function PageHeader({
  title,
  description,
  icon: Icon,
  iconColor = "text-blue-500",
  showBack = false,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      {showBack && (
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
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
