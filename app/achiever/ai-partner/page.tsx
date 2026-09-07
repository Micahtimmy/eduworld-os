'use client';

import React, { useState } from 'react';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';
import { useDemo } from '@/components/global/DemoContext';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  formula?: string;
  quickActions?: string[];
}

export default function AchieverAiPartnerPage() {
  const { currentPersona, showToast } = useDemo();
  const [input, setInput] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: `Hello ${currentPersona.name.split(' ')[0]}! I reviewed your recent CBT diagnostic session on Physics & Chemistry. You scored 92% in Kinematics, but had a slight snag with the electric pump efficiency problem in Work, Energy & Power. Would you like me to walk through the power input vs power output formula?`,
      formula: 'P_{in} = \\frac{P_{out}}{\\eta} = \\frac{mgh}{t \\cdot \\eta}',
      timestamp: '10:42 AM',
      quickActions: [
        '✦ Explain Pump Efficiency Step-by-Step',
        '✦ Show me 3 Practice Questions',
        '✦ Review My Weakest Topics',
      ],
    },
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate intelligent AI study partner response
    setTimeout(() => {
      let aiResponseText =
        'Great question! In physics problems involving machines and pumps, remember that input power is ALWAYS greater than output power due to friction and heat losses. Therefore, Power Input = (Work Output / Time) / Efficiency.';
      let formula = 'Efficiency (\\eta) = \\frac{Useful\\ Output\\ Power}{Total\\ Input\\ Power} \\times 100\\%';

      if (text.includes('Practice Questions')) {
        aiResponseText =
          'Here is your first targeted practice problem: A motor rated at 2.5 kW lifts a load of 500 kg through 12 m in 30 seconds. Calculate the machine efficiency (g = 10 m/s²).';
        formula = 'P_{out} = \\frac{500 \\times 10 \\times 12}{30} = 2,000\\ W, \\quad \\eta = \\frac{2000}{2500} = 80\\%';
      } else if (text.includes('Weakest Topics')) {
        aiResponseText =
          'Based on your diagnostic telemetry, your top 2 priority areas for JAMB UTME 2026 are: 1) Work, Energy & Power (Efficiency calculations), and 2) Chemical Equilibrium (Le Chatelier pressure shifts).';
        formula = 'K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}';
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponseText,
        formula,
        timestamp: 'Just now',
        quickActions: ['✦ Next Question', '✦ Explain Derivation'],
      };
      setMessages((prev) => [...prev, aiMsg]);
    }, 600);
  };

  const toggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    showToast(isVoiceActive ? 'Voice mode paused' : 'AI Voice Tutor listening... Speak your question.');
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Achiever Socratic AI Study Partner"
          subtitle="Adaptive CBT Tutor • Physics, Chemistry & Math Specialist"
        />

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full flex flex-col space-y-4">
          {/* Top Control Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#006c49] animate-pulse" />
              <span className="text-xs font-jakarta font-bold text-slate-900">
                Socratic AI Engine Online • Trained on 10-Year JAMB &amp; WAEC Question Bank
              </span>
            </div>

            <button
              onClick={toggleVoice}
              className={`px-4 py-2 rounded-xl text-xs font-jakarta font-bold transition-all flex items-center gap-1.5 ${
                isVoiceActive
                  ? 'bg-red-600 text-white shadow-md animate-pulse'
                  : 'bg-emerald-100 text-emerald-950 border border-emerald-300 hover:bg-emerald-200'
              }`}
            >
              <span className="material-symbols-outlined text-base">
                {isVoiceActive ? 'mic' : 'mic_none'}
              </span>
              <span>{isVoiceActive ? 'Listening...' : 'Enable Voice Tutor'}</span>
            </button>
          </div>

          {/* Chat Container */}
          <div className="flex-1 bg-white rounded-3xl border border-outline-variant p-6 shadow-md flex flex-col justify-between min-h-[600px]">
            {/* Message History */}
            <div className="space-y-6 overflow-y-auto flex-1 pr-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-10 h-10 rounded-2xl bg-[#006c49] text-white flex items-center justify-center shrink-0 shadow-sm">
                      <span className="material-symbols-outlined text-xl">psychology</span>
                    </div>
                  )}

                  <div
                    className={`max-w-xl rounded-2xl p-5 space-y-3 ${
                      m.sender === 'user'
                        ? 'bg-[#003f7a] text-white rounded-br-none shadow-md'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 rounded-bl-none shadow-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] opacity-80">
                      <span className="font-jakarta font-bold">
                        {m.sender === 'user' ? currentPersona.name : 'EduWorld Socratic AI'}
                      </span>
                      <span className="font-mono">{m.timestamp}</span>
                    </div>

                    <p className="text-sm font-inter leading-relaxed">{m.text}</p>

                    {m.formula && (
                      <div className="p-3.5 rounded-xl bg-white border border-slate-200 font-mono text-xs text-[#003f7a] font-bold shadow-xs">
                        <code>{m.formula}</code>
                      </div>
                    )}

                    {m.quickActions && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-200">
                        {m.quickActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleSend(action)}
                            className="px-3.5 py-1.5 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-950 font-jakarta font-bold text-xs border border-emerald-300 transition-all active:scale-95"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {m.sender === 'user' && (
                    <img
                      src={currentPersona.avatar}
                      alt={currentPersona.name}
                      className="w-10 h-10 rounded-2xl object-cover border border-slate-300 shrink-0 shadow-xs"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-4 border-t border-slate-200">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  placeholder="Ask a question, request formula derivation, or paste an exam problem..."
                  className="flex-1 bg-slate-50 border border-slate-300 rounded-2xl px-5 py-3.5 text-sm font-inter text-slate-900 outline-none focus:border-[#003f7a] focus:bg-white transition-all shadow-xs"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 rounded-2xl bg-[#006c49] text-white font-jakarta font-bold text-xs hover:bg-[#005236] shadow-md transition-all flex items-center gap-1.5 shrink-0 active:scale-95"
                >
                  <span>Ask AI</span>
                  <span className="material-symbols-outlined text-base">send</span>
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
