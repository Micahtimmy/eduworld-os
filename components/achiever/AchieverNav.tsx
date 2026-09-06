'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
];

export function AchieverNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-outline-variant flex items-center justify-between">
        <Link href="/achiever/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface leading-tight">
              EduWorld
            </h1>
            <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-primary bg-primary-fixed px-2 py-0.5 rounded-full">
              Achiever Tier
            </span>
          </div>
        </Link>
      </div>

      {/* Target Focus Callout */}
      <div className="p-4 mx-3 my-2 rounded-xl bg-primary text-on-primary shadow-sm relative overflow-hidden">
        <div className="absolute -right-4 -bottom-4 opacity-10">
          <span className="material-symbols-outlined text-7xl">timer</span>
        </div>
        <div className="flex items-center justify-between text-xs font-medium text-inverse-primary mb-1">
          <span>JAMB / WAEC 2026</span>
          <span className="font-mono bg-white/20 px-1.5 py-0.5 rounded">14d left</span>
        </div>
        <div className="text-sm font-jakarta font-bold">Exam Target: 340+</div>
        <div className="w-full bg-black/20 rounded-full h-1.5 mt-2">
          <div className="bg-secondary-container h-1.5 rounded-full" style={{ width: '84%' }} />
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
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl font-jakarta text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary-container text-white shadow-sm font-semibold'
                  : 'text-on-surface hover:bg-surface-container-low hover:text-primary'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`material-symbols-outlined text-xl ${
                    isActive ? 'text-white' : item.isWedge ? 'text-secondary' : 'text-outline'
                  }`}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white text-primary'
                      : 'bg-secondary-container text-on-secondary-container'
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
      <div className="p-4 border-t border-outline-variant bg-surface-container-low/50">
        <Link
          href="/role-select"
          className="flex items-center justify-between text-xs font-jakarta font-semibold text-primary hover:underline mb-3"
        >
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-sm">switch_account</span>
            Switch Role Tier
          </span>
          <span className="font-mono text-outline">8 Roles</span>
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed font-jakarta font-bold text-sm flex items-center justify-center">
            AO
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold text-on-surface truncate">Alex Okafor</p>
            <p className="text-[11px] text-on-surface-variant font-mono">Secondary / SSS 3</p>
          </div>
          <div className="flex items-center text-xs font-bold text-tertiary">
            <span>🔥 14</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
