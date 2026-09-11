'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';

export default function GlobalSettingsPage() {
  const { currentPersona, showToast } = useDemo();
  const [twoFactor, setTwoFactor] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Identity vault & security preferences updated successfully!');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 px-6 md:px-12 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <Link href={currentPersona.primaryPath} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#003f7a] text-white flex items-center justify-center font-bold shadow-xs">
            ✦
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-slate-900 leading-tight">
              EduWorld Settings
            </h1>
            <span className="text-[11px] font-mono text-slate-500 font-bold">
              Unified Identity &amp; Security Vault
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={currentPersona.primaryPath}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-jakarta font-bold text-xs transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Return to Workspace</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-4xl mx-auto w-full space-y-8">
        <div>
          <h2 className="font-jakarta font-black text-2xl md:text-3xl text-slate-900">
            Account &amp; Security Preferences
          </h2>
          <p className="text-xs text-slate-600 font-inter mt-1">
            Manage your credentials, 2-factor authentication, role permissions, and notification dispatchers.
          </p>
        </div>

        {/* Current Persona Card */}
        <div className="bg-[#131b2e] text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-700 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-white/20 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-jakarta font-bold text-lg text-white">{currentPersona.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${currentPersona.badgeColor}`}>
                  {currentPersona.badge}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">{currentPersona.roleTitle}</p>
              <p className="text-[11px] text-slate-400 font-mono mt-1">{currentPersona.institution}</p>
            </div>
          </div>

          <Link
            href="/role-select"
            className="px-4 py-2.5 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white font-jakarta font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <span className="material-symbols-outlined text-base text-[#6ffbbe]">swap_horiz</span>
            <span>Switch Role Profile</span>
          </Link>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Security & Access */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-[#003f7a]">
              <span className="material-symbols-outlined text-xl">security</span>
              <h3 className="font-jakarta font-bold text-base text-slate-900">
                Security &amp; Multi-Factor Auth (MFA)
              </h3>
            </div>

            <div className="space-y-4 text-xs font-inter">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-bold text-slate-900">Two-Factor Authentication (2FA)</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Require biometric confirmation or authenticator code on unrecognized devices.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={twoFactor}
                  onChange={(e) => setTwoFactor(e.target.checked)}
                  className="w-5 h-5 accent-[#003f7a] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <div>
                  <p className="font-bold text-slate-900">Automated Exam Integrity Logging</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Encrypt diagnostic timestamps and answer verification hashes into institutional vault.
                  </p>
                </div>
                <span className="text-[11px] font-mono font-bold text-[#006c49] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Always Active
                </span>
              </div>
            </div>
          </div>

          {/* AI Tutor & Learning Experience */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-md space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-[#006c49]">
              <span className="material-symbols-outlined text-xl">psychology</span>
              <h3 className="font-jakarta font-bold text-base text-slate-900">
                AI Tutor &amp; Gamification Mechanics
              </h3>
            </div>

            <div className="space-y-4 text-xs font-inter">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="font-bold text-slate-900">Real-Time Socratic AI Recommendations</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Allow EduWorld AI to suggest custom practice drills based on diagnostic gaps.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={aiSuggestions}
                  onChange={(e) => setAiSuggestions(e.target.checked)}
                  className="w-5 h-5 accent-[#006c49] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <div>
                  <p className="font-bold text-slate-900">Sound Effects &amp; Celebration Audio</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Play audio cues when completing daily quests, earning stars, or reaching study streaks.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="w-5 h-5 accent-[#003f7a] cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-t border-slate-100">
                <div>
                  <p className="font-bold text-slate-900">Email Digest &amp; Examination Reminders</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Receive weekly AI executive performance summaries and test reminders via email.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="w-5 h-5 accent-[#003f7a] cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white font-jakarta font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95"
            >
              <span className="material-symbols-outlined text-base">save</span>
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
