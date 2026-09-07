'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';

interface StateMetric {
  state: string;
  region: string;
  registeredCandidates: number;
  jambAverage: number;
  waecPassRate: number;
  digitalClassrooms: number;
  status: 'Surpassing Benchmark' | 'On Target' | 'Intervention Required';
}

const STATE_DATA: StateMetric[] = [
  { state: 'Lagos', region: 'South West', registeredCandidates: 342000, jambAverage: 248, waecPassRate: 88.4, digitalClassrooms: 94, status: 'Surpassing Benchmark' },
  { state: 'Abuja (FCT)', region: 'North Central', registeredCandidates: 128000, jambAverage: 242, waecPassRate: 86.1, digitalClassrooms: 91, status: 'Surpassing Benchmark' },
  { state: 'Rivers', region: 'South South', registeredCandidates: 195000, jambAverage: 236, waecPassRate: 82.5, digitalClassrooms: 84, status: 'On Target' },
  { state: 'Kano', region: 'North West', registeredCandidates: 284000, jambAverage: 218, waecPassRate: 74.2, digitalClassrooms: 68, status: 'Intervention Required' },
  { state: 'Enugu', region: 'South East', registeredCandidates: 142000, jambAverage: 239, waecPassRate: 84.8, digitalClassrooms: 86, status: 'On Target' },
  { state: 'Oyo', region: 'South West', registeredCandidates: 210000, jambAverage: 232, waecPassRate: 81.3, digitalClassrooms: 79, status: 'On Target' },
  { state: 'Borno', region: 'North East', registeredCandidates: 98000, jambAverage: 204, waecPassRate: 68.9, digitalClassrooms: 52, status: 'Intervention Required' },
];

export default function GovernmentDashboardPage() {
  const { currentPersona, showToast } = useDemo();
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [isExporting, setIsExporting] = useState(false);

  const filtered = selectedRegion === 'All'
    ? STATE_DATA
    : STATE_DATA.filter((s) => s.region === selectedRegion);

  const handleExportPolicyReport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      showToast('National Education Infrastructure & Benchmark Policy Report (Q1 2026) exported successfully!');
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Government Sidebar */}
      <aside className="w-64 bg-[#0a2e1d] text-white border-r border-emerald-900 flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <div className="p-5 border-b border-emerald-900/80 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#006c49] text-white flex items-center justify-center font-bold shadow-xs">
            <span className="material-symbols-outlined text-2xl">public</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-white">EduWorld Gov</h1>
            <span className="text-[10px] font-mono uppercase text-emerald-300 font-bold">Federal Ministry</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <Link
            href="/government/dashboard"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold bg-[#006c49] text-white shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-lg text-emerald-300">analytics</span>
            <span>National Exam Intelligence</span>
          </Link>
          <div className="px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold text-emerald-200/80 hover:bg-[#0f3d28] hover:text-white cursor-pointer transition-all flex items-center gap-2.5">
            <span className="material-symbols-outlined text-lg text-emerald-400">policy</span>
            <span>Curriculum Equity Index</span>
          </div>
          <div className="px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold text-emerald-200/80 hover:bg-[#0f3d28] hover:text-white cursor-pointer transition-all flex items-center gap-2.5">
            <span className="material-symbols-outlined text-lg text-emerald-400">devices</span>
            <span>Rural Digital Infrastructure</span>
          </div>
        </nav>

        <div className="p-4 border-t border-emerald-900/80 bg-[#061e13] text-xs">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-emerald-300 hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <div className="flex items-center gap-2 pt-2">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-8 h-8 rounded-full object-cover border border-emerald-700"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentPersona.name}</p>
              <p className="text-[10px] text-emerald-300/80 font-mono truncate">{currentPersona.institution}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-base text-slate-900">
              National Examination Readiness &amp; State Performance Heatmap
            </h2>
            <p className="text-xs text-slate-500 font-inter">
              Federal Ministry of Education • 36 States &amp; FCT Macro Data
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportPolicyReport}
              disabled={isExporting}
              className="px-4 py-2 rounded-xl bg-[#006c49] hover:bg-[#005236] text-white font-jakarta font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">download</span>
              <span>{isExporting ? 'Generating Report...' : 'Export National Brief'}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Macro Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                Total Exam Candidates
              </span>
              <div className="font-jakarta font-black text-3xl text-slate-900 mt-1">
                2,482,100
              </div>
              <span className="text-[11px] font-bold text-emerald-800 mt-1 block">+8.4% YoY Growth</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                National JAMB Projected Avg
              </span>
              <div className="font-jakarta font-black text-3xl text-[#003f7a] mt-1">
                234.8 / 400
              </div>
              <span className="text-[11px] font-bold text-emerald-800 mt-1 block">Trending +4.6 pts</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                WAEC 5+ Credits Benchmark
              </span>
              <div className="font-jakarta font-black text-3xl text-[#006c49] mt-1">
                81.6%
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-1 block">Target: 80.0% (Met)</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                Digital Classroom Equity
              </span>
              <div className="font-jakarta font-black text-3xl text-amber-700 mt-1">
                78.2%
              </div>
              <span className="text-[11px] font-bold text-amber-800 mt-1 block">12 States In Progress</span>
            </div>
          </div>

          {/* State Performance Breakdown Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md space-y-4">
            <div className="p-6 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-jakarta font-bold text-base text-slate-900">
                  Regional State Diagnostic &amp; WAEC Readiness Matrix
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Real-time telemetry gathered from EduWorld diagnostic sessions across accredited centers
                </p>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2 text-xs font-jakarta font-bold">
                <span className="text-slate-600">Filter Region:</span>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 outline-none focus:border-[#006c49]"
                >
                  <option value="All">All Geo-Political Zones</option>
                  <option value="South West">South West</option>
                  <option value="North Central">North Central</option>
                  <option value="South South">South South</option>
                  <option value="North West">North West</option>
                  <option value="South East">South East</option>
                  <option value="North East">North East</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-inter divide-y divide-slate-200">
                <thead className="bg-slate-50 font-jakarta font-bold text-slate-700">
                  <tr>
                    <th className="px-6 py-3.5">State / Jurisdiction</th>
                    <th className="px-6 py-3.5">Geopolitical Region</th>
                    <th className="px-6 py-3.5">Registered Candidates</th>
                    <th className="px-6 py-3.5">JAMB Diagnostic Avg</th>
                    <th className="px-6 py-3.5">WAEC Projected Pass</th>
                    <th className="px-6 py-3.5">Digital Classrooms</th>
                    <th className="px-6 py-3.5">Intervention Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {filtered.map((s) => (
                    <tr key={s.state} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{s.state}</td>
                      <td className="px-6 py-4 text-slate-600">{s.region}</td>
                      <td className="px-6 py-4 font-mono font-bold text-slate-900">
                        {s.registeredCandidates.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-[#003f7a]">
                        {s.jambAverage} / 400
                      </td>
                      <td className="px-6 py-4 font-mono font-bold text-[#006c49]">
                        {s.waecPassRate}%
                      </td>
                      <td className="px-6 py-4 font-mono text-slate-700">
                        {s.digitalClassrooms}%
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase font-mono border ${
                            s.status === 'Surpassing Benchmark'
                              ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                              : s.status === 'On Target'
                              ? 'bg-blue-100 text-[#003f7a] border border-blue-200'
                              : 'bg-amber-100 text-amber-950 border-amber-300'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
