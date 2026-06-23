"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Rocket, Menu, X, User, LogOut, Settings, BarChart3 } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/dsa", label: "DSA" },
  { href: "/dashboard/aptitude", label: "Aptitude" },
  { href: "/dashboard/interview", label: "Interview" },
  { href: "/dashboard/analytics", label: "Analytics" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check login status
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setShowDropdown(false);
  }, [pathname]);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-white/80 dark:bg-[#0B1120]/80 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b border-slate-200/50 dark:border-slate-800/50"
          : "bg-white/60 dark:bg-[#0B1120]/60 backdrop-blur-md border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-shadow duration-300">
                <Rocket size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                PrepTracker
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive(link.href)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {isLoggedIn ? (
                /* User Avatar & Dropdown */
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center
                      text-white text-sm font-bold
                      shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40
                      transition-shadow duration-300 ring-2 ring-white/20 dark:ring-slate-700/50"
                  >
                    <User size={16} />
                  </button>

                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-52 rounded-xl overflow-hidden
                      bg-white dark:bg-slate-800
                      border border-slate-200 dark:border-slate-700
                      shadow-xl shadow-black/10 dark:shadow-black/30
                      animate-slide-down z-50"
                    >
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300
                          hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <User size={16} /> Profile
                      </Link>
                      <Link
                        href="/dashboard/analytics"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300
                          hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <BarChart3 size={16} /> Analytics
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 dark:text-slate-300
                          hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Settings size={16} /> Settings
                      </Link>
                      <div className="border-t border-slate-200 dark:border-slate-700" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-red-500
                          hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                /* Login/Register */
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium rounded-lg
                      text-slate-600 dark:text-slate-300
                      hover:bg-slate-100 dark:hover:bg-slate-800
                      transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium rounded-lg
                      bg-gradient-to-r from-blue-600 to-indigo-600
                      text-white shadow-lg shadow-blue-500/25
                      hover:shadow-blue-500/40
                      transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg
                  text-slate-600 dark:text-slate-400
                  hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Gradient accent line */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)}>
          <div
            className="absolute top-16 right-0 w-72 h-[calc(100vh-4rem)]
              bg-white dark:bg-slate-900
              border-l border-slate-200 dark:border-slate-800
              shadow-2xl
              animate-slide-down overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all
                    ${isActive(link.href)
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="border-t border-slate-200 dark:border-slate-700 my-3" />

              {!isLoggedIn && (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-3 rounded-xl text-sm font-medium text-center
                      bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Click outside dropdown to close */}
      {showDropdown && (
        <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />
      )}
    </>
  );
}