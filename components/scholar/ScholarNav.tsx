'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDemo } from '@/components/global/DemoContext';

export function ScholarNav() {
  const pathname = usePathname();
  const { currentPersona } = useDemo();

  const links = [
    { label: 'Academic Command', href: '/scholar/dashboard', icon: 'account_balance' },
    { label: 'AI Research Workspace', href: '/scholar/research', icon: 'biotech', badge: 'AI Lab' },
    { label: 'Modules & Labs', href: '/scholar/courses', icon: 'view_agenda' },
    { label: 'Predictive Degree Audit', href: '/scholar/degree-audit', icon: 'account_tree' },
  ];

  return (
    <aside className="w-64 bg-[#f6fafe] border-r border-[#c6c6cd] flex flex-col shrink-0 h-screen sticky top-0 font-sans z-20">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#c6c6cd] flex items-center justify-between">
        <Link href="/scholar/dashboard" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#131b2e] text-white flex items-center justify-center font-jakarta font-bold text-base shadow-xs">
            Ω
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-sm text-slate-900 leading-tight tracking-tight">
              EduWorld Scholar
            </h1>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#505f76] font-semibold">
              Ivy League Edition
            </span>
          </div>
        </Link>
      </div>

      {/* Degree Track Info */}
      <div className="p-4 mx-3 my-3 rounded bg-[#eaeef2] border border-[#c6c6cd] text-xs space-y-1.5">
        <div className="flex justify-between items-center text-[#505f76] font-mono text-[10px] uppercase">
          <span>Degree Audit</span>
          <span className="text-[#006c49] font-bold">118 / 128 Credits</span>
        </div>
        <p className="font-jakarta font-bold text-slate-900 text-xs">
          Ph.D. Quantum Informatics &amp; CS
        </p>
        <div className="w-full bg-slate-300 rounded-full h-1">
          <div className="bg-[#006c49] h-1 rounded-full" style={{ width: '92%' }} />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
        {links.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded font-jakarta text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#131b2e] text-white shadow-xs'
                  : 'text-slate-700 hover:bg-[#eaeef2] hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span
                  className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isActive
                      ? 'bg-emerald-400 text-slate-950 font-bold'
                      : 'bg-emerald-100 text-emerald-950 font-bold border border-emerald-300'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer User Info */}
      <div className="p-4 border-t border-[#c6c6cd] bg-white text-xs space-y-2">
        <Link
          href="/role-select"
          className="flex items-center justify-between font-jakarta font-bold text-[#003f7a] hover:underline text-[11px]"
        >
          <span>Switch Role Tier</span>
          <span className="material-symbols-outlined text-sm">swap_horiz</span>
        </Link>
        <div className="flex items-center gap-2.5 pt-1">
          <img
            src={currentPersona.avatar}
            alt={currentPersona.name}
            className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-slate-900 truncate">{currentPersona.name}</p>
            <p className="text-[10px] text-slate-500 font-mono truncate">{currentPersona.roleTitle}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
