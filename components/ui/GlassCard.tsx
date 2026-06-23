"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  gradientBorder?: boolean;
  delay?: number;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  gradientBorder = false,
  delay = 0,
}: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={`relative rounded-3xl overflow-hidden ${className}`}
    >
      {gradientBorder && (
        <div className="absolute inset-0 rounded-3xl p-[1px] bg-gradient-to-br from-blue-500/30 via-indigo-500/20 to-cyan-500/30 pointer-events-none" />
      )}
      <div
        className={`relative h-full rounded-3xl
        bg-white/80 dark:bg-slate-800/60
        backdrop-blur-xl
        border border-white/20 dark:border-slate-700/50
        shadow-lg shadow-black/5 dark:shadow-black/20
        transition-shadow duration-300
        ${hover ? "hover:shadow-xl hover:shadow-blue-500/5 dark:hover:shadow-blue-500/10" : ""}
        `}
      >
        {children}
      </div>
    </motion.div>
  );
}
