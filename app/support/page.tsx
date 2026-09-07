'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';

interface FAQ {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQ[] = [
  {
    q: 'How does the Achiever JAMB/WAEC diagnostic algorithm predict exam scores?',
    a: 'EduWorld diagnostic assessments benchmark item response theory (IRT) weights against the official 10-year historical distributions of JAMB UTME and WAEC WASSCE score curves.',
    category: 'Achiever & Diagnostic',
  },
  {
    q: 'Can Explorer students exchange earned stars for real physical school supplies?',
    a: 'Schools and parent guardians can configure custom physical reward fulfillment through the Parent Command Center.',
    category: 'Explorer Tier',
  },
  {
    q: 'How do Scholar researchers export citation graphs and literature gaps?',
    a: 'Inside the Scholar AI Research workspace, click the "BibTeX Citation" or "Export Gap Matrix" buttons to download formatted references.',
    category: 'Scholar Tier',
  },
  {
    q: 'How do school administrators import bulk student CSV lists without duplicate records?',
    a: 'The Admin CSV Intake engine performs automated fuzzy deduplication against existing national candidate identifiers and guardian phone records.',
    category: 'Institutional Admin',
  },
];

export default function GlobalSupportPage() {
  const { currentPersona, showToast } = useDemo();
  const [search, setSearch] = useState('');
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const filteredFaqs = FAQS.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase()) ||
      f.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTicketSubject('');
      setTicketMessage('');
      showToast('Support ticket #TKT-99201 created! An educational engineering specialist will reply shortly.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans">
      {/* Top Header */}
      <header className="h-16 px-6 md:px-12 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <Link href={currentPersona.primaryPath} className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#003f7a] text-white flex items-center justify-center font-bold shadow-xs">
            ✦
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-slate-900 leading-tight">
              EduWorld Support
            </h1>
            <span className="text-[11px] font-mono text-slate-500 font-bold">
              Global Knowledge Architecture &amp; Help Desk
            </span>
          </div>
        </Link>

        <Link
          href={currentPersona.primaryPath}
          className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-jakarta font-bold text-xs transition-all flex items-center gap-1.5"
        >
          <span className="material-symbols-outlined text-base">arrow_back</span>
          <span>Back to Workspace</span>
        </Link>
      </header>

      <main className="flex-1 p-6 md:p-12 max-w-5xl mx-auto w-full space-y-8">
        {/* Search Hero */}
        <div className="bg-[#003f7a] text-white rounded-3xl p-8 md:p-10 shadow-xl relative overflow-hidden space-y-4">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#6ffbbe]">
              Knowledge Architecture
            </span>
            <h2 className="font-jakarta font-black text-3xl md:text-4xl text-white">
              How can we assist your learning experience today?
            </h2>
            <p className="text-xs text-slate-200 font-inter">
              Search comprehensive guides across all 8 EduWorld experience tiers or file an inquiry directly.
            </p>
          </div>

          <div className="relative max-w-2xl pt-2">
            <span className="material-symbols-outlined absolute left-4 top-5 text-slate-400 text-xl">
              search
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search diagnostic testing, star rewards, BibTeX citations, tuition payments..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 text-xs font-inter font-medium outline-none shadow-lg placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* FAQs Section */}
        <div className="space-y-4">
          <h3 className="font-jakarta font-bold text-xl text-slate-900">
            Frequently Asked Questions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredFaqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-2 hover:border-[#003f7a] transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-50 text-[#003f7a] border border-blue-200">
                    {faq.category}
                  </span>
                </div>
                <h4 className="font-jakarta font-bold text-sm text-slate-900">{faq.q}</h4>
                <p className="text-xs text-slate-600 font-inter leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Ticket Filing Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-md space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 text-[#003f7a]">
            <span className="material-symbols-outlined text-xl">support_agent</span>
            <h3 className="font-jakarta font-bold text-base text-slate-900">
              Submit an Educational Support Ticket
            </h3>
          </div>

          <form onSubmit={handleCreateTicket} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-900 font-jakarta">
                Subject Inquiry
              </label>
              <input
                type="text"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                placeholder="e.g. Question regarding JAMB 2026 physics syllabus mastery weighting"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-inter text-slate-900 outline-none focus:border-[#003f7a]"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-900 font-jakarta">
                Detailed Message
              </label>
              <textarea
                rows={3}
                value={ticketMessage}
                onChange={(e) => setTicketMessage(e.target.value)}
                placeholder="Describe your issue or feedback in detail..."
                className="w-full p-4 rounded-xl border border-slate-300 text-xs font-inter text-slate-900 outline-none focus:border-[#003f7a] resize-none"
                required
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl bg-[#003f7a] hover:bg-[#1e5799] text-white font-jakarta font-bold text-xs shadow-md transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-base">send</span>
                <span>{isSubmitting ? 'Submitting Ticket...' : 'Send to Help Desk'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
