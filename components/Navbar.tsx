"use client";

import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="bg-cyan-600 p-5 flex justify-between items-center">
      
      <div className="font-bold text-white">Prep-Tracker</div>

      <div className="flex items-center gap-4 text-white">
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/register">Register</Link>

        {/* 👇 ADD THIS */}
        <ThemeToggle />
      </div>

    </nav>
  );
}