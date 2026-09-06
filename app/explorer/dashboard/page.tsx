'use client';

import React from 'react';
import Link from 'next/link';
import { ExplorerNav } from '@/components/explorer/ExplorerNav';

export default function ExplorerDashboardPage() {
  return (
    <div className="min-h-screen bg-explorer-surface flex flex-col">
      <ExplorerNav />

      <main className="flex-1 max-w-6xl mx-auto w-full p-6 md:p-8 space-y-8">
        {/* Spark Companion Hero Banner */}
        <div className="bg-white rounded-3xl border-4 border-explorer-outline-variant p-6 md:p-8 shadow-tactile flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
          {/* Spark Mascot Avatar */}
          <div className="w-24 h-24 rounded-3xl bg-explorer-secondary-container text-explorer-on-secondary-container flex items-center justify-center font-jakarta font-black text-5xl shrink-0 shadow-tactile-yellow border-b-4 border-[#6e5400] animate-bounce">
            ✦
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="inline-block px-3 py-1 rounded-full bg-explorer-primary-container text-explorer-on-primary-container font-jakarta font-extrabold text-xs uppercase tracking-wider">
              Today&apos;s Adventure
            </div>
            <h2 className="font-jakarta font-black text-2xl md:text-3xl text-on-surface">
              Ready to explore the Solar System, Leo?
            </h2>
            <p className="font-jakarta font-medium text-base text-on-surface-variant">
              You are on Level 4! Finish today&apos;s Mars Mission to unlock your Golden Astronaut Badge.
            </p>
          </div>

          <Link
            href="/explorer/lesson"
            className="px-8 py-4 rounded-full bg-explorer-primary-container text-explorer-on-primary-container font-jakarta font-black text-base border-b-4 border-[#1e5000] shadow-tactile-green tactile-btn flex items-center gap-2 shrink-0"
          >
            <span>Start Mission</span>
            <span className="material-symbols-outlined text-2xl">rocket_launch</span>
          </Link>
        </div>

        {/* Gamified Learning Path */}
        <div className="space-y-4">
          <h3 className="font-jakarta font-black text-xl text-on-surface">
            Your Learning Adventure Map
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Quest Card 1 - Completed */}
            <div className="bg-white rounded-3xl border-4 border-explorer-primary p-6 shadow-tactile flex flex-col justify-between space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-explorer-primary-container text-explorer-on-primary-container flex items-center justify-center text-3xl font-black">
                  🪐
                </div>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-jakarta font-bold text-xs">
                  Done ✓
                </span>
              </div>
              <div>
                <h4 className="font-jakarta font-black text-lg text-on-surface">Earth & Moon</h4>
                <p className="font-jakarta font-medium text-xs text-outline mt-1">Gravity & Tides</p>
              </div>
              <div className="w-full bg-explorer-surface-container rounded-full h-3">
                <div className="bg-explorer-primary h-3 rounded-full w-full" />
              </div>
            </div>

            {/* Quest Card 2 - Active */}
            <div className="bg-white rounded-3xl border-4 border-explorer-secondary-container p-6 shadow-tactile flex flex-col justify-between space-y-4 relative ring-4 ring-explorer-secondary-container/40">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center text-3xl font-black animate-pulse">
                  🚀
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 font-jakarta font-extrabold text-xs">
                  Current
                </span>
              </div>
              <div>
                <h4 className="font-jakarta font-black text-lg text-on-surface">Mars Exploration</h4>
                <p className="font-jakarta font-medium text-xs text-outline mt-1">Red Planet Rovers</p>
              </div>
              <div className="w-full bg-explorer-surface-container rounded-full h-3">
                <div className="bg-amber-400 h-3 rounded-full w-2/3" />
              </div>
              <Link
                href="/explorer/lesson"
                className="w-full py-2.5 rounded-full bg-explorer-secondary-container text-explorer-on-secondary-container font-jakarta font-extrabold text-xs text-center border-b-2 border-[#6e5400] tactile-btn"
              >
                Continue Quest
              </Link>
            </div>

            {/* Quest Card 3 - Locked */}
            <div className="bg-white/60 rounded-3xl border-4 border-explorer-outline-variant p-6 shadow-sm flex flex-col justify-between space-y-4 opacity-75">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center text-3xl font-black">
                  ⭐
                </div>
                <span className="material-symbols-outlined text-outline">lock</span>
              </div>
              <div>
                <h4 className="font-jakarta font-black text-lg text-on-surface">Gas Giants: Jupiter</h4>
                <p className="font-jakarta font-medium text-xs text-outline mt-1">Great Red Spot</p>
              </div>
              <div className="w-full bg-explorer-surface-container rounded-full h-3">
                <div className="bg-slate-300 h-3 rounded-full w-0" />
              </div>
            </div>

            {/* Quest Card 4 - Locked */}
            <div className="bg-white/60 rounded-3xl border-4 border-explorer-outline-variant p-6 shadow-sm flex flex-col justify-between space-y-4 opacity-75">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-slate-200 text-slate-500 flex items-center justify-center text-3xl font-black">
                  🌌
                </div>
                <span className="material-symbols-outlined text-outline">lock</span>
              </div>
              <div>
                <h4 className="font-jakarta font-black text-lg text-on-surface">Deep Galaxies</h4>
                <p className="font-jakarta font-medium text-xs text-outline mt-1">Milky Way & Beyond</p>
              </div>
              <div className="w-full bg-explorer-surface-container rounded-full h-3">
                <div className="bg-slate-300 h-3 rounded-full w-0" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
