'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDemo, DEMO_PERSONAS, RoleType } from '@/components/global/DemoContext';

export default function LoginPage() {
  const { switchRole, showToast } = useDemo();
  const [email, setEmail] = useState('kalu.nnamdi@eduworld.io');
  const [password, setPassword] = useState('••••••••••••');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    switchRole('achiever');
    showToast('Signed in as Kalu Nnamdi (Achiever Tier)');
    router.push('/achiever/dashboard');
  };

  const handleQuickLogin = (role: RoleType) => {
    switchRole(role);
  };

  const quickRoles: RoleType[] = [
    'achiever',
    'explorer',
    'scholar',
    'teacher',
    'parent',
    'admin',
    'enterprise',
    'government',
  ];

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 md:p-8 selection:bg-primary-fixed">
      <div className="w-full max-w-4xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left: Traditional Sign-In */}
        <div className="lg:col-span-5 bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            {/* Brand */}
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-[#003f7a] text-white flex items-center justify-center font-jakarta font-bold text-2xl shadow-sm">
                ✦
              </div>
              <h2 className="font-jakarta font-extrabold text-2xl text-on-surface">
                Sign in to EduWorld
              </h2>
              <p className="text-xs text-on-surface-variant font-inter leading-relaxed">
                Enter your credentials or choose an instant 1-click demo account on the right.
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
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-inter text-on-surface outline-none focus:border-primary transition-all font-medium"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-jakarta font-bold text-on-surface">
                    Password
                  </label>
                  <a href="#" className="text-[11px] font-jakarta font-semibold text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-inter text-on-surface outline-none focus:border-primary transition-all font-medium"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#003f7a] text-white font-jakarta font-bold text-xs hover:bg-[#1e5799] shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Sign In to Learning OS</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-surface-container text-center mt-6">
            <p className="text-xs text-on-surface-variant font-inter">
              Need to explore all tiers?{' '}
              <Link href="/role-select" className="font-jakarta font-bold text-primary hover:underline">
                Role Gateway
              </Link>
            </p>
          </div>
        </div>

        {/* Right: Instant 1-Click Demo Accounts Grid */}
        <div className="lg:col-span-7 bg-[#131b2e] rounded-3xl border border-slate-700/80 p-6 md:p-8 shadow-xl text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#6ffbbe] animate-pulse"></span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6ffbbe]">
                    Instant Demo Workspace
                  </span>
                </div>
                <h3 className="font-jakarta font-bold text-lg text-white mt-1">
                  1-Click Persona Sign-In
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">8 Roles Configured</span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              Select any role below to launch into that persona&apos;s tailored dashboard with full functional state, metrics, and workflows.
            </p>

            {/* Persona Quick Tiles */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickRoles.map((roleKey) => {
                const p = DEMO_PERSONAS[roleKey];
                return (
                  <button
                    key={roleKey}
                    type="button"
                    onClick={() => handleQuickLogin(roleKey)}
                    className="text-left p-3 rounded-2xl bg-[#1e293b] border border-slate-700/60 hover:border-[#6ffbbe] hover:bg-[#25334d] transition-all flex items-center gap-3 group active:scale-95"
                  >
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1">
                        <span className="text-xs font-bold text-white group-hover:text-[#6ffbbe] truncate">
                          {p.name}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-300 truncate">{p.roleTitle}</p>
                      <span className="inline-block mt-0.5 text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#003f7a] text-white">
                        {p.badge}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#6ffbbe] text-base">
                      chevron_right
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-[#6ffbbe]">shield</span>
              WCAG AAA Compliant UI
            </span>
            <Link href="/achiever/diagnostic" className="text-[#6ffbbe] hover:underline flex items-center gap-1 font-sans font-bold text-xs">
              Go to JAMB Wedge <span className="material-symbols-outlined text-sm">bolt</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
