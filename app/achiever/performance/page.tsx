'use client';

import React from 'react';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';
import { useDemo } from '@/components/global/DemoContext';

export default function AchieverPerformancePage() {
  const { currentPersona, showToast } = useDemo();

  const handleDownloadTranscript = () => {
    showToast(`Official Academic Transcript for ${currentPersona.name} downloaded successfully!`);
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Official Term Performance & Analytics"
          subtitle="Institutional Gradebook Sync • WAEC/UTME Projected Aggregate"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-jakarta font-black text-2xl md:text-3xl text-slate-900">
                Term Academic Report Card
              </h2>
              <p className="text-xs text-slate-600 font-inter mt-1 font-medium">
                Verified institutional record for {currentPersona.name} ({currentPersona.institution})
              </p>
            </div>

            <button
              onClick={handleDownloadTranscript}
              className="px-5 py-2.5 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white font-jakarta font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>Download Official Transcript (PDF)</span>
            </button>
          </div>

          {/* Metric Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs text-slate-500 font-mono uppercase font-bold">Cumulative Weighted Average</span>
              <div className="text-3xl font-jakarta font-black text-slate-900 mt-1">4.88 / 5.0</div>
              <span className="text-xs text-[#006c49] font-bold font-jakarta mt-1 inline-block">
                Top 2% of National Cohort
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs text-slate-500 font-mono uppercase font-bold">Projected JAMB Score</span>
              <div className="text-3xl font-jakarta font-black text-[#003f7a] mt-1">342 / 400</div>
              <span className="text-xs text-[#006c49] font-bold font-jakarta mt-1 inline-block">
                Target Met (Target: 340+)
              </span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs text-slate-500 font-mono uppercase font-bold">CBT Diagnostic Mocks</span>
              <div className="text-3xl font-jakarta font-black text-amber-700 mt-1">18 Full Sets</div>
              <span className="text-xs text-slate-600 font-inter mt-1 inline-block font-medium">
                92.4% Avg CBT Accuracy
              </span>
            </div>
          </div>

          {/* Performance Table */}
          <div className="bg-white rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <h3 className="font-jakarta font-bold text-base text-slate-900">
                Subject Grades &amp; Continuous Assessment (CA)
              </h3>
              <span className="text-xs font-mono font-bold text-[#006c49] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Verified by Examination Board
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-inter divide-y divide-slate-200">
                <thead className="bg-slate-50 font-jakarta font-bold text-slate-700">
                  <tr>
                    <th className="px-4 py-3.5">Subject</th>
                    <th className="px-4 py-3.5">CA Score (40%)</th>
                    <th className="px-4 py-3.5">Exam Score (60%)</th>
                    <th className="px-4 py-3.5">Total (100%)</th>
                    <th className="px-4 py-3.5">Grade</th>
                    <th className="px-4 py-3.5">Remark</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3.5 font-jakarta font-bold text-slate-900">Physics</td>
                    <td className="px-4 py-3.5 font-mono">38.0</td>
                    <td className="px-4 py-3.5 font-mono">54.0</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-[#003f7a]">92.0</td>
                    <td className="px-4 py-3.5 font-bold text-[#006c49]">A1</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">Distinction</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3.5 font-jakarta font-bold text-slate-900">Further Mathematics</td>
                    <td className="px-4 py-3.5 font-mono">36.5</td>
                    <td className="px-4 py-3.5 font-mono">52.0</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-[#003f7a]">88.5</td>
                    <td className="px-4 py-3.5 font-bold text-[#006c49]">A1</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">Distinction</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3.5 font-jakarta font-bold text-slate-900">Chemistry</td>
                    <td className="px-4 py-3.5 font-mono">37.0</td>
                    <td className="px-4 py-3.5 font-mono">50.0</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-[#003f7a]">87.0</td>
                    <td className="px-4 py-3.5 font-bold text-[#006c49]">A1</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">Distinction</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="px-4 py-3.5 font-jakarta font-bold text-slate-900">English Language</td>
                    <td className="px-4 py-3.5 font-mono">34.0</td>
                    <td className="px-4 py-3.5 font-mono">48.0</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-[#003f7a]">82.0</td>
                    <td className="px-4 py-3.5 font-bold text-[#003f7a]">B2</td>
                    <td className="px-4 py-3.5 text-xs text-slate-500 font-medium">Very Good</td>
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
