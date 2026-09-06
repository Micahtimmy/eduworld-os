'use client';

import React from 'react';
import { ExplorerNav } from '@/components/explorer/ExplorerNav';

export default function ExplorerShopPage() {
  const items = [
    { name: 'Cosmic Astronaut Helmet', cost: 150, emoji: '🧑‍🚀', owned: true },
    { name: 'Golden Rocket Trail', cost: 250, emoji: '✨', owned: false },
    { name: 'Alien Pet Companion', cost: 400, emoji: '👾', owned: false },
    { name: 'Super Spark Avatar Skin', cost: 500, emoji: '⭐', owned: false },
  ];

  return (
    <div className="min-h-screen bg-explorer-surface flex flex-col">
      <ExplorerNav />

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-jakarta font-black text-2xl md:text-3xl text-on-surface">
              Star Reward Shop 🛍️
            </h2>
            <p className="font-jakarta font-medium text-sm text-outline">
              Use your earned stars from missions to unlock cool gear!
            </p>
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 border-2 border-amber-300 font-jakarta font-black text-base text-amber-900">
            <span>⭐ 350 Stars Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.name}
              className="bg-white rounded-3xl border-4 border-explorer-outline-variant p-6 shadow-tactile flex flex-col justify-between items-center text-center space-y-4"
            >
              <div className="text-6xl p-4 bg-slate-50 rounded-2xl border-2 border-slate-100">
                {item.emoji}
              </div>

              <div>
                <h4 className="font-jakarta font-black text-base text-on-surface">{item.name}</h4>
                <p className="font-jakarta font-bold text-xs text-amber-700 mt-1">
                  ⭐ {item.cost} Stars
                </p>
              </div>

              {item.owned ? (
                <button
                  disabled
                  className="w-full py-2.5 rounded-full bg-green-100 text-green-700 font-jakarta font-extrabold text-xs"
                >
                  Equipped ✓
                </button>
              ) : (
                <button className="w-full py-2.5 rounded-full bg-amber-400 text-amber-950 font-jakarta font-black text-xs border-b-2 border-[#6e5400] shadow-tactile-yellow tactile-btn">
                  Unlock Gear
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
