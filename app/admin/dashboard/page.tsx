'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';
import { GlobalHeaderNotifications } from '@/components/global/GlobalHeaderNotifications';

interface TimetableClash {
  id: string;
  room: string;
  timeSlot: string;
  course1: string;
  teacher1: string;
  course2: string;
  teacher2: string;
  resolved: boolean;
}

export default function AdminDashboardPage() {
  const { currentPersona, showToast, addNotification } = useDemo();
  const [activeTab, setActiveTab] = useState<'health' | 'intake' | 'clashes' | 'security'>('health');

  // Clash detector state
  const [clashes, setClashes] = useState<TimetableClash[]>([
    {
      id: 'c1',
      room: 'Science Lab 304',
      timeSlot: 'Tuesday 10:00 - 11:30 AM',
      course1: 'Senior Physics PHY-301',
      teacher1: 'Prof. Sarah Jenkins',
      course2: 'General Chemistry CHM-302',
      teacher2: 'Dr. Adeleke',
      resolved: false,
    },
    {
      id: 'c2',
      room: 'Auditorium Hall B',
      timeSlot: 'Thursday 14:00 - 15:30 PM',
      course1: 'Junior Cadet Science Fair',
      teacher1: 'Ms. Clara Wilson',
      course2: 'WAEC Further Math Mock',
      teacher2: 'Mr. Okoro',
      resolved: false,
    },
  ]);

  // Security toggles
  const [enforce2FA, setEnforce2FA] = useState(true);
  const [examLockdown, setExamLockdown] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);
  const [isSyncingSIS, setIsSyncingSIS] = useState(false);

  const handleResolveClash = (id: string) => {
    setClashes((prev) =>
      prev.map((c) => (c.id === id ? { ...c, resolved: true } : c))
    );
    showToast('AI Timetable Scheduler relocated secondary cohort to Multipurpose Hall 402 with zero conflicts!');
    addNotification(
      'Schedule Clash Resolved',
      'Timetable room allocation clash automatically resolved by AI.',
      'system',
      '/admin/dashboard'
    );
  };

  const handleTriggerSISSync = () => {
    setIsSyncingSIS(true);
    setTimeout(() => {
      setIsSyncingSIS(false);
      showToast('State Education SIS database and national candidate registries synchronized successfully.');
      addNotification('SIS Database Synchronized', '1,240 student records synced with Ministry portal.', 'system');
    }, 1500);
  };

  const activeClashesCount = clashes.filter((c) => !c.resolved).length;

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold shadow-xs">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Admin</h1>
            <span className="text-[10px] font-mono uppercase text-primary font-bold">
              Institutional Command
            </span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('health')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'health'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Institutional Health &amp; KPIs</span>
          </button>

          <button
            onClick={() => setActiveTab('intake')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'intake'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">upload_file</span>
            <span>Student Intake &amp; CSV Mapping</span>
          </button>

          <button
            onClick={() => setActiveTab('clashes')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'clashes'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">event_busy</span>
              <span>Faculty Clash Detection</span>
            </div>
            {activeClashesCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] font-mono">
                {activeClashesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">security</span>
            <span>Access &amp; Security Vault</span>
          </button>
        </nav>

        {/* Footer User Info */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low text-xs space-y-2">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-primary hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <div className="flex items-center gap-2.5 pt-1">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-on-surface truncate">{currentPersona.name}</p>
              <p className="text-[10px] text-outline font-mono truncate">{currentPersona.institution}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 md:px-8 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-base text-on-surface">Institutional Command Suite</h2>
            <p className="text-xs text-on-surface-variant font-inter">
              {currentPersona.institution} • Term 2 Operations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerSISSync}
              disabled={isSyncingSIS}
              className="px-3.5 py-1.5 rounded-xl border border-outline-variant bg-surface-container text-xs font-jakarta font-bold text-on-surface hover:border-primary transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
            >
              <span className="material-symbols-outlined text-sm text-primary">sync</span>
              <span>{isSyncingSIS ? 'Syncing...' : 'Sync SIS Registry'}</span>
            </button>

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

        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* TAB 1: HEALTH & KPIS */}
          {activeTab === 'health' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Macro Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md">
                  <span className="text-xs font-mono uppercase text-outline font-bold block">
                    Institutional Health
                  </span>
                  <div className="font-jakarta font-black text-3xl text-primary mt-1">94 / 100</div>
                  <span className="text-[11px] font-bold text-secondary mt-1 block">Tier 1 Rating</span>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md">
                  <span className="text-xs font-mono uppercase text-outline font-bold block">
                    Total Active Enrolled
                  </span>
                  <div className="font-jakarta font-black text-3xl text-on-surface mt-1">1,240</div>
                  <span className="text-[11px] font-bold text-outline mt-1 block">52 Full-Time Faculty</span>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md">
                  <span className="text-xs font-mono uppercase text-outline font-bold block">
                    Daily Attendance
                  </span>
                  <div className="font-jakarta font-black text-3xl text-secondary mt-1">97.8%</div>
                  <span className="text-[11px] font-bold text-secondary mt-1 block">Above Benchmark</span>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md">
                  <span className="text-xs font-mono uppercase text-outline font-bold block">
                    UTME / WAEC Readiness
                  </span>
                  <div className="font-jakarta font-black text-3xl text-amber-700 mt-1">89.2%</div>
                  <span className="text-[11px] font-bold text-amber-800 mt-1 block">Top 5% in State</span>
                </div>
              </div>

              {/* Actionable Alerts Bento */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                    <h4 className="font-jakarta font-bold text-base text-on-surface">Urgent Operational Alerts</h4>
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      2 Actions Required
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                      <span className="material-symbols-outlined text-amber-700 text-xl shrink-0 mt-0.5">warning</span>
                      <div className="text-xs font-inter flex-1">
                        <p className="font-bold text-amber-900">Room 304 Double-Booking Conflict</p>
                        <p className="text-amber-800 mt-0.5">PHY-301 and CHM-302 share slot on Tuesday 10:00 AM.</p>
                        <button
                          onClick={() => setActiveTab('clashes')}
                          className="mt-2 text-xs font-jakarta font-bold text-amber-900 underline"
                        >
                          Resolve in Timetable Desk →
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
                      <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">upload_file</span>
                      <div className="text-xs font-inter flex-1">
                        <p className="font-bold text-blue-900">42 Ingestion CSV Records Pending Commit</p>
                        <p className="text-blue-800 mt-0.5">Term 2 Transfer Intake batch ready for final schema write.</p>
                        <Link
                          href="/admin/intake"
                          className="mt-2 text-xs font-jakarta font-bold text-primary underline inline-block"
                        >
                          Open Ingestion Suite →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm space-y-4">
                  <h4 className="font-jakarta font-bold text-base text-on-surface">Institutional Infrastructure</h4>
                  <div className="space-y-3 text-xs font-inter">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-low border border-outline-variant">
                      <div>
                        <p className="font-bold text-on-surface">CBT Examination Server Latency</p>
                        <p className="text-outline text-[11px]">Primary LAN Simulator Node</p>
                      </div>
                      <span className="font-mono font-bold text-secondary">4.2 ms (Optimal)</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-low border border-outline-variant">
                      <div>
                        <p className="font-bold text-on-surface">Digital Classroom Connectivity</p>
                        <p className="text-outline text-[11px]">36/36 Interactive Whiteboards Active</p>
                      </div>
                      <span className="font-mono font-bold text-secondary">100% Online</span>
                    </div>

                    <div className="flex justify-between items-center p-3 rounded-xl bg-surface-container-low border border-outline-variant">
                      <div>
                        <p className="font-bold text-on-surface">Automated Backup Hash</p>
                        <p className="text-outline text-[11px]">Encrypted SHA-256 Cloud Vault</p>
                      </div>
                      <span className="font-mono font-bold text-primary">Verified ✓</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: INTAKE SUMMARY */}
          {activeTab === 'intake' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div>
                  <h3 className="font-jakarta font-bold text-lg text-on-surface">Bulk Student Intake Pipeline</h3>
                  <p className="text-xs text-outline font-inter mt-0.5">
                    Automated AI CSV Column Matcher, Duplicate Detector, and Database Ingestion Engine.
                  </p>
                </div>

                <Link
                  href="/admin/intake"
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-jakarta font-bold text-xs hover:bg-slate-800 shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span>Launch Full AI Intake Workspace</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-inter">
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-1">
                  <span className="text-outline uppercase text-[10px] font-mono font-bold">Processed Records</span>
                  <div className="font-jakarta font-extrabold text-2xl text-on-surface">1,198</div>
                  <p className="text-secondary text-[11px] font-bold">Committed to Database</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-1">
                  <span className="text-outline uppercase text-[10px] font-mono font-bold">Pending Validation</span>
                  <div className="font-jakarta font-extrabold text-2xl text-amber-700">42</div>
                  <p className="text-amber-800 text-[11px] font-bold">Awaiting Final Review</p>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant space-y-1">
                  <span className="text-outline uppercase text-[10px] font-mono font-bold">AI Match Accuracy</span>
                  <div className="font-jakarta font-extrabold text-2xl text-primary">99.4%</div>
                  <p className="text-primary text-[11px] font-bold">Schema Auto-Alignment</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CLASHES */}
          {activeTab === 'clashes' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div>
                  <h3 className="font-jakarta font-bold text-lg text-on-surface">Faculty &amp; Timetable Clash Engine</h3>
                  <p className="text-xs text-outline font-inter mt-0.5">
                    Real-time room allocation and faculty scheduling conflict monitor.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold font-jakarta">
                  ✦ AI Scheduling Engine Active
                </span>
              </div>

              <div className="space-y-4">
                {clashes.map((clash) => (
                  <div
                    key={clash.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      clash.resolved
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-amber-50/50 border-amber-200'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-jakarta font-bold text-sm text-on-surface">{clash.room}</span>
                          <span className="font-mono text-xs text-outline font-bold">({clash.timeSlot})</span>
                          {clash.resolved ? (
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                              Resolved ✓
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                              Conflict Detected
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-outline font-inter mt-1">
                          Conflict between <strong>{clash.course1} ({clash.teacher1})</strong> and{' '}
                          <strong>{clash.course2} ({clash.teacher2})</strong>
                        </p>
                      </div>

                      {!clash.resolved && (
                        <button
                          onClick={() => handleResolveClash(clash.id)}
                          className="px-4 py-2 rounded-xl bg-slate-900 text-white font-jakarta font-bold text-xs hover:bg-slate-800 shadow-xs transition-all flex items-center gap-1.5"
                        >
                          <span className="material-symbols-outlined text-sm text-[#6ffbbe]">auto_fix_high</span>
                          <span>Auto-Resolve Clash via AI</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SECURITY */}
          {activeTab === 'security' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-slate-900 font-jakarta font-bold text-sm">
                <span className="material-symbols-outlined text-xl">security</span>
                <span>Institutional Security Vault &amp; Access Controls</span>
              </div>

              <div className="space-y-4 text-xs font-inter">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <div>
                    <p className="font-jakarta font-bold text-xs text-on-surface">Enforce 2-Factor Authentication (MFA)</p>
                    <p className="text-outline text-[11px] mt-0.5">Require all 52 faculty accounts to verify via authenticator app or SMS.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={enforce2FA}
                    onChange={(e) => {
                      setEnforce2FA(e.target.checked);
                      showToast('MFA policy updated for all faculty members.');
                    }}
                    className="w-5 h-5 accent-slate-900 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <div>
                    <p className="font-jakarta font-bold text-xs text-on-surface">CBT Exam Browser Lockdown Mode</p>
                    <p className="text-outline text-[11px] mt-0.5">Prevent student tab switching and clipboard access during mock CBT tests.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={examLockdown}
                    onChange={(e) => {
                      setExamLockdown(e.target.checked);
                      showToast('CBT Exam Lockdown policy updated.');
                    }}
                    className="w-5 h-5 accent-primary cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                  <div>
                    <p className="font-jakarta font-bold text-xs text-on-surface">Automated Hourly SIS Cloud Backup</p>
                    <p className="text-outline text-[11px] mt-0.5">Generate immutable SHA-256 encrypted backups of student transcripts.</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={(e) => {
                      setAutoBackup(e.target.checked);
                      showToast('Automated backup settings saved.');
                    }}
                    className="w-5 h-5 accent-secondary cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
