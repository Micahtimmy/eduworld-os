'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';
import { useDemo } from '@/components/global/DemoContext';

interface TopicDetail {
  id: string;
  title: string;
  mastery: number;
  pastQuestionsCount: number;
  status: 'Mastered' | 'Review Required' | 'In Progress';
}

interface Subject {
  id: string;
  name: string;
  code: string;
  icon: string;
  mastery: number;
  totalTopics: number;
  completedTopics: number;
  urgentTopics: number;
  color: string;
  topics: TopicDetail[];
  formulaSheet: string[];
}

const SUBJECTS: Subject[] = [
  {
    id: 'physics',
    name: 'Senior Physics (UTME/WAEC)',
    code: 'PHY-301',
    icon: 'functions',
    mastery: 84,
    totalTopics: 18,
    completedTopics: 15,
    urgentTopics: 1,
    color: 'text-primary',
    formulaSheet: [
      'Kinematics: v = u + at, s = ut + 1/2 at², v² = u² + 2as',
      'Work & Energy: W = F · d · cos(θ), K.E = 1/2 m v², P.E = m g h',
      'Faraday’s Law: ε = -N (ΔΦ/Δt)',
      'Wave Speed: v = f · λ, T = 1 / f',
    ],
    topics: [
      { id: 't1', title: 'Work, Energy & Power (Pump Efficiency)', mastery: 64, pastQuestionsCount: 48, status: 'Review Required' },
      { id: 't2', title: 'Projectile Motion & Trajectory Equations', mastery: 92, pastQuestionsCount: 65, status: 'Mastered' },
      { id: 't3', title: 'Electromagnetic Induction & Lenz’s Law', mastery: 88, pastQuestionsCount: 52, status: 'Mastered' },
      { id: 't4', title: 'Geometric Optics & Thin Lens Formula', mastery: 85, pastQuestionsCount: 40, status: 'Mastered' },
      { id: 't5', title: 'Atomic Models & Photoelectric Effect', mastery: 79, pastQuestionsCount: 38, status: 'In Progress' },
    ],
  },
  {
    id: 'chemistry',
    name: 'General Chemistry',
    code: 'CHM-302',
    icon: 'science',
    mastery: 88,
    totalTopics: 16,
    completedTopics: 14,
    urgentTopics: 0,
    color: 'text-secondary',
    formulaSheet: [
      'Ideal Gas: P V = n R T',
      'Molarity: M = moles / volume (L)',
      'pH = -log[H⁺], pOH = -log[OH⁻], pH + pOH = 14',
    ],
    topics: [
      { id: 'c1', title: 'Equilibrium Constant & Le Chatelier Principle', mastery: 91, pastQuestionsCount: 56, status: 'Mastered' },
      { id: 'c2', title: 'Redox Reactions & Electrochemical Cells', mastery: 87, pastQuestionsCount: 62, status: 'Mastered' },
      { id: 'c3', title: 'Hydrocarbons & Isomerism in Alkanes', mastery: 89, pastQuestionsCount: 45, status: 'Mastered' },
      { id: 'c4', title: 'Periodic Table Trends & Ionization Energies', mastery: 94, pastQuestionsCount: 50, status: 'Mastered' },
    ],
  },
  {
    id: 'mathematics',
    name: 'Further & Core Mathematics',
    code: 'MTH-303',
    icon: 'calculate',
    mastery: 79,
    totalTopics: 22,
    completedTopics: 17,
    urgentTopics: 2,
    color: 'text-primary',
    formulaSheet: [
      'Quadratic Formula: x = [-b ± sqrt(b² - 4ac)] / 2a',
      'Calculus: d/dx (xⁿ) = n xⁿ⁻¹, ∫ xⁿ dx = (xⁿ⁺¹)/(n+1) + C',
      'Matrices: Determinant |A| = ad - bc for 2x2',
    ],
    topics: [
      { id: 'm1', title: 'Differential Calculus & Maxima/Minima', mastery: 72, pastQuestionsCount: 80, status: 'Review Required' },
      { id: 'm2', title: 'Integral Calculus & Area Under Curves', mastery: 68, pastQuestionsCount: 74, status: 'Review Required' },
      { id: 'm3', title: 'Trigonometric Identities & Sine Rule', mastery: 88, pastQuestionsCount: 62, status: 'Mastered' },
      { id: 'm4', title: 'Permutations & Combinations (Counting)', mastery: 85, pastQuestionsCount: 55, status: 'Mastered' },
    ],
  },
  {
    id: 'biology',
    name: 'Senior Biology & Genetics',
    code: 'BIO-304',
    icon: 'psychology_alt',
    mastery: 91,
    totalTopics: 14,
    completedTopics: 13,
    urgentTopics: 0,
    color: 'text-secondary',
    formulaSheet: [
      'Mendelian Ratio: Monohybrid F2 = 3:1 (Phenotype), 1:2:1 (Genotype)',
      'Hardy-Weinberg: p² + 2pq + q² = 1, p + q = 1',
    ],
    topics: [
      { id: 'b1', title: 'Mendelian Genetics & DNA Transcription', mastery: 94, pastQuestionsCount: 60, status: 'Mastered' },
      { id: 'b2', title: 'Ecology & Nutrient Cycles (Nitrogen/Carbon)', mastery: 90, pastQuestionsCount: 42, status: 'Mastered' },
      { id: 'b3', title: 'Circulatory & Respiratory Systems', mastery: 92, pastQuestionsCount: 50, status: 'Mastered' },
    ],
  },
  {
    id: 'english',
    name: 'English Language & Lexis',
    code: 'ENG-305',
    icon: 'menu_book',
    mastery: 85,
    totalTopics: 12,
    completedTopics: 10,
    urgentTopics: 1,
    color: 'text-tertiary',
    formulaSheet: [
      'Concord: Singular subjects take singular verbs',
      'Registers: Lexis of Science, Law, and Aviation',
    ],
    topics: [
      { id: 'e1', title: 'Grammatical Concord & Subject-Verb Agreement', mastery: 88, pastQuestionsCount: 70, status: 'Mastered' },
      { id: 'e2', title: 'Oral English & Vowel Sound Contrast', mastery: 74, pastQuestionsCount: 65, status: 'Review Required' },
      { id: 'e3', title: 'Comprehension Strategy & Summary Writing', mastery: 91, pastQuestionsCount: 48, status: 'Mastered' },
    ],
  },
];

