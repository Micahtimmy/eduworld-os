'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ExplorerNav } from '@/components/explorer/ExplorerNav';
import { useDemo } from '@/components/global/DemoContext';

interface Quest {
  id: string;
  title: string;
  category: string;
  rewardStars: number;
  current: number;
  target: number;
  completed: boolean;
  claimed: boolean;
  icon: string;
}

interface Badge {
  id: string;
  title: string;
  unlockedAt: string;
  icon: string;
  tier: 'Gold' | 'Silver' | 'Bronze' | 'Diamond';
  desc: string;
}

const INITIAL_QUESTS: Quest[] = [
  {
    id: 'q1',
    title: 'Explore Mars with Spark AI',
    category: 'Space Discovery',
    rewardStars: 50,
    current: 1,
    target: 1,
    completed: true,
    claimed: false,
    icon: 'rocket_launch',
  },
  {
    id: 'q2',
    title: 'Solve 3 Daily Math Puzzles',
    category: 'Brain Workout',
    rewardStars: 75,
    current: 2,
    target: 3,
    completed: false,
    claimed: false,
    icon: 'calculate',
  },
  {
    id: 'q3',
    title: 'Read the Coral Reef Eco Story',
    category: 'Nature Trail',
    rewardStars: 40,
    current: 1,
    target: 1,
    completed: true,
    claimed: true,
    icon: 'water',
  },
  {
    id: 'q4',
    title: 'Maintain a 7-Day Explorer Streak',
    category: 'Consistency',
    rewardStars: 100,
    current: 7,
    target: 7,
    completed: true,
    claimed: false,
    icon: 'local_fire_department',
  },
];

const BADGES: Badge[] = [
  {
    id: 'b1',
    title: 'Galactic Cadet',
    unlockedAt: 'Unlocked Yesterday',
    icon: 'military_tech',
    tier: 'Gold',
    desc: 'Completed all 8 planetary stages in the Solar System mission.',
  },
  {
    id: 'b2',
    title: 'Curious Explorer',
    unlockedAt: 'Unlocked 3 days ago',
    icon: 'lightbulb',
    tier: 'Diamond',
    desc: 'Asked Spark AI Buddy 25 inquisitive science questions.',
  },
  {
    id: 'b3',
    title: 'Starlight Master',
    unlockedAt: 'Unlocked last week',
    icon: 'grade',
    tier: 'Gold',
    desc: 'Collected over 2,500 shiny adventure stars.',
  },
  {
    id: 'b4',
    title: 'Dino Fossil Detective',
    unlockedAt: 'In Progress',
    icon: 'pets',
    tier: 'Silver',
    desc: 'Excavated 10 dinosaur bones in prehistoric archaeology.',
  },
];

