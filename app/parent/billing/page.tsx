'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';

interface Invoice {
  id: string;
  child: string;
  tier: 'Achiever' | 'Explorer';
  term: string;
  items: { desc: string; amount: number }[];
  total: number;
  status: 'Paid' | 'Due Soon' | 'Pending';
  dueDate: string;
}

const INVOICES: Invoice[] = [
  {
    id: 'INV-2026-084',
    child: 'Kalu Nnamdi (Year 12)',
    tier: 'Achiever',
    term: 'Spring Term 2026',
    items: [
      { desc: 'Tuition & WAEC Examination Registration', amount: 850 },
      { desc: 'Advanced Physics Lab Materials & CBT License', amount: 150 },
      { desc: 'EduWorld Unlimited AI Tutor Diagnostic Subscription', amount: 80 },
    ],
    total: 1080,
    status: 'Due Soon',
    dueDate: 'March 31, 2026',
  },
  {
    id: 'INV-2026-042',
    child: 'Zara Chen (Grade 5)',
    tier: 'Explorer',
    term: 'Spring Term 2026',
    items: [
      { desc: 'Junior STEM Curriculum & Robotics Workshop', amount: 450 },
      { desc: 'Field Excursion to National Planetarium', amount: 65 },
    ],
    total: 515,
    status: 'Paid',
    dueDate: 'January 15, 2026',
  },
];

