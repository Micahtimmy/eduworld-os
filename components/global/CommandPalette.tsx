'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  tier: string;
  icon: string;
  href: string;
  badge?: string;
}

const COMMANDS: CommandItem[] = [
  // Achiever (The Product Wedge)
  {
    id: 'achiever-diagnostic',
    title: 'JAMB / WAEC Diagnostic Assessment Tutor',
    subtitle: 'Simulated computer-based testing, topic breakdown & AI tutor recommendations',
    tier: 'Achiever',
    icon: 'quiz',
    href: '/achiever/diagnostic',
    badge: 'Product Wedge',
  },
  {
    id: 'achiever-dash',
    title: 'Achiever Exam Readiness Dashboard',
    subtitle: 'Countdown timer, syllabus mastery checklist, and past paper analytics',
    tier: 'Achiever',
    icon: 'timer',
    href: '/achiever/dashboard',
  },
  {
    id: 'achiever-study-plan',
    title: 'Subject Library & Syllabus Mastery',
    subtitle: 'Targeted physics, chemistry, biology, math practice modules',
    tier: 'Achiever',
    icon: 'auto_awesome',
    href: '/achiever/subjects',
  },
  {
    id: 'achiever-lesson',
    title: 'Achiever Video & Text Lesson Viewer',
    subtitle: 'Synchronized transcript, interactive checkpoints, and study notes',
    tier: 'Achiever',
    icon: 'play_circle',
    href: '/achiever/lesson',
  },
  {
    id: 'achiever-leaderboard',
    title: 'Peer Leaderboard & Huddle Feed',
    subtitle: 'Class standings, XP exchanges, and collaborative study rooms',
    tier: 'Achiever',
    icon: 'military_tech',
    href: '/achiever/leaderboard',
  },
  {
    id: 'achiever-ai-partner',
    title: 'Adaptive AI Socratic Study Partner',
    subtitle: 'Interactive conversational tutor with step-by-step problem solver',
    tier: 'Achiever',
    icon: 'psychology',
    href: '/achiever/ai-partner',
  },
  {
    id: 'achiever-performance',
    title: 'Official Term Performance Report',
    subtitle: 'Printable academic transcript, percentile curves & exam predictions',
    tier: 'Achiever',
    icon: 'receipt_long',
    href: '/achiever/performance',
  },
  {
    id: 'achiever-shop',
    title: 'Elite XP Exchange Rewards Shop',
    subtitle: 'Redeem streak shields, mock exam passes, and university masterclasses',
    tier: 'Achiever',
    icon: 'redeem',
    href: '/achiever/shop',
  },
  // Explorer (K-12 Gamified)
  {
    id: 'explorer-dash',
    title: 'Explorer Gamified Journey Map (K-12)',
    subtitle: 'Tactile learning journey map, quest trails, and interactive mission nodes',
    tier: 'Explorer',
    icon: 'explore',
    href: '/explorer/dashboard',
  },
  {
    id: 'explorer-lesson',
    title: 'Solar System Explorer Mission Viewer',
    subtitle: 'Immersive visual lesson viewer with planet facts & celebratory quiz',
    tier: 'Explorer',
    icon: 'rocket_launch',
    href: '/explorer/lesson',
  },
  {
    id: 'explorer-tutor',
    title: 'Spark AI Science Companion',
    subtitle: 'Friendly voice-enabled guide for curious young learners',
    tier: 'Explorer',
    icon: 'smart_toy',
    href: '/explorer/tutor',
  },
  {
    id: 'explorer-shop',
    title: 'Star Reward Shop & Avatar Studio',
    subtitle: 'Exchange earned stars for astronaut suits, pets, and spaceship skins',
    tier: 'Explorer',
    icon: 'shopping_bag',
    href: '/explorer/shop',
  },
  {
    id: 'explorer-quests',
    title: 'Daily Quests & Badge Trophy Gallery',
    subtitle: 'Claim mystery treasure chests and view unlocked milestone medals',
    tier: 'Explorer',
    icon: 'workspace_premium',
    href: '/explorer/quests',
  },
  // Scholar (University & Research)
  {
    id: 'scholar-dash',
    title: 'Scholar Academic Command Center',
    subtitle: 'Ivy League edition research workspace, credit audit, and defense tracker',
    tier: 'Scholar',
    icon: 'school',
    href: '/scholar/dashboard',
  },
  {
    id: 'scholar-research',
    title: 'Semantic Literature Gap Workspace',
    subtitle: 'Semantic research assistant, citation matrix, and BibTeX exporter',
    tier: 'Scholar',
    icon: 'biotech',
    href: '/scholar/research',
  },
  {
    id: 'scholar-courses',
    title: 'Quantum Mechanics Practicals & Modules',
    subtitle: 'Virtual lab sandbox, simulation parameters, and enrolled syllabus',
    tier: 'Scholar',
    icon: 'hub',
    href: '/scholar/courses',
  },
  {
    id: 'scholar-degree-audit',
    title: 'Predictive Degree Audit & Credit Tracker',
    subtitle: 'Graduation progress, major requirements, and elective planning',
    tier: 'Scholar',
    icon: 'account_tree',
    href: '/scholar/degree-audit',
  },
  // Operational Roles
  {
    id: 'teacher-command',
    title: 'Teacher Classroom Command Center',
    subtitle: 'Live student roster, attendance toggle, and academic risk detection',
    tier: 'Teacher',
    icon: 'draw',
    href: '/teacher/dashboard',
  },
  {
    id: 'teacher-lesson-planner',
    title: 'AI Lesson Plan Generator & Curriculum Orchestrator',
    subtitle: 'Curriculum standards alignment, prompt builder, and export tool',
    tier: 'Teacher',
    icon: 'edit_note',
    href: '/teacher/lesson-planner',
  },
  {
    id: 'teacher-grading',
    title: 'Rubric Grading & Feedback Workspace',
    subtitle: 'Split-view student submission grading with AI feedback assist',
    tier: 'Teacher',
    icon: 'checklist',
    href: '/teacher/grading',
  },
  {
    id: 'parent-command',
    title: 'Parent & Guardian Household Command',
    subtitle: 'Multi-child switcher, live attendance monitoring, and teacher messaging',
    tier: 'Parent',
    icon: 'family_restroom',
    href: '/parent/dashboard',
  },
  {
    id: 'parent-billing',
    title: 'Consolidated Household Billing & Tuition Center',
    subtitle: 'Itemized term invoices, lab fees, and instant online checkout',
    tier: 'Parent',
    icon: 'credit_card',
    href: '/parent/billing',
  },
  {
    id: 'admin-command',
    title: 'School Administrator Command Center',
    subtitle: 'Institutional health monitor, faculty workload, and intake queue',
    tier: 'Admin',
    icon: 'admin_panel_settings',
    href: '/admin/dashboard',
  },
  {
    id: 'admin-intake',
    title: 'CSV Bulk Student Intake & Field Matcher',
    subtitle: 'Drag-and-drop CSV importer with automated column matching and duplicate detection',
    tier: 'Admin',
    icon: 'upload_file',
    href: '/admin/intake',
  },
  {
    id: 'admin-scheduling',
    title: 'Faculty Scheduling & Clash Detection Matrix',
    subtitle: 'Room assignment optimizer and timetable clash resolver',
    tier: 'Admin',
    icon: 'calendar_month',
    href: '/admin/scheduling',
  },
  {
    id: 'enterprise-command',
    title: 'Enterprise Workforce ROI & Skills Gap Analytics',
    subtitle: 'Talent development matrix, competency tracking, and corporate learning ROI',
    tier: 'Enterprise',
    icon: 'trending_up',
    href: '/enterprise/dashboard',
  },
  {
    id: 'enterprise-programs',
    title: 'Custom Corporate Learning Paths',
    subtitle: 'Enterprise AI track, executive upskilling, and certification pipeline',
    tier: 'Enterprise',
    icon: 'corporate_fare',
    href: '/enterprise/programs',
  },
  {
    id: 'government-dashboard',
    title: 'National Curriculum & Exam Readiness Monitor',
    subtitle: 'Federal 36-state performance heatmap, JAMB/WAEC benchmarks & equity index',
    tier: 'Government',
    icon: 'public',
    href: '/government/dashboard',
    badge: 'Ministry Tier',
  },
  // Global Navigation & Auth
  {
    id: 'role-gateway',
    title: 'Role Selection Gateway',
    subtitle: 'Switch between all 8 specialized EduWorld user tiers',
    tier: 'Global',
    icon: 'switch_account',
    href: '/role-select',
  },
  {
    id: 'auth-login',
    title: '1-Click Demo Sign In / Account Access',
    subtitle: 'Instant persona selection and unified authentication',
    tier: 'Global',
    icon: 'login',
    href: '/login',
  },
  {
    id: 'global-settings',
    title: 'Identity Vault & Global Security Settings',
    subtitle: '2FA authentication, notification preferences, and privacy controls',
    tier: 'Global',
    icon: 'settings',
    href: '/settings',
  },
  {
    id: 'global-support',
    title: 'Support & Knowledge Architecture',
    subtitle: 'Live ticket management, searchable documentation, and status dashboard',
    tier: 'Global',
    icon: 'help',
    href: '/support',
  },
];

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = COMMANDS.filter((cmd) => {
    const q = query.toLowerCase();
    return (
      cmd.title.toLowerCase().includes(q) ||
      cmd.subtitle.toLowerCase().includes(q) ||
      cmd.tier.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
      <div
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-outline-variant overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center px-4 py-3 border-b border-surface-container-high bg-surface-container-low/50">
          <span className="material-symbols-outlined text-primary text-2xl mr-3">search</span>
          <input
            type="text"
            placeholder="Search screens, roles, diagnostic tutor, tools... (Cmd+K)"
            className="flex-1 bg-transparent border-none outline-none text-on-surface font-jakarta font-medium text-base placeholder:text-outline"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <kbd className="px-2 py-1 text-xs font-mono bg-surface-container text-on-surface-variant rounded border border-outline-variant">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 divide-y divide-surface-container">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-outline">
              <span className="material-symbols-outlined text-4xl mb-2">find_in_page</span>
              <p className="text-sm font-medium">No matching screens found for &ldquo;{query}&rdquo;</p>
            </div>
          ) : (
            filtered.map((item, index) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item.href)}
                className={`flex items-center gap-3.5 p-3 rounded-xl cursor-pointer transition-all ${
                  index === selectedIndex
                    ? 'bg-primary-fixed/40 border-l-4 border-primary'
                    : 'hover:bg-surface-container-low'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-primary-container/15 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-jakarta font-semibold text-sm text-on-surface truncate">
                      {item.title}
                    </h4>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-secondary-container text-on-secondary-container">
                        {item.badge}
                      </span>
                    )}
                    <span className="ml-auto text-[11px] font-mono text-outline uppercase tracking-wider">
                      {item.tier}
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant truncate font-inter">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-surface-container-low border-t border-surface-container-high flex items-center justify-between text-xs text-on-surface-variant font-inter">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-outline-variant">↑</kbd>{' '}
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-outline-variant">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono bg-white px-1.5 py-0.5 rounded border border-outline-variant">↵</kbd> to select
            </span>
          </div>
          <span className="text-primary font-medium">EduWorld Unified OS</span>
        </div>
      </div>
    </div>
  );
}
