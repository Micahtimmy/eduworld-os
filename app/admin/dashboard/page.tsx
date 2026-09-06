'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [csvUploaded, setCsvUploaded] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Admin</h1>
            <span className="text-[11px] font-mono uppercase text-primary font-bold">
              Institutional Command
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="px-3 py-2 rounded-xl bg-primary-container text-white font-jakarta font-bold text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-base">input</span>
            <span>Student Intake &amp; CSV Mapping</span>
          </div>
          <div className="px-3 py-2 rounded-xl text-on-surface font-jakarta font-semibold text-xs flex items-center gap-2 hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-base text-outline">event_busy</span>
            <span>Faculty Clash Detection</span>
          </div>
          <div className="px-3 py-2 rounded-xl text-on-surface font-jakarta font-semibold text-xs flex items-center gap-2 hover:bg-surface-container-low cursor-pointer">
            <span className="material-symbols-outlined text-base text-outline">analytics</span>
            <span>School-Wide Performance</span>
          </div>
        </nav>

        <div className="p-4 border-t border-outline-variant bg-surface-container-low">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-primary hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <p className="text-[11px] text-outline font-inter mt-1">Corona Group of Schools (Central HQ)</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-jakarta font-bold text-base text-on-surface">
              Institutional Student Intake &amp; Bulk Enrollment
            </h2>
            <p className="text-xs text-on-surface-variant font-inter">
              Frame EWD-005 / EWD-007 Bulk AI CSV Matcher
            </p>
          </div>
          <span className="px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-jakarta font-bold text-xs">
            Term 2 Ingestion
          </span>
        </header>

        <main className="flex-1 p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Intake Stepper */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm flex items-center justify-between">
            {['1. Upload File', '2. AI Column Mapping', '3. Validation & Ingestion'].map((step, idx) => (
              <div key={step} className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-full font-jakarta font-bold text-xs flex items-center justify-center ${
                    activeStep >= idx + 1
                      ? 'bg-primary text-white'
                      : 'bg-surface-container-high text-outline'
                  }`}
                >
                  {idx + 1}
                </span>
                <span
                  className={`text-xs font-jakarta font-semibold ${
                    activeStep >= idx + 1 ? 'text-on-surface' : 'text-outline'
                  }`}
                >
                  {step}
                </span>
                {idx < 2 && <span className="text-outline text-xs">→</span>}
              </div>
            ))}
          </div>

          {/* Upload & CSV Mapping Step */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-6">
            {!csvUploaded ? (
              <div
                onClick={() => {
                  setCsvUploaded(true);
                  setActiveStep(2);
                }}
                className="border-2 border-dashed border-outline-variant rounded-2xl p-12 text-center hover:border-primary hover:bg-surface-container-low transition-all cursor-pointer space-y-3"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <span className="material-symbols-outlined text-4xl">upload_file</span>
                </div>
                <div>
                  <h4 className="font-jakarta font-bold text-base text-on-surface">
                    Click to simulate uploading cohort enrollment CSV
                  </h4>
                  <p className="text-xs text-outline mt-1 font-inter">
                    Supports .CSV, .XLSX exports from legacy SIS or Government registry
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-xl">auto_awesome</span>
                    <h3 className="font-jakarta font-bold text-sm text-on-surface">
                      AI-Assisted Field Mapping (120 Records Detected)
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-secondary bg-secondary-container px-2 py-0.5 rounded-full">
                    99.2% Auto-Match Confidence
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { csv: 'Full_Name', matched: 'Student Name (string)', verified: true },
                    { csv: 'Parent_Email_Addr', matched: 'Guardian Email (email)', verified: true },
                    { csv: 'Curriculum_Stream', matched: 'Tier Assignment (Achiever)', verified: true },
                    { csv: 'JAMB_Reg_No', matched: 'External Exam ID (string)', verified: true },
                  ].map((field) => (
                    <div
                      key={field.csv}
                      className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-on-surface bg-white px-2.5 py-1 rounded border border-outline-variant">
                          {field.csv}
                        </span>
                        <span className="text-xs text-outline font-inter">maps to</span>
                        <span className="font-jakarta text-xs font-bold text-primary">
                          {field.matched}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-secondary flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Verified
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setActiveStep(3)}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-sm transition-all flex items-center gap-1.5"
                  >
                    <span>Execute Bulk Intake Validation</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