export default function ParentBillingPage() {
  const { currentPersona, showToast } = useDemo();
  const [invoices, setInvoices] = useState<Invoice[]>(INVOICES);
  const [payingInvoice, setPayingInvoice] = useState<Invoice | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (!payingInvoice) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setInvoices((prev) =>
        prev.map((inv) =>
          inv.id === payingInvoice.id ? { ...inv, status: 'Paid' } : inv
        )
      );
      setPayingInvoice(null);
      showToast(`Payment of $${payingInvoice.total} for ${payingInvoice.child} confirmed! Receipt #RCT-${Date.now().toString().slice(-6)} generated.`);
    }, 1200);
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Parent Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0 h-screen sticky top-0 shadow-xs z-20">
        <div className="p-5 border-b border-slate-200 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#5b3700] text-white flex items-center justify-center font-bold shadow-xs">
            <span className="material-symbols-outlined text-2xl">family_restroom</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-slate-900">EduWorld Parent</h1>
            <span className="text-[11px] font-mono uppercase text-[#5b3700] font-bold">Household Portal</span>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <Link
            href="/parent/dashboard"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold text-slate-700 hover:bg-slate-100 transition-all"
          >
            <span className="material-symbols-outlined text-lg text-slate-500">dashboard</span>
            <span>Household Summary</span>
          </Link>

          <Link
            href="/parent/billing"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-bold bg-[#5b3700] text-white shadow-sm transition-all"
          >
            <span className="material-symbols-outlined text-lg text-white">payments</span>
            <span>Fee &amp; Lab Billing Center</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-slate-200 bg-slate-50 text-xs">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-[#003f7a] hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <div className="flex items-center gap-2 pt-2">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-slate-900 truncate">{currentPersona.name}</p>
              <p className="text-[10px] text-slate-500 font-mono truncate">{currentPersona.roleTitle}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-8 bg-white border-b border-slate-200 flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-base text-slate-900">
              Consolidated Household Billing &amp; Fee Management
            </h2>
            <p className="text-xs text-slate-500 font-inter">
              Guardian ID: #GRD-77402 • Linked to 2 Enrolled Students
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-950 font-jakarta font-bold text-xs border border-emerald-300">
              ✓ Automated Bank Settlement Active
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* Summary Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                Total Household Dues
              </span>
              <div className="font-jakarta font-black text-3xl text-slate-900 mt-1">
                ${invoices.filter((i) => i.status !== 'Paid').reduce((acc, i) => acc + i.total, 0)}
              </div>
              <span className="text-[11px] font-bold text-amber-700 mt-1 block">Due in 24 Days</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                Paid YTD (2025/2026)
              </span>
              <div className="font-jakarta font-black text-3xl text-[#006c49] mt-1">
                $3,420
              </div>
              <span className="text-[11px] font-bold text-slate-500 mt-1 block">4 Receipts on File</span>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md">
              <span className="text-xs font-mono uppercase text-slate-500 font-bold block">
                Payment Method
              </span>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-1 rounded bg-slate-100 border border-slate-300 font-mono font-bold text-xs text-slate-800">
                  VISA •••• 4892
                </span>
                <span className="text-xs font-bold text-[#003f7a]">Default</span>
              </div>
              <span className="text-[11px] text-slate-500 mt-2 block">Expires 09/28</span>
            </div>
          </div>

          {/* Invoices List */}
          <div className="space-y-6">
            {invoices.map((inv) => (
              <div
                key={inv.id}
                className="bg-white rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold bg-slate-100 px-2.5 py-0.5 rounded border border-slate-300 text-slate-800">
                        {inv.id}
                      </span>
                      <h3 className="font-jakarta font-bold text-lg text-slate-900">
                        {inv.child}
                      </h3>
                      <span
                        className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${
                          inv.tier === 'Achiever'
                            ? 'bg-blue-100 text-[#003f7a] border border-blue-200'
                            : 'bg-green-100 text-[#2b6c00] border border-green-300'
                        }`}
                      >
                        {inv.tier} Tier
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-inter mt-1">
                      {inv.term} • Due Date: {inv.dueDate}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase font-jakarta ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-950 border border-emerald-300'
                          : 'bg-amber-100 text-amber-950 border border-amber-300'
                      }`}
                    >
                      {inv.status}
                    </span>

                    {inv.status !== 'Paid' && (
                      <button
                        onClick={() => setPayingInvoice(inv)}
                        className="px-5 py-2.5 rounded-xl bg-[#5b3700] text-white font-jakarta font-bold text-xs hover:bg-[#7a4c00] shadow-sm transition-all flex items-center gap-1.5 active:scale-95"
                      >
                        <span className="material-symbols-outlined text-base">credit_card</span>
                        <span>Pay ${inv.total}</span>
                      </button>
                    )}

                    {inv.status === 'Paid' && (
                      <button
                        onClick={() => showToast(`Downloaded Official Tax Receipt for ${inv.id}`)}
                        className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-jakarta font-bold text-xs transition-all flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base text-slate-500">download</span>
                        <span>Receipt</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Itemized breakdown table */}
                <div className="divide-y divide-slate-100 text-xs font-inter">
                  {inv.items.map((item, idx) => (
                    <div key={idx} className="py-2.5 flex justify-between items-center text-slate-700">
                      <span>{item.desc}</span>
                      <span className="font-mono font-bold text-slate-900">${item.amount}.00</span>
                    </div>
                  ))}
                  <div className="pt-3 flex justify-between items-center text-sm font-jakarta font-black text-slate-900">
                    <span>Total Invoiced</span>
                    <span className="font-mono font-black text-lg text-[#003f7a]">
                      ${inv.total}.00
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Modal */}
          {payingInvoice && (
            <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 max-w-lg w-full shadow-2xl space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div>
                    <h3 className="font-jakarta font-bold text-lg text-slate-900">
                      Secure Tuition Checkout
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Invoice: {payingInvoice.id} • {payingInvoice.child}
                    </p>
                  </div>
                  <button
                    onClick={() => setPayingInvoice(null)}
                    className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
                  >
                    <span className="material-symbols-outlined text-lg">close</span>
                  </button>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-700 font-medium">Total Amount to Charge:</span>
                  <span className="font-jakarta font-black text-2xl text-[#003f7a]">
                    ${payingInvoice.total}.00
                  </span>
                </div>

                <form onSubmit={handlePay} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-900 font-jakarta">
                      Card Number
                    </label>
                    <input
                      type="text"
                      defaultValue="4242 •••• •••• 4892"
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 outline-none focus:border-[#003f7a]"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-900 font-jakarta">
                        Expiration
                      </label>
                      <input
                        type="text"
                        defaultValue="09 / 28"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 outline-none focus:border-[#003f7a]"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-slate-900 font-jakarta">
                        CVC Security Code
                      </label>
                      <input
                        type="password"
                        defaultValue="842"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 text-xs font-mono text-slate-900 outline-none focus:border-[#003f7a]"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setPayingInvoice(null)}
                      className="py-3 px-5 rounded-xl border border-slate-300 text-slate-700 font-jakarta font-bold text-xs hover:bg-slate-100 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 py-3 px-6 rounded-xl bg-[#5b3700] hover:bg-[#7a4c00] text-white font-jakarta font-bold text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <span>Processing Payment...</span>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-base">lock</span>
                          <span>Authorize ${payingInvoice.total}.00 Payment</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
