'use client';

import React from 'react';
import Link from 'next/link';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';
import { useDemo } from '@/components/global/DemoContext';

export default function AchieverDashboardPage() {
  const { currentPersona } = useDemo();

  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Exam Readiness Command"
          subtitle="Secondary / Exam Prep Tier 2 • High Focus Mode"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Welcome Title */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-jakarta font-black text-2xl md:text-3xl text-slate-900">
                Welcome back, <span className="text-[#003f7a]">{currentPersona.name.split(' ')[0]}</span>
              </h2>
              <p className="text-sm text-slate-600 font-inter mt-1 font-medium">
                Your AI diagnostic readiness score is trending{' '}
                <span className="text-[#006c49] font-extrabold">up 4.2%</span> this week.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/achiever/diagnostic"
                className="px-5 py-2.5 rounded-xl bg-[#006c49] text-white font-jakarta font-extrabold text-xs hover:bg-[#005236] shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span className="material-symbols-outlined text-base">quiz</span>
                <span>Run Full Diagnostic</span>
              </Link>

              <Link
                href="/achiever/shop"
                className="px-4 py-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-950 font-jakarta font-extrabold text-xs hover:bg-amber-200 transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base text-amber-700">redeem</span>
                <span>XP Exchange</span>
              </Link>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Hero Countdown Card (8 cols) */}
            <div className="md:col-span-8 bg-white rounded-3xl border border-outline-variant p-6 md:p-8 relative overflow-hidden shadow-md group">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#003f7a]/10 rounded-full blur-2xl group-hover:bg-emerald-100 transition-all duration-500" />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5 text-[#006c49] text-xs font-black uppercase tracking-wider font-jakarta mb-1">
                      <span className="material-symbols-outlined text-base">storm</span>
                      <span>Priority Target</span>
                    </div>
                    <h3 className="font-jakarta font-black text-2xl text-slate-900">
                      JAMB UTME &amp; WAEC Senior Physics
                    </h3>
                    <p className="text-xs text-slate-500 font-inter mt-1 font-medium">
                      National Examination Window 2026 • Target: 342+
                    </p>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 text-[#003f7a]">
                    <span className="material-symbols-outlined text-3xl">functions</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-slate-200">
                  <div className="flex items-baseline gap-2">
                    <span className="font-jakarta font-black text-5xl text-slate-900 leading-none">
                      14
                    </span>
                    <span className="font-jakarta font-bold text-sm text-slate-500">Days Left</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/achiever/diagnostic"
                      className="px-6 py-3 rounded-full bg-[#003f7a] text-white font-jakarta font-extrabold text-xs hover:bg-[#1e5799] shadow-md transition-all flex items-center gap-2 active:scale-95"
                    >
                      <span>Launch CBT Mock</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Goal / Energy Ring (4 cols) */}
            <div className="md:col-span-4 bg-white rounded-3xl border border-outline-variant p-6 flex flex-col items-center justify-center relative shadow-md">
              <div className="w-full flex items-center justify-between text-xs font-black font-jakarta text-amber-950 mb-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base text-amber-700">local_fire_department</span>
                  <span>Daily Study Target</span>
                </span>
                <span className="font-mono bg-amber-100 px-2 py-0.5 rounded text-amber-950 font-bold border border-amber-300">
                  90/120 min
                </span>
              </div>

              {/* Progress Circle Visual */}
              <div className="relative w-36 h-36 my-3 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-8 border-slate-100" />
                <div className="absolute inset-0 rounded-full border-8 border-amber-500 border-t-transparent border-l-transparent rotate-45" />
                <div className="text-center">
                  <span className="font-jakarta font-black text-3xl text-slate-900">75%</span>
                  <p className="text-[10px] font-inter text-slate-500 font-bold">Streak Active</p>
                </div>
              </div>

              <p className="text-xs text-center text-slate-600 font-inter mt-1 font-medium">
                Keep it up! 30 mins remaining to hit your 14-day study streak milestone.
              </p>
            </div>

            {/* Topic Mastery Readiness (12 cols) */}
            <div className="md:col-span-12 bg-white rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-jakarta font-black text-lg text-slate-900">
                    Topic Mastery Readiness
                  </h3>
                  <p className="text-xs text-slate-600 font-inter">
                    Curriculum confidence tracked across recent diagnostic simulations
                  </p>
                </div>
                <Link
                  href="/achiever/subjects"
                  className="text-[#003f7a] font-jakarta font-extrabold text-xs flex items-center gap-1 hover:underline"
                >
                  <span>View Full Syllabus</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {/* Mastery Item 1 */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-[#003f7a] transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#003f7a] border border-blue-200">
                      <span className="material-symbols-outlined">functions</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#006c49]">92%</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-sm text-slate-900 mb-1">
                    Kinematics &amp; Motion
                  </h4>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-[#006c49] h-2 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <span className="text-[11px] font-bold text-[#006c49]">Exam Ready</span>
                </div>

                {/* Mastery Item 2 */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-[#003f7a] transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 border border-amber-200">
                      <span className="material-symbols-outlined">architecture</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-amber-800">68%</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-sm text-slate-900 mb-1">
                    Newtonian Dynamics
                  </h4>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-amber-600 h-2 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <span className="text-[11px] font-bold text-amber-900">Review Recommended</span>
                </div>

                {/* Mastery Item 3 */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 hover:border-[#003f7a] transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-950 border border-emerald-200">
                      <span className="material-symbols-outlined">science</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-[#006c49]">85%</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-sm text-slate-900 mb-1">
                    Chemical Equilibrium
                  </h4>
                  <div className="w-full bg-slate-200 rounded-full h-2 mb-2">
                    <div className="bg-[#006c49] h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-[11px] font-bold text-[#006c49]">On Track</span>
                </div>

                {/* Mastery Item 4 */}
                <Link
                  href="/achiever/subjects"
                  className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-[#003f7a] flex flex-col items-center justify-center text-center transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-slate-600 group-hover:text-[#003f7a] mb-2 border border-slate-200">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                  <span className="font-jakarta font-bold text-xs text-slate-900 group-hover:text-[#003f7a]">
                    Add Subject Module
                  </span>
                  <span className="text-[10px] text-slate-600 mt-0.5 font-medium">Bio, Calc, Gov, Lit</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
