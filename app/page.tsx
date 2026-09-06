'use client';

import React from 'react';
import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between selection:bg-primary-fixed">
      {/* Top Header */}
      <header className="px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-jakarta font-bold text-lg shadow-sm">
            ✦
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-lg text-on-surface leading-tight">
              EduWorld
            </h1>
            <span className="text-[11px] font-mono text-primary font-semibold">
              Unified Learning OS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="text-xs font-jakarta font-semibold text-on-surface hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/role-select"
            className="px-4 py-2 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container transition-all shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Main Hero (EWD-001) */}
      <main className="max-w-5xl mx-auto px-6 py-12 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-jakarta font-bold text-xs uppercase tracking-wider shadow-xs">
          <span>✦ Intelligent Education Operating System</span>
        </div>

        <h1 className="font-jakarta font-extrabold text-4xl sm:text-6xl text-on-surface leading-tight tracking-tight max-w-4xl mx-auto">
          The Architecture for <span className="text-primary">Humanist Intelligence</span> in
          Learning
        </h1>

        <p className="font-inter text-base sm:text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          From Primary K-12 gamified adventures and secondary JAMB/WAEC diagnostic tutors, to Ivy
          League research workspaces and institutional governance.
        </p>

        {/* Primary CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link
            href="/achiever/diagnostic"
            className="px-6 py-3.5 rounded-xl bg-secondary text-on-secondary font-jakarta font-bold text-sm hover:bg-secondary/90 shadow-md transition-all flex items-center gap-2"
          >
            <span>Launch JAMB / WAEC Diagnostic (Achiever Wedge)</span>
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </Link>

          <Link
            href="/role-select"
            className="px-6 py-3.5 rounded-xl bg-primary text-white font-jakarta font-bold text-sm hover:bg-primary-container shadow-md transition-all flex items-center gap-2"
          >
            <span>Explore All 8 Role Tiers</span>
            <span className="material-symbols-outlined text-lg">switch_account</span>
          </Link>
        </div>

        {/* 3 Tier Quick Preview Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 text-left">
          <Link
            href="/explorer/dashboard"
            className="bg-white rounded-2xl p-6 border border-outline-variant hover:border-explorer-primary hover:shadow-md transition-all group"
          >
            <span className="text-3xl">🚀</span>
            <h3 className="font-jakarta font-bold text-base text-on-surface mt-3 group-hover:text-explorer-primary">
              Explorer Tier (K-12)
            </h3>
            <p className="text-xs text-on-surface-variant font-inter mt-1">
              Tactile, gamified journey map with The Spark AI companion.
            </p>
          </Link>

          <Link
            href="/achiever/diagnostic"
            className="bg-white rounded-2xl p-6 border-2 border-primary shadow-sm hover:shadow-md transition-all group"
          >
            <span className="text-3xl">🎯</span>
            <h3 className="font-jakarta font-bold text-base text-primary mt-3">
              Achiever Tier (Secondary &amp; UTME/WAEC)
            </h3>
            <p className="text-xs text-on-surface-variant font-inter mt-1">
              High-velocity CBT diagnostic tutor, countdowns &amp; syllabus mastery.
            </p>
          </Link>

          <Link
            href="/scholar/dashboard"
            className="bg-white rounded-2xl p-6 border border-outline-variant hover:border-scholar-primary hover:shadow-md transition-all group"
          >
            <span className="text-3xl">🏛️</span>
            <h3 className="font-jakarta font-bold text-base text-on-surface mt-3 group-hover:text-scholar-primary">
              Scholar Tier (University &amp; Research)
            </h3>
            <p className="text-xs text-on-surface-variant font-inter mt-1">
              Desktop-first academic command center &amp; AI literature gap synthesis.
            </p>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-outline-variant text-center text-xs font-inter text-outline flex items-center justify-between">
        <span>EduWorld Global OS • Frame EWD-001</span>
        <span className="font-mono">Press ⌘K for Command Palette</span>
      </footer>
    </div>
  );
}
