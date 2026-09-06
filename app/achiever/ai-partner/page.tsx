'use client';

import React, { useState } from 'react';
import { AchieverNav } from '@/components/achiever/AchieverNav';
import { AchieverHeader } from '@/components/achiever/AchieverHeader';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  formula?: string;
  quickActions?: string[];
}

export default function AchieverAiPartnerPage() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hey Alex! I reviewed your recent diagnostic session on Physics. You scored 92% in Kinematics, but had a slight snag with the electric pump efficiency problem in Work, Energy & Power. Would you like me to walk through the power input vs power output formula?',
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

  return (
    <div className="flex min-h-screen bg-surface">
      <AchieverNav />

      <div className="flex-1 flex flex-col min-w-0">
        <AchieverHeader
          title="Achiever AI Study Partner"
          subtitle="Adaptive Socratic Tutor • Physics, Chemistry & Math Specialist"
        />

        <main className="flex-1 p-6 md:p-8 max-w-5xl mx-auto w-full flex flex-col space-y-4">
          {/* Chat Container */}
          <div className="flex-1 bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md flex flex-col justify-between min-h-[600px]">
            {/* Message History */}
            <div className="space-y-6 overflow-y-auto flex-1 pr-2">
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex gap-3.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.sender === 'ai' && (
                    <div className="w-9 h-9 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0 shadow-xs">
                      <span className="material-symbols-outlined text-lg">smart_toy</span>
                    </div>
                  )}

                  <div
                    className={`max-w-xl rounded-2xl p-4 space-y-2.5 ${
                      m.sender === 'user'
                        ? 'bg-primary text-white rounded-br-none'
                        : 'bg-surface-container-low border border-outline-variant text-on-surface rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] opacity-70">
                      <span className="font-jakarta font-bold">
                        {m.sender === 'user' ? 'You' : 'EduWorld AI Tutor'}
                      </span>
                      <span className="font-mono">{m.timestamp}</span>
                    </div>

                    <p className="text-sm font-inter leading-relaxed">{m.text}</p>

                    {m.formula && (
                      <div className="p-3 rounded-xl bg-surface-container-high border border-outline-variant font-mono text-xs text-primary font-bold">
                        <code>{m.formula}</code>
                      </div>
                    )}

                    {m.quickActions && (
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-surface-container">
                        {m.quickActions.map((action) => (
                          <button
                            key={action}
                            onClick={() => handleSend(action)}
                            className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container font-jakarta font-bold text-xs hover:bg-secondary transition-all"
                          >
                            {action}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {m.sender === 'user' && (
                    <div className="w-9 h-9 rounded-xl bg-primary-fixed text-primary font-jakarta font-bold text-sm flex items-center justify-center shrink-0">
                      AO
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <div className="pt-4 border-t border-surface-container">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex items-center gap-3"
              >
                <input
                  type="text"
                  placeholder="Ask a question, request formula step-by-step, or paste a problem..."
                  className="flex-1 bg-surface-container-low border border-outline-variant rounded-2xl px-4 py-3 text-sm font-inter text-on-surface outline-none focus:border-primary transition-all"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-2xl bg-secondary text-on-secondary font-jakarta font-bold text-xs hover:bg-secondary/90 shadow-sm transition-all flex items-center gap-1.5 shrink-0"
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
