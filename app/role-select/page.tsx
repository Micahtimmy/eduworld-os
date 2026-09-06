'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface RoleOption {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  href: string;
  badge?: string;
  colorClass: string;
}

const ROLES: RoleOption[] = [
  {
    id: 'achiever',
    title: 'Achiever (Secondary & UTME/WAEC)',
    subtitle: 'Diagnostic tutor, countdown timers, past papers & topic mastery.',
    icon: 'quiz',
    href: '/achiever/diagnostic',
    badge: 'Product Wedge',
    colorClass: 'text-secondary group-hover:bg-secondary',
  },
  {
    id: 'explorer',
    title: 'Explorer (Primary K-12)',
    subtitle: 'Tactile learning journey map, quest trails & The Spark AI companion.',
    icon: 'explore',
    href: '/explorer/dashboard',
    badge: 'Tactile 3D',
    colorClass: 'text-explorer-primary group-hover:bg-explorer-primary',
  },
  {
    id: 'scholar',
    title: 'Scholar (University & Research)',
    subtitle: 'Ivy League edition command center, citation vault & AI literature gap synthesis.',
    icon: 'school',
    href: '/scholar/dashboard',
    colorClass: 'text-primary group-hover:bg-primary',
  },
  {
    id: 'teacher',
    title: 'Teacher & Educator',
    subtitle: 'AI lesson plan creator, split-view rubric grading & attendance rosters.',
    icon: 'draw',
    href: '/teacher/dashboard',
    colorClass: 'text-primary group-hover:bg-primary',
  },
  {
    id: 'parent',
    title: 'Parent & Guardian',
    subtitle: 'Multi-child performance switcher, weekly AI digests & tuition payment center.',
    icon: 'family_restroom',
    href: '/parent/dashboard',
    colorClass: 'text-primary group-hover:bg-primary',
  },
  {
    id: 'admin',
    title: 'School Administrator',
    subtitle: 'CSV bulk mapping, AI field matcher & faculty clash detection.',
    icon: 'admin_panel_settings',
    href: '/admin/dashboard',
    colorClass: 'text-primary group-hover:bg-primary',
  },
  {
    id: 'enterprise',
    title: 'Enterprise Manager',
    subtitle: 'Workforce training ROI analytics & corporate skills gap matrix.',
    icon: 'trending_up',
    href: '/enterprise/dashboard',
    colorClass: 'text-primary group-hover:bg-primary',
  },
  {
    id: 'government',
    title: 'Government & Ministry Official',
    subtitle: 'Regional education intelligence & macro policy impact tracking.',
    icon: 'account_balance',
    href: '/admin/dashboard',
    colorClass: 'text-primary group-hover:bg-primary',
  },
];

export default function RoleSelectionPage() {
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(ROLES[0]);
  const router = useRouter();

  const handleProceed = () => {
    if (selectedRole) {
      router.push(selectedRole.href);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between p-6 md:p-12 selection:bg-primary-fixed">
      {/* Header */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6 border-b border-outline-variant">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
            ✦
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld</h1>
            <span className="text-[11px] font-mono text-outline">Role Selection Gateway</span>
          </div>
        </Link>
        <span className="text-xs font-mono text-outline">Frame EWD-003</span>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto w-full py-8 space-y-8 my-auto">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="font-jakarta font-extrabold text-3xl md:text-4xl text-on-surface">
            Choose your learning or operational role
          </h2>
          <p className="font-inter text-sm text-on-surface-variant leading-relaxed">
            EduWorld provides dedicated, uncompromising design systems and specialized workflows
            for each tier.
          </p>
        </div>

        {/* Roles 8-Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROLES.map((role) => {
            const isSelected = selectedRole?.id === role.id;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role)}
                className={`group relative bg-surface-container-lowest border rounded-2xl p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary shadow-md -translate-y-1'
                    : 'border-outline-variant hover:border-primary/50 hover:shadow-sm'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-primary/10 p-2.5 flex items-center justify-center transition-colors ${role.colorClass} group-hover:text-white`}
                    >
                      <span className="material-symbols-outlined text-2xl">{role.icon}</span>
                    </div>
                    {role.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container">
                        {role.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="font-jakarta font-bold text-sm text-on-surface mb-1">
                    {role.title}
                  </h3>
                  <p className="font-inter text-xs text-on-surface-variant leading-relaxed">
                    {role.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-container flex items-center justify-between">
                  <span className="text-xs font-jakarta font-bold text-primary group-hover:underline">
                    Enter Tier →
                  </span>
                  {isSelected && (
                    <span className="material-symbols-outlined text-primary text-xl">
                      check_circle
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-outline-variant">
          <Link
            href="/"
            className="text-xs font-jakarta font-bold text-on-surface-variant hover:text-on-surface flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            <span>Back to Home</span>
          </Link>

          <button
            onClick={handleProceed}
            className="px-8 py-3.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-md transition-all flex items-center gap-2"
          >
            <span>Proceed to {selectedRole?.title.split(' ')[0]} Workspace</span>
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
      </main>

      <footer className="max-w-6xl mx-auto w-full text-center text-xs text-outline font-inter pt-4">
        EduWorld Unified OS • 8 Independent Experience Layers
      </footer>
    </div>
  );
}
