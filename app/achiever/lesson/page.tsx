'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';
import { useDemo } from '@/components/global/DemoContext';

interface LessonSegment {
  time: string;
  title: string;
  transcript: string;
  keyTakeaway: string;
}

const LESSON_SEGMENTS: LessonSegment[] = [
  {
    time: '00:00 - 03:45',
    title: 'Introduction to 2D Projectile Trajectories',
    transcript:
      'In today’s masterclass, we break down how two-dimensional projectile motion can be decoupled into two completely independent one-dimensional motions: constant horizontal velocity along the x-axis, and constant gravitational acceleration along the vertical y-axis.',
    keyTakeaway: 'The horizontal component ux = u cos(θ) never changes when air resistance is negligible.',
  },
  {
    time: '03:45 - 08:20',
    title: 'Deriving the Time of Flight Equation',
    transcript:
      'By setting the vertical displacement Sy = 0 at landing, we solve 0 = (u sin θ)t - (1/2)gt^2. Factoring out t gives the fundamental formula: T = (2u sin θ) / g.',
    keyTakeaway: 'Time of flight depends purely on the initial vertical launch velocity and gravity.',
  },
  {
    time: '08:20 - 14:10',
    title: 'Maximum Height & Range Optimizations',
    transcript:
      'At peak altitude, the vertical velocity Vy equals zero. Substituting into Vy^2 = Uy^2 - 2gH yields H_max = (u^2 sin^2 θ) / (2g). Maximum range is achieved at an angle of 45° where sin(2θ) = 1.',
    keyTakeaway: 'Complementary launch angles (e.g. 30° and 60°) achieve the exact same horizontal range.',
  },
];

