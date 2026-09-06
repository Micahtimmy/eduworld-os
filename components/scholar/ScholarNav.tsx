'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ScholarNav() {
  const pathname = usePathname();

  const links = [
    { label: 'Academic Command', href: '/scholar/dashboard', icon: 'account_balance' },
    { label: 'AI Research Workspace', href: '/scholar/research', icon: 'biotech', badge: 'AI Lab' },
    { label: 'Course Modules', href: '/scholar/courses', icon: 'view_agenda' },
  ];

  return (
    <aside className="w-64 bg-scholar-paper border-r border-scholar-outline-variant flex flex-col shrink-0 h-screen sticky top-0 font-sans">
      {/* Brand Header */}
      <div className="p-5 border-b border-scholar-outline-variant flex items-center justify-between">
        <Link href="/scholar/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-scholar-primary text-white flex items-center justify-center font-jakarta font-bold text-base shadow-xs">
            Ω
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-sm text-on-surface leading-tight tracking-tight">
              EduWorld Scholar
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-widest text-scholar-secondary">
              Ivy League Edition
            </span>
          </div>
        </Link>
      </div>

      {/* Degree Track Info */}
      <div className="p-4 mx-3 my-3 rounded bg-scholar-slate border border-scholar-outline-variant text-xs space-y-1.5">
        <div className="flex justify-between items-center text-scholar-secondary font-mono text-[10px] uppercase">
          <span>Degree Audit</span>
          <span className="text-scholar-tertiary font-bold">114 / 128 Credits</span>
        </div>
        <p className="font-jakarta font-bold text-on-surface text-xs">
          B.Sc. Theoretical Physics &amp; CS
        </p>
        <div className="w-full bg-slate-300 rounded-full h-1">
          <div className="bg-scholar-tertiary h-1 rounded-full" style={{ width: '89%' }} />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-1">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded font-jakarta text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-scholar-primary text-white shadow-xs'
                  : 'text-scholar-secondary hover:bg-scholar-slate hover:text-on-surface'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer User Info */}
      <div className="p-4 border-t border-scholar-outline-variant bg-white text-xs space-y-2">
        <Link
          href="/role-select"
          className="flex items-center justify-between font-jakarta font-bold text-scholar-primary hover:underline text-[11px]"
        >
          <span>Switch Role Tier</span>
          <span className="material-symbols-outlined text-sm">swap_horiz</span>
        </Link>
        <div className="flex items-center gap-2.5 pt-1">
          <div className="w-8 h-8 rounded bg-scholar-slate text-scholar-primary font-bold flex items-center justify-center text-xs border border-scholar-outline-variant">
            EA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-on-surface truncate">Dr. Emeka Adeleke</p>
            <p className="text-[10px] text-scholar-secondary font-mono">Senior Research Fellow</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
