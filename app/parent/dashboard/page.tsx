'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';
import { GlobalHeaderNotifications } from '@/components/global/GlobalHeaderNotifications';

export default function ParentDashboardPage() {
  const { currentPersona, showToast, formatCurrency, addNotification } = useDemo();
  const [selectedChild, setSelectedChild] = useState<'kalu' | 'zara'>('kalu');
  const [activeTab, setActiveTab] = useState<'summary' | 'screentime' | 'messages' | 'billing'>('summary');
  
  // Audio narration state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Screen time state
  const [dailyLimitHours, setDailyLimitHours] = useState(2.5);
  const [bedtimeLock, setBedtimeLock] = useState(true);
  const [socraticStrict, setSocraticStrict] = useState(true);
  const [webSandbox, setWebSandbox] = useState(true);

  // Messaging state
  const [messages, setMessages] = useState<{ sender: 'parent' | 'teacher'; text: string; time: string }[]>([
    {
      sender: 'teacher',
      text: 'Good afternoon Mrs. Okafor! Kalu scored 88% on his recent electromagnetic induction diagnostic drill. He is well-positioned for an A1 in WAEC Physics.',
      time: 'Yesterday 14:20',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isExcuseModalOpen, setIsExcuseModalOpen] = useState(false);
  const [excuseDate, setExcuseDate] = useState('2026-09-10');
  const [excuseReason, setExcuseReason] = useState('Medical Appointment / Routine Health Check');

  // Wallet top up modal
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState(25);
  const [walletBalance, setWalletBalance] = useState(45.50);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg = chatInput;
    setMessages((prev) => [...prev, { sender: 'parent', text: userMsg, time: 'Just now' }]);
    setChatInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'teacher',
          text: `Thank you for your message, Mrs. Okafor. I have noted this in ${selectedChild === 'kalu' ? "Kalu's" : "Zara's"} student academic journal.`,
          time: 'Just now',
        },
      ]);
      addNotification(
        'New Teacher Response',
        `Prof. Sarah Jenkins replied to your message regarding ${selectedChild === 'kalu' ? 'Kalu' : 'Zara'}.`,
        'academic',
        '/parent/dashboard'
      );
    }, 1200);
  };

  const handleSendExcuse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExcuseModalOpen(false);
    showToast(`Official absence notice submitted for ${selectedChild === 'kalu' ? 'Kalu Nnamdi' : 'Zara Chen'} (${excuseDate}).`);
    addNotification(
      'Absence Notice Acknowledged',
      `School administration received medical excuse for ${selectedChild === 'kalu' ? 'Kalu' : 'Zara'}.`,
      'system'
    );
  };

  const handleTopUpWallet = () => {
    setWalletBalance((prev) => prev + topUpAmount);
    setIsWalletModalOpen(false);
    showToast(`Successfully added ${formatCurrency(topUpAmount)} to ${selectedChild === 'kalu' ? 'Kalu' : 'Zara'}'s Cafeteria & Smart ID card!`);
    addNotification(
      'Wallet Top-Up Successful',
      `Credited ${formatCurrency(topUpAmount)} to smart badge ID.`,
      'billing',
      '/parent/billing'
    );
  };

  const handleSaveControls = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Guardian digital safety rules updated for ${selectedChild === 'kalu' ? 'Kalu' : 'Zara'}!`);
  };

  const toggleAudioDigest = () => {
    if (!isPlayingAudio) {
      setIsPlayingAudio(true);
      showToast('Playing AI Socratic Weekly Audio Brief...');
      setTimeout(() => setIsPlayingAudio(false), 5000);
    } else {
      setIsPlayingAudio(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Parent Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
            <span className="material-symbols-outlined text-2xl">family_restroom</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Parent</h1>
            <span className="text-[10px] font-mono uppercase text-outline font-bold">Household Portal</span>
          </div>
        </div>

        {/* Child Selector */}
        <div className="p-4 mx-3 my-3 bg-surface-container-low rounded-2xl border border-outline-variant space-y-2">
          <span className="text-[10px] font-mono uppercase text-outline font-bold">
            Select Household Student:
          </span>
          <div className="flex flex-col gap-1.5">
            <button
              onClick={() => setSelectedChild('kalu')}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left font-jakarta text-xs font-bold transition-all ${
                selectedChild === 'kalu'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-white text-primary flex items-center justify-center text-[10px] font-black shrink-0">
                KN
              </div>
              <div className="min-w-0 flex-1">
                <p className="leading-tight truncate">Kalu Nnamdi</p>
                <p className={`text-[9px] font-mono truncate ${selectedChild === 'kalu' ? 'text-blue-100' : 'text-outline'}`}>
                  Achiever (Year 12 / UTME)
                </p>
              </div>
            </button>

            <button
              onClick={() => setSelectedChild('zara')}
              className={`flex items-center gap-2.5 p-2 rounded-xl text-left font-jakarta text-xs font-bold transition-all ${
                selectedChild === 'zara'
                  ? 'bg-[#2b6c00] text-white shadow-xs'
                  : 'text-on-surface hover:bg-surface-container'
              }`}
            >
              <div className="w-7 h-7 rounded-full bg-white text-[#2b6c00] flex items-center justify-center text-[10px] font-black shrink-0">
                ZC
              </div>
              <div className="min-w-0 flex-1">
                <p className="leading-tight truncate">Zara Chen</p>
                <p className={`text-[9px] font-mono truncate ${selectedChild === 'zara' ? 'text-emerald-100' : 'text-outline'}`}>
                  Explorer (Grade 5 / Cadet)
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all text-left ${
              activeTab === 'summary'
                ? 'bg-primary-fixed/60 text-primary font-bold shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">dashboard</span>
            <span>Academic Summary</span>
          </button>

          <button
            onClick={() => setActiveTab('screentime')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all text-left ${
              activeTab === 'screentime'
                ? 'bg-primary-fixed/60 text-primary font-bold shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">timer</span>
            <span>Screen Time &amp; AI Safety</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all text-left ${
              activeTab === 'messages'
                ? 'bg-primary-fixed/60 text-primary font-bold shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">chat</span>
            <span>Faculty Direct Messaging</span>
          </button>

          <Link
            href="/parent/billing"
            className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold text-on-surface hover:bg-surface-container-low transition-all"
          >
            <span className="material-symbols-outlined text-base text-outline">payments</span>
            <span>Fee &amp; Lab Billing Center</span>
          </Link>
        </nav>

        {/* User Info Footer */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low text-xs space-y-2">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-primary hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <div className="flex items-center gap-2.5 pt-1">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-on-surface truncate">{currentPersona.name}</p>
              <p className="text-[10px] text-outline font-mono truncate">{currentPersona.roleTitle}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 md:px-8 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-base text-on-surface">
              {selectedChild === 'kalu'
                ? 'Kalu Nnamdi — Achiever Tier (Year 12 UTME/WAEC)'
                : 'Zara Chen — Explorer Tier (Grade 5 Cadet)'}
            </h2>
            <p className="text-xs text-on-surface-variant font-inter">
              {selectedChild === 'kalu'
                ? "King's College Lagos • Target Score: 342+ JAMB"
                : 'St. Claire Elementary • Science Exploration Track'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsExcuseModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-outline-variant bg-surface-container text-xs font-jakarta font-bold text-on-surface hover:border-primary transition-all"
            >
              <span className="material-symbols-outlined text-sm text-outline">event_available</span>
              <span>Submit Absence Note</span>
            </button>

            <button
              onClick={() => setIsWalletModalOpen(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-jakarta font-bold hover:bg-primary-container transition-all shadow-xs"
            >
              <span className="material-symbols-outlined text-sm">account_balance_wallet</span>
              <span>Smart Wallet: {formatCurrency(walletBalance)}</span>
            </button>

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

        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* TAB 1: SUMMARY */}
          {activeTab === 'summary' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Weekly AI Narrative Digest */}
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-secondary font-jakarta font-bold text-xs uppercase tracking-wider">
                    <span className="material-symbols-outlined text-base">auto_awesome</span>
                    <span>EduWorld AI Weekly Guardian Executive Digest</span>
                  </div>

                  <button
                    onClick={toggleAudioDigest}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-jakarta font-bold transition-all ${
                      isPlayingAudio
                        ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                        : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isPlayingAudio ? 'volume_up' : 'play_circle'}
                    </span>
                    <span>{isPlayingAudio ? 'Playing Brief...' : 'Listen to 60s Audio Brief'}</span>
                  </button>
                </div>

                <h3 className="font-jakarta font-extrabold text-xl text-on-surface leading-snug">
                  {selectedChild === 'kalu'
                    ? 'Kalu is performing in the Top 2% nationally in Senior Physics and Pure Mathematics.'
                    : 'Zara unlocked 3 Space Badges and maintained a 7-day science quest streak.'}
                </h3>

                <p className="text-sm text-on-surface-variant font-inter leading-relaxed">
                  {selectedChild === 'kalu'
                    ? 'Kalu completed a 40-question JAMB diagnostic mock with a projected 342 score. Our Socratic diagnostic engine pinpointed Work, Energy & Power as the single topic to review for guaranteed distinctions.'
                    : 'Zara spent 45 minutes on the Mars Rover Exploration module this week. Her astronomical inquiry and reading speed are progressing 18% ahead of standard grade milestones.'}
                </p>

                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href={selectedChild === 'kalu' ? '/achiever/diagnostic' : '/explorer/quests'}
                    className="px-4 py-2 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span>{selectedChild === 'kalu' ? 'View JAMB Diagnostic Scorecard' : 'View Adventure Quest Map'}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </Link>

                  <Link
                    href={selectedChild === 'kalu' ? '/achiever/performance' : '/explorer/shop'}
                    className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface font-jakarta font-bold text-xs hover:bg-surface-container-highest transition-all"
                  >
                    {selectedChild === 'kalu' ? 'Official Term Transcript' : 'Cadet Star Shop'}
                  </Link>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
                  <span className="text-xs text-outline font-inter uppercase font-semibold">Attendance Rate</span>
                  <div className="text-2xl font-jakarta font-extrabold text-on-surface mt-1">98.5%</div>
                  <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                    On Track • 0 Unexcused Absences
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
                  <span className="text-xs text-outline font-inter uppercase font-semibold">
                    Term 2 Tuition Status
                  </span>
                  <div className="text-2xl font-jakarta font-extrabold text-secondary mt-1">Cleared ✓</div>
                  <span className="text-xs text-outline font-inter mt-1 inline-block">
                    Next Invoice Due: Term 3 (in 45 days)
                  </span>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-5 shadow-sm">
                  <span className="text-xs text-outline font-inter uppercase font-semibold">
                    Study Habit Streak
                  </span>
                  <div className="text-2xl font-jakarta font-extrabold text-amber-600 mt-1">
                    {selectedChild === 'kalu' ? '🔥 14 Days Active' : '⭐ 7 Days Active'}
                  </div>
                  <span className="text-xs text-secondary font-bold font-jakarta mt-1 inline-block">
                    High Engagement Index
                  </span>
                </div>
              </div>

              {/* Subject Breakdown & Homework Agenda */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm space-y-4">
                  <h4 className="font-jakarta font-bold text-base text-on-surface">
                    {selectedChild === 'kalu' ? 'Subject Mastery Overview' : 'Quest Module Mastery'}
                  </h4>

                  <div className="space-y-3">
                    {(selectedChild === 'kalu'
                      ? [
                          { subject: 'Physics (UTME/WAEC)', mastery: 84, color: 'bg-primary' },
                          { subject: 'Chemistry', mastery: 88, color: 'bg-secondary' },
                          { subject: 'Further Mathematics', mastery: 79, color: 'bg-primary' },
                          { subject: 'Biology & Genetics', mastery: 91, color: 'bg-secondary' },
                        ]
                      : [
                          { subject: 'Solar System & Astronomy', mastery: 92, color: 'bg-[#2b6c00]' },
                          { subject: 'Earth Science & Nature', mastery: 88, color: 'bg-[#2b6c00]' },
                          { subject: 'Junior Robotics & Coding', mastery: 76, color: 'bg-amber-500' },
                          { subject: 'Creative Writing & Reading', mastery: 95, color: 'bg-[#2b6c00]' },
                        ]
                    ).map((item) => (
                      <div key={item.subject} className="space-y-1">
                        <div className="flex justify-between text-xs font-inter">
                          <span className="font-semibold text-on-surface">{item.subject}</span>
                          <span className="font-mono font-bold text-on-surface">{item.mastery}%</span>
                        </div>
                        <div className="w-full bg-surface-container-highest rounded-full h-2">
                          <div
                            className={`${item.color} h-2 rounded-full`}
                            style={{ width: `${item.mastery}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant p-6 shadow-sm space-y-4">
                  <h4 className="font-jakarta font-bold text-base text-on-surface">Upcoming Tests &amp; Agenda</h4>
                  <div className="space-y-3">
                    {(selectedChild === 'kalu'
                      ? [
                          { title: 'JAMB National CBT Mock #3', date: 'This Friday • 09:00 AM', tag: 'CBT Simulator' },
                          { title: 'Physics Lab: Faraday Induction Drill', date: 'Monday • 11:30 AM', tag: 'Practical' },
                          { title: 'WAEC Mathematics Past Question Sprint', date: 'Wednesday • 15:00 PM', tag: 'Revision' },
                        ]
                      : [
                          { title: 'Mars Rover Science Quiz', date: 'Tomorrow • 10:00 AM', tag: 'Quest' },
                          { title: 'Dinosaur Fossil Discovery Project', date: 'Thursday • 14:00 PM', tag: 'Interactive' },
                          { title: 'Junior Star League Tournament', date: 'Saturday • 11:00 AM', tag: 'Gamified' },
                        ]
                    ).map((event) => (
                      <div
                        key={event.title}
                        className="p-3 rounded-xl bg-surface-container-low border border-outline-variant flex items-center justify-between"
                      >
                        <div>
                          <p className="font-jakarta font-bold text-xs text-on-surface">{event.title}</p>
                          <p className="text-[11px] text-outline font-inter mt-0.5">{event.date}</p>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary-fixed/40 text-primary">
                          {event.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SCREEN TIME & AI SAFETY */}
          {activeTab === 'screentime' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-primary font-jakarta font-bold text-sm">
                <span className="material-symbols-outlined text-xl">shield</span>
                <span>Guardian Digital Well-being &amp; Socratic Guardrails</span>
              </div>

              <form onSubmit={handleSaveControls} className="space-y-6 text-xs font-inter">
                {/* Daily limit slider */}
                <div className="p-5 rounded-2xl bg-surface-container-low border border-outline-variant space-y-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-jakarta font-bold text-sm text-on-surface">Daily App Screen Time Limit</p>
                      <p className="text-outline text-xs mt-0.5">App access will pause after reaching this threshold.</p>
                    </div>
                    <span className="font-mono text-base font-extrabold text-primary bg-white px-3 py-1 rounded-xl border border-outline-variant">
                      {dailyLimitHours} Hours / Day
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="6"
                    step="0.5"
                    value={dailyLimitHours}
                    onChange={(e) => setDailyLimitHours(parseFloat(e.target.value))}
                    className="w-full accent-primary cursor-pointer"
                  />
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                    <div>
                      <p className="font-jakarta font-bold text-xs text-on-surface">Bedtime Device Lock (9:00 PM - 6:00 AM)</p>
                      <p className="text-outline text-[11px] mt-0.5">Prevent late-night studying on exam days to ensure adequate rest.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={bedtimeLock}
                      onChange={(e) => setBedtimeLock(e.target.checked)}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                    <div>
                      <p className="font-jakarta font-bold text-xs text-on-surface">Strict Socratic AI Tutor Mode</p>
                      <p className="text-outline text-[11px] mt-0.5">AI will only ask guiding questions and will never give direct homework answers.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={socraticStrict}
                      onChange={(e) => setSocraticStrict(e.target.checked)}
                      className="w-5 h-5 accent-secondary cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 rounded-2xl bg-surface-container-low border border-outline-variant">
                    <div>
                      <p className="font-jakarta font-bold text-xs text-on-surface">Restricted External Web Sandbox</p>
                      <p className="text-outline text-[11px] mt-0.5">Limit all search queries and research links strictly to verified educational domains.</p>
                    </div>
                    <input
                      type="checkbox"
                      checked={webSandbox}
                      onChange={(e) => setWebSandbox(e.target.checked)}
                      className="w-5 h-5 accent-primary cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">save</span>
                    <span>Save Guardian Preferences</span>
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: FACULTY MESSAGING */}
          {activeTab === 'messages' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md flex flex-col h-[550px] animate-in fade-in">
              <div className="flex items-center justify-between pb-4 border-b border-surface-container">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-xs">
                    SJ
                  </div>
                  <div>
                    <h4 className="font-jakarta font-bold text-sm text-on-surface">
                      {selectedChild === 'kalu' ? 'Prof. Sarah Jenkins (Physics Lead)' : 'Ms. Clara Wilson (Science Tutor)'}
                    </h4>
                    <p className="text-[11px] text-secondary font-mono">● Online • Typical reply time: &lt; 15 mins</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsExcuseModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl border border-outline-variant text-xs font-jakarta font-bold text-primary hover:bg-surface-container transition-all"
                >
                  File Absence Note
                </button>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'parent' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`p-3.5 rounded-2xl max-w-md text-xs font-inter leading-relaxed ${
                        m.sender === 'parent'
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-surface-container-low text-on-surface border border-outline-variant rounded-bl-none'
                      }`}
                    >
                      {m.text}
                    </div>
                    <span className="text-[10px] text-outline mt-1 font-mono">{m.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendMessage} className="pt-3 border-t border-surface-container flex items-center gap-2">
                <input
                  type="text"
                  placeholder={`Send direct note to ${selectedChild === 'kalu' ? "Kalu's" : "Zara's"} instructor...`}
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-inter text-on-surface outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container transition-all flex items-center gap-1"
                >
                  <span>Send</span>
                  <span className="material-symbols-outlined text-sm">send</span>
                </button>
              </form>
            </div>
          )}
        </main>
      </div>

      {/* Absence Excuse Modal */}
      {isExcuseModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-jakarta font-bold text-base text-on-surface">Submit Absence / Medical Notice</h3>
              <button onClick={() => setIsExcuseModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSendExcuse} className="space-y-4 text-xs font-inter">
              <div>
                <label className="block font-bold text-on-surface mb-1">Student:</label>
                <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-on-surface">
                  {selectedChild === 'kalu' ? 'Kalu Nnamdi (Achiever Year 12)' : 'Zara Chen (Explorer Grade 5)'}
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Absence Date:</label>
                <input
                  type="date"
                  value={excuseDate}
                  onChange={(e) => setExcuseDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface"
                />
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Primary Reason:</label>
                <select
                  value={excuseReason}
                  onChange={(e) => setExcuseReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface"
                >
                  <option value="Medical Appointment / Routine Health Check">Medical Appointment / Health Check</option>
                  <option value="Family Emergency / Urgent Travel">Family Emergency / Urgent Travel</option>
                  <option value="External Competition / Olympiad Exam">External Competition / Olympiad Exam</option>
                  <option value="Religious Observance">Religious Observance</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsExcuseModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-white font-jakarta font-bold hover:bg-primary-container"
                >
                  Dispatch Notice to School
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Smart Card Wallet Top Up Modal */}
      {isWalletModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-jakarta font-bold text-base text-on-surface">Top Up Smart Cafeteria Card</h3>
              <button onClick={() => setIsWalletModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-4 text-xs font-inter">
              <div className="p-4 rounded-2xl bg-primary-fixed/30 border border-primary/20 flex justify-between items-center">
                <div>
                  <p className="font-bold text-primary">Current Badge Balance</p>
                  <p className="text-[11px] text-outline">Smart NFC Cafeteria &amp; Bookshop ID</p>
                </div>
                <span className="font-jakarta font-extrabold text-lg text-primary">
                  {formatCurrency(walletBalance)}
                </span>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-2">Select Reload Amount:</label>
                <div className="grid grid-cols-3 gap-2">
                  {[10, 25, 50].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-2.5 rounded-xl font-jakarta font-bold text-xs transition-all border ${
                        topUpAmount === amt
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                      }`}
                    >
                      {formatCurrency(amt)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsWalletModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleTopUpWallet}
                  className="px-5 py-2 rounded-xl bg-primary text-white font-jakarta font-bold hover:bg-primary-container shadow-xs"
                >
                  Confirm &amp; Charge {formatCurrency(topUpAmount)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
