'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function TeacherDashboardPage() {
  const [activeTab, setActiveTab] = useState<'roster' | 'lesson-planner' | 'grading'>('roster');
  const [generatedPlan, setGeneratedPlan] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Teacher Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">draw</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Teacher</h1>
            <span className="text-[11px] font-mono uppercase text-secondary font-bold">
              Classroom Command
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <button
            onClick={() => setActiveTab('roster')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'roster'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">group</span>
            <span>Student Roster &amp; Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab('lesson-planner')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'lesson-planner'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>AI Lesson Plan Creator</span>
          </button>
          <button
            onClick={() => setActiveTab('grading')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'grading'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">rate_review</span>
            <span>Rubric Grading Workspace</span>
          </button>
        </nav>

        <div className="p-4 border-t border-outline-variant bg-surface-container-low">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-primary hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <p className="text-[11px] text-outline font-inter mt-1">Mrs. Funke Adeyemi • Physics Dept</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-jakarta font-bold text-base text-on-surface">
              Classroom Command Center
            </h2>
            <p className="text-xs text-on-surface-variant font-inter">
              Senior Secondary Class 3 (32 Enrolled Students)
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold font-jakarta">
              ✦ Real-Time Live Sync Active
            </span>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-6">
          {activeTab === 'roster' && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-surface-container">
                <h3 className="font-jakarta font-bold text-base text-on-surface">
                  Class Roster &amp; Academic Diagnostic Flags
                </h3>
                <span className="text-xs font-mono text-outline">Term 2 Week 6</span>
              </div>

              <div className="divide-y divide-surface-container">
                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-fixed text-primary font-bold flex items-center justify-center text-xs">
                      AO
                    </div>
                    <div>
                      <h4 className="font-jakarta font-bold text-sm text-on-surface">Alex Okafor</h4>
                      <p className="text-xs text-outline">Average: 92% • 14d Streak</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-800 font-jakarta font-bold text-xs">
                    Top Performer
                  </span>
                </div>

                <div className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-xs">
                      TB
                    </div>
                    <div>
                      <h4 className="font-jakarta font-bold text-sm text-on-surface">Tunde Bakare</h4>
                      <p className="text-xs text-outline">Average: 64% • Missed Work/Energy HW</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 font-jakarta font-bold text-xs">
                    Needs Review Flag
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'lesson-planner' && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
              <div className="flex items-center gap-2 text-secondary font-jakarta font-bold text-sm">
                <span className="material-symbols-outlined text-lg">auto_awesome</span>
                <span>EduWorld AI Instant Lesson Architect</span>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-bold text-on-surface font-jakarta">
                  Curriculum Topic &amp; Level:
                </label>
                <input
                  type="text"
                  defaultValue="WAEC Senior Secondary: Electromagnetic Induction & Faraday's Law"
                  className="w-full p-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-inter text-on-surface outline-none focus:border-primary"
                />

                <button
                  onClick={() => setGeneratedPlan(true)}
                  className="px-5 py-2.5 rounded-xl bg-secondary text-on-secondary font-jakarta font-bold text-xs hover:bg-secondary/90 shadow-sm transition-all"
                >
                  ✦ Generate Lesson Scaffolding &amp; In-Class Quiz
                </button>
              </div>

              {generatedPlan && (
                <div className="mt-4 p-5 rounded-xl bg-surface-container-low border border-outline-variant space-y-3 animate-in fade-in">
                  <h4 className="font-jakarta font-bold text-sm text-on-surface">
                    Scaffolded 45-Minute Lesson: Faraday&apos;s Law
                  </h4>
                  <ul className="text-xs font-inter text-on-surface-variant space-y-2 list-disc pl-5">
                    <li>
                      <strong>00:00 - 00:10 (Hook):</strong> Demonstration of moving magnet through solenoid with micro-ammeter.
                    </li>
                    <li>
                      <strong>00:10 - 00:25 (Direct Instruction):</strong> Formula derivation of induced EMF (ε = -N ΔΦ/Δt) and Lenz&apos;s Law.
                    </li>
                    <li>
                      <strong>00:25 - 00:40 (Diagnostic Pair Drill):</strong> 3-question live student polling on EduWorld Student app.
                    </li>
                    <li>
                      <strong>00:40 - 00:45 (Summary):</strong> Real-world transformer &amp; alternator applications.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          {activeTab === 'grading' && (
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
              <h3 className="font-jakarta font-bold text-base text-on-surface">
                Split-View Rubric Submission &amp; Feedback Loop
              </h3>
              <p className="text-xs text-on-surface-variant font-inter">
                3 pending student lab reports ready for grading with AI rubric suggestions.
              </p>
              <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-between">
                <div>
                  <h4 className="font-jakarta font-bold text-xs text-on-surface">
                    Alex Okafor — Projectile Motion Lab Report
                  </h4>
                  <p className="text-[11px] text-outline">Submitted 2 hours ago • PDF Verified</p>
                </div>
                <button className="px-4 py-2 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container">
                  Open Split-View Rubric
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
