'use client';

import React, { useState } from 'react';
import { useDemo, DEMO_PERSONAS, RoleType } from './DemoContext';
import Link from 'next/link';

export function DemoSwitcher() {
  const { currentRole, currentPersona, switchRole, resetDemoData, showToast } = useDemo();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  const rolesList: RoleType[] = [
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
    <>
      {/* Floating Demo Persona Pill (Bottom Right) */}
      <div className="fixed bottom-5 right-5 z-[9990] font-sans">
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2 bg-[#003f7a] text-white px-4 py-2.5 rounded-full shadow-2xl border-2 border-white/20 hover:bg-[#1e5799] transition-all transform hover:scale-105"
            title="Open Demo Persona Switcher"
          >
            <span className="material-symbols-outlined text-lg text-[#6ffbbe]">account_circle</span>
            <span className="text-xs font-bold uppercase tracking-wider">{currentPersona.badge}</span>
            <span className="material-symbols-outlined text-sm">unfold_more</span>
          </button>
        ) : (
          <div className="bg-[#131b2e] text-white rounded-2xl shadow-2xl border border-slate-700/80 p-3 max-w-xs transition-all animate-in fade-in slide-in-from-bottom-3">
            <div className="flex items-center justify-between gap-3 pb-2 border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#6ffbbe] animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#6ffbbe]">
                  Interactive Demo Mode
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  title="Minimize Switcher"
                >
                  <span className="material-symbols-outlined text-sm">remove</span>
                </button>
              </div>
            </div>

            {/* Current Active Persona Card */}
            <div className="mt-2.5 flex items-center gap-3 bg-[#1e293b] p-2.5 rounded-xl border border-slate-700/50">
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate">{currentPersona.name}</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#003f7a] text-white whitespace-nowrap">
                    {currentPersona.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 truncate">{currentPersona.roleTitle}</p>
                <div className="text-[10px] text-slate-400 truncate font-mono mt-0.5">
                  {currentPersona.metrics.primaryLabel}: <strong className="text-[#6ffbbe]">{currentPersona.metrics.primaryValue}</strong>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                onClick={() => setIsOpen(true)}
                className="flex items-center justify-center gap-1.5 bg-[#003f7a] hover:bg-[#1e5799] text-white py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <span className="material-symbols-outlined text-base text-[#6ffbbe]">swap_horiz</span>
                Switch Role
              </button>

              <button
                onClick={resetDemoData}
                className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white py-2 px-3 rounded-xl text-xs font-medium transition-all active:scale-95 border border-slate-700"
                title="Reset all test metrics and return to start"
              >
                <span className="material-symbols-outlined text-base">restart_alt</span>
                Reset Data
              </button>
            </div>

            {/* Quick Links */}
            <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <Link href="/role-select" className="hover:text-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">grid_view</span> Role Gateway
              </Link>
              <Link href="/settings" className="hover:text-white transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">settings</span> Settings
              </Link>
              <button
                onClick={() => {
                  window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', ctrlKey: true, bubbles: true }));
                }}
                className="hover:text-white transition-colors flex items-center gap-0.5 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700"
              >
                <span>⌘K</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Full Modal for Switching Between All 8 Roles */}
      {isOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 font-sans">
          <div className="bg-[#131b2e] border border-slate-700/80 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-white">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1d]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#6ffbbe] animate-ping"></span>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#6ffbbe]">
                    Unified Global Learning OS
                  </span>
                </div>
                <h2 className="text-2xl font-bold font-jakarta mt-1 text-white">
                  Select Active Demo Persona
                </h2>
                <p className="text-xs text-slate-300 mt-0.5">
                  Experience EduWorld from all 8 dedicated user tiers with live simulated states and role fidelity.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Personas Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {rolesList.map((roleKey) => {
                const persona = DEMO_PERSONAS[roleKey];
                const isActive = currentRole === roleKey;

                return (
                  <div
                    key={roleKey}
                    onClick={() => {
                      switchRole(roleKey);
                      setIsOpen(false);
                    }}
                    className={`cursor-pointer group p-4 rounded-2xl border transition-all duration-200 relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#1e293b] border-[#6ffbbe] shadow-lg ring-2 ring-[#6ffbbe]/30'
                        : 'bg-[#192237] border-slate-800 hover:border-slate-600 hover:bg-[#1f2b45]'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={persona.avatar}
                            alt={persona.name}
                            className="w-12 h-12 rounded-full object-cover border-2 border-white/20 group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="text-sm font-bold text-white group-hover:text-[#6ffbbe] transition-colors">
                                {persona.name}
                              </h3>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${persona.badgeColor}`}
                              >
                                {persona.badge}
                              </span>
                            </div>
                            <p className="text-xs font-medium text-slate-300 mt-0.5">
                              {persona.roleTitle}
                            </p>
                          </div>
                        </div>

                        {isActive && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-[#6ffbbe] bg-[#006c49]/40 border border-[#006c49] px-2 py-0.5 rounded-full">
                            <span className="material-symbols-outlined text-xs">check_circle</span> Active
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-300 mt-3 line-clamp-2 leading-relaxed">
                        {persona.bio}
                      </p>

                      <div className="mt-3 text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-xs text-slate-500">domain</span>
                        <span className="truncate">{persona.institution}</span>
                      </div>
                    </div>

                    {/* Metrics Footer */}
                    <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] uppercase text-slate-400 font-mono block">
                          {persona.metrics.primaryLabel}
                        </span>
                        <span className="font-bold text-white">
                          {persona.metrics.primaryValue}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase text-slate-400 font-mono block">
                          {persona.metrics.secondaryLabel}
                        </span>
                        <span className="font-bold text-[#6ffbbe]">
                          {persona.metrics.secondaryValue}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0a0f1d] border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base text-slate-500">info</span>
                <span>Each persona is pre-populated with live test datasets, progress states, and role workflows.</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
