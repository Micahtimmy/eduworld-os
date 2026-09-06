'use client';

import React, { useState } from 'react';
import { ExplorerNav } from '@/components/explorer/ExplorerNav';

export default function ExplorerTutorPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'spark',
      text: 'Hi Leo! 🌟 I am Spark, your friendly AI science explorer! What cool questions do you have about space, animals, or dinosaur bones today?',
    },
  ]);
  const [input, setInput] = useState('');

  const handleSend = (userText?: string) => {
    const text = userText || input;
    if (!text.trim()) return;

    setMessages((prev) => [...prev, { sender: 'user', text }]);
    if (!userText) setInput('');

    setTimeout(() => {
      let reply = "That's a fantastic question! Did you know that space is totally silent because there is no air for sound to bounce through?";
      if (text.toLowerCase().includes('mars')) {
        reply = "Mars has two tiny potatoes-shaped moons named Phobos and Deimos! 🥔🌕";
      } else if (text.toLowerCase().includes('sun')) {
        reply = "The Sun is so huge that over ONE MILLION planet Earths could fit inside it! ☀️🔥";
      }
      setMessages((prev) => [...prev, { sender: 'spark', text: reply }]);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-explorer-surface flex flex-col">
      <ExplorerNav />

      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-8 flex flex-col space-y-4">
        <div className="bg-white rounded-3xl border-4 border-explorer-outline-variant p-6 shadow-tactile flex-1 flex flex-col justify-between min-h-[550px]">
          {/* Messages */}
          <div className="space-y-4 overflow-y-auto flex-1 pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'spark' && (
                  <div className="w-10 h-10 rounded-2xl bg-explorer-secondary-container text-explorer-on-secondary-container flex items-center justify-center font-black text-xl border-b-2 border-[#6e5400] shrink-0">
                    ✦
                  </div>
                )}
                <div
                  className={`p-4 rounded-3xl font-jakarta font-semibold text-sm max-w-md ${
                    m.sender === 'user'
                      ? 'bg-explorer-primary-container text-explorer-on-primary-container rounded-br-none border-2 border-[#1e5000]'
                      : 'bg-amber-50 text-on-surface border-2 border-amber-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 py-3 border-t-2 border-explorer-surface-container">
            {['Tell me about the Sun! ☀️', 'How big is Mars? 🔴', 'What is a Black Hole? 🕳️'].map(
              (p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-jakarta font-bold text-xs hover:bg-amber-100 hover:text-amber-900 transition-colors"
                >
                  {p}
                </button>
              )
            )}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-3 pt-2"
          >
            <input
              type="text"
              placeholder="Ask Spark anything! (e.g. Why is the sky blue?)"
              className="flex-1 bg-slate-100 border-2 border-slate-200 rounded-full px-5 py-3 font-jakarta font-medium text-sm text-on-surface outline-none focus:border-explorer-primary"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-full bg-explorer-primary-container text-explorer-on-primary-container font-jakarta font-black text-sm border-b-2 border-[#1e5000] shadow-tactile-green tactile-btn"
            >
              Ask!
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
