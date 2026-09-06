'use client';

import React, { useState } from 'react';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';

interface LeaderboardUser {
  rank: number;
  name: string;
  school: string;
  avatar: string;
  xp: number;
  streak: number;
  accuracy: number;
  badge?: string;
  isCurrentUser?: boolean;
}

const LEADERBOARD_DATA: LeaderboardUser[] = [
  {
    rank: 1,
    name: 'Chinedu Eze',
    school: "King's College, Lagos",
    avatar: 'CE',
    xp: 4820,
    streak: 28,
    accuracy: 96,
    badge: 'National Diamond',
  },
  {
    rank: 2,
    name: 'Amina Bello',
    school: 'Queen’s College, Yaba',
    avatar: 'AB',
    xp: 4650,
    streak: 24,
    accuracy: 94,
    badge: 'Gold Scholar',
  },
  {
    rank: 3,
    name: 'Alex Okafor',
    school: 'Corona Secondary School, Agbara',
    avatar: 'AO',
    xp: 4320,
    streak: 14,
    accuracy: 92,
    badge: 'Elite Achiever',
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: 'Tunde Bakare',
    school: 'Loyola Jesuit College, Abuja',
    avatar: 'TB',
    xp: 4110,
    streak: 19,
    accuracy: 90,
  },
  {
    rank: 5,
    name: 'Zainab Danjuma',
    school: 'British International School, Lagos',
    avatar: 'ZD',
    xp: 3950,
    streak: 12,
    accuracy: 89,
  },
];

export default function AchieverLeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'national' | 'school' | 'huddle'>('national');

  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="National Peer Leaderboard & Huddle Feed"
          subtitle="Top Performing UTME / WAEC Candidates • Live Class Standings"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-2xl text-on-surface">
                Peer Standings & XP Exchanges
              </h2>
              <p className="text-xs text-on-surface-variant font-inter mt-1">
                Weekly national rank resets every Sunday at 23:59 WAT
              </p>
            </div>

            <div className="flex bg-surface-container-high p-1 rounded-xl">
              <button
                onClick={() => setActiveTab('national')}
                className={`px-4 py-2 rounded-lg text-xs font-jakarta font-bold transition-all ${
                  activeTab === 'national'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                National Rankings
              </button>
              <button
                onClick={() => setActiveTab('school')}
                className={`px-4 py-2 rounded-lg text-xs font-jakarta font-bold transition-all ${
                  activeTab === 'school'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Corona Secondary Roster
              </button>
              <button
                onClick={() => setActiveTab('huddle')}
                className={`px-4 py-2 rounded-lg text-xs font-jakarta font-bold transition-all ${
                  activeTab === 'huddle'
                    ? 'bg-primary text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Study Huddle (8)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Leaderboard Table */}
            <div className="lg:col-span-8 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="text-xs font-bold text-outline font-mono uppercase">Rank & Student</span>
                <span className="text-xs font-bold text-outline font-mono uppercase">Mastery & XP</span>
              </div>

              <div className="space-y-2">
                {LEADERBOARD_DATA.map((student) => (
                  <div
                    key={student.rank}
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                      student.isCurrentUser
                        ? 'bg-primary-fixed/40 border-primary ring-1 ring-primary'
                        : 'border-outline-variant/60 bg-surface-container-low hover:border-outline'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-8 h-8 rounded-full font-jakarta font-black text-sm flex items-center justify-center shrink-0 ${
                          student.rank === 1
                            ? 'bg-tertiary text-white shadow-xs'
                            : student.rank === 2
                            ? 'bg-slate-400 text-white'
                            : student.rank === 3
                            ? 'bg-amber-700 text-white'
                            : 'bg-surface-container-high text-on-surface-variant'
                        }`}
                      >
                        {student.rank}
                      </div>

                      <div className="w-10 h-10 rounded-full bg-primary-container/20 text-primary font-jakarta font-bold text-sm flex items-center justify-center shrink-0">
                        {student.avatar}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-jakarta font-bold text-sm text-on-surface">
                            {student.name}
                          </h4>
                          {student.isCurrentUser && (
                            <span className="px-2 py-0.5 rounded-full bg-primary text-white text-[10px] font-bold uppercase">
                              You
                            </span>
                          )}
                          {student.badge && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold">
                              {student.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-on-surface-variant font-inter">
                          {student.school}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right">
                      <div className="hidden sm:block">
                        <span className="text-xs font-mono font-bold text-secondary">
                          {student.accuracy}% Acc
                        </span>
                        <p className="text-[11px] text-outline font-inter">🔥 {student.streak}d</p>
                      </div>

                      <div className="font-mono font-bold text-sm text-primary">
                        {student.xp.toLocaleString()} <span className="text-xs text-outline">XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Huddle Live Feed */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-surface-container">
                  <h3 className="font-jakarta font-bold text-sm text-on-surface flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-secondary text-base">forum</span>
                    <span>Physics Study Huddle</span>
                  </h3>
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping" />
                </div>

                <div className="space-y-3 text-xs font-inter">
                  <div className="p-3 rounded-xl bg-surface-container-low space-y-1">
                    <div className="flex items-center justify-between font-jakarta font-bold text-on-surface">
                      <span>Chinedu Eze</span>
                      <span className="font-mono text-[10px] text-outline">2m ago</span>
                    </div>
                    <p className="text-on-surface-variant">
                      Just completed the 2023 FRQ Physics section. Watch out for Question 3 on pump efficiency!
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low space-y-1">
                    <div className="flex items-center justify-between font-jakarta font-bold text-on-surface">
                      <span>Amina Bello</span>
                      <span className="font-mono text-[10px] text-outline">15m ago</span>
                    </div>
                    <p className="text-on-surface-variant">
                      Who is free for a 15-minute Kinematics live showdown test?
                    </p>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl border border-primary text-primary font-jakarta font-bold text-xs hover:bg-primary-fixed transition-colors">
                  Join Live Study Huddle
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
