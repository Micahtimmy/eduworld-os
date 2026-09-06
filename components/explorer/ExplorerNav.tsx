'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ExplorerNav() {
  const pathname = usePathname();

  const links = [
    { label: 'Adventure Map', href: '/explorer/dashboard', icon: 'map' },
    { label: 'Space Mission', href: '/explorer/lesson', icon: 'rocket_launch' },
    { label: 'Spark AI Buddy', href: '/explorer/tutor', icon: 'auto_awesome' },
    { label: 'Star Shop', href: '/explorer/shop', icon: 'storefront' },
  ];

  return (
    <header className="h-20 px-6 bg-white border-b-4 border-explorer-outline-variant flex items-center justify-between sticky top-0 z-30 shadow-tactile">
      {/* Brand */}
      <Link href="/explorer/dashboard" className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-explorer-primary text-white flex items-center justify-center font-jakarta font-extrabold text-2xl shadow-tactile-green border-b-4 border-[#1f5100]">
          ✦
        </div>
        <div>
          <h1 className="font-jakarta font-extrabold text-xl text-on-surface leading-none">
            EduWorld
          </h1>
          <span className="text-[11px] font-jakarta font-bold uppercase tracking-wider text-explorer-primary">
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
                  ? 'bg-explorer-primary-container text-explorer-on-primary-container border-b-4 border-[#1e5000]'
                  : 'bg-explorer-surface-container text-on-surface hover:bg-explorer-surface-container/80'
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
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-100 text-red-600 font-jakarta font-extrabold text-sm border-2 border-red-200">
          <span className="material-symbols-outlined text-lg fill">favorite</span>
          <span>5</span>
        </div>

        {/* Stars */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 font-jakarta font-extrabold text-sm border-2 border-amber-200">
          <span className="material-symbols-outlined text-lg fill">star</span>
          <span>350</span>
        </div>

        {/* Streak */}
        <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-100 text-orange-600 font-jakarta font-extrabold text-sm border-2 border-orange-200">
          <span className="material-symbols-outlined text-lg fill">local_fire_department</span>
          <span>7 Days</span>
        </div>

        {/* Role Switcher */}
        <Link
          href="/role-select"
          className="ml-2 px-3 py-2 rounded-full border-2 border-explorer-outline-variant text-xs font-jakarta font-bold text-outline hover:text-primary transition-colors"
        >
          Switch Role
        </Link>
      </div>
    </header>
  );
}
