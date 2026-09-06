'use client';

import React from 'react';
import Link from 'next/link';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';

export default function AchieverDashboardPage() {
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
              <h2 className="font-jakarta font-extrabold text-2xl md:text-3xl text-on-surface">
                Welcome back, <span className="text-primary">Alex</span>
              </h2>
              <p className="text-sm text-on-surface-variant font-inter mt-1">
                Your AI diagnostic readiness score is trending{' '}
                <span className="text-secondary font-bold">up 4%</span> this week.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/achiever/diagnostic"
                className="px-4 py-2 rounded-xl bg-secondary text-on-secondary font-jakarta font-bold text-xs hover:bg-secondary/90 shadow-sm transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-base">quiz</span>
                <span>Run Full Diagnostic</span>
              </Link>
            </div>
          </div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Hero Countdown Card (8 cols) */}
            <div className="md:col-span-8 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 md:p-8 relative overflow-hidden shadow-md group">
              <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/10 rounded-full blur-2xl group-hover:bg-secondary-container/20 transition-all duration-500" />

              <div className="relative z-10 flex flex-col h-full justify-between space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-1.5 text-secondary text-xs font-bold uppercase tracking-wider font-jakarta mb-1">
                      <span className="material-symbols-outlined text-base">storm</span>
                      <span>Priority Target</span>
                    </div>
                    <h3 className="font-jakarta font-extrabold text-2xl text-on-surface">
                      JAMB UTME & WAEC Senior Physics
                    </h3>
                    <p className="text-xs text-on-surface-variant font-inter mt-1">
                      National Examination Window 2026
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant text-primary">
                    <span className="material-symbols-outlined text-3xl">functions</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-end justify-between gap-4 pt-4 border-t border-surface-container">
                  <div className="flex items-baseline gap-2">
                    <span className="font-jakarta font-black text-5xl text-on-surface leading-none">
                      14
                    </span>
                    <span className="font-jakarta font-semibold text-sm text-outline">Days Left</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href="/achiever/diagnostic"
                      className="px-5 py-2.5 rounded-full bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <span>Launch CBT Mock</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Daily Goal / Energy Ring (4 cols) */}
            <div className="md:col-span-4 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 flex flex-col items-center justify-center relative shadow-md">
              <div className="w-full flex items-center justify-between text-xs font-bold font-jakarta text-tertiary mb-2">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-base">local_fire_department</span>
                  <span>Daily Study Target</span>
                </span>
                <span className="font-mono">90/120 min</span>
              </div>

              {/* Progress Circle Visual */}
              <div className="relative w-36 h-36 my-2 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-8 border-surface-container-high" />
                <div className="absolute inset-0 rounded-full border-8 border-tertiary border-t-transparent border-l-transparent rotate-45" />
                <div className="text-center">
                  <span className="font-jakarta font-black text-3xl text-on-surface">75%</span>
                  <p className="text-[10px] font-inter text-outline">Streak Active</p>
                </div>
              </div>

              <p className="text-xs text-center text-on-surface-variant font-inter mt-1">
                Keep it up! 30 mins remaining to hit your 14-day study streak milestone.
              </p>
            </div>

            {/* Topic Mastery Readiness (12 cols) */}
            <div className="md:col-span-12 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-jakarta font-bold text-lg text-on-surface">
                    Topic Mastery Readiness
                  </h3>
                  <p className="text-xs text-on-surface-variant font-inter">
                    Curriculum confidence tracked across recent diagnostic simulations
                  </p>
                </div>
                <Link
                  href="/achiever/subjects"
                  className="text-primary font-jakarta font-bold text-xs flex items-center gap-1 hover:underline"
                >
                  <span>View Full Syllabus</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {/* Mastery Item 1 */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 hover:border-primary transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">functions</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-secondary">92%</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-sm text-on-surface mb-1">
                    Kinematics & Motion
                  </h4>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: '92%' }} />
                  </div>
                  <span className="text-[11px] font-semibold text-secondary">Exam Ready</span>
                </div>

                {/* Mastery Item 2 */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 hover:border-primary transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">architecture</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-tertiary">68%</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-sm text-on-surface mb-1">
                    Newtonian Dynamics
                  </h4>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2">
                    <div className="bg-tertiary h-1.5 rounded-full" style={{ width: '68%' }} />
                  </div>
                  <span className="text-[11px] font-semibold text-tertiary">Review Recommended</span>
                </div>

                {/* Mastery Item 3 */}
                <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/60 hover:border-primary transition-all">
                  <div className="flex justify-between items-start mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">science</span>
                    </div>
                    <span className="font-mono font-bold text-xs text-secondary">85%</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-sm text-on-surface mb-1">
                    Chemical Equilibrium
                  </h4>
                  <div className="w-full bg-surface-container-highest rounded-full h-1.5 mb-2">
                    <div className="bg-secondary h-1.5 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <span className="text-[11px] font-semibold text-secondary">On Track</span>
                </div>

                {/* Mastery Item 4 */}
                <Link
                  href="/achiever/subjects"
                  className="bg-surface-container-low p-4 rounded-xl border border-dashed border-outline-variant hover:border-primary flex flex-col items-center justify-center text-center transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline group-hover:text-primary mb-2">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                  <span className="font-jakarta font-bold text-xs text-on-surface group-hover:text-primary">
                    Add Subject Module
                  </span>
                  <span className="text-[10px] text-outline mt-0.5">Bio, Calc, Gov, Lit</span>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
