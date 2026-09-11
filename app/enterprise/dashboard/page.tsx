'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';
import { GlobalHeaderNotifications } from '@/components/global/GlobalHeaderNotifications';

interface SkillMatrixItem {
  team: string;
  skill: string;
  proficiency: number;
  status: 'Mastered' | 'Proficient' | 'Gap Identified';
}

interface CohortTrack {
  id: string;
  title: string;
  enrolled: number;
  completion: number;
  duration: string;
  leadMentor: string;
}

export default function EnterpriseDashboardPage() {
  const { currentPersona, showToast, addNotification, formatCurrency } = useDemo();
  const [activeTab, setActiveTab] = useState<'roi' | 'skills' | 'cohorts' | 'licenses'>('roi');

  // License state
  const [allocatedSeats, setAllocatedSeats] = useState(450);
  const totalSeats = 500;
  const [isSeatModalOpen, setIsSeatModalOpen] = useState(false);
  const [newSeatEmail, setNewSeatEmail] = useState('');
  const [newSeatDept, setNewSeatDept] = useState('Core Engineering');

  // Track state
  const [cohorts, setCohorts] = useState<CohortTrack[]>([
    {
      id: 'trk1',
      title: 'Generative AI & LLM Systems Sprint',
      enrolled: 145,
      completion: 82,
      duration: '6 Weeks',
      leadMentor: 'Dr. Marcus Vance (Imperial Fellow)',
    },
    {
      id: 'trk2',
      title: 'Zero-Trust Architecture & Cloud Security',
      enrolled: 110,
      completion: 94,
      duration: '4 Weeks',
      leadMentor: 'Elena Rodriguez',
    },
    {
      id: 'trk3',
      title: 'High-Throughput Rust & Distributed Systems',
      enrolled: 195,
      completion: 78,
      duration: '8 Weeks',
      leadMentor: 'Prof. Harold Thorne',
    },
  ]);
  const [isNewTrackModalOpen, setIsNewTrackModalOpen] = useState(false);
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackWeeks, setNewTrackWeeks] = useState('6 Weeks');

  // Skills matrix
  const [skills] = useState<SkillMatrixItem[]>([
    { team: 'Machine Learning', skill: 'PyTorch & Fine-Tuning', proficiency: 92, status: 'Mastered' },
    { team: 'Core Platform', skill: 'Rust Distributed Engines', proficiency: 74, status: 'Proficient' },
    { team: 'Cloud Ops', skill: 'Kubernetes Multi-Cluster', proficiency: 88, status: 'Mastered' },
    { team: 'InfoSec', skill: 'Post-Quantum Cryptography', proficiency: 58, status: 'Gap Identified' },
    { team: 'Mobile Platform', skill: 'Offline-First SQLite Architecture', proficiency: 81, status: 'Proficient' },
  ]);

  const handleProvisionSeat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSeatEmail.trim()) return;
    setAllocatedSeats((prev) => Math.min(totalSeats, prev + 1));
    setIsSeatModalOpen(false);
    showToast(`Enterprise license seat provisioned and invitation dispatched to ${newSeatEmail}!`);
    addNotification('New License Provisioned', `Allocated enterprise seat to ${newSeatEmail} (${newSeatDept}).`, 'billing');
    setNewSeatEmail('');
  };

  const handleCreateTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackTitle.trim()) return;
    const newTrack: CohortTrack = {
      id: 'trk_' + Date.now(),
      title: newTrackTitle,
      enrolled: 30,
      completion: 0,
      duration: newTrackWeeks,
      leadMentor: currentPersona.name,
    };
    setCohorts((prev) => [newTrack, ...prev]);
    setIsNewTrackModalOpen(false);
    showToast(`New enterprise learning path "${newTrackTitle}" launched!`);
    addNotification('Cohort Learning Path Created', `Launched ${newTrackTitle} for engineering teams.`, 'academic');
    setNewTrackTitle('');
  };

  const handleDeployIntervention = (skillName: string) => {
    showToast(`Targeted upskilling module deployed for "${skillName}"!`);
    addNotification('Upskilling Sprint Assigned', `Curriculum assigned to address gap in ${skillName}.`, 'academic');
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Enterprise Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
            <span className="material-symbols-outlined text-2xl">trending_up</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Enterprise</h1>
            <span className="text-[10px] font-mono uppercase text-secondary font-bold">Workforce ROI OS</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('roi')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'roi'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">pie_chart</span>
            <span>Workforce ROI Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('skills')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'skills'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">hub</span>
            <span>Skills Gap Matrix</span>
          </button>

          <button
            onClick={() => setActiveTab('cohorts')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'cohorts'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">tune</span>
            <span>Cohort Learning Paths</span>
          </button>

          <button
            onClick={() => setActiveTab('licenses')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'licenses'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">badge</span>
              <span>Seat &amp; License Manager</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full bg-primary-fixed text-primary font-bold text-[10px] font-mono">
              {allocatedSeats}/{totalSeats}
            </span>
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
            <h2 className="font-jakarta font-bold text-base text-on-surface">
              Corporate Workforce Training &amp; ROI Analytics
            </h2>
            <p className="text-xs text-on-surface-variant font-inter">
              {currentPersona.institution} • {allocatedSeats} Active Engineers Enrolled
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSeatModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-jakarta font-bold hover:bg-primary-container transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">person_add</span>
              <span>Provision Seat</span>
            </button>

            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold font-jakarta">
              ✦ ROI Multiplier: 3.4x
            </span>

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
          {/* TAB 1: ROI & VELOCITY */}
          {activeTab === 'roi' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Macro KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md">
                  <span className="text-xs font-mono uppercase text-outline font-semibold">
                    Quarterly Track Completion
                  </span>
                  <div className="font-jakarta font-black text-3xl text-on-surface mt-1">87.4%</div>
                  <span className="text-[11px] font-bold text-secondary mt-1 block">
                    +12.8% vs Tech Industry Benchmark
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md">
                  <span className="text-xs font-mono uppercase text-outline font-semibold">
                    Critical Competencies Covered
                  </span>
                  <div className="font-jakarta font-black text-3xl text-primary mt-1">24 Modules</div>
                  <span className="text-[11px] font-bold text-outline mt-1 block">
                    Cloud Architectures, PyTorch, Rust
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md">
                  <span className="text-xs font-mono uppercase text-outline font-semibold">
                    Productivity Gain Value
                  </span>
                  <div className="font-jakarta font-black text-3xl text-secondary mt-1">
                    {formatCurrency(180000)} / yr
                  </div>
                  <span className="text-[11px] font-bold text-secondary mt-1 block">
                    Verified via GitHub Velocity Metrics
                  </span>
                </div>
              </div>

              {/* Action Banner */}
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="font-jakarta font-bold text-base text-on-surface">
                    Quarterly Executive Upskilling Report (Q1 2026)
                  </h3>
                  <p className="text-xs text-outline font-inter mt-0.5">
                    Synthesized metrics across 450 engineers, certification pass rates, and pull request review speeds.
                  </p>
                </div>

                <button
                  onClick={() => showToast('Quarterly Executive Brief exported to PDF!')}
                  className="px-4 py-2 rounded-xl border border-outline-variant bg-surface-container text-xs font-jakarta font-bold text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">download</span>
                  <span>Export Executive Brief</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SKILLS MATRIX */}
          {activeTab === 'skills' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div>
                  <h3 className="font-jakarta font-bold text-lg text-on-surface">
                    Workforce Skills Gap Matrix
                  </h3>
                  <p className="text-xs text-outline font-inter mt-0.5">
                    Real-time competency assessment mapped across engineering divisions.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {skills.map((item) => (
                  <div
                    key={item.skill}
                    className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-wrap items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-jakarta font-bold text-sm text-on-surface">{item.skill}</span>
                        <span className="text-xs text-outline font-mono">({item.team})</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                            item.status === 'Mastered'
                              ? 'bg-green-100 text-green-900 border border-green-300'
                              : item.status === 'Proficient'
                              ? 'bg-blue-100 text-blue-900 border border-blue-200'
                              : 'bg-amber-100 text-amber-900 border border-amber-300'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="w-48 bg-surface-container-highest rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              item.proficiency >= 85
                                ? 'bg-secondary'
                                : item.proficiency >= 70
                                ? 'bg-primary'
                                : 'bg-amber-500'
                            }`}
                            style={{ width: `${item.proficiency}%` }}
                          />
                        </div>
                        <span className="font-mono text-xs font-bold text-on-surface">
                          {item.proficiency}% Proficiency
                        </span>
                      </div>
                    </div>

                    {item.status === 'Gap Identified' && (
                      <button
                        onClick={() => handleDeployIntervention(item.skill)}
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-xs transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">bolt</span>
                        <span>Deploy Upskilling Sprint</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: COHORT LEARNING PATHS */}
          {activeTab === 'cohorts' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div>
                  <h3 className="font-jakarta font-bold text-lg text-on-surface">Active Cohort Learning Paths</h3>
                  <p className="text-xs text-outline font-inter mt-0.5">
                    Customized curriculums and industry certification tracks.
                  </p>
                </div>

                <button
                  onClick={() => setIsNewTrackModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>Create Custom Track</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cohorts.map((c) => (
                  <div
                    key={c.id}
                    className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-col justify-between space-y-4 hover:border-primary transition-all shadow-xs"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-mono text-[10px] uppercase font-bold text-outline">
                          {c.duration}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary-fixed/40 text-primary">
                          {c.enrolled} Engineers
                        </span>
                      </div>

                      <h4 className="font-jakarta font-bold text-sm text-on-surface">{c.title}</h4>
                      <p className="text-[11px] text-outline font-inter mt-1">Lead: {c.leadMentor}</p>

                      <div className="mt-4 space-y-1">
                        <div className="flex justify-between text-xs font-inter">
                          <span className="text-outline">Completion</span>
                          <span className="font-mono font-bold text-secondary">{c.completion}%</span>
                        </div>
                        <div className="w-full bg-surface-container-highest rounded-full h-2">
                          <div className="bg-secondary h-2 rounded-full" style={{ width: `${c.completion}%` }} />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast(`Opening deep analytics for ${c.title}...`)}
                      className="w-full py-2 rounded-xl bg-surface-container-high hover:bg-surface-container-highest text-primary font-jakarta font-bold text-xs text-center transition-all"
                    >
                      View Cohort Progress →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SEAT & LICENSE MANAGER */}
          {activeTab === 'licenses' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <div>
                  <h3 className="font-jakarta font-bold text-lg text-on-surface">Seat &amp; License Provisioning</h3>
                  <p className="text-xs text-outline font-inter mt-0.5">
                    Manage corporate seats, single sign-on (SSO) links, and billing tiers.
                  </p>
                </div>

                <button
                  onClick={() => setIsSeatModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-xs transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  <span>Provision New Seat</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-1">
                  <span className="text-outline uppercase text-[10px] font-mono font-bold">Total Enterprise Capacity</span>
                  <div className="font-jakarta font-extrabold text-3xl text-on-surface">{totalSeats} Seats</div>
                  <p className="text-outline text-xs">Annual Enterprise License</p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-1">
                  <span className="text-outline uppercase text-[10px] font-mono font-bold">Currently Provisioned</span>
                  <div className="font-jakarta font-extrabold text-3xl text-primary">{allocatedSeats} Seats</div>
                  <p className="text-secondary text-xs font-bold">90% Utilization Rate</p>
                </div>

                <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-1">
                  <span className="text-outline uppercase text-[10px] font-mono font-bold">Available Seats</span>
                  <div className="font-jakarta font-extrabold text-3xl text-amber-700">
                    {totalSeats - allocatedSeats} Remaining
                  </div>
                  <p className="text-outline text-xs">Instant 1-Click Provisioning</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Provision Seat Modal */}
      {isSeatModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-jakarta font-bold text-base text-on-surface">Provision Enterprise Seat</h3>
              <button onClick={() => setIsSeatModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleProvisionSeat} className="space-y-4 text-xs font-inter">
              <div>
                <label className="block font-bold text-on-surface mb-1">Employee Work Email:</label>
                <input
                  type="email"
                  required
                  placeholder="engineer@techglobal.com"
                  value={newSeatEmail}
                  onChange={(e) => setNewSeatEmail(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Department / Team:</label>
                <select
                  value={newSeatDept}
                  onChange={(e) => setNewSeatDept(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface"
                >
                  <option value="Core Engineering">Core Platform Engineering</option>
                  <option value="AI / ML Systems">Machine Learning &amp; AI Systems</option>
                  <option value="Cloud Infrastructure">Cloud Infrastructure &amp; DevOps</option>
                  <option value="Cybersecurity">Information Security</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsSeatModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-jakarta font-bold hover:bg-primary-container shadow-xs"
                >
                  Assign &amp; Send Invite
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Custom Track Modal */}
      {isNewTrackModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-jakarta font-bold text-base text-on-surface">Create Cohort Learning Track</h3>
              <button onClick={() => setIsNewTrackModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateTrack} className="space-y-4 text-xs font-inter">
              <div>
                <label className="block font-bold text-on-surface mb-1">Track Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Database Engineering"
                  value={newTrackTitle}
                  onChange={(e) => setNewTrackTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Duration:</label>
                <select
                  value={newTrackWeeks}
                  onChange={(e) => setNewTrackWeeks(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface"
                >
                  <option value="4 Weeks">4 Weeks (Intensive)</option>
                  <option value="6 Weeks">6 Weeks (Standard)</option>
                  <option value="8 Weeks">8 Weeks (Comprehensive Deep Dive)</option>
                  <option value="12 Weeks">12 Weeks (Full Transformation Track)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNewTrackModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-jakarta font-bold hover:bg-primary-container shadow-xs"
                >
                  Launch Track
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
