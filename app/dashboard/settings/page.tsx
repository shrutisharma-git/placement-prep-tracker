"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">
        Settings
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex items-center justify-between">

        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Dark Mode
          </h2>

          <p className="text-gray-500 mt-2">
            Enable or disable dark theme
          </p>
        </div>

        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className={`px-5 py-2 rounded-lg text-white transition
          ${
            theme === "dark"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-500 hover:bg-gray-600"
          }`}
        >
          {theme === "dark" ? "ON" : "OFF"}
        </button>

      </div>
    </div>
  );
}