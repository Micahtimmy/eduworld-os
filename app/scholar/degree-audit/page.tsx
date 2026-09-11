'use client';

import React, { useState } from 'react';
import { ScholarNav } from '@/components/scholar/ScholarNav';
import { useDemo } from '@/components/global/DemoContext';

type AuditTab = 'audit' | 'electives' | 'projections';

interface Requirement {
  category: string;
  required: number;
  completed: number;
  courses: { code: string; name: string; credits: number; grade: string; status: 'Complete' | 'In Progress' | 'Planned' }[];
}

const REQUIREMENTS: Requirement[] = [
  {
    category: 'Core Physics & Mathematics (64 Credits Required)',
    required: 64,
    completed: 64,
    courses: [
      { code: 'PHYS-401', name: 'Advanced Quantum Mechanics II', credits: 4, grade: 'A (4.0)', status: 'Complete' },
      { code: 'PHYS-405', name: 'Statistical Thermodynamics & Fields', credits: 4, grade: 'A- (3.7)', status: 'Complete' },
      { code: 'MATH-320', name: 'Complex Analysis & Hilbert Spaces', credits: 4, grade: 'A (4.0)', status: 'Complete' },
      { code: 'PHYS-412', name: 'Electrodynamics & Special Relativity', credits: 4, grade: 'A (4.0)', status: 'Complete' },
    ],
  },
  {
    category: 'Quantum Informatics & Computing Concentration (36 Credits Required)',
    required: 36,
    completed: 32,
    courses: [
      { code: 'CS-540', name: 'Quantum Error Correction & Fault Tolerance', credits: 4, grade: 'In Progress', status: 'In Progress' },
      { code: 'CS-510', name: 'Quantum Information Theory & Entanglement', credits: 4, grade: 'A (4.0)', status: 'Complete' },
      { code: 'CS-480', name: 'Topological Quantum Architectures', credits: 4, grade: 'A (4.0)', status: 'Complete' },
      { code: 'PHYS-590', name: 'Dissertation Research Seminar', credits: 4, grade: 'In Progress', status: 'In Progress' },
    ],
  },
  {
    category: 'Interdisciplinary Electives & Humanities (28 Credits Required)',
    required: 28,
    completed: 22,
    courses: [
      { code: 'PHIL-220', name: 'Philosophy of Science & Quantum Logic', credits: 4, grade: 'A (4.0)', status: 'Complete' },
      { code: 'HIST-310', name: 'History of 20th Century Physics', credits: 3, grade: 'A (4.0)', status: 'Complete' },
      { code: 'ECON-101', name: 'Macroeconomic Principles for Research', credits: 3, grade: 'Planned (Spring)', status: 'Planned' },
    ],
  },
];

