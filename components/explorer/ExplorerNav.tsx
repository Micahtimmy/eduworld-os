'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo } from '@/components/global/DemoContext';

export function ExplorerNav() {
  const pathname = usePathname();
  const { currentPersona } = useDemo();

  const links = [
    { label: 'Adventure Map', href: '/explorer/dashboard', icon: 'map' },
    { label: 'Space Mission', href: '/explorer/lesson', icon: 'rocket_launch' },
    { label: 'Spark AI Buddy', href: '/explorer/tutor', icon: 'smart_toy' },
    { label: 'Daily Quests', href: '/explorer/quests', icon: 'workspace_premium' },
    { label: 'Star Shop', href: '/explorer/shop', icon: 'storefront' },
  ];

  return (
    <header className="h-20 px-6 bg-white border-b-4 border-[#becbb1] flex items-center justify-between sticky top-0 z-30 shadow-md">
      {/* Brand */}
      <Link href="/explorer/dashboard" className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-[#2b6c00] text-white flex items-center justify-center font-jakarta font-extrabold text-2xl shadow-md border-b-4 border-[#1f5100]">
          ✦
        </div>
        <div>
          <h1 className="font-jakarta font-extrabold text-xl text-slate-900 leading-none">
            EduWorld
          </h1>
          <span className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-[#2b6c00]">
            Explorer Tier (K-12)
          </span>
        </div>
      </Link>

      {/* Navigation Pills */}
      <nav className="flex items-center gap-2">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-jakarta font-bold text-sm transition-all tactile-btn ${
                isActive
                  ? 'bg-[#58cc02] text-[#1e5000] border-b-4 border-[#1e5000] shadow-sm font-extrabold'
                  : 'bg-[#efeded] text-slate-800 hover:bg-[#e2e0e0]'
              }`}
            >
              <span className="material-symbols-outlined text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Gamification Stats */}
      <div className="flex items-center gap-3">
        {/* Hearts */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 text-red-950 font-jakarta font-extrabold text-sm border-2 border-red-300 shadow-xs">
          <span className="material-symbols-outlined text-lg text-red-600">favorite</span>
          <span>5</span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 text-amber-950 font-jakarta font-extrabold text-sm border-2 border-amber-300 shadow-xs">
          <span className="material-symbols-outlined text-lg text-amber-600">star</span>
          <span>{currentPersona.metrics.stars || 2850}</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 text-orange-950 font-jakarta font-extrabold text-sm border-2 border-orange-300 shadow-xs">
          <span className="material-symbols-outlined text-lg text-orange-600">local_fire_department</span>
          <span>{currentPersona.metrics.streak || 7}d</span>
        </div>

        {/* Role Switcher */}
        <Link
          href="/role-select"
          className="ml-2 px-3.5 py-1.5 rounded-full border-2 border-[#becbb1] text-xs font-jakarta font-bold text-slate-800 hover:text-[#003f7a] hover:border-[#003f7a] transition-all bg-white"
        >
          Switch Role
        </Link>
      </div>
    </header>
  );
}
