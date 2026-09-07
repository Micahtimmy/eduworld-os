'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';

interface StudentRecord {
  id: string;
  name: string;
  email: string;
  tier: 'Achiever' | 'Explorer' | 'Scholar';
  grade: string;
  guardian: string;
  status: 'Validated' | 'Conflict' | 'Duplicate';
}

const INITIAL_RECORDS: StudentRecord[] = [
  { id: '1', name: 'Zainab Mohammed', email: 'zainab.m@student.edu', tier: 'Achiever', grade: 'SSS 3 (Year 12)', guardian: 'Dr. Aliyu Mohammed', status: 'Validated' },
  { id: '2', name: 'Chukwuebuka Obi', email: 'c.obi@student.edu', tier: 'Achiever', grade: 'SSS 2 (Year 11)', guardian: 'Ngozi Obi', status: 'Validated' },
  { id: '3', name: 'Tariq Hassan', email: 'tariq.h@student.edu', tier: 'Explorer', grade: 'Primary 5 (Grade 5)', guardian: 'Amina Hassan', status: 'Validated' },
  { id: '4', name: 'David Adeleke', email: 'd.adeleke@student.edu', tier: 'Achiever', grade: 'SSS 3 (Year 12)', guardian: 'Chief Adeleke', status: 'Conflict' },
  { id: '5', name: 'Kalu Nnamdi', email: 'kalu.nnamdi@eduworld.io', tier: 'Achiever', grade: 'SSS 3 (Year 12)', guardian: 'Chioma Okafor', status: 'Duplicate' },
];

export default function AdminIntakePage() {
  const { currentPersona, showToast } = useDemo();
  const [records, setRecords] = useState<StudentRecord[]>(INITIAL_RECORDS);
  const [fileName, setFileName] = useState<string>('2026_Term2_Senior_Enrollment_Roster.csv');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCommitEnrollment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      showToast('Successfully enrolled 4 new students into the active institutional database!');
    }, 1000);
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-white border-r border-slate-800 flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <div className="p-5 border-b border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#003f7a] text-white flex items-center justify-center font-bold shadow-xs">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-white">Institutional OS</h1>
            <span className="text-[10px] font-mono uppercase text-[#6ffbbe] font-bold">Admin Tier</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-lg text-slate-400">dashboard</span>
            <span>Admin Command Center</span>
          </Link>

          <Link
            href="/admin/intake"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold bg-[#003f7a] text-white shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-lg text-[#6ffbbe]">upload_file</span>
            <span>CSV Bulk Intake &amp; Matcher</span>
          </Link>

          <Link
            href="/admin/scheduling"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <span className="material-symbols-outlined text-lg text-slate-400">calendar_month</span>
            <span>Faculty Clash Detection</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-800 bg-slate-950 text-xs">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-[#6ffbbe] hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <div className="flex items-center gap-2 pt-2">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-700"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentPersona.name}</p>
              <p className="text-[10px] text-slate-400 font-mono truncate">{currentPersona.institution}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-base text-slate-900">
              CSV Bulk Student Intake &amp; AI Field Matcher
            </h2>
            <p className="text-xs text-slate-500 font-inter">
              Frame EWD-007 • Automated Schema Normalization &amp; Identity Deduplication
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCommitEnrollment}
              disabled={isProcessing}
              className="px-5 py-2.5 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white font-jakarta font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-base">how_to_reg</span>
              <span>{isProcessing ? 'Enrolling Records...' : 'Commit Batch Enrollment'}</span>
            </button>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* File Upload / Status Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 text-[#003f7a] flex items-center justify-center">
                <span className="material-symbols-outlined text-2xl">table_chart</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-jakarta font-bold text-base text-slate-900">{fileName}</h3>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-950 text-[10px] font-bold font-mono">
                    Schema Matched (100%)
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  5 Parsed Rows • 6 Mapped Columns • 0 Unresolved Syntax Errors
                </p>
              </div>
            </div>

            <button
              onClick={() => showToast('Re-scanned CSV fields and validated against national WAEC registry.')}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-jakarta font-bold text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">refresh</span>
              <span>Re-Validate Schema</span>
            </button>
          </div>

          {/* Records Table */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
            <div className="p-6 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-jakarta font-bold text-base text-slate-900">
                  Parsed Enrollment Roster
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Review student profiles, assigned learning tiers, and guardian contact bindings
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-[#006c49] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  3 Ready to Enroll
                </span>
                <span className="text-xs font-mono font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
                  2 Flagged
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-inter divide-y divide-slate-200">
                <thead className="bg-slate-50 font-jakarta font-bold text-slate-700">
                  <tr>
                    <th className="px-6 py-3.5">Student Name</th>
                    <th className="px-6 py-3.5">Email / Identifier</th>
                    <th className="px-6 py-3.5">Assigned Tier</th>
                    <th className="px-6 py-3.5">Grade Level</th>
                    <th className="px-6 py-3.5">Linked Guardian</th>
                    <th className="px-6 py-3.5">Validation Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  {records.map((r) => (
                    <tr key={r.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-900">{r.name}</td>
                      <td className="px-6 py-4 font-mono text-slate-600">{r.email}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            r.tier === 'Achiever'
                              ? 'bg-blue-100 text-[#003f7a]'
                              : 'bg-green-100 text-[#2b6c00]'
                          }`}
                        >
                          {r.tier}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-medium">{r.grade}</td>
                      <td className="px-6 py-4 text-slate-700">{r.guardian}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono border ${
                            r.status === 'Validated'
                              ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
                              : r.status === 'Conflict'
                              ? 'bg-amber-100 text-amber-950 border-amber-300'
                              : 'bg-red-100 text-red-950 border-red-300'
                          }`}
                        >
                          {r.status}
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
