'use client';

import React from 'react';
import Link from 'next/link';

interface AchieverHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AchieverHeader({
  title = 'Achiever Exam Readiness',
  subtitle = 'JAMB / WAEC National Diagnostic Engine',
}: AchieverHeaderProps) {
  return (
    <header className="h-16 px-6 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="font-jakarta font-bold text-base text-on-surface leading-tight">
            {title}
          </h2>
          <p className="text-xs text-on-surface-variant font-inter">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Cmd+K Search Trigger */}
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface-variant text-xs font-inter hover:border-primary transition-all"
        >
          <span className="material-symbols-outlined text-base text-outline">search</span>
          <span>Search syllabus, mock exams, tools...</span>
          <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white rounded border border-outline-variant text-outline">
            ⌘K
          </kbd>
        </button>

        {/* Diagnostic Wedge Quick Launch Button */}
        <Link
          href="/achiever/diagnostic"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-secondary text-on-secondary font-jakarta text-xs font-semibold hover:bg-secondary/90 transition-all shadow-sm"
        >
          <span className="material-symbols-outlined text-base">quiz</span>
          <span>Launch Diagnostic</span>
        </Link>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold font-jakarta">
          <span className="material-symbols-outlined text-base text-tertiary">local_fire_department</span>
          <span>14d Streak</span>
        </div>

        {/* XP Points */}
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-primary-fixed text-on-primary-fixed text-xs font-bold font-mono">
          <span className="material-symbols-outlined text-base">bolt</span>
          <span>2,450 XP</span>
        </div>
      </div>
    </header>
  );
}
