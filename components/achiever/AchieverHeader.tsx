'use client';

import React from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';
import { GlobalHeaderNotifications } from '@/components/global/GlobalHeaderNotifications';

interface AchieverHeaderProps {
  title?: string;
  subtitle?: string;
}

export function AchieverHeader({
  title = 'Achiever Exam Readiness',
  subtitle = 'JAMB / WAEC National Diagnostic Engine',
}: AchieverHeaderProps) {
  const { currentPersona } = useDemo();

  return (
    <header className="h-16 px-6 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="font-jakarta font-extrabold text-base text-slate-900 leading-tight">
            {title}
          </h2>
          <p className="text-xs text-slate-500 font-inter font-medium">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Cmd+K Search Trigger */}
        <button
          onClick={() => {
            window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }));
          }}
          className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-800 text-xs font-inter hover:border-[#003f7a] transition-all shadow-xs"
        >
          <span className="material-symbols-outlined text-base text-slate-500">search</span>
          <span className="font-semibold text-slate-700">Search syllabus, CBT mocks, tools...</span>
          <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white rounded border border-slate-300 text-slate-700 font-bold">
            ⌘K
          </kbd>
        </button>

        {/* Diagnostic Wedge Quick Launch Button */}
        <Link
          href="/achiever/diagnostic"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#006c49] text-white font-jakarta text-xs font-extrabold hover:bg-[#005236] transition-all shadow-xs active:scale-95"
        >
          <span className="material-symbols-outlined text-base">quiz</span>
          <span>Launch Diagnostic</span>
        </Link>

        {/* Streak Counter */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-100 text-amber-950 text-xs font-black font-jakarta border border-amber-300 shadow-xs">
          <span className="material-symbols-outlined text-base text-amber-700">local_fire_department</span>
          <span>{currentPersona.metrics.streak || 14}d Streak</span>
        </div>

        {/* XP Points */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-100 text-[#003f7a] text-xs font-black font-mono border border-blue-200 shadow-xs">
          <span className="material-symbols-outlined text-base">bolt</span>
          <span>{currentPersona.metrics.xp || 8420} XP</span>
        </div>

        {/* Notifications */}
        <GlobalHeaderNotifications />

        {/* Avatar link to settings */}
        <Link href="/settings" className="shrink-0">
          <img
            src={currentPersona.avatar}
            alt={currentPersona.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-300 hover:ring-2 hover:ring-[#003f7a] transition-all"
            title={`${currentPersona.name} (${currentPersona.badge})`}
          />
        </Link>
      </div>
    </header>
  );
}
