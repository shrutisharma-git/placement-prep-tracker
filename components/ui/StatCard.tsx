"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  gradient: string;
  iconColor?: string;
  delay?: number;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  gradient,
  iconColor = "text-white",
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl p-6 ${gradient} shadow-lg transition-shadow duration-300 hover:shadow-xl`}
    >
      {/* Decorative circle */}
      <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-white/10" />
      <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-white/5" />

      <div className="relative z-10">
        <div className={`inline-flex p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-3 ${iconColor}`}>
          <Icon size={22} />
        </div>
        <p className="text-white/80 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-white mt-1">{value}</p>
      </div>
    </motion.div>
  );
}
