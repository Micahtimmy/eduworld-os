'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('alex.okafor@eduworld.io');
  const [password, setPassword] = useState('••••••••••••');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/achiever/diagnostic');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-6 selection:bg-primary-fixed">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-3xl border border-outline-variant p-8 shadow-xl space-y-6">
        {/* Brand */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-jakarta font-bold text-2xl mx-auto shadow-sm">
            ✦
          </div>
          <h2 className="font-jakarta font-extrabold text-2xl text-on-surface">
            Sign in to EduWorld
          </h2>
          <p className="text-xs text-on-surface-variant font-inter">
            Enter your credentials to access your assigned role workspace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-jakarta font-bold text-on-surface">
              Email Address / Student ID
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-inter text-on-surface outline-none focus:border-primary transition-all"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-jakarta font-bold text-on-surface">
                Password
              </label>
              <a href="#" className="text-[11px] font-jakarta font-semibold text-primary hover:underline">
                Forgot?
              </a>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-inter text-on-surface outline-none focus:border-primary transition-all"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to Learning OS</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </form>

        <div className="pt-4 border-t border-surface-container text-center">
          <p className="text-xs text-on-surface-variant font-inter">
            First time logging in?{' '}
            <Link href="/role-select" className="font-jakarta font-bold text-primary hover:underline">
              Choose Role Workspace
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