export default function ExplorerQuestsPage() {
  const { showToast } = useDemo();
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [chestOpened, setChestOpened] = useState(false);
  const [chestPrize, setChestPrize] = useState<string | null>(null);

  const handleClaimQuest = (questId: string) => {
    setQuests((prev) =>
      prev.map((q) => {
        if (q.id === questId) {
          showToast(`Claimed +${q.rewardStars} Stars for completing "${q.title}"! ⭐`);
          return { ...q, claimed: true };
        }
        return q;
      })
    );
  };

  const handleOpenChest = () => {
    if (chestOpened) return;
    setChestOpened(true);
    setChestPrize('Super Astronaut Helmet + 150 Bonus Stars! 🚀⭐');
    showToast('🎉 Mystery Treasure Chest Opened! +150 Stars!');
  };

  return (
    <div className="min-h-screen bg-[#fbf9f9] flex flex-col font-jakarta">
      <ExplorerNav />

      <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full space-y-8">
        {/* Header Title */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#2b6c00] text-xs font-black uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">emoji_events</span>
              <span>Quests &amp; Trophy Vault</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mt-1">
              Daily Quests &amp; Achievements
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Complete fun learning missions every day to earn stars, badges, and mystery treasure chests!
            </p>
          </div>

          <Link
            href="/explorer/shop"
            className="px-5 py-3 rounded-2xl bg-[#fec700] text-[#6e5400] font-black text-xs hover:bg-[#ebd500] shadow-md border-b-4 border-[#c29600] flex items-center gap-1.5 transition-all tactile-btn active:scale-95"
          >
            <span className="material-symbols-outlined text-base">shopping_bag</span>
            <span>Spend Stars in Shop</span>
          </Link>
        </div>

        {/* Daily Mystery Chest Banner */}
        <div className="bg-gradient-to-r from-[#2b6c00] to-[#58cc02] rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden flex flex-wrap items-center justify-between gap-6 border-b-8 border-[#1f5100]">
          <div className="max-w-xl space-y-2 z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-xs font-black uppercase tracking-wider text-white">
              🎁 Daily Mystery Treasure Box
            </span>
            <h2 className="text-2xl md:text-3xl font-black text-white">
              You unlocked today&apos;s Golden Star Chest!
            </h2>
            <p className="text-xs text-emerald-100 leading-relaxed font-medium">
              Tap the chest to reveal your mystery gift, bonus stars, or rare avatar power-ups.
            </p>
          </div>

          <div className="z-10 flex flex-col items-center gap-2">
            <button
              onClick={handleOpenChest}
              disabled={chestOpened}
              className={`p-6 rounded-3xl text-center transition-all transform hover:scale-105 active:scale-95 border-4 ${
                chestOpened
                  ? 'bg-amber-100 text-amber-950 border-amber-400'
                  : 'bg-[#fec700] text-[#6e5400] border-[#c29600] shadow-2xl animate-bounce'
              }`}
            >
              <span className="material-symbols-outlined text-6xl block">
                {chestOpened ? 'lock_open_right' : 'inventory_2'}
              </span>
              <span className="text-xs font-black uppercase tracking-wider mt-1 block">
                {chestOpened ? 'Opened!' : 'Tap to Open!'}
              </span>
            </button>
            {chestPrize && (
              <span className="text-xs font-black text-white bg-black/30 px-3 py-1 rounded-full animate-in fade-in">
                {chestPrize}
              </span>
            )}
          </div>
        </div>

        {/* Grid: Quests Left (7 cols), Badges Right (5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Daily Quests List */}
          <div className="lg:col-span-7 bg-white rounded-3xl border-4 border-[#becbb1] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#2b6c00] text-2xl">checklist</span>
                <h3 className="font-black text-lg text-slate-900">Today&apos;s Active Quests</h3>
              </div>
              <span className="text-xs font-mono text-[#2b6c00] font-black bg-green-100 px-2.5 py-1 rounded-full border border-green-300">
                Resets in 6h 30m
              </span>
            </div>

            <div className="space-y-3">
              {quests.map((quest) => (
                <div
                  key={quest.id}
                  className="p-4 rounded-2xl bg-slate-50 border-2 border-slate-200 flex items-center justify-between gap-4 hover:border-slate-300 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-green-100 border border-green-300 text-[#2b6c00] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-2xl">{quest.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-sm text-slate-900 truncate">
                        {quest.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                        {quest.category} • Progress: {quest.current}/{quest.target}
                      </p>
                      <div className="w-32 h-2 bg-slate-200 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className="bg-[#2b6c00] h-full rounded-full transition-all"
                          style={{ width: `${(quest.current / quest.target) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="shrink-0">
                    {quest.claimed ? (
                      <span className="px-3 py-1.5 rounded-full bg-slate-200 text-slate-600 font-bold text-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">check</span>
                        <span>Claimed</span>
                      </span>
                    ) : quest.completed ? (
                      <button
                        onClick={() => handleClaimQuest(quest.id)}
                        className="px-4 py-2 rounded-xl bg-[#2b6c00] text-white font-extrabold text-xs hover:bg-[#1f5100] shadow-md border-b-4 border-[#153800] transition-all tactile-btn active:scale-95 flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">star</span>
                        <span>+{quest.rewardStars} Stars</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Badges Trophy Cabinet */}
          <div className="lg:col-span-5 bg-white rounded-3xl border-4 border-[#becbb1] p-6 shadow-md space-y-4">
            <div className="flex items-center justify-between pb-3 border-b-2 border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#755b00] text-2xl">trophy</span>
                <h3 className="font-black text-lg text-slate-900">Trophy Cabinet</h3>
              </div>
              <span className="text-xs font-bold text-slate-500 font-mono">3 / 4 Unlocked</span>
            </div>

            <div className="space-y-3">
              {BADGES.map((badge) => (
                <div
                  key={badge.id}
                  className="p-3.5 rounded-2xl bg-[#efeded] border-2 border-slate-200 flex items-start gap-3"
                >
                  <div className="w-11 h-11 rounded-2xl bg-amber-100 border-2 border-amber-300 text-amber-800 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-2xl">{badge.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900">{badge.title}</h4>
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-950">
                        {badge.tier}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-snug">{badge.desc}</p>
                    <span className="text-[10px] font-mono text-slate-500 font-bold block mt-1">
                      {badge.unlockedAt}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
