'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ParentDashboardPage() {
  const [selectedChild, setSelectedChild] = useState<'alex' | 'leo'>('alex');

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Parent Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">family_restroom</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Parent</h1>
            <span className="text-[11px] font-mono uppercase text-outline">Household Portal</span>
          </div>
        </div>

        {/* Child Selector */}
        <div className="p-4 mx-3 my-3 bg-surface-container-low rounded-2xl border border-outline-variant space-y-2">
          <span className="text-[10px] font-mono uppercase text-outline font-bold">
            Select Household Child:
          </span>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setSelectedChild('alex')}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left font-jakarta text-xs font-bold transition-all ${
                selectedChild === 'alex'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white text-primary flex items-center justify-center text-[10px] font-black">
                AO
              </div>
              <div>
                <p className="leading-tight">Alex Okafor</p>
                <p className="text-[9px] opacity-80 font-mono">Achiever (SSS 3)</p>
              </div>
            </button>

            <button
              onClick={() => setSelectedChild('leo')}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left font-jakarta text-xs font-bold transition-all ${
                selectedChild === 'leo'
                  ? 'bg-explorer-primary text-white shadow-xs'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <div className="w-6 h-6 rounded-full bg-white text-explorer-primary flex items-center justify-center text-[10px] font-black">
                LO
              </div>
              <div>
                <p className="leading-tight">Leo Okafor</p>
                <p className="text-[9px] opacity-80 font-mono">Explorer (Primary 4)</p>
              </div>
            </button>
          </div>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1">
          <div className="px-3 py-2 rounded-xl bg-primary-fixed/40 text-primary font-jakarta font-bold text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Child Academic Summary</span>
          </div>
          <div className="px-3 py-2 rounded-xl text-on-surface font-jakarta font-semibold text-xs flex items-center gap-2 hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-base text-outline">payments</span>
            <span>Fee &amp; Lab Billing Center</span>
          </div>
          <div className="px-3 py-2 rounded-xl text-on-surface font-jakarta font-semibold text-xs flex items-center gap-2 hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-base text-outline">calendar_month</span>
            <span>Attendance &amp; Health</span>
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
          <p className="text-[11px] text-outline font-inter mt-1">Mr. &amp; Mrs. Okafor</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-jakarta font-bold text-base text-on-surface">
              {selectedChild === 'alex' ? 'Alex Okafor — Achiever Tier' : 'Leo Okafor — Explorer Tier'}
            </h2>
            <p className="text-xs text-on-surface-variant font-inter">
              {selectedChild === 'alex' ? 'Corona Secondary School' : 'Corona Primary School'}
            </p>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Weekly AI Narrative Digest */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-secondary font-jakarta font-bold text-xs uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">auto_awesome</span>
              <span>EduWorld AI Weekly Parent Executive Digest</span>
            </div>

            <h3 className="font-jakarta font-extrabold text-xl text-on-surface">
              {selectedChild === 'alex'
                ? 'Alex is performing in the Top 2% nationally in Physics and Math.'
                : 'Leo unlocked 3 Space Badges and maintained a 7-day science streak.'}
            </h3>

            <p className="text-sm text-on-surface-variant font-inter leading-relaxed">
              {selectedChild === 'alex'
                ? 'Alex completed a 40-question JAMB diagnostic with a 342 projected score. We recommend encouraging him to complete the 15-minute practice set on pump efficiency to guarantee his distinction.'
                : 'Leo spent 45 minutes on Mars exploration quests this week. His reading comprehension is growing 15% ahead of national K-12 milestones.'}
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">Attendance</span>
              <div className="text-2xl font-jakarta font-extrabold text-on-surface mt-1">98.5%</div>
              <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                On Track • 0 Unexcused Absences
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">
                Term Tuition Status
              </span>
              <div className="text-2xl font-jakarta font-extrabold text-secondary mt-1">Cleared ✓</div>
              <span className="text-xs text-outline font-inter mt-1 inline-block">
                Next Invoice Due: Term 3
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">
                Study Habits Streak
              </span>
              <div className="text-2xl font-jakarta font-extrabold text-tertiary mt-1">
                {selectedChild === 'alex' ? '🔥 14 Days' : '⭐ 7 Days'}
              </div>
              <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                High Engagement
              </span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
