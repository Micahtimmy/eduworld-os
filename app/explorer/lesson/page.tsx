'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ExplorerNav } from '@/components/explorer/ExplorerNav';
import { useDemo } from '@/components/global/DemoContext';

export default function ExplorerLessonPage() {
  const { showToast, addNotification } = useDemo();
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showSparkQuiz, setShowSparkQuiz] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const slides = [
    {
      title: 'Meet the Red Planet: Mars!',
      content:
        'Mars is the fourth planet from the Sun. It looks bright red in our night sky because its surface is covered in iron oxide — which is just like rusty iron!',
      fact: 'Did you know? Mars has the tallest volcano in the entire solar system: Olympus Mons!',
      imageEmoji: '🔴',
    },
    {
      title: 'The Great Rovers on Mars',
      content:
        'Scientists sent robotic explorers called rovers (like Curiosity and Perseverance) to roll around Mars, take photos, and look for signs of ancient water.',
      fact: 'Perseverance even brought a tiny helicopter named Ingenuity that flew in the thin Martian air!',
      imageEmoji: '🤖',
    },
  ];

  const handleCompleteMission = () => {
    showToast(`🎉 Mission Completed! You earned +50 ⭐ Stars and unlocked the Mars Explorer Badge!`);
    addNotification('Mission Unlocked!', 'Earned +50 Stars on Mars Rover Exploration.', 'reward', '/explorer/shop');
    router.push('/explorer/dashboard');
  };

  return (
    <div className="min-h-screen bg-explorer-surface flex flex-col font-sans">
      <ExplorerNav />

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-8 space-y-6">
        {/* Lesson Viewer Box */}
        <div className="bg-white rounded-3xl border-4 border-explorer-outline-variant p-6 md:p-10 shadow-tactile space-y-6">
          <div className="flex items-center justify-between pb-4 border-b-2 border-explorer-surface-container">
            <Link
              href="/explorer/dashboard"
              className="flex items-center gap-1 text-sm font-jakarta font-extrabold text-[#2b6c00] hover:underline"
            >
              <span className="material-symbols-outlined text-lg">arrow_back</span>
              <span>Back to Map</span>
            </Link>
            <span className="font-jakarta font-extrabold text-xs text-outline uppercase tracking-wider">
              Solar System • Slide {currentSlide + 1} of {slides.length}
            </span>
          </div>

          <div className="text-center space-y-4 py-4">
            <div className="text-7xl animate-pulse">{slides[currentSlide].imageEmoji}</div>
            <h2 className="font-jakarta font-black text-3xl md:text-4xl text-on-surface">
              {slides[currentSlide].title}
            </h2>
            <p className="font-jakarta font-medium text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
              {slides[currentSlide].content}
            </p>
          </div>

          {/* Spark Fun Fact Callout */}
          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-start gap-4">
            <span className="text-3xl">✦</span>
            <div>
              <h4 className="font-jakarta font-black text-sm text-amber-900">Spark&apos;s Super Fact:</h4>
              <p className="font-jakarta font-medium text-sm text-amber-800 mt-0.5">
                {slides[currentSlide].fact}
              </p>
            </div>
          </div>

          {/* Spark Interactive Check-in */}
          {showSparkQuiz && (
            <div className="p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-300 space-y-4 animate-in fade-in">
              <h4 className="font-jakarta font-black text-base text-emerald-950">
                ✦ Quick Spark Check: Why does Mars look red?
              </h4>
              <div className="space-y-2">
                {[
                  'It is very hot like lava',
                  'It is covered in iron oxide (rust)',
                  'It reflects red sunlight',
                ].map((option, idx) => (
                  <button
                    key={option}
                    onClick={() => {
                      setSelectedAnswer(idx);
                      if (idx === 1) {
                        showToast('⭐ Correct! Mars has iron-rich rust on its surface!');
                      }
                    }}
                    className={`w-full p-3 rounded-2xl font-jakarta font-bold text-sm text-left transition-all border-2 ${
                      selectedAnswer === idx
                        ? idx === 1
                          ? 'bg-green-100 border-green-600 text-green-950'
                          : 'bg-red-100 border-red-500 text-red-950'
                        : 'bg-white border-slate-300 hover:border-emerald-500 text-slate-900'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Actions */}
          <div className="flex items-center justify-between pt-4 border-t-2 border-explorer-surface-container">
            <button
              disabled={currentSlide === 0}
              onClick={() => setCurrentSlide((prev) => Math.max(0, prev - 1))}
              className="px-6 py-3 rounded-full bg-slate-100 text-slate-700 font-jakarta font-bold text-sm disabled:opacity-40 tactile-btn"
            >
              Previous
            </button>

            {!showSparkQuiz ? (
              <button
                onClick={() => setShowSparkQuiz(true)}
                className="px-6 py-3 rounded-full bg-amber-400 text-amber-950 font-jakarta font-black text-sm border-b-2 border-[#6e5400] shadow-tactile-yellow tactile-btn"
              >
                ✦ Ask Spark a Question
              </button>
            ) : null}

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={() => {
                  setCurrentSlide((prev) => prev + 1);
                  setShowSparkQuiz(false);
                  setSelectedAnswer(null);
                }}
                className="px-6 py-3 rounded-full bg-explorer-primary-container text-explorer-on-primary-container font-jakarta font-black text-sm border-b-2 border-[#1e5000] shadow-tactile-green tactile-btn"
              >
                Next Slide →
              </button>
            ) : (
              <button
                onClick={handleCompleteMission}
                className="px-6 py-3 rounded-full bg-green-600 text-white font-jakarta font-black text-sm border-b-2 border-green-800 shadow-tactile-green tactile-btn"
              >
                Complete Mission (+50 ⭐)
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
