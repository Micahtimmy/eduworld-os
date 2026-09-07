'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScholarNav } from '@/components/scholar/ScholarNav';
import { useDemo } from '@/components/global/DemoContext';
import { GlobalHeaderNotifications } from '@/components/global/GlobalHeaderNotifications';

export default function ScholarDashboardPage() {
  const { currentPersona, showToast, addNotification } = useDemo();
  const [colloquiaRsvp, setColloquiaRsvp] = useState<Record<string, boolean>>({});

  const handleToggleRsvp = (id: string, title: string) => {
    setColloquiaRsvp((prev) => {
      const next = !prev[id];
      if (next) {
        showToast(`RSVP confirmed for "${title}"! Calendar invite dispatched.`);
        addNotification('Colloquium RSVP Confirmed', `Added ${title} to your academic research schedule.`, 'academic');
      } else {
        showToast(`RSVP cancelled for "${title}".`);
      }
      return { ...prev, [id]: next };
    });
  };

  return (
    <div className="flex min-h-screen bg-scholar-paper font-sans">
      <ScholarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 md:px-8 bg-white border-b border-scholar-outline-variant flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-sm text-slate-900">
              Academic Command Center (Ivy League Edition)
            </h2>
            <p className="text-[11px] text-[#505f76] font-mono">
              {currentPersona.institution} • Term 2 Research Sync
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/scholar/research"
              className="px-3.5 py-1.5 rounded bg-[#131b2e] text-white font-jakarta font-semibold text-xs hover:bg-black transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-outlined text-sm text-[#6ffbbe]">auto_awesome</span>
              <span>Launch AI Research Node</span>
            </Link>

            <GlobalHeaderNotifications />

            <Link href="/settings" className="shrink-0">
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#505f76] font-semibold">
                Cumulative GPA
              </span>
              <div className="text-2xl font-jakarta font-bold text-slate-900 mt-1">3.94 / 4.0</div>
              <span className="text-[11px] text-[#006c49] font-bold mt-1 inline-block">
                Summa Cum Laude Track
              </span>
            </div>

            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#505f76] font-semibold">
                Thesis Gate
              </span>
              <div className="text-2xl font-jakarta font-bold text-slate-900 mt-1">Stage 3 / 4</div>
              <span className="text-[11px] text-[#505f76] font-mono mt-1 inline-block">
                Peer Review in Progress
              </span>
            </div>

            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#505f76] font-semibold">
                Verified Citations
              </span>
              <div className="text-2xl font-jakarta font-bold text-slate-900 mt-1">428 Citations</div>
              <span className="text-[11px] text-[#006c49] font-bold mt-1 inline-block">
                h-index: 12
              </span>
            </div>

            <div className="bg-white rounded p-5 border border-scholar-outline-variant shadow-xs">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#505f76] font-semibold">
                Active Research Grant
              </span>
              <div className="text-2xl font-jakarta font-bold text-slate-900 mt-1">$45,000</div>
              <span className="text-[11px] text-[#505f76] font-mono mt-1 inline-block">
                Quantum Computing Consortium
              </span>
            </div>
          </div>

          {/* Research & Seminar Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Thesis & Module Progress */}
            <div className="lg:col-span-8 bg-white rounded border border-scholar-outline-variant p-6 shadow-xs space-y-5">
              <div className="flex justify-between items-center pb-3 border-b border-[#eaeef2]">
                <h3 className="font-jakarta font-bold text-sm text-slate-900">
                  Active Dissertation: Quantum Error Correction in Topological Qubits
                </h3>
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-950 text-[10px] font-mono font-bold uppercase border border-emerald-300">
                  Active Draft
                </span>
              </div>

              <div className="space-y-3 text-xs font-sans">
                <div className="p-4 rounded bg-[#f6fafe] border border-scholar-outline-variant space-y-1">
                  <div className="flex justify-between items-center font-jakarta font-bold text-slate-900">
                    <span>Chapter 4: Surface Code Thresholds Under Non-Markovian Noise</span>
                    <span className="text-[#006c49] font-mono">85% Complete</span>
                  </div>
                  <p className="text-[#505f76] font-inter leading-relaxed mt-1">
                    Supervisor feedback received from Prof. H. Thorne. 3 minor equation formatting modifications remaining in Appendix B.
                  </p>
                </div>

                <div className="p-4 rounded bg-[#f6fafe] border border-scholar-outline-variant space-y-1">
                  <div className="flex justify-between items-center font-jakarta font-bold text-slate-900">
                    <span>Chapter 5: Empirical Benchmarking on Ion-Trap Architectures</span>
                    <span className="text-amber-700 font-mono">Drafting</span>
                  </div>
                  <p className="text-[#505f76] font-inter leading-relaxed mt-1">
                    Simulation data integration underway using the EduWorld Quantum Sim cluster.
                  </p>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <Link
                  href="/scholar/research"
                  className="text-xs font-jakarta font-bold text-[#003f7a] hover:underline flex items-center gap-1"
                >
                  <span>Open Semantic Research Workspace</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
                <Link
                  href="/scholar/degree-audit"
                  className="text-xs font-jakarta font-bold text-slate-700 hover:underline"
                >
                  View Degree Audit (118/128 Credits) →
                </Link>
              </div>
            </div>

            {/* Upcoming Colloquia & Seminars */}
            <div className="lg:col-span-4 bg-white rounded border border-scholar-outline-variant p-6 shadow-xs space-y-4">
              <h3 className="font-jakarta font-bold text-sm text-slate-900 pb-2 border-b border-[#eaeef2]">
                Research Colloquia &amp; Seminars
              </h3>

              <div className="space-y-3 text-xs font-sans">
                {[
                  {
                    id: 'col1',
                    title: 'Advances in Fault-Tolerant Quantum Gates',
                    time: 'Tomorrow • 14:00 GMT',
                    host: 'MIT & Oxford Joint Seminar',
                  },
                  {
                    id: 'col2',
                    title: 'Departmental Oral Defense Rehearsal',
                    time: 'Thursday • 10:30 GMT',
                    host: 'Room 402 / Virtual Portal',
                  },
                ].map((item) => (
                  <div key={item.id} className="p-3.5 rounded bg-[#f6fafe] border border-scholar-outline-variant space-y-2">
                    <div>
                      <span className="font-mono text-[10px] text-[#505f76] uppercase font-semibold">
                        {item.time}
                      </span>
                      <h4 className="font-jakarta font-bold text-slate-900 mt-0.5">{item.title}</h4>
                      <p className="text-[#505f76] text-[11px]">{item.host}</p>
                    </div>

                    <button
                      onClick={() => handleToggleRsvp(item.id, item.title)}
                      className={`w-full py-1.5 rounded text-xs font-jakarta font-bold transition-all border ${
                        colloquiaRsvp[item.id]
                          ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                          : 'bg-white text-slate-800 border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      {colloquiaRsvp[item.id] ? 'RSVP Confirmed ✓' : 'RSVP for Seminar'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
