'use client';

import React, { useState } from 'react';
import { ExplorerNav } from '@/components/explorer/ExplorerNav';
import { useDemo } from '@/components/global/DemoContext';

interface ShopItem {
  id: string;
  name: string;
  cost: number;
  emoji: string;
  category: string;
  owned: boolean;
}

const INITIAL_SHOP_ITEMS: ShopItem[] = [
  { id: 'item1', name: 'Cosmic Astronaut Helmet', cost: 150, emoji: '🧑‍🚀', category: 'Headgear', owned: true },
  { id: 'item2', name: 'Golden Rocket Trail', cost: 250, emoji: '✨', category: 'Effects', owned: false },
  { id: 'item3', name: 'Alien Pet Companion', cost: 400, emoji: '👾', category: 'Pets', owned: false },
  { id: 'item4', name: 'Super Spark Avatar Skin', cost: 500, emoji: '⭐', category: 'Skins', owned: false },
  { id: 'item5', name: 'Solar System Rover Paint', cost: 300, emoji: '🚙', category: 'Vehicles', owned: false },
  { id: 'item6', name: 'Galactic Starlight Shield', cost: 350, emoji: '🛡️', category: 'Badges', owned: false },
];

export default function ExplorerShopPage() {
  const { currentPersona, showToast } = useDemo();
  const [stars, setStars] = useState(currentPersona.metrics.stars || 2850);
  const [items, setItems] = useState<ShopItem[]>(INITIAL_SHOP_ITEMS);

  const handleBuy = (item: ShopItem) => {
    if (stars < item.cost) {
      showToast(`Oops! You need ${item.cost - stars} more stars to unlock ${item.name}! ⭐`);
      return;
    }

    setStars((prev) => prev - item.cost);
    setItems((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, owned: true } : i))
    );
    showToast(`🎉 Yay! Unlocked & Equipped "${item.name}"!`);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f9] flex flex-col font-jakarta">
      <ExplorerNav />

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#2b6c00] text-xs font-black uppercase tracking-wider">
              <span className="material-symbols-outlined text-base">storefront</span>
              <span>Cadet Avatar Studio</span>
            </div>
            <h2 className="font-black text-2xl md:text-3xl text-slate-900 mt-1">
              Star Reward Shop 🛍️
            </h2>
            <p className="font-medium text-xs text-slate-600 mt-0.5">
              Use your earned stars from missions to unlock cool gear, astronaut costumes, and pets!
            </p>
          </div>

          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-100 border-2 border-amber-300 font-black text-base text-amber-950 shadow-sm">
            <span className="material-symbols-outlined text-xl text-amber-600">star</span>
            <span>{stars.toLocaleString()} Stars Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border-4 border-[#becbb1] p-6 shadow-md flex flex-col justify-between items-center text-center space-y-4 hover:border-[#2b6c00] transition-all"
            >
              <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {item.category}
              </span>

              <div className="text-6xl p-4 bg-slate-50 rounded-2xl border-2 border-slate-100 shadow-inner">
                {item.emoji}
              </div>

              <div>
                <h4 className="font-black text-base text-slate-900">{item.name}</h4>
                <p className="font-black text-xs text-amber-900 mt-1 flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-sm text-amber-600">star</span>
                  <span>{item.cost} Stars</span>
                </p>
              </div>

              {item.owned ? (
                <button
                  disabled
                  className="w-full py-3 rounded-2xl bg-emerald-100 text-emerald-950 font-black text-xs border-2 border-emerald-300 flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>Equipped</span>
                </button>
              ) : (
                <button
                  onClick={() => handleBuy(item)}
                  className="w-full py-3 rounded-2xl bg-[#fec700] text-[#6e5400] font-black text-xs border-b-4 border-[#c29600] shadow-md tactile-btn active:scale-95 transition-all flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">lock_open</span>
                  <span>Unlock Gear</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
