'use client';

import React, { useState } from 'react';
import { ScholarNav } from '@/components/scholar/ScholarNav';

interface Paper {
  id: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  doi: string;
  citations: number;
  relevance: number;
  gapIdentified: string;
}

const PAPERS: Paper[] = [
  {
    id: '1',
    title: 'Topological Quantum Memory Thresholds in Surface Codes under Correlated Noise',
    authors: 'Fowler, A. G., Whiteside, A. C., & Hollenberg, L. C.',
    journal: 'Physical Review Letters',
    year: 2024,
    doi: '10.1103/PhysRevLett.108.180501',
    citations: 412,
    relevance: 98,
    gapIdentified:
      'Lacks empirical validation for multi-qubit crosstalk in high-density 2D superconducting planar grids.',
  },
  {
    id: '2',
    title: 'Fault-Tolerant Quantum Computation with Magic-State Distillation Protocols',
    authors: 'Bravyi, S., & Kitaev, A.',
    journal: 'Annals of Physics',
    year: 2023,
    doi: '10.1016/j.aop.2004.11.004',
    citations: 890,
    relevance: 94,
    gapIdentified:
      'High overhead in physical-to-logical qubit ratio necessitates alternative syndrome decoding algorithms.',
  },
];

export default function ScholarResearchPage() {
  const [searchQuery, setSearchQuery] = useState('Topological surface codes error thresholds');
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(PAPERS[0]);

  return (
    <div className="flex min-h-screen bg-scholar-paper">
      <ScholarNav />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-white border-b border-scholar-outline-variant flex items-center justify-between sticky top-0 z-30">
          <div>
            <h2 className="font-jakarta font-bold text-sm text-on-surface">
              Semantic Research &amp; Literature Gap Analysis Workspace
            </h2>
            <p className="text-[11px] text-scholar-secondary font-mono">
              AI-Augmented Citation Vault &amp; DOI CrossRef Integration
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 rounded bg-scholar-slate border border-scholar-outline-variant text-scholar-primary font-jakarta font-semibold text-xs hover:bg-slate-200">
              Export BibTeX
            </button>
            <button className="px-3.5 py-1.5 rounded bg-scholar-primary text-white font-jakarta font-semibold text-xs hover:bg-black">
              ✦ Synthesize Research Gap
            </button>
          </div>
        </header>

        <main className="flex-1 p-8 max-w-7xl mx-auto w-full space-y-6 font-sans">
          {/* Query Bar */}
          <div className="bg-white rounded border border-scholar-outline-variant p-4 shadow-xs flex items-center gap-3">
            <span className="material-symbols-outlined text-scholar-primary">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Query semantic index (e.g. arxiv, crossref, pubmed)..."
              className="flex-1 text-xs font-inter text-on-surface outline-none bg-transparent"
            />
            <span className="text-[10px] font-mono text-scholar-secondary bg-scholar-slate px-2 py-1 rounded">
              2,840 Papers Indexed
            </span>
          </div>

          {/* Split Pane */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Paper List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono uppercase text-scholar-secondary font-bold">
                Ranked Literature Nodes
              </div>

              {PAPERS.map((paper) => (
                <div
                  key={paper.id}
                  onClick={() => setSelectedPaper(paper)}
                  className={`p-4 rounded border cursor-pointer transition-all ${
                    selectedPaper?.id === paper.id
                      ? 'bg-white border-scholar-primary shadow-xs ring-1 ring-scholar-primary'
                      : 'bg-white border-scholar-outline-variant hover:border-scholar-secondary'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-jakarta font-bold text-xs text-on-surface leading-tight">
                      {paper.title}
                    </h4>
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 shrink-0">
                      {paper.relevance}% Match
                    </span>
                  </div>

                  <p className="text-[11px] text-scholar-secondary font-inter">
                    {paper.authors} ({paper.year}) — <em className="italic">{paper.journal}</em>
                  </p>

                  <div className="flex items-center gap-3 text-[10px] font-mono text-scholar-secondary mt-2 pt-2 border-t border-scholar-slate">
                    <span>DOI: {paper.doi}</span>
                    <span>•</span>
                    <span>{paper.citations} Citations</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Semantic Inspector Pane (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded border border-scholar-outline-variant p-6 shadow-xs space-y-4">
              {selectedPaper ? (
                <>
                  <div className="flex items-center gap-2 text-xs font-jakarta font-bold text-scholar-primary">
                    <span className="material-symbols-outlined text-base">psychology</span>
                    <span>EduWorld AI Semantic Gap Analysis</span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-jakarta font-bold text-xs text-on-surface leading-tight">
                      {selectedPaper.title}
                    </h3>
                    <p className="text-[11px] text-scholar-secondary font-mono">
                      {selectedPaper.doi}
                    </p>
                  </div>

                  <div className="p-3.5 rounded bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <strong className="font-jakarta font-bold text-[11px] uppercase tracking-wider block">
                      Unaddressed Research Opportunity:
                    </strong>
                    <p className="font-inter leading-relaxed text-[11px]">
                      {selectedPaper.gapIdentified}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 text-xs">
                    <h4 className="font-jakarta font-bold text-[11px] uppercase text-scholar-secondary">
                      Suggested Methodology for Dissertation:
                    </h4>
                    <p className="text-scholar-secondary font-inter text-[11px] leading-relaxed">
                      Construct a Monte Carlo simulation targeting surface code lattice boundaries under
                      correlated thermal drift (0.01K to 0.05K).
                    </p>
                  </div>

                  <button className="w-full py-2 rounded bg-scholar-primary text-white font-jakarta font-bold text-xs hover:bg-black transition-colors">
                    Insert Citation into Chapter 4
                  </button>
                </>
              ) : (
                <p className="text-xs text-scholar-secondary">Select a paper to inspect gaps.</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
