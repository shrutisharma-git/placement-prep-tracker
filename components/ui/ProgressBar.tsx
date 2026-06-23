"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  percentage: number;
  label?: string;
  sublabel?: string;
  variant?: "blue" | "green" | "purple" | "amber";
  size?: "sm" | "md";
}

const gradients = {
  blue: "from-blue-500 to-indigo-500",
  green: "from-emerald-500 to-green-400",
  purple: "from-purple-500 to-violet-400",
  amber: "from-amber-500 to-orange-400",
};

const bgColors = {
  blue: "bg-blue-500/10",
  green: "bg-emerald-500/10",
  purple: "bg-purple-500/10",
  amber: "bg-amber-500/10",
};

export default function ProgressBar({
  percentage,
  label,
  sublabel,
  variant = "blue",
  size = "md",
}: ProgressBarProps) {
  return (
    <div>
      {(label || sublabel) && (
        <div className="flex justify-between items-center mb-2">
          {label && (
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              {label}
            </span>
          )}
          {sublabel && (
            <span className="text-sm text-slate-500 dark:text-slate-400">
              {sublabel}
            </span>
          )}
        </div>
      )}
      <div
        className={`w-full ${size === "sm" ? "h-2" : "h-3"} rounded-full ${bgColors[variant]} overflow-hidden`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${gradients[variant]} shadow-sm`}
        />
      </div>
    </div>
  );
}
