'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';

interface Question {
  id: number;
  subject: string;
  topic: string;
  question: string;
  formula?: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  hint: string;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const SAMPLE_QUESTIONS: Question[] = [
  {
    id: 1,
    subject: 'Physics',
    topic: 'Kinematics',
    question:
      'A projectile is launched from ground level with an initial velocity of 50 m/s at an angle of 30° to the horizontal. Assuming g = 10 m/s² and negligible air resistance, calculate the total time of flight.',
    formula: 'T = \\frac{2 u \\sin\\theta}{g}',
    options: [
      { key: 'A', text: '2.5 seconds' },
      { key: 'B', text: '5.0 seconds' },
      { key: 'C', text: '7.5 seconds' },
      { key: 'D', text: '10.0 seconds' },
    ],
    correctAnswer: 'B',
    hint: 'Recall that time of flight depends only on the vertical component of the initial velocity (u_y = u sin θ).',
    explanation:
      'Using the formula T = (2 * u * sin θ) / g: T = (2 * 50 * sin(30°)) / 10 = (100 * 0.5) / 10 = 5.0 seconds.',
    difficulty: 'Medium',
  },
  {
    id: 2,
    subject: 'Physics',
    topic: 'Newton\'s Laws of Motion',
    question:
      'A block of mass 4 kg rests on a frictionless horizontal surface. A constant horizontal force of 12 N is applied to it for 6 seconds. What is the final momentum of the block?',
    formula: '\\Delta p = F \\cdot \\Delta t',
    options: [
      { key: 'A', text: '24 kg·m/s' },
      { key: 'B', text: '48 kg·m/s' },
      { key: 'C', text: '72 kg·m/s' },
      { key: 'D', text: '96 kg·m/s' },
    ],
    correctAnswer: 'C',
    hint: 'Impulse is equal to the change in momentum: Impulse = Force × Time.',
    explanation:
      'Impulse J = F * Δt = 12 N * 6 s = 72 N·s = 72 kg·m/s. Since initial momentum is zero, final momentum is 72 kg·m/s.',
    difficulty: 'Easy',
  },
  {
    id: 3,
    subject: 'Physics',
    topic: 'Work, Energy, and Power',
    question:
      'An electric pump lifts 1,200 kg of water through a vertical height of 15 m in 60 seconds. If the efficiency of the pump is 75%, what is the input power supplied to the motor? (g = 10 m/s²)',
    formula: 'P_{out} = \\frac{mgh}{t}, \\quad P_{in} = \\frac{P_{out}}{\\eta}',
    options: [
      { key: 'A', text: '3,000 W' },
      { key: 'B', text: '4,000 W' },
      { key: 'C', text: '5,000 W' },
      { key: 'D', text: '6,000 W' },
    ],
    correctAnswer: 'B',
    hint: 'First compute the useful mechanical power output (Work/time = mgh/t), then divide by the decimal efficiency (0.75).',
    explanation:
      'Work output = mgh = 1200 * 10 * 15 = 180,000 J. Useful Power P_out = 180,000 / 60 = 3,000 W. Power input = 3,000 / 0.75 = 4,000 W.',
    difficulty: 'Hard',
  },
  {
    id: 4,
    subject: 'Physics',
    topic: 'Systems of Particles and Linear Momentum',
    question:
      'Two bodies of masses 2 kg and 3 kg moving towards each other with velocities 4 m/s and 2 m/s respectively collide and stick together. Calculate their common velocity after collision.',
    formula: 'm_1 v_1 + m_2 v_2 = (m_1 + m_2) v_{final}',
    options: [
      { key: 'A', text: '0.4 m/s in direction of 2 kg mass' },
      { key: 'B', text: '0.8 m/s in direction of 3 kg mass' },
      { key: 'C', text: '1.2 m/s in direction of 2 kg mass' },
      { key: 'D', text: '2.0 m/s in direction of 3 kg mass' },
    ],
    correctAnswer: 'A',
    hint: 'Remember velocity is a vector: if one body moves in the positive direction (+4 m/s), the approaching body has negative velocity (-2 m/s).',
    explanation:
      'Total momentum before = (2 * 4) + (3 * -2) = 8 - 6 = +2 kg·m/s. Total mass = 2 + 3 = 5 kg. Final velocity = 2 / 5 = +0.4 m/s (in the direction of the 2 kg mass).',
    difficulty: 'Medium',
  },
  {
    id: 5,
    subject: 'Chemistry',
    topic: 'Chemical Equilibrium',
    question:
      'For the Haber process reaction: N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ/mol), which change will shift the equilibrium position to favor higher ammonia yield?',
    formula: 'K_p = \\frac{(P_{NH_3})^2}{(P_{N_2})(P_{H_2})^3}',
    options: [
      { key: 'A', text: 'Increasing the temperature' },
      { key: 'B', text: 'Decreasing total system pressure' },
      { key: 'C', text: 'Increasing total system pressure and lowering temperature' },
      { key: 'D', text: 'Adding a platinum catalyst' },
    ],
    correctAnswer: 'C',
    hint: 'By Le Chatelier’s Principle, exothermic reactions are favored by lower temperatures, and forward reactions with fewer gas moles are favored by higher pressure.',
    explanation:
      'The forward reaction is exothermic (ΔH < 0) and reduces gas moles from 4 to 2. High pressure and low temperature shift equilibrium forward.',
    difficulty: 'Medium',
  },
];

export default function DiagnosticTutorPage() {
  const [selectedSubject, setSelectedSubject] = useState('Physics');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});
  const [showHint, setShowHint] = useState<Record<number, boolean>>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [customDrillActive, setCustomDrillActive] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = SAMPLE_QUESTIONS[currentIdx];

  const handleSelectOption = (key: string) => {
    if (isSubmitted) return;
    setAnswers((prev) => ({ ...prev, [currentQ.id]: key }));
  };

  const toggleFlag = () => {
    setFlagged((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  const toggleHint = () => {
    setShowHint((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }));
  };

  // Score Calculation
  const totalQuestions = SAMPLE_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;
  const correctCount = SAMPLE_QUESTIONS.filter(
    (q) => answers[q.id] === q.correctAnswer
  ).length;
  const rawScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const predictedJamb = Math.round(200 + (rawScore / 100) * 160); // 200 - 360 scale

  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="JAMB & WAEC Diagnostic Assessment Engine"
          subtitle="Precision CBT Simulator • Product Wedge Tier 2"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          {/* Top Control Bar */}
          <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-primary text-on-primary font-jakarta font-bold text-xs uppercase tracking-wider">
                Target: UTME / WASSCE 2026
              </span>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface">
                <span>Subject:</span>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant rounded-lg px-2.5 py-1 text-xs font-jakarta font-medium text-primary outline-none focus:border-primary"
                >
                  <option value="Physics">Physics (Diagnostic Module 1)</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Exam Timer */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-high border border-outline-variant">
                <span className="material-symbols-outlined text-primary text-lg animate-pulse">
                  timer
                </span>
                <span className="font-mono font-bold text-sm text-on-surface">
                  {formatTime(timeLeft)}
                </span>
                <span className="text-[11px] text-outline uppercase font-mono">Remaining</span>
              </div>

              {/* Action */}
              {!isSubmitted ? (
                <button
                  onClick={() => setIsSubmitted(true)}
                  className="px-4 py-2 rounded-xl bg-secondary text-on-secondary font-jakarta font-bold text-xs hover:bg-secondary/90 shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  <span>Submit Diagnostic Exam</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setAnswers({});
                    setTimeLeft(1200);
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-jakarta font-bold text-xs hover:bg-primary-container shadow-sm transition-all flex items-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-base">restart_alt</span>
                  <span>Retake Diagnostic</span>
                </button>
              )}
            </div>
          </div>

          {!isSubmitted ? (
            /* Live Assessment Mode */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Question Main Panel */}
              <div className="lg:col-span-8 space-y-6">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md relative">
                  {/* Question Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-surface-container mb-5">
                    <div className="flex items-center gap-2.5">
                      <span className="w-8 h-8 rounded-lg bg-primary-container text-on-primary font-jakarta font-bold text-sm flex items-center justify-center">
                        {currentQ.id}
                      </span>
                      <div>
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider font-jakarta">
                          {currentQ.topic}
                        </span>
                        <span className="mx-2 text-outline">•</span>
                        <span
                          className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                            currentQ.difficulty === 'Easy'
                              ? 'bg-secondary-container text-on-secondary-container'
                              : currentQ.difficulty === 'Medium'
                              ? 'bg-tertiary-fixed text-on-tertiary-fixed'
                              : 'bg-error-container text-on-error-container'
                          }`}
                        >
                          {currentQ.difficulty}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleFlag}
                        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-jakarta font-semibold border transition-all ${
                          flagged[currentQ.id]
                            ? 'bg-tertiary-fixed border-tertiary text-on-tertiary-fixed'
                            : 'border-outline-variant text-outline hover:text-on-surface'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          {flagged[currentQ.id] ? 'flag' : 'outlined_flag'}
                        </span>
                        <span>{flagged[currentQ.id] ? 'Flagged' : 'Flag'}</span>
                      </button>

                      <button
                        onClick={toggleHint}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-jakarta font-semibold bg-secondary-container/30 text-secondary border border-secondary/30 hover:bg-secondary-container/60 transition-all"
                      >
                        <span>✦ AI Hint</span>
                      </button>
                    </div>
                  </div>

                  {/* AI Hint Drawer */}
                  {showHint[currentQ.id] && (
                    <div className="mb-5 p-4 rounded-xl bg-secondary-container/20 border border-secondary-container text-xs text-on-secondary-container font-inter flex items-start gap-3 animate-in fade-in">
                      <span className="material-symbols-outlined text-secondary text-lg shrink-0">
                        lightbulb
                      </span>
                      <div>
                        <strong className="font-jakarta font-bold text-secondary">
                          EduWorld AI Tutor Conceptual Hint:
                        </strong>
                        <p className="mt-1 leading-relaxed">{currentQ.hint}</p>
                      </div>
                    </div>
                  )}

                  {/* Question Stem */}
                  <div className="text-base text-on-surface font-inter leading-relaxed mb-6">
                    {currentQ.question}
                  </div>

                  {/* Formula Box */}
                  {currentQ.formula && (
                    <div className="mb-6 p-3 rounded-xl bg-surface-container-low border border-outline-variant inline-block font-mono text-xs text-primary font-semibold">
                      <span className="text-outline mr-2 font-inter">Relevant Formulation:</span>
                      <code>{currentQ.formula}</code>
                    </div>
                  )}

                  {/* Options Radio List */}
                  <div className="space-y-3">
                    {currentQ.options.map((opt) => {
                      const isSelected = answers[currentQ.id] === opt.key;
                      return (
                        <div
                          key={opt.key}
                          onClick={() => handleSelectOption(opt.key)}
                          className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-primary-fixed/40 border-primary shadow-xs'
                              : 'border-outline-variant bg-surface-container-lowest hover:border-primary/50 hover:bg-surface-container-low'
                          }`}
                        >
                          <div
                            className={`w-7 h-7 rounded-full font-jakarta font-bold text-xs flex items-center justify-center shrink-0 border ${
                              isSelected
                                ? 'bg-primary text-white border-primary'
                                : 'border-outline text-outline bg-white'
                            }`}
                          >
                            {opt.key}
                          </div>
                          <span className="text-sm font-inter text-on-surface font-medium">
                            {opt.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Navigation between questions */}
                  <div className="flex items-center justify-between mt-8 pt-4 border-t border-surface-container">
                    <button
                      disabled={currentIdx === 0}
                      onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
                      className="px-4 py-2 rounded-xl border border-outline-variant text-xs font-jakarta font-semibold text-on-surface hover:bg-surface-container-low disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-base">arrow_back</span>
                      <span>Previous</span>
                    </button>

                    <span className="text-xs font-mono text-outline">
                      Question {currentIdx + 1} of {totalQuestions}
                    </span>

                    <button
                      disabled={currentIdx === totalQuestions - 1}
                      onClick={() =>
                        setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))
                      }
                      className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-jakarta font-semibold hover:bg-primary-container disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center gap-1"
                    >
                      <span>Next</span>
                      <span className="material-symbols-outlined text-base">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Question Palette Sidebar */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-jakarta font-bold text-sm text-on-surface">
                      Question Palette
                    </h3>
                    <span className="text-xs font-mono text-primary font-semibold">
                      {answeredCount}/{totalQuestions} Answered
                    </span>
                  </div>

                  {/* Legend */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-inter text-on-surface-variant pt-1 border-t border-surface-container">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-primary-container" />
                      <span>Answered</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-tertiary-fixed border border-tertiary" />
                      <span>Flagged</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded bg-surface-container-high" />
                      <span>Unanswered</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded ring-2 ring-primary bg-white" />
                      <span>Current</span>
                    </div>
                  </div>

                  {/* Palette Grid */}
                  <div className="grid grid-cols-5 gap-2 pt-2">
                    {SAMPLE_QUESTIONS.map((q, idx) => {
                      const isAnswered = !!answers[q.id];
                      const isFlagged = !!flagged[q.id];
                      const isCurrent = idx === currentIdx;

                      let btnStyle = 'bg-surface-container-high text-on-surface-variant';
                      if (isAnswered) btnStyle = 'bg-primary-container text-white font-bold';
                      if (isFlagged)
                        btnStyle = 'bg-tertiary-fixed text-on-tertiary-fixed font-bold border border-tertiary';

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentIdx(idx)}
                          className={`h-10 rounded-xl font-mono text-xs transition-all relative ${btnStyle} ${
                            isCurrent ? 'ring-2 ring-primary ring-offset-2' : ''
                          }`}
                        >
                          {q.id}
                          {isFlagged && (
                            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-tertiary" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* AI Performance Projection Card */}
                <div className="bg-primary text-on-primary rounded-2xl p-5 shadow-md relative overflow-hidden">
                  <div className="flex items-center gap-2 text-inverse-primary text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                    <span>AI Diagnostic Projection</span>
                  </div>
                  <h4 className="font-jakarta font-bold text-lg leading-tight">
                    Active Diagnostic Session
                  </h4>
                  <p className="text-xs text-inverse-primary mt-1 leading-relaxed font-inter">
                    Completing all questions allows EduWorld AI to isolate topic mastery gaps down to
                    the sub-topic syllabus level.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Post-Submission Scorecard & Syllabus Diagnostic Report */
            <div className="space-y-6">
              {/* Hero Scorecard */}
              <div className="bg-primary text-on-primary rounded-3xl p-8 shadow-xl relative overflow-hidden">
                <div className="absolute -right-16 -top-16 opacity-10">
                  <span className="material-symbols-outlined text-[240px]">military_tech</span>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold font-jakarta uppercase tracking-wider">
                      <span>✦ Diagnostic Complete</span>
                      <span className="text-secondary-container">• Top 4% National Rank</span>
                    </div>
                    <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl leading-tight">
                      Predicted JAMB Score: <span className="text-secondary-container">{predictedJamb}</span> / 400
                    </h2>
                    <p className="text-sm text-inverse-primary font-inter leading-relaxed">
                      You answered <strong className="text-white">{correctCount} of {totalQuestions}</strong> questions correctly ({rawScore}% raw accuracy). EduWorld AI has identified <strong className="text-secondary-container">1 urgent recovery topic</strong> in Work, Energy & Power.
                    </p>
                  </div>

                  <div className="md:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-3">
                    <div className="flex justify-between items-center text-xs text-inverse-primary font-mono">
                      <span>Exam Readiness Index</span>
                      <span className="text-white font-bold">{rawScore}%</span>
                    </div>
                    <div className="w-full bg-black/30 rounded-full h-3">
                      <div
                        className="bg-secondary-container h-3 rounded-full transition-all duration-1000"
                        style={{ width: `${rawScore}%` }}
                      />
                    </div>
                    <div className="flex justify-between items-center pt-2 text-xs font-jakarta">
                      <span className="text-inverse-primary">WAEC Target Grade:</span>
                      <span className="font-bold text-white">A1 (Distinction)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Topic Mastery Checklist (Matched Pixel-for-Pixel to Frame achiever_subject_exam_prep_ewd_026) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Topic Breakdown Card */}
                <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-5">
                  <div className="flex justify-between items-center pb-3 border-b border-surface-container">
                    <div>
                      <h3 className="font-jakarta font-bold text-lg text-on-surface">
                        Syllabus Mastery Breakdown
                      </h3>
                      <p className="text-xs text-on-surface-variant font-inter">
                        Diagnostic analysis mapped to official WAEC & JAMB curriculum
                      </p>
                    </div>
                    <button
                      onClick={() => setCustomDrillActive(true)}
                      className="px-3 py-1.5 rounded-xl bg-secondary text-on-secondary text-xs font-jakarta font-bold hover:bg-secondary/90 transition-all flex items-center gap-1 shadow-sm"
                    >
                      <span>✦ Practice Drill</span>
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Topic 1 */}
                    <div className="p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-jakarta font-semibold text-sm text-on-surface">
                          1. Kinematics (Motion in 1D & 2D)
                        </span>
                        <span className="font-mono font-bold text-xs text-secondary">92%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full w-[92%]" />
                      </div>
                    </div>

                    {/* Topic 2 */}
                    <div className="p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-jakarta font-semibold text-sm text-on-surface">
                          2. Newton&apos;s Laws of Motion & Momentum
                        </span>
                        <span className="font-mono font-bold text-xs text-secondary">88%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-secondary rounded-full w-[88%]" />
                      </div>
                    </div>

                    {/* Topic 3 - Needs Attention */}
                    <div className="p-3 rounded-xl bg-surface-container-low border border-error/30">
                      <div className="flex justify-between items-center mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-jakarta font-semibold text-sm text-on-surface">
                            3. Work, Energy, and Power
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-error-container text-on-error-container text-[10px] font-bold uppercase">
                            Needs Review
                          </span>
                        </div>
                        <span className="font-mono font-bold text-xs text-error">60%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-error rounded-full w-[60%]" />
                      </div>
                    </div>

                    {/* Topic 4 */}
                    <div className="p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="font-jakarta font-semibold text-sm text-on-surface">
                          4. Systems of Particles & Collisions
                        </span>
                        <span className="font-mono font-bold text-xs text-secondary">75%</span>
                      </div>
                      <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden">
                        <div className="h-full bg-tertiary rounded-full w-[75%]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Tutor Action Plan */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
                    <div className="flex items-center gap-2 text-secondary font-jakarta font-bold text-sm">
                      <span className="material-symbols-outlined text-xl">smart_toy</span>
                      <span>EduWorld AI Action Plan</span>
                    </div>

                    <div className="p-4 rounded-xl bg-secondary-container/15 border border-secondary-container space-y-2">
                      <h4 className="font-jakarta font-bold text-xs text-on-surface">
                        Recommended Recovery Drill
                      </h4>
                      <p className="text-xs text-on-surface-variant font-inter leading-relaxed">
                        To lock in your 340+ target, generate a 15-question targeted drill on{' '}
                        <strong>Work, Energy, and Power</strong> focusing on pump efficiency and
                        conservative forces.
                      </p>
                    </div>

                    <button
                      onClick={() => setCustomDrillActive(true)}
                      className="w-full py-3 rounded-xl bg-secondary text-on-secondary font-jakarta font-bold text-xs hover:bg-secondary/90 shadow-sm transition-all flex items-center justify-center gap-2"
                    >
                      <span>✦ Generate Custom Practice Set</span>
                    </button>

                    <Link
                      href="/achiever/ai-partner"
                      className="w-full py-3 rounded-xl border border-outline-variant text-on-surface font-jakarta font-semibold text-xs hover:bg-surface-container-low transition-all flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined text-base text-primary">chat</span>
                      <span>Discuss Diagnostic with AI Partner</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Detailed Question Review List */}
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-md space-y-4">
                <h3 className="font-jakarta font-bold text-base text-on-surface">
                  Detailed Question Explanations
                </h3>
                <div className="space-y-4 divide-y divide-surface-container">
                  {SAMPLE_QUESTIONS.map((q) => {
                    const userAns = answers[q.id];
                    const isCorrect = userAns === q.correctAnswer;
                    return (
                      <div key={q.id} className="pt-4 first:pt-0 space-y-2">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-xs font-bold font-mono text-outline">
                              Question {q.id} ({q.topic})
                            </span>
                            <p className="text-sm font-inter text-on-surface font-medium mt-1">
                              {q.question}
                            </p>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold font-jakarta shrink-0 ${
                              isCorrect
                                ? 'bg-secondary-container text-on-secondary-container'
                                : 'bg-error-container text-on-error-container'
                            }`}
                          >
                            {isCorrect ? 'Correct (+4)' : `Incorrect (${userAns || 'Skipped'})`}
                          </span>
                        </div>
                        <div className="p-3 rounded-xl bg-surface-container-low text-xs font-inter text-on-surface-variant space-y-1">
                          <p>
                            <strong className="text-on-surface font-jakarta">Correct Answer:</strong> Option {q.correctAnswer}
                          </p>
                          <p className="leading-relaxed">
                            <strong className="text-primary font-jakarta">Step-by-Step Rationale:</strong> {q.explanation}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
