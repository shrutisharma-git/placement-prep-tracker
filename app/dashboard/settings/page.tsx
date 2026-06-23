"use client";

import { useState } from "react";
import { Settings, Bell, Shield, User, Palette, Save, Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import PageHeader from "@/components/ui/PageHeader";
import GlassCard from "@/components/ui/GlassCard";
import GradientButton from "@/components/ui/GradientButton";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    updates: true,
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <PageHeader
        title="Settings"
        description="Manage your account preferences, appearance, and notifications."
        icon={Settings}
        iconColor="text-slate-500 dark:text-slate-400"
        showBack
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Settings Navigation (Desktop only) */}
        <div className="hidden md:block col-span-1 space-y-2">
          {[
            { id: "profile", icon: User, label: "Profile" },
            { id: "appearance", icon: Palette, label: "Appearance" },
            { id: "notifications", icon: Bell, label: "Notifications" },
            { id: "security", icon: Shield, label: "Security" },
          ].map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors
                ${item.id === "appearance" 
                  ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400" 
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-8">
          
          {/* Appearance Section */}
          <GlassCard hover={false}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                  <Palette size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Appearance</h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">Theme Preference</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Light Theme */}
                    <button
                      onClick={() => setTheme("light")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all
                        ${theme === "light" 
                          ? "border-blue-500 bg-blue-50 dark:bg-transparent" 
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-amber-500">
                        <Sun size={24} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Light</span>
                    </button>
                    
                    {/* Dark Theme */}
                    <button
                      onClick={() => setTheme("dark")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all
                        ${theme === "dark" 
                          ? "border-blue-500 bg-slate-800" 
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-blue-400">
                        <Moon size={24} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">Dark</span>
                    </button>
                    
                    {/* System Theme */}
                    <button
                      onClick={() => setTheme("system")}
                      className={`flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all
                        ${theme === "system" 
                          ? "border-blue-500 bg-slate-50 dark:bg-slate-800/50" 
                          : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                        }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
                        <Monitor size={24} />
                      </div>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">System</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Notifications Section */}
          <GlassCard hover={false}>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Bell size={20} />
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">Notifications</h2>
              </div>
              
              <div className="space-y-4">
                {[
                  { id: 'email', label: 'Email Notifications', desc: 'Receive practice reminders via email' },
                  { id: 'push', label: 'Push Notifications', desc: 'Receive notifications in your browser' },
                  { id: 'updates', label: 'Product Updates', desc: 'News about new features and content' },
                ].map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-white">{item.label}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={notifications[item.id as keyof typeof notifications]}
                        onChange={(e) => setNotifications({...notifications, [item.id]: e.target.checked})}
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Action Footer */}
          <div className="flex justify-end pt-4">
            <GradientButton>
              <Save size={18} />
              Save Preferences
            </GradientButton>
          </div>

        </div>
      </div>
    </div>
  );
}