export default function AchieverSubjectsPage() {
  const { showToast } = useDemo();
  const [activeTab, setActiveTab] = useState<'all' | 'priority'>('all');
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [isFormulaModalOpen, setIsFormulaModalOpen] = useState(false);

  const filtered = activeTab === 'priority' ? SUBJECTS.filter((s) => s.urgentTopics > 0) : SUBJECTS;

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Subject Library & Syllabus Mastery"
          subtitle="WAEC & UTME Standardized Curriculum Hub"
        />

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="font-jakarta font-extrabold text-2xl text-on-surface">
                Curriculum Subjects
              </h2>
              <p className="text-xs text-on-surface-variant font-inter mt-1">
                Official syllabus tracking mapped to national examination benchmarks
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-surface-container-high p-1 rounded-xl">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-jakarta font-semibold transition-all ${
                    activeTab === 'all'
                      ? 'bg-white text-primary shadow-xs'
                      : 'text-on-surface-variant'
                  }`}
                >
                  All Subjects ({SUBJECTS.length})
                </button>
                <button
                  onClick={() => setActiveTab('priority')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-jakarta font-semibold transition-all ${
                    activeTab === 'priority'
                      ? 'bg-white text-amber-900 font-bold shadow-xs'
                      : 'text-on-surface-variant'
                  }`}
                >
                  Needs Attention (3)
                </button>
              </div>

              <Link
                href="/achiever/diagnostic"
                className="px-4 py-2 rounded-xl bg-[#006c49] text-white font-jakarta font-bold text-xs hover:bg-[#005236] shadow-sm transition-all flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">quiz</span>
                <span>Launch Diagnostic Mock</span>
              </Link>
            </div>
          </div>

          {/* Subject Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((subject) => (
              <div
                key={subject.id}
                className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-sm hover:shadow-md hover:border-[#003f7a] transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-2xl">{subject.icon}</span>
                    </div>
                    <span className="font-mono text-xs font-bold text-outline uppercase">
                      {subject.code}
                    </span>
                  </div>

                  <h3 className="font-jakarta font-bold text-base text-on-surface">
                    {subject.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs font-inter text-on-surface-variant mt-3 mb-1">
                    <span>Mastery Progress</span>
                    <span className="font-mono font-bold text-primary">{subject.mastery}%</span>
                  </div>

                  <div className="w-full bg-surface-container-highest rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${subject.mastery}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 text-xs text-on-surface-variant font-inter">
                    <span>
                      {subject.completedTopics}/{subject.totalTopics} Topics Mastered
                    </span>
                    {subject.urgentTopics > 0 ? (
                      <span className="text-amber-800 font-bold flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                        {subject.urgentTopics} Priority Gap
                      </span>
                    ) : (
                      <span className="text-secondary font-semibold">100% On Track</span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-surface-container flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedSubject(subject)}
                    className="flex-1 py-2 text-center rounded-xl bg-surface-container-high text-primary font-jakarta font-bold text-xs hover:bg-primary-fixed transition-colors"
                  >
                    Inspect Topics ({subject.topics.length})
                  </button>
                  <Link
                    href="/achiever/ai-partner"
                    className="p-2 rounded-xl border border-outline-variant text-outline hover:text-primary hover:border-primary transition-colors"
                    title="Study with AI Tutor"
                  >
                    <span className="material-symbols-outlined text-base">smart_toy</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Subject Topic Inspector Drawer */}
      {selectedSubject && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 md:p-6 font-sans">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in">
            {/* Header */}
            <div className="p-6 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-primary font-bold">{selectedSubject.code} Syllabus</span>
                <h3 className="font-jakarta font-bold text-lg text-on-surface mt-0.5">{selectedSubject.name}</h3>
              </div>
              <button
                onClick={() => setSelectedSubject(null)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Topics List */}
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-jakarta font-bold text-xs uppercase tracking-wider text-outline">
                  Syllabus Breakdown &amp; Recovery Priority
                </h4>
                <button
                  onClick={() => setIsFormulaModalOpen(true)}
                  className="px-3 py-1 rounded-xl border border-outline-variant text-xs font-jakarta font-bold text-primary hover:bg-surface-container flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">menu_book</span>
                  <span>Formula Sheet</span>
                </button>
              </div>

              <div className="space-y-3">
                {selectedSubject.topics.map((topic) => (
                  <div
                    key={topic.id}
                    className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-wrap items-center justify-between gap-3 hover:border-primary transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-jakarta font-bold text-xs text-on-surface">{topic.title}</h5>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                            topic.status === 'Mastered'
                              ? 'bg-green-100 text-green-950 border border-green-300'
                              : topic.status === 'Review Required'
                              ? 'bg-amber-100 text-amber-950 border border-amber-300'
                              : 'bg-blue-100 text-blue-950 border border-blue-200'
                          }`}
                        >
                          {topic.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-outline font-inter mt-1">
                        Mastery: <strong>{topic.mastery}%</strong> • {topic.pastQuestionsCount} Past Questions
                      </p>
                    </div>

                    <Link
                      href="/achiever/diagnostic"
                      className="px-3 py-1.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container transition-all"
                    >
                      Practice Topic →
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between text-xs">
              <Link
                href="/achiever/ai-partner"
                className="text-primary font-bold font-jakarta hover:underline flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">auto_awesome</span>
                <span>Open Socratic Drill with Dr. Socratic</span>
              </Link>
              <button
                onClick={() => setSelectedSubject(null)}
                className="px-4 py-2 rounded-xl bg-surface-container font-semibold text-on-surface"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formula Sheet Modal */}
      {isFormulaModalOpen && selectedSubject && (
        <div className="fixed inset-0 z-[999999] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 font-sans">
          <div className="bg-[#131b2e] border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 shadow-2xl text-white space-y-4 animate-in fade-in">
            <div className="flex justify-between items-center pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#6ffbbe] font-bold">Standard Formula Vault</span>
                <h3 className="font-jakarta font-bold text-base text-white">{selectedSubject.name} Formulas</h3>
              </div>
              <button onClick={() => setIsFormulaModalOpen(false)} className="text-slate-400 hover:text-white">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {selectedSubject.formulaSheet.map((formula, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#1e293b] border border-slate-700/60 text-slate-200">
                  {formula}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => {
                  setIsFormulaModalOpen(false);
                  showToast('Formula cards saved to offline study cache.');
                }}
                className="px-4 py-2 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white font-bold text-xs"
              >
                Download Formula Card
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
