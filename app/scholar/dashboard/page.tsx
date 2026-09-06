'use client';

import React from 'react';
import Link from 'next/link';
import { ScholarNav } from '@/components/scholar/ScholarNav';

export default function ScholarDashboardPage() {
  return (
    <div className="flex min-h-screen bg-scholar-paper">
      <ScholarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-white border-b border-scholar-outline-variant flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-jakarta font-bold text-sm text-on-surface">
              Academic Command Center (Ivy League Edition)
            </h2>
            <p className="text-[11px] text-scholar-secondary font-mono">
              Harvard &amp; Oxford Research Consortium Sync • Term 2
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/scholar/research"
              className="px-3.5 py-1.5 rounded bg-scholar-primary text-white font-jakarta font-semibold text-xs hover:bg-black transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">auto_awesome</span>
              <span>Launch AI Research Node</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6 font-sans">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-scholar-secondary">
                Cumulative GPA
              </span>
              <div className="text-2xl font-jakarta font-bold text-on-surface mt-1">3.96 / 4.0</div>
              <span className="text-[11px] text-scholar-tertiary font-bold mt-1 inline-block">
                Summa Cum Laude Track
              </span>
            </div>

            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-scholar-secondary">
                Thesis Gate
              </span>
              <div className="text-2xl font-jakarta font-bold text-on-surface mt-1">Stage 3 / 4</div>
              <span className="text-[11px] text-scholar-secondary font-mono mt-1 inline-block">
                Peer Review in Progress
              </span>
            </div>

            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-scholar-secondary">
                Verified Citations
              </span>
              <div className="text-2xl font-jakarta font-bold text-on-surface mt-1">142 Citations</div>
              <span className="text-[11px] text-scholar-tertiary font-bold mt-1 inline-block">
                h-index: 6
              </span>
            </div>

            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-scholar-secondary">
                Grant Funding
              </span>
              <div className="text-2xl font-jakarta font-bold text-on-surface mt-1">$45,000</div>
              <span className="text-[11px] text-scholar-secondary font-mono mt-1 inline-block">
                Quantum Computing Initiative
              </span>
            </div>
          </div>

          {/* Research & Seminar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Thesis & Module Progress */}
            <div className="lg:col-span-8 bg-white rounded border border-scholar-outline-variant p-6 shadow-xs space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-scholar-slate">
                <h3 className="font-jakarta font-bold text-sm text-on-surface">
                  Active Dissertation: Quantum Error Correction in Topological Qubits
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold uppercase">
                  Active Draft
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded bg-scholar-paper border border-scholar-outline-variant space-y-1">
                  <div className="flex justify-between items-center font-jakarta font-bold text-on-surface">
                    <span>Chapter 4: Surface Code Thresholds Under Non-Markovian Noise</span>
                    <span className="text-scholar-tertiary font-mono">85% Complete</span>
                  </div>
                  <p className="text-scholar-secondary font-inter leading-relaxed">
                    Supervisor feedback received from Prof. H. Thorne. 3 minor equation formatting
                    modifications remaining in Appendix B.
                  </p>
                </div>

                <div className="p-3.5 rounded bg-scholar-paper border border-scholar-outline-variant space-y-1">
                  <div className="flex justify-between items-center font-jakarta font-bold text-on-surface">
                    <span>Chapter 5: Empirical Benchmarking on Ion-Trap Architectures</span>
                    <span className="text-amber-700 font-mono">Drafting</span>
                  </div>
                  <p className="text-scholar-secondary font-inter leading-relaxed">
                    Simulation data integration underway using the EduWorld Quantum Sim cluster.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href="/scholar/research"
                  className="text-xs font-jakarta font-bold text-scholar-primary hover:underline flex items-center gap-1"
                >
                  <span>Open Semantic Research Workspace</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>

            {/* Upcoming Colloquia & Seminars */}
            <div className="lg:col-span-4 bg-white rounded border border-scholar-outline-variant p-6 shadow-xs space-y-4">
              <h3 className="font-jakarta font-bold text-sm text-on-surface pb-2 border-b border-scholar-slate">
                Research Colloquia
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded bg-scholar-slate space-y-1">
                  <span className="font-mono text-[10px] text-scholar-secondary uppercase">
                    Tomorrow • 14:00 GMT
                  </span>
                  <h4 className="font-jakarta font-bold text-on-surface">
                    Advances in Fault-Tolerant Quantum Gates
                  </h4>
                  <p className="text-scholar-secondary text-[11px]">MIT &amp; Oxford Joint Seminar</p>
                </div>

                <div className="p-3 rounded bg-scholar-slate space-y-1">
                  <span className="font-mono text-[10px] text-scholar-secondary uppercase">
                    Thursday • 10:30 GMT
                  </span>
                  <h4 className="font-jakarta font-bold text-on-surface">
                    Departmental Oral Defense Rehearsal
                  </h4>
                  <p className="text-scholar-secondary text-[11px]">Room 402 / Virtual Portal</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
