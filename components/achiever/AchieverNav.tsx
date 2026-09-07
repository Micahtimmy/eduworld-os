'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo } from '@/components/global/DemoContext';

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  isWedge?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  {
    label: 'Diagnostic Tutor',
    href: '/achiever/diagnostic',
    icon: 'quiz',
    badge: 'Wedge',
    isWedge: true,
  },
  {
    label: 'Exam Dashboard',
    href: '/achiever/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Subject Mastery',
    href: '/achiever/subjects',
    icon: 'menu_book',
  },
  {
    label: 'Video & Text Lessons',
    href: '/achiever/lesson',
    icon: 'play_circle',
  },
  {
    label: 'AI Study Partner',
    href: '/achiever/ai-partner',
    icon: 'smart_toy',
  },
  {
    label: 'Leaderboard & Feed',
    href: '/achiever/leaderboard',
    icon: 'military_tech',
  },
  {
    label: 'Official Report',
    href: '/achiever/performance',
    icon: 'analytics',
  },
  {
    label: 'Elite XP Shop',
    href: '/achiever/shop',
    icon: 'redeem',
    badge: 'Rewards',
  },
];

export function AchieverNav() {
  const pathname = usePathname();
  const { currentPersona } = useDemo();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0 shadow-xs z-20">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 flex items-center justify-between">
        <Link href="/achiever/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#003f7a] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <div>
            <h1 className="font-jakarta font-black text-base text-slate-900 leading-tight">
              EduWorld
            </h1>
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#003f7a] bg-blue-100 px-2.5 py-0.5 rounded-full border border-blue-200">
              Achiever Tier
            </span>
          </div>
        </Link>
      </div>

      {/* Target Focus Callout */}
      <div className="p-4 mx-3 my-2 rounded-2xl bg-[#003f7a] text-white shadow-md relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <span className="material-symbols-outlined text-7xl">timer</span>
        </div>
        <div className="flex items-center justify-between text-xs font-semibold text-slate-200 mb-1">
          <span>JAMB / WAEC 2026</span>
          <span className="font-mono bg-white/20 px-2 py-0.5 rounded text-white font-bold">14d left</span>
        </div>
        <div className="text-sm font-jakarta font-extrabold text-white">Exam Target: 342+</div>
        <div className="w-full bg-black/30 rounded-full h-2 mt-2.5">
          <div className="bg-[#4edea3] h-2 rounded-full" style={{ width: '88.4%' }} />
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl font-jakarta text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#003f7a] text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-100 hover:text-[#003f7a]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-xl ${
                    isActive ? 'text-white' : item.isWedge ? 'text-[#006c49]' : 'text-slate-500'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white text-[#003f7a] shadow-xs'
                      : 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Quick Role Switch & User Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50">
        <Link
          href="/role-select"
          className="flex items-center justify-between text-xs font-jakarta font-bold text-[#003f7a] hover:underline mb-3"
        >
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">switch_account</span>
            Switch Role Tier
          </span>
          <span className="font-mono text-slate-500 text-[11px]">8 Roles</span>
        </Link>
        <div className="flex items-center gap-3 pt-1">
          <img
            src={currentPersona.avatar}
            alt={currentPersona.name}
            className="w-9 h-9 rounded-full object-cover border border-slate-300"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">{currentPersona.name}</p>
            <p className="text-[11px] text-slate-500 font-mono truncate">{currentPersona.roleTitle}</p>
          </div>
          <div className="flex items-center text-xs font-black text-amber-950 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
            <span>🔥 {currentPersona.metrics.streak || 14}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
