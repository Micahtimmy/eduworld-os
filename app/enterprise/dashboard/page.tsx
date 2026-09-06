'use client';

import React from 'react';
import Link from 'next/link';

export default function EnterpriseDashboardPage() {
  return (
    <div className="flex min-h-screen bg-surface">
      {/* Enterprise Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">trending_up</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Enterprise</h1>
            <span className="text-[11px] font-mono uppercase text-secondary font-bold">
              Workforce ROI OS
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="px-3 py-2 rounded-xl bg-primary-container text-white font-jakarta font-bold text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base">pie_chart</span>
            <span>Workforce ROI Dashboard</span>
          </div>
          <div className="px-3 py-2 rounded-xl text-on-surface font-jakarta font-semibold text-xs flex items-center gap-2 hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-base text-outline">hub</span>
            <span>Skills Gap Matrix</span>
          </div>
          <div className="px-3 py-2 rounded-xl text-on-surface font-jakarta font-semibold text-xs flex items-center gap-2 hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-base text-outline">tune</span>
            <span>Custom Learning Paths</span>
          </div>
        </nav>

        <div className="p-4 border-t border-outline-variant bg-surface-container-low">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-primary hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <p className="text-[11px] text-outline font-inter mt-1">Interswitch Group Corporate L&amp;D</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-jakarta font-bold text-base text-on-surface">
              Corporate Workforce Training &amp; ROI Analytics
            </h2>
            <p className="text-xs text-on-surface-variant font-inter">
              Enterprise Experience 8 • 450 Active Engineers Enrolled
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-jakarta font-bold text-xs">
            ✦ ROI Multiplier: 3.4x
          </span>
        </header>

        <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* KPI Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">
                Quarterly Program Completion
              </span>
              <div className="text-3xl font-jakarta font-extrabold text-on-surface mt-1">87.4%</div>
              <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                +12% vs Industry Standard
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">
                Critical Skills Covered
              </span>
              <div className="text-3xl font-jakarta font-extrabold text-primary mt-1">
                24 Modules
              </div>
              <span className="text-xs text-outline font-inter mt-1 inline-block">
                Cloud Architecture, Rust, Security
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">
                Estimated Productivity Gain
              </span>
              <div className="text-3xl font-jakarta font-extrabold text-secondary mt-1">
                $180,000 / yr
              </div>
              <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                Verified via Engineering Velocity Metrics
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
