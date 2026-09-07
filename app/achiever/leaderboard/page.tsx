'use client';

import React, { useState } from 'react';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';
import { useDemo } from '@/components/global/DemoContext';

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

interface HuddleMessage {
  id: string;
  sender: string;
  avatar?: string;
  text: string;
  time: string;
  isUser?: boolean;
}

export default function AchieverLeaderboardPage() {
  const { currentPersona, showToast } = useDemo();
  const [activeTab, setActiveTab] = useState<'national' | 'school' | 'huddle'>('national');
  const [huddleMessages, setHuddleMessages] = useState<HuddleMessage[]>([
    {
      id: '1',
      sender: 'Chinedu Eze',
      text: 'Just completed the 2025 JAMB Physics section. Watch out for Question 3 on electric pump efficiency!',
      time: '2m ago',
    },
    {
      id: '2',
      sender: 'Amina Bello',
      text: 'Who is free for a 15-minute Kinematics & Trajectories live speed sprint?',
      time: '15m ago',
    },
  ]);
  const [chatInput, setChatInput] = useState('');

  const leaderboardData: LeaderboardUser[] = [
    {
      rank: 1,
      name: 'Chinedu Eze',
      school: "King's College, Lagos",
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&auto=format&fit=crop&q=80',
      xp: 9450,
      streak: 28,
      accuracy: 96,
      badge: 'National Diamond',
    },
    {
      rank: 2,
      name: 'Amina Bello',
      school: "Queen's College, Yaba",
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80',
      xp: 8920,
      streak: 24,
      accuracy: 94,
      badge: 'Gold Scholar',
    },
    {
      rank: 3,
      name: currentPersona.name,
      school: currentPersona.institution,
      avatar: currentPersona.avatar,
      xp: currentPersona.metrics.xp || 8420,
      streak: currentPersona.metrics.streak || 14,
      accuracy: 92,
      badge: 'Achiever Elite',
      isCurrentUser: true,
    },
    {
      rank: 4,
      name: 'Tunde Bakare',
      school: 'Loyola Jesuit College, Abuja',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
      xp: 7850,
      streak: 19,
      accuracy: 90,
    },
    {
      rank: 5,
      name: 'Zainab Danjuma',
      school: 'British International School, Lagos',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      xp: 7420,
      streak: 12,
      accuracy: 89,
    },
  ];

  const handleSendHuddle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg: HuddleMessage = {
      id: Date.now().toString(),
      sender: currentPersona.name,
      text: chatInput,
      time: 'Just now',
      isUser: true,
    };

    setHuddleMessages((prev) => [...prev, newMsg]);
    setChatInput('');
    showToast('Posted message to Physics Study Huddle!');

    setTimeout(() => {
      const reply: HuddleMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'Chinedu Eze',
        text: 'Nice point! Let me know if you want to compare solution steps for the range derivation.',
        time: 'Just now',
      };
      setHuddleMessages((prev) => [...prev, reply]);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
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
              <h2 className="font-jakarta font-black text-2xl md:text-3xl text-slate-900">
                Peer Standings &amp; XP Exchanges
              </h2>
              <p className="text-xs text-slate-600 font-inter mt-1 font-medium">
                Weekly national rank resets every Sunday at 23:59 WAT • Top 1% eligible for scholarship grants
              </p>
            </div>

            <div className="flex bg-slate-200 p-1.5 rounded-2xl">
              <button
                onClick={() => setActiveTab('national')}
                className={`px-4 py-2 rounded-xl text-xs font-jakarta font-bold transition-all ${
                  activeTab === 'national'
                    ? 'bg-[#003f7a] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                National Rankings
              </button>
              <button
                onClick={() => setActiveTab('school')}
                className={`px-4 py-2 rounded-xl text-xs font-jakarta font-bold transition-all ${
                  activeTab === 'school'
                    ? 'bg-[#003f7a] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                School Roster
              </button>
              <button
                onClick={() => setActiveTab('huddle')}
                className={`px-4 py-2 rounded-xl text-xs font-jakarta font-bold transition-all ${
                  activeTab === 'huddle'
                    ? 'bg-[#003f7a] text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Study Huddle (8 Online)
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Main Leaderboard Table */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-500 font-mono uppercase">Rank &amp; Student</span>
                <span className="text-xs font-bold text-slate-500 font-mono uppercase">Accuracy &amp; XP</span>
              </div>

              <div className="space-y-2.5">
                {leaderboardData.map((student) => (
                  <div
                    key={student.rank}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      student.isCurrentUser
                        ? 'bg-blue-50/70 border-[#003f7a] ring-2 ring-[#003f7a]/30 shadow-md'
                        : 'border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div
                        className={`w-9 h-9 rounded-xl font-jakarta font-black text-sm flex items-center justify-center shrink-0 shadow-xs ${
                          student.rank === 1
                            ? 'bg-[#fec700] text-[#5b3700] border border-[#c29600]'
                            : student.rank === 2
                            ? 'bg-slate-300 text-slate-900 border border-slate-400'
                            : student.rank === 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-white text-slate-700 border border-slate-300'
                        }`}
                      >
                        #{student.rank}
                      </div>

                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-jakarta font-bold text-sm text-slate-900">
                            {student.name}
                          </h4>
                          {student.isCurrentUser && (
                            <span className="px-2 py-0.5 rounded-full bg-[#003f7a] text-white text-[10px] font-bold uppercase">
                              You
                            </span>
                          )}
                          {student.badge && (
                            <span className="hidden sm:inline-block px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-950 border border-emerald-300 text-[10px] font-bold">
                              {student.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 font-inter mt-0.5 truncate max-w-xs">
                          {student.school}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-right shrink-0">
                      <div className="hidden sm:block">
                        <span className="text-xs font-mono font-bold text-[#006c49]">
                          {student.accuracy}% Acc
                        </span>
                        <p className="text-[11px] text-amber-700 font-inter font-bold">🔥 {student.streak}d</p>
                      </div>

                      <div className="font-mono font-black text-sm text-[#003f7a]">
                        {student.xp.toLocaleString()} <span className="text-xs text-slate-500 font-medium">XP</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Huddle Live Feed */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white rounded-3xl border border-outline-variant p-6 shadow-md space-y-4 flex flex-col justify-between min-h-[480px]">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <h3 className="font-jakarta font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#006c49] text-base">forum</span>
                      <span>Physics Study Huddle</span>
                    </h3>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#006c49] animate-pulse" />
                  </div>

                  <div className="space-y-3 text-xs font-inter mt-3 max-h-72 overflow-y-auto pr-1">
                    {huddleMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3.5 rounded-2xl space-y-1 ${
                          msg.isUser
                            ? 'bg-[#003f7a] text-white'
                            : 'bg-slate-50 border border-slate-200 text-slate-900'
                        }`}
                      >
                        <div className="flex items-center justify-between font-jakarta font-bold text-xs">
                          <span className={msg.isUser ? 'text-white' : 'text-slate-900'}>
                            {msg.sender}
                          </span>
                          <span className={`font-mono text-[10px] ${msg.isUser ? 'text-slate-300' : 'text-slate-500'}`}>
                            {msg.time}
                          </span>
                        </div>
                        <p className={`leading-relaxed text-[11px] ${msg.isUser ? 'text-slate-100' : 'text-slate-700'}`}>
                          {msg.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSendHuddle} className="pt-3 border-t border-slate-200 flex gap-2">
                  <input
                    type="text"
                    placeholder="Share a study tip..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-inter text-slate-900 outline-none focus:border-[#003f7a]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white font-jakarta font-bold text-xs transition-all shrink-0"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
