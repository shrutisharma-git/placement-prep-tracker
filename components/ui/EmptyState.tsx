"use client";

import { Inbox } from "lucide-react";

interface EmptyStateProps {
  message?: string;
  submessage?: string;
}

export default function EmptyState({
  message = "Nothing here yet",
  submessage = "Start practicing to see your progress!",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/50 mb-4">
        <Inbox size={40} className="text-slate-400 dark:text-slate-500" />
      </div>
      <p className="text-lg font-medium text-slate-600 dark:text-slate-400">
        {message}
      </p>
      <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
        {submessage}
      </p>
    </div>
  );
}
