'use client';

import React, { useState } from 'react';
import { useDemo } from './DemoContext';
import Link from 'next/link';

export function GlobalHeaderNotifications() {
  const { notifications, markNotificationAsRead } = useDemo();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative font-sans">
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        title="Notifications"
      >
        <span className="material-symbols-outlined text-xl">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-600 text-white font-mono text-[9px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notifications Popover */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-80 md:w-96 bg-white rounded-3xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-base">notifications_active</span>
                <h4 className="font-jakarta font-bold text-xs text-slate-900">Notifications</h4>
                {unreadCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#003f7a] text-[10px] font-bold font-mono">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <button
                onClick={() => {
                  notifications.forEach((n) => markNotificationAsRead(n.id));
                }}
                className="text-[10px] font-bold text-[#003f7a] hover:underline"
              >
                Mark all read
              </button>
            </div>

            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
              {notifications.length === 0 ? (
                <div className="p-6 text-center text-slate-400 text-xs">
                  No notifications yet
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      markNotificationAsRead(n.id);
                    }}
                    className={`p-3.5 hover:bg-slate-50 transition-colors cursor-pointer ${
                      !n.read ? 'bg-blue-50/40' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="font-jakarta font-bold text-xs text-slate-900">
                        {n.title}
                      </h5>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {n.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-inter mt-1 leading-snug">
                      {n.message}
                    </p>
                    {n.link && (
                      <Link
                        href={n.link}
                        onClick={() => setIsOpen(false)}
                        className="inline-block mt-2 text-[10px] font-jakarta font-bold text-[#003f7a] hover:underline"
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
