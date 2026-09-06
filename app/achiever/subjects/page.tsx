'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';

interface Subject {
  id: string;
  name: string;
  code: string;
  icon: string;
  mastery: number;
  totalTopics: number;
  completedTopics: number;
  urgentTopics: number;
  color: string;
}

const SUBJECTS: Subject[] = [
  {
    id: 'physics',
    name: 'Senior Physics (UTME/WAEC)',
    code: 'PHY-301',
    icon: 'functions',
    mastery: 84,
    totalTopics: 18,
    completedTopics: 15,
    urgentTopics: 1,
    color: 'text-primary',
  },
  {
    id: 'chemistry',
    name: 'General Chemistry',
    code: 'CHM-302',
    icon: 'science',
    mastery: 88,
    totalTopics: 16,
    completedTopics: 14,
    urgentTopics: 0,
    color: 'text-secondary',
  },
  {
    id: 'mathematics',
    name: 'Further & Core Mathematics',
    code: 'MTH-303',
    icon: 'calculate',
    mastery: 79,
    totalTopics: 22,
    completedTopics: 17,
    urgentTopics: 2,
    color: 'text-primary',
  },
  {
    id: 'biology',
    name: 'Senior Biology & Genetics',
    code: 'BIO-304',
    icon: 'psychology_alt',
    mastery: 91,
    totalTopics: 14,
    completedTopics: 13,
    urgentTopics: 0,
    color: 'text-secondary',
  },
  {
    id: 'english',
    name: 'English Language & Lexis',
    code: 'ENG-305',
    icon: 'menu_book',
    mastery: 85,
    totalTopics: 12,
    completedTopics: 10,
    urgentTopics: 1,
    color: 'text-tertiary',
  },
];

export default function AchieverSubjectsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'priority'>('all');

  const filtered = activeTab === 'priority' ? SUBJECTS.filter((s) => s.urgentTopics > 0) : SUBJECTS;

  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Subject Library & Syllabus Mastery"
          subtitle="WAEC & UTME Standardized Curriculum Hub"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-2xl text-on-surface">
                Curriculum Subjects
              </h2>
              <p className="text-xs text-on-surface-variant font-inter mt-1">
                Official syllabus tracking mapped to national benchmarks
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-surface-container-high p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-jakarta font-semibold transition-all ${
                    activeTab === 'all'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-on-surface-variant'
                  }`}
                >
                  All Subjects ({SUBJECTS.length})
                </button>
                <button
                  onClick={() => setActiveTab('priority')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-jakarta font-semibold transition-all ${
                    activeTab === 'priority'
                      ? 'bg-white text-error shadow-xs'
                      : 'text-on-surface-variant'
                  }`}
                >
                  Needs Attention (3)
                </button>
              </div>

              <Link
                href="/achiever/diagnostic"
                className="px-4 py-2 rounded-xl bg-secondary text-on-secondary font-jakarta font-bold text-xs hover:bg-secondary/90 shadow-sm transition-all flex items-center gap-1"
              >
                <span>✦ Diagnostic Drill</span>
              </Link>
            </div>
          </div>

          {/* Subject Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((subject) => (
              <div
                key={subject.id}
                className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm hover:shadow-md hover:border-primary transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">{subject.icon}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-outline uppercase">
                      {subject.code}
                    </span>
                  </div>

                  <h3 className="font-jakarta font-bold text-base text-on-surface">
                    {subject.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs font-inter text-on-surface-variant mt-2 mb-1">
                    <span>Mastery Progress</span>
                    <span className="font-mono font-bold text-primary">{subject.mastery}%</span>
                  </div>

                  <div className="w-full bg-surface-container-highest rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${subject.mastery}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 text-xs text-on-surface-variant font-inter">
                    <span>
                      {subject.completedTopics}/{subject.totalTopics} Topics Mastered
                    </span>
                    {subject.urgentTopics > 0 ? (
                      <span className="text-error font-semibold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-error" />
                        {subject.urgentTopics} Gaps
                      </span>
                    ) : (
                      <span className="text-secondary font-semibold">100% On Track</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-container flex items-center justify-between gap-2">
                  <Link
                    href="/achiever/diagnostic"
                    className="flex-1 py-2 text-center rounded-xl bg-surface-container-high text-primary font-jakarta font-bold text-xs hover:bg-primary-fixed transition-colors"
                  >
                    Launch Topic Test
                  </Link>
                  <Link
                    href="/achiever/ai-partner"
                    className="p-2 rounded-xl border border-outline-variant text-outline hover:text-primary hover:border-primary transition-colors"
                    title="Study with AI"
                  >
                    <span className="material-symbols-outlined text-base">smart_toy</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
