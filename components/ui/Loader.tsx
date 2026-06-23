"use client";

import { motion } from "framer-motion";

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

export default function Loader({ text = "Loading...", fullScreen = false }: LoaderProps) {
  const containerClasses = fullScreen 
    ? "min-h-[60vh] w-full flex flex-col items-center justify-center"
    : "py-12 w-full flex flex-col items-center justify-center";

  return (
    <div className={containerClasses}>
      <div className="relative flex items-center justify-center w-12 h-12 mb-4">
        <motion.span
          className="absolute w-full h-full border-4 border-emerald-500/20 rounded-full"
        />
        <motion.span
          className="absolute w-full h-full border-4 border-emerald-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      {text && (
        <motion.p 
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
          className="text-sm font-semibold text-slate-500 dark:text-slate-400 tracking-wide"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
