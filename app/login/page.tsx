"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Rocket, Code2, Brain, Mic, AlertCircle, CheckCircle2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data);

      if (!data.success) {
        setError(data.message);
      } else {
        setSuccess(data.message);
        localStorage.setItem("user", JSON.stringify(data.user));
        router.push("/dashboard");
      }
    } catch (e) {
      setError("Something went wrong:");
      console.log(e);
    } finally {
      console.log(error);
      console.log(success);
      setLoading(false);
    }
  };

  const features = [
    { icon: Code2, title: "DSA Practice", desc: "450+ curated problems" },
    { icon: Brain, title: "Aptitude Tests", desc: "Quantitative & Logical" },
    { icon: Mic, title: "Mock Interviews", desc: "Technical & HR prep" },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Left Panel — Educational & Premium */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden
        bg-slate-50 dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        
        {/* Soft background pattern (Notion/Linear inspired) */}
        <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)",
            backgroundSize: "32px 32px"
          }}
        />

        {/* Subtle floating blobs (Emerald/Teal/Sky) */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-400/10 dark:bg-emerald-500/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-teal-400/10 dark:bg-teal-500/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] left-[20%] w-[300px] h-[300px] bg-sky-400/10 dark:bg-sky-500/10 rounded-full blur-[80px] animate-float" style={{ animationDelay: "4s" }} />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-slate-200/60 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-8 shadow-sm">
              <Rocket size={14} className="text-emerald-500" />
              <span>Career Preparation Platform</span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
              Master the skills that <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400">
                top tech companies
              </span> demand.
            </h1>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-12 max-w-md leading-relaxed">
              A structured, comprehensive platform designed to help you practice algorithms, ace aptitude tests, and conquer technical interviews.
            </p>

            {/* Feature cards (Glassmorphism & Soft Shadows) */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1, ease: "easeOut" }}
                  className="flex items-center gap-5 p-4 rounded-2xl bg-white/60 dark:bg-slate-800/40 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] max-w-sm hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <feature.icon size={20} className="text-slate-700 dark:text-slate-300" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{feature.title}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Panel — Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8
        bg-slate-50 dark:bg-[#0B1120]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          {/* Logo for mobile */}
          <div className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="p-2 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20">
              <Rocket size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PrepTracker</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome back
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            Sign in to continue your preparation journey
          </p>

          {/* Error Alert */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm mb-6"
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          {/* Success Alert */}
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-sm mb-6"
            >
              <CheckCircle2 size={18} />
              {success}
            </motion.div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  className="w-full pl-11 pr-4 py-3 rounded-xl
                    border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800/80
                    text-slate-900 dark:text-white
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                    transition-all duration-300"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  className="w-full pl-11 pr-12 py-3 rounded-xl
                    border border-slate-200 dark:border-slate-700
                    bg-white dark:bg-slate-800/80
                    text-slate-900 dark:text-white
                    placeholder:text-slate-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500
                    transition-all duration-300"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 dark:border-slate-600
                    text-blue-600 focus:ring-blue-500/40
                    bg-white dark:bg-slate-800"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400">Remember me</span>
              </label>
              <span className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                Forgot password?
              </span>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-blue-600 to-indigo-600
                hover:from-blue-500 hover:to-indigo-500
                shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40
                transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]
                disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              )}
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Create account
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}