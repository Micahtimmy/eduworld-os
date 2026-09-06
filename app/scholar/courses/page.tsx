'use client';

import React from 'react';
import { ScholarNav } from '@/components/scholar/ScholarNav';

export default function ScholarCoursesPage() {
  const modules = [
    {
      code: 'PHYS-401',
      title: 'Advanced Quantum Mechanics & Many-Body Systems',
      credits: 4,
      instructor: 'Prof. Harold Thorne',
      progress: 88,
      status: 'In Progress',
    },
    {
      code: 'CS-502',
      title: 'Quantum Algorithms & Complexity Theory',
      credits: 4,
      instructor: 'Dr. Evelyn Vance',
      progress: 92,
      status: 'In Progress',
    },
    {
      code: 'MATH-420',
      title: 'Differential Geometry & General Relativity',
      credits: 3,
      instructor: 'Prof. Marcus Chen',
      progress: 75,
      status: 'In Progress',
    },
  ];

  return (
    <div className="flex min-h-screen bg-scholar-paper">
      <ScholarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-white border-b border-scholar-outline-variant flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-jakarta font-bold text-sm text-on-surface">
              Enrolled Academic Modules &amp; Practicals
            </h2>
            <p className="text-[11px] text-scholar-secondary font-mono">
              Fall / Winter Graduate Curriculum
            </p>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6 font-sans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((m) => (
              <div
                key={m.code}
                className="bg-white rounded border border-scholar-outline-variant p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-scholar-primary transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-bold text-scholar-primary bg-scholar-slate px-2 py-0.5 rounded">
                      {m.code}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-scholar-secondary">
                      {m.credits} Credits
                    </span>
                  </div>

                  <h3 className="font-jakarta font-bold text-sm text-on-surface mt-2">{m.title}</h3>
                  <p className="text-[11px] text-scholar-secondary font-inter mt-1">
                    {m.instructor}
                  </p>

                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-scholar-secondary">
                      <span>Module Completion</span>
                      <span className="font-bold text-scholar-tertiary">{m.progress}%</span>
                    </div>
                    <div className="w-full bg-scholar-slate rounded-full h-1.5">
                      <div
                        className="bg-scholar-tertiary h-1.5 rounded-full"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-scholar-slate flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                    {m.status}
                  </span>
                  <button className="text-xs font-jakarta font-bold text-scholar-primary hover:underline">
                    Access Lecture Hall →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