export default function AchieverLessonPage() {
  const { showToast } = useDemo();
  const [activeSegment, setActiveSegment] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [notes, setNotes] = useState(
    'Key JAMB trick: Complementary launch angles produce equal horizontal ranges: Range(30°) == Range(60°).'
  );
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);

  const handleSaveNotes = () => {
    showToast('Lesson study notes saved to your revision vault!');
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Senior Physics Lesson Masterclass"
          subtitle="Kinematics & 2D Projectile Trajectories • Module 1.4"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Breadcrumb Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-inter text-slate-500 font-medium">
              <Link href="/achiever/subjects" className="text-[#003f7a] hover:underline font-bold">
                Physics Library
              </Link>
              <span>/</span>
              <span>Topic 1: Kinematics</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">Lesson 4: Projectile Motion</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-jakarta font-extrabold text-xs border border-emerald-300">
                ✓ WAEC Syllabus Aligned
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Simulated Video Player & Synchronized Transcript (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Simulated High-Res Video Player */}
              <div className="bg-[#131b2e] rounded-3xl border border-slate-700/80 overflow-hidden shadow-xl text-white">
                <div className="relative aspect-video bg-gradient-to-br from-[#0a0f1d] via-[#131b2e] to-[#1e293b] flex flex-col justify-between p-6">
                  {/* Top Overlay Badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md text-xs font-mono text-[#6ffbbe] border border-white/10 font-bold">
                      HD 1080p • Interactive Tutor Mode
                    </span>
                    <span className="px-3 py-1 rounded-lg bg-black/50 backdrop-blur-md text-xs font-mono text-slate-300 border border-white/10">
                      14:10 Total Duration
                    </span>
                  </div>

                  {/* Center Play Button & Graphic */}
                  <div className="flex flex-col items-center justify-center my-auto text-center space-y-3">
                    <button
                      onClick={() => {
                        setIsPlaying(!isPlaying);
                        showToast(isPlaying ? 'Video paused' : 'Video playing...');
                      }}
                      className="w-16 h-16 rounded-full bg-[#003f7a] hover:bg-[#1e5799] text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 border-2 border-white/20"
                    >
                      <span className="material-symbols-outlined text-3xl">
                        {isPlaying ? 'pause' : 'play_arrow'}
                      </span>
                    </button>
                    <div>
                      <h3 className="font-jakarta font-bold text-lg text-white">
                        {LESSON_SEGMENTS[activeSegment].title}
                      </h3>
                      <p className="text-xs text-slate-300 font-mono">
                        Segment {activeSegment + 1} of {LESSON_SEGMENTS.length} • {LESSON_SEGMENTS[activeSegment].time}
                      </p>
                    </div>
                  </div>

                  {/* Player Controls Bar */}
                  <div className="space-y-2 pt-4">
                    {/* Scrub Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-1.5 cursor-pointer overflow-hidden">
                      <div
                        className="bg-[#6ffbbe] h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${((activeSegment + 1) / LESSON_SEGMENTS.length) * 100}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span>{LESSON_SEGMENTS[activeSegment].time.split(' - ')[0]}</span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setActiveSegment((prev) => Math.max(0, prev - 1))}
                          disabled={activeSegment === 0}
                          className="hover:text-white disabled:opacity-30"
                        >
                          <span className="material-symbols-outlined text-sm">skip_previous</span>
                        </button>
                        <button
                          onClick={() =>
                            setActiveSegment((prev) =>
                              Math.min(LESSON_SEGMENTS.length - 1, prev + 1)
                            )
                          }
                          disabled={activeSegment === LESSON_SEGMENTS.length - 1}
                          className="hover:text-white disabled:opacity-30"
                        >
                          <span className="material-symbols-outlined text-sm">skip_next</span>
                        </button>
                      </div>
                      <span>{LESSON_SEGMENTS[activeSegment].time.split(' - ')[1]}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Synchronized Transcript Timeline */}
              <div className="bg-white rounded-3xl border border-outline-variant p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl text-[#003f7a]">subtitles</span>
                    <h3 className="font-jakarta font-bold text-base text-slate-900">
                      Synchronized Interactive Transcript
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-500 font-bold">Auto-Scroll ON</span>
                </div>

                <div className="space-y-3">
                  {LESSON_SEGMENTS.map((seg, idx) => {
                    const isActive = idx === activeSegment;
                    return (
                      <div
                        key={seg.title}
                        onClick={() => setActiveSegment(idx)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-50/70 border-[#003f7a] shadow-xs ring-1 ring-[#003f7a]'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-jakarta font-bold text-sm text-slate-900">
                            {seg.title}
                          </span>
                          <span className="font-mono text-xs font-bold text-[#003f7a] bg-blue-100 px-2 py-0.5 rounded">
                            {seg.time}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 font-inter leading-relaxed mt-2">
                          {seg.transcript}
                        </p>
                        <div className="mt-3 p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-800 flex items-center gap-2 font-medium">
                          <span className="material-symbols-outlined text-amber-600 text-sm">star</span>
                          <span><strong>Key Concept:</strong> {seg.keyTakeaway}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Checkpoint Quiz & Notes Scratchpad (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Interactive Checkpoint Quiz */}
              <div className="bg-white rounded-3xl border border-outline-variant p-6 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-[#006c49]">
                  <span className="material-symbols-outlined text-xl">psychology</span>
                  <h3 className="font-jakarta font-bold text-base text-slate-900">
                    Quick Checkpoint Quiz
                  </h3>
                </div>

                <p className="text-xs text-slate-700 font-inter leading-relaxed">
                  Which launch angle gives the maximum possible horizontal range for a projectile on level ground?
                </p>

                <div className="space-y-2">
                  {['30°', '45°', '60°', '90°'].map((option) => {
                    const isSelected = quizAnswered === option;
                    const isCorrect = option === '45°';

                    return (
                      <button
                        key={option}
                        onClick={() => {
                          setQuizAnswered(option);
                          if (isCorrect) {
                            showToast('Correct! Range is maximized at 45° (+25 XP).');
                          } else {
                            showToast('Review the formula: R = (u^2 sin 2θ) / g. Try again!');
                          }
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs font-bold font-jakarta transition-all flex items-center justify-between ${
                          isSelected
                            ? isCorrect
                              ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs'
                              : 'bg-red-100 border-red-500 text-red-950 shadow-xs'
                            : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300'
                        }`}
                      >
                        <span>Option: {option}</span>
                        {isSelected && (
                          <span className="material-symbols-outlined text-sm">
                            {isCorrect ? 'check_circle' : 'cancel'}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {quizAnswered && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 font-inter">
                    <strong>Explanation:</strong> The range equation contains sin(2θ). The maximum value of the sine function is 1 at sin(90°), which occurs when 2θ = 90° ⇒ θ = 45°.
                  </div>
                )}
              </div>

              {/* Revision Scratchpad */}
              <div className="bg-white rounded-3xl border border-outline-variant p-6 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl text-[#003f7a]">edit_note</span>
                    <h3 className="font-jakarta font-bold text-base text-slate-900">
                      My Study Notes
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 font-bold">Auto-Saved</span>
                </div>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-2xl border border-slate-200 bg-slate-50 text-xs text-slate-900 font-inter outline-none focus:border-[#003f7a] focus:ring-1 focus:ring-[#003f7a] transition-all resize-none"
                  placeholder="Type notes or formulas here..."
                />

                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={handleSaveNotes}
                    className="px-4 py-2 rounded-xl bg-[#003f7a] text-white font-jakarta font-bold text-xs hover:bg-[#1e5799] shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                  >
                    <span className="material-symbols-outlined text-sm">save</span>
                    <span>Save Note</span>
                  </button>

                  <Link
                    href="/achiever/ai-partner"
                    className="text-xs font-jakarta font-bold text-[#003f7a] hover:underline flex items-center gap-1"
                  >
                    <span>Ask AI Tutor</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
