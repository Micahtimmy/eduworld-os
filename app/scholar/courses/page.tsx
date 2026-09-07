'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ScholarNav } from '@/components/scholar/ScholarNav';
import { useDemo } from '@/components/global/DemoContext';
import { GlobalHeaderNotifications } from '@/components/global/GlobalHeaderNotifications';

interface AcademicModule {
  code: string;
  title: string;
  credits: number;
  instructor: string;
  progress: number;
  status: string;
  lectureTopic: string;
}

export default function ScholarCoursesPage() {
  const { currentPersona, showToast } = useDemo();
  const [activeLectureModal, setActiveLectureModal] = useState<AcademicModule | null>(null);
  const [isPlayingStream, setIsPlayingStream] = useState(true);
  const [qaQuestion, setQaQuestion] = useState('');
  const [qaQuestions, setQaQuestions] = useState([
    { id: 1, author: 'Liam S. (Oxford)', text: 'Does the non-Markovian noise assumption hold for superconducting transmon qubits at 15mK?', upvotes: 7 },
    { id: 2, author: 'Dr. Vance (Imperial)', text: 'Refer to Appendix B for the Lindblad master equation correction term.', upvotes: 12 },
  ]);

  const modules: AcademicModule[] = [
    {
      code: 'PHYS-401',
      title: 'Advanced Quantum Mechanics & Many-Body Systems',
      credits: 4,
      instructor: 'Prof. Harold Thorne',
      progress: 88,
      status: 'In Progress',
      lectureTopic: 'Topological Surface Codes & Non-Abelian Anyons',
    },
    {
      code: 'CS-502',
      title: 'Quantum Algorithms & Complexity Theory',
      credits: 4,
      instructor: 'Dr. Evelyn Vance',
      progress: 92,
      status: 'In Progress',
      lectureTopic: 'Shor & Grover Quantum Lower Bounds',
    },
    {
      code: 'MATH-420',
      title: 'Differential Geometry & General Relativity',
      credits: 3,
      instructor: 'Prof. Marcus Chen',
      progress: 75,
      status: 'In Progress',
      lectureTopic: 'Riemann Curvature Tensors & Geodesic Deviation',
    },
  ];

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaQuestion.trim()) return;
    setQaQuestions((prev) => [
      ...prev,
      { id: Date.now(), author: `${currentPersona.name} (${currentPersona.institution.split('•')[0].trim()})`, text: qaQuestion, upvotes: 1 },
    ]);
    setQaQuestion('');
    showToast('Seminar inquiry dispatched to lecture podium!');
  };

  const handleUpvote = (id: number) => {
    setQaQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  return (
    <div className="flex min-h-screen bg-scholar-paper font-sans">
      <ScholarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 md:px-8 bg-white border-b border-scholar-outline-variant flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-sm text-slate-900">
              Enrolled Academic Modules &amp; Practicals
            </h2>
            <p className="text-[11px] text-[#505f76] font-mono">
              Fall / Winter Graduate Curriculum • {currentPersona.institution}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <GlobalHeaderNotifications />

            <Link href="/settings" className="shrink-0">
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {modules.map((m) => (
              <div
                key={m.code}
                className="bg-white rounded border border-scholar-outline-variant p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-slate-800 transition-all"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-xs font-bold text-slate-900 bg-[#eaeef2] px-2 py-0.5 rounded">
                      {m.code}
                    </span>
                    <span className="text-[10px] font-mono uppercase text-[#505f76] font-semibold">
                      {m.credits} Credits
                    </span>
                  </div>

                  <h3 className="font-jakarta font-bold text-sm text-slate-900 mt-2">{m.title}</h3>
                  <p className="text-[11px] text-[#505f76] font-inter mt-1">{m.instructor}</p>

                  <div className="mt-4 space-y-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#505f76]">
                      <span>Module Completion</span>
                      <span className="font-bold text-[#006c49]">{m.progress}%</span>
                    </div>
                    <div className="w-full bg-[#eaeef2] rounded-full h-1.5">
                      <div
                        className="bg-[#006c49] h-1.5 rounded-full"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#eaeef2] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {m.status}
                  </span>
                  <button
                    onClick={() => setActiveLectureModal(m)}
                    className="text-xs font-jakarta font-bold text-[#003f7a] hover:underline flex items-center gap-1"
                  >
                    <span>Access Lecture Hall</span>
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Interactive Lecture Hall Modal */}
      {activeLectureModal && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 md:p-8 font-sans">
          <div className="bg-[#131b2e] border border-slate-700/80 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white animate-in fade-in">
            {/* Header */}
            <div className="p-4 md:px-6 bg-[#0a0f1d] border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold">
                    Live Graduate Lecture Stream
                  </span>
                </div>
                <h3 className="font-jakarta font-bold text-base text-white mt-0.5">
                  {activeLectureModal.code}: {activeLectureModal.lectureTopic}
                </h3>
              </div>
              <button
                onClick={() => setActiveLectureModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Split Screen Video & Discussion */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-800 overflow-hidden">
              {/* Left Video / Slide Stage */}
              <div className="md:col-span-7 p-6 flex flex-col justify-between bg-black/40 space-y-4">
                <div className="flex-1 rounded-2xl bg-[#080d19] border border-slate-800 p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                  <div className="text-6xl text-[#6ffbbe] mb-3 animate-pulse">Ω</div>
                  <h4 className="font-jakarta font-bold text-lg text-white">
                    {activeLectureModal.lectureTopic}
                  </h4>
                  <p className="text-xs text-slate-400 font-mono mt-1">{activeLectureModal.instructor}</p>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-[#6ffbbe]">graphic_eq</span>
                      <span>Audio HD (48kHz)</span>
                    </span>
                    <span>Slide 18 of 42</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setIsPlayingStream(!isPlayingStream)}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-jakarta font-bold flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-base">
                      {isPlayingStream ? 'pause' : 'play_arrow'}
                    </span>
                    <span>{isPlayingStream ? 'Pause Stream' : 'Resume Stream'}</span>
                  </button>

                  <button
                    onClick={() => showToast('Lecture annotations and slides downloaded to your local research folder.')}
                    className="px-4 py-2 rounded-xl border border-slate-700 hover:bg-slate-800 text-xs font-jakarta font-bold flex items-center gap-1.5 text-slate-300"
                  >
                    <span className="material-symbols-outlined text-base">download</span>
                    <span>Download Slides (PDF)</span>
                  </button>
                </div>
              </div>

              {/* Right: Live Q&A Forum */}
              <div className="md:col-span-5 p-5 flex flex-col justify-between bg-[#0f172a] overflow-hidden">
                <div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                    <h4 className="font-jakarta font-bold text-xs text-white uppercase tracking-wider">
                      Live Seminar Q&amp;A
                    </h4>
                    <span className="text-[10px] font-mono text-[#6ffbbe]">{qaQuestions.length} Questions</span>
                  </div>

                  <div className="mt-3 space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                    {qaQuestions.map((q) => (
                      <div key={q.id} className="p-3 rounded-xl bg-[#1e293b] border border-slate-700/60 space-y-1.5 text-xs">
                        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                          <span>{q.author}</span>
                          <button
                            onClick={() => handleUpvote(q.id)}
                            className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[#6ffbbe] font-bold"
                          >
                            <span className="material-symbols-outlined text-xs">thumb_up</span>
                            <span>{q.upvotes}</span>
                          </button>
                        </div>
                        <p className="text-slate-200 font-inter leading-relaxed">{q.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question Input */}
                <form onSubmit={handlePostQuestion} className="pt-3 border-t border-slate-800 flex gap-2">
                  <input
                    type="text"
                    placeholder="Submit question to podium..."
                    value={qaQuestion}
                    onChange={(e) => setQaQuestion(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl bg-[#1e293b] border border-slate-700 text-xs text-white outline-none focus:border-[#6ffbbe]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white text-xs font-bold font-jakarta flex items-center"
                  >
                    <span className="material-symbols-outlined text-sm">send</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
