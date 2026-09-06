'use client';

import React from 'react';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';

export default function AchieverPerformancePage() {
  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Official Term Performance & Analytics"
          subtitle="Institutional Gradebook Sync • WAEC/UTME Projected Aggregate"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-2xl text-on-surface">
                Term Academic Report Card
              </h2>
              <p className="text-xs text-on-surface-variant font-inter mt-1">
                Verified institutional record for Alex Okafor (SSS 3 Gold Class)
              </p>
            </div>

            <button className="px-4 py-2 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-sm transition-all flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download Official Transcript (PDF)</span>
            </button>
          </div>

          {/* Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">Cumulative GPA</span>
              <div className="text-3xl font-jakarta font-black text-on-surface mt-1">4.82 / 5.0</div>
              <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                Top 2% of Cohort
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">Projected UTME Score</span>
              <div className="text-3xl font-jakarta font-black text-primary mt-1">342 / 400</div>
              <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                Target Exceeded (+14 pts)
              </span>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
              <span className="text-xs text-outline font-inter uppercase font-semibold">Mock Exams Completed</span>
              <div className="text-3xl font-jakarta font-black text-tertiary mt-1">18 Full Sets</div>
              <span className="text-xs text-outline font-inter mt-1 inline-block">
                92.4% Avg Accuracy
              </span>
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
            <h3 className="font-jakarta font-bold text-base text-on-surface">
              Subject Grades & Continuous Assessment (CA)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm font-inter">
                <thead>
                  <tr className="border-b border-surface-container text-xs font-bold text-outline font-mono uppercase">
                    <th className="pb-3">Subject</th>
                    <th className="pb-3">CA Score (40%)</th>
                    <th className="pb-3">Exam Score (60%)</th>
                    <th className="pb-3">Total (100%)</th>
                    <th className="pb-3">Grade</th>
                    <th className="pb-3">Remark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr>
                    <td className="py-3.5 font-jakarta font-semibold text-on-surface">Physics</td>
                    <td className="py-3.5 font-mono">38.0</td>
                    <td className="py-3.5 font-mono">54.0</td>
                    <td className="py-3.5 font-mono font-bold text-primary">92.0</td>
                    <td className="py-3.5 font-bold text-secondary">A1</td>
                    <td className="py-3.5 text-xs text-outline">Distinction</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-jakarta font-semibold text-on-surface">Further Mathematics</td>
                    <td className="py-3.5 font-mono">36.5</td>
                    <td className="py-3.5 font-mono">52.0</td>
                    <td className="py-3.5 font-mono font-bold text-primary">88.5</td>
                    <td className="py-3.5 font-bold text-secondary">A1</td>
                    <td className="py-3.5 text-xs text-outline">Distinction</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-jakarta font-semibold text-on-surface">Chemistry</td>
                    <td className="py-3.5 font-mono">37.0</td>
                    <td className="py-3.5 font-mono">50.0</td>
                    <td className="py-3.5 font-mono font-bold text-primary">87.0</td>
                    <td className="py-3.5 font-bold text-secondary">A1</td>
                    <td className="py-3.5 text-xs text-outline">Distinction</td>
                  </tr>
                  <tr>
                    <td className="py-3.5 font-jakarta font-semibold text-on-surface">English Language</td>
                    <td className="py-3.5 font-mono">34.0</td>
                    <td className="py-3.5 font-mono">48.0</td>
                    <td className="py-3.5 font-mono font-bold text-primary">82.0</td>
                    <td className="py-3.5 font-bold text-primary">B2</td>
                    <td className="py-3.5 text-xs text-outline">Very Good</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
