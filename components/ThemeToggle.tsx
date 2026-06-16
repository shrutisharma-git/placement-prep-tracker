"use client";

import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 
      ${theme === "dark" ? "bg-gray-700" : "bg-gray-300"}`}
    >
      {/* Toggle Circle */}
      <div
        className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform duration-300 flex items-center justify-center
        ${theme === "dark" ? "translate-x-6" : "translate-x-0"}`}
      >
        {/* Icon */}
        {theme === "dark" ? "🌙" : "☀️"}
      </div>
    </button>
  );
}