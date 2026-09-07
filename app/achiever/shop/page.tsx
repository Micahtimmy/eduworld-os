'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';
import { useDemo } from '@/components/global/DemoContext';

interface RewardItem {
  id: string;
  title: string;
  category: 'Protection' | 'Exam Tokens' | 'AI Upgrades' | 'Masterclasses';
  cost: number;
  icon: string;
  iconBg: string;
  description: string;
  popular?: boolean;
}

const REWARDS: RewardItem[] = [
  {
    id: 'streak-shield',
    title: '48-Hour Streak Freeze Shield',
    category: 'Protection',
    cost: 500,
    icon: 'shield',
    iconBg: 'bg-amber-100 text-amber-950 border border-amber-300',
    description: 'Protects your 14-day study streak if you miss a study session due to emergencies or travel.',
    popular: true,
  },
  {
    id: 'mock-pass',
    title: 'JAMB Full CBT Proctored Pass',
    category: 'Exam Tokens',
    cost: 1200,
    icon: 'timer',
    iconBg: 'bg-blue-100 text-[#003f7a] border border-blue-200',
    description: 'Unlocks 1 full 180-question 4-subject timed CBT mock with national percentile benchmarking.',
    popular: true,
  },
  {
    id: 'socratic-unlimited',
    title: 'Socratic AI Voice Tutor (7-Day Pass)',
    category: 'AI Upgrades',
    cost: 800,
    icon: 'record_voice_over',
    iconBg: 'bg-emerald-100 text-emerald-950 border border-emerald-300',
    description: 'Enables interactive voice conversation with EduWorld Socratic tutor for real-time oral drills.',
  },
  {
    id: 'university-prep',
    title: 'Imperial & Ivy Admissions Masterclass',
    category: 'Masterclasses',
    cost: 2500,
    icon: 'school',
    iconBg: 'bg-purple-100 text-purple-950 border border-purple-300',
    description: 'Full video series on international university entrance exams, personal statements, and scholarship portfolios.',
  },
];

export default function AchieverShopPage() {
  const { currentPersona, showToast } = useDemo();
  const [userXP, setUserXP] = useState(currentPersona.metrics.xp || 8420);
  const [purchased, setPurchased] = useState<Record<string, boolean>>({});

  const handleRedeem = (item: RewardItem) => {
    if (userXP < item.cost) {
      showToast(`Not enough XP! You need ${item.cost - userXP} more XP.`);
      return;
    }

    setUserXP((prev) => prev - item.cost);
    setPurchased((prev) => ({ ...prev, [item.id]: true }));
    showToast(`Successfully redeemed "${item.title}"!`);
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Elite XP Exchange & Rewards Vault"
          subtitle="Redeem Earned Diagnostic Points for Power-Ups • Frame EWD-035"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Hero Banner with Live Balance */}
          <div className="bg-gradient-to-r from-[#003f7a] via-[#1e5799] to-[#002b55] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2 z-10 max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-jakarta font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-amber-300 text-sm">bolt</span>
                <span>Elite Achiever Rewards</span>
              </div>
              <h2 className="font-jakarta font-black text-2xl md:text-3xl text-white">
                Turn your diagnostic study hours into real academic advantages.
              </h2>
              <p className="text-xs text-slate-200 font-inter leading-relaxed">
                Earn XP by completing daily CBT drills, maintaining unbroken study streaks, and mastering syllabus topics.
              </p>
            </div>

            {/* XP Balance Display */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center min-w-[200px] z-10">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300 font-bold block">
                Available Balance
              </span>
              <div className="font-jakarta font-black text-4xl text-amber-300 my-1 flex items-center justify-center gap-1">
                <span className="material-symbols-outlined text-3xl">bolt</span>
                <span>{userXP.toLocaleString()}</span>
              </div>
              <span className="text-xs font-mono text-emerald-300 font-bold">+120 XP today</span>
            </div>
          </div>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {REWARDS.map((item) => {
              const isRedeemed = purchased[item.id];
              const canAfford = userXP >= item.cost;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-outline-variant p-6 shadow-md hover:shadow-lg transition-all flex flex-col justify-between relative group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.iconBg}`}>
                          <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-jakarta font-bold text-base text-slate-900">
                              {item.title}
                            </h3>
                          </div>
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {item.popular && (
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-950 text-[10px] font-extrabold uppercase font-jakarta border border-amber-300">
                          Popular
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-600 font-inter leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 font-jakarta font-black text-base text-[#003f7a]">
                      <span className="material-symbols-outlined text-lg text-amber-600">bolt</span>
                      <span>{item.cost} XP</span>
                    </div>

                    {isRedeemed ? (
                      <span className="px-4 py-2 rounded-xl bg-emerald-100 text-emerald-950 font-jakarta font-bold text-xs flex items-center gap-1.5 border border-emerald-300">
                        <span className="material-symbols-outlined text-base">check_circle</span>
                        <span>Active in Vault</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => handleRedeem(item)}
                        disabled={!canAfford}
                        className={`px-5 py-2.5 rounded-xl font-jakarta font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95 ${
                          canAfford
                            ? 'bg-[#003f7a] text-white hover:bg-[#1e5799]'
                            : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">redeem</span>
                        <span>Redeem Reward</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Info Box */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex items-center justify-between text-xs text-slate-600 font-inter">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-slate-500 text-lg">info</span>
              <span>All mock test tokens and streak shields are instantly credited to your active Achiever profile.</span>
            </div>
            <Link href="/achiever/diagnostic" className="text-[#003f7a] font-bold hover:underline">
              Take Diagnostic (+150 XP) →
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