export default function ScholarDegreeAuditPage() {
  const { currentPersona, showToast } = useDemo();
  const [selectedTab, setSelectedTab] = useState<AuditTab>('audit');

  const totalRequired = 128;
  const totalCompleted = 118;
  const inProgress = 6;
  const remaining = totalRequired - (totalCompleted + inProgress);

  return (
    <div className="flex min-h-screen bg-[#f6fafe]">
      <ScholarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 bg-white border-b border-[#c6c6cd] flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-base text-slate-900 leading-tight">
              Predictive Degree Audit &amp; Graduation Tracker
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Academic Record ID: #IMP-892401 • Imperial College Faculty of Natural Sciences
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => showToast('Official Degree Progress Report PDF exported!')}
              className="px-4 py-2 rounded bg-[#131b2e] hover:bg-slate-800 text-white font-jakarta font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            >
              <span className="material-symbols-outlined text-sm">download</span>
              <span>Export Official Audit</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6 font-sans">
          {/* Degree Status Hero Banner */}
          <div className="bg-[#131b2e] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-700 relative overflow-hidden flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2 z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono text-[#6ffbbe] font-bold">
                <span className="material-symbols-outlined text-sm">verified</span>
                <span>Graduation Status: On Track for Honors (Summa Cum Laude)</span>
              </div>
              <h2 className="font-jakarta font-bold text-2xl md:text-3xl text-white">
                Ph.D. / M.Sc. in Quantum Information &amp; Applied Physics
              </h2>
              <p className="text-xs text-slate-300 leading-relaxed font-inter">
                Candidate: <strong className="text-white">{currentPersona.name}</strong> • Cumulative GPA: <strong className="text-[#6ffbbe]">3.94 / 4.0</strong> • Expected Defense Date: <strong className="text-white">June 2026</strong>
              </p>
            </div>

            {/* Credit Progress Ring Gauge */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[220px] text-center z-10">
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-300 font-bold block">
                Total Credit Completion
              </span>
              <div className="font-jakarta font-black text-3xl text-[#6ffbbe] my-1">
                {totalCompleted} / {totalRequired}
              </div>
              <div className="w-full bg-black/40 rounded-full h-2 mt-2">
                <div
                  className="bg-[#6ffbbe] h-2 rounded-full"
                  style={{ width: `${(totalCompleted / totalRequired) * 100}%` }}
                />
              </div>
              <span className="text-[10px] font-mono text-slate-300 mt-2 block">
                {remaining} Credits Remaining to Graduate
              </span>
            </div>
          </div>

          {/* Audit Navigation Tabs */}
          <div className="flex border-b border-[#c6c6cd] gap-2">
            {([
              { id: 'audit', label: 'Degree Requirements Checklist', icon: 'fact_check' },
              { id: 'electives', label: 'Elective Course Planner', icon: 'edit_calendar' },
              { id: 'projections', label: 'GPA & Honors Projections', icon: 'trending_up' },
            ] as const).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 font-jakarta font-semibold text-xs transition-all ${
                  selectedTab === tab.id
                    ? 'border-[#131b2e] text-[#131b2e] font-bold bg-white/60 rounded-t-xl'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span className="material-symbols-outlined text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {selectedTab === 'audit' && (
            <div className="space-y-6">
              {REQUIREMENTS.map((req) => (
                <div
                  key={req.category}
                  className="bg-white rounded-3xl border border-[#c6c6cd] p-6 shadow-md space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-200">
                    <h3 className="font-jakarta font-bold text-sm text-slate-900">
                      {req.category}
                    </h3>
                    <span className="font-mono font-bold text-xs text-[#006c49] bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                      {req.completed} / {req.required} Credits Earned
                    </span>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {req.courses.map((course) => (
                      <div key={course.code} className="py-3 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold text-[#131b2e] bg-slate-100 px-2 py-1 rounded border border-slate-200">
                            {course.code}
                          </span>
                          <div>
                            <p className="text-xs font-bold text-slate-900">{course.name}</p>
                            <span className="text-[11px] text-slate-500 font-mono">
                              {course.credits} Credits Units
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-xs text-slate-800">
                            {course.grade}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono ${
                              course.status === 'Complete'
                                ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                                : course.status === 'In Progress'
                                ? 'bg-blue-100 text-[#003f7a] border border-blue-200'
                                : 'bg-amber-100 text-amber-950 border border-amber-300'
                            }`}
                          >
                            {course.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'electives' && (
            <div className="bg-white rounded-3xl border border-[#c6c6cd] p-6 shadow-md space-y-4">
              <h3 className="font-jakarta font-bold text-base text-slate-900">
                Recommended Final Spring Electives
              </h3>
              <p className="text-xs text-slate-600 font-inter">
                Select 1 elective course (4 credits) to complete all graduation requirements.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {[
                  { code: 'CS-610', name: 'Quantum Machine Learning & VQEs', desc: 'Hybrid classical-quantum optimization on NISQ hardware.', credits: 4 },
                  { code: 'PHYS-620', name: 'Superconducting Qubits & Josephson Junctions', desc: 'Hardware engineering of transmon qubits and microwave cavities.', credits: 4 },
                ].map((elective) => (
                  <div
                    key={elective.code}
                    className="p-4 rounded-2xl border-2 border-slate-200 hover:border-[#131b2e] transition-all bg-slate-50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono font-bold text-xs text-[#131b2e] bg-white px-2 py-0.5 rounded border border-slate-200">
                          {elective.code}
                        </span>
                        <span className="font-mono text-xs font-bold text-[#006c49]">
                          {elective.credits} Credits
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-slate-900 mt-2">{elective.name}</h4>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{elective.desc}</p>
                    </div>

                    <button
                      onClick={() => showToast(`Enrolled in elective ${elective.code}: ${elective.name}`)}
                      className="mt-4 w-full py-2 rounded-xl bg-[#131b2e] text-white font-semibold text-xs hover:bg-slate-800 transition-all flex items-center justify-center gap-1 active:scale-95 shadow-xs"
                    >
                      <span className="material-symbols-outlined text-sm">add_circle</span>
                      <span>Enroll in Elective</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'projections' && (
            <div className="bg-white rounded-3xl border border-[#c6c6cd] p-6 shadow-md space-y-4">
              <h3 className="font-jakarta font-bold text-base text-slate-900">
                Honors &amp; Latin Distinctions Projections
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-950">
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-800">Predicted Distinction</span>
                  <h4 className="font-jakarta font-black text-xl text-emerald-950 mt-1">Summa Cum Laude</h4>
                  <p className="text-[11px] text-emerald-900 mt-1">Threshold: 3.90+ GPA (Current: 3.94)</p>
                </div>
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-[#003f7a]">
                  <span className="text-[10px] font-mono uppercase font-bold text-[#003f7a]">Thesis Defense Readiness</span>
                  <h4 className="font-jakarta font-black text-xl text-[#003f7a] mt-1">94% Approved</h4>
                  <p className="text-[11px] text-slate-700 mt-1">Advisor Committee Endorsed</p>
                </div>
                <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950">
                  <span className="text-[10px] font-mono uppercase font-bold text-purple-800">Citations Benchmark</span>
                  <h4 className="font-jakarta font-black text-xl text-purple-950 mt-1">428 Citations</h4>
                  <p className="text-[11px] text-purple-900 mt-1">h-index: 12 (Top 5% Fellowship)</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
