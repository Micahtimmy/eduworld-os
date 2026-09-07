'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export type RoleType = 
  | 'achiever' 
  | 'explorer' 
  | 'scholar' 
  | 'teacher' 
  | 'parent' 
  | 'admin' 
  | 'enterprise' 
  | 'government';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'academic' | 'reward' | 'system' | 'billing';
  link?: string;
}

export interface DemoPersona {
  id: RoleType;
  name: string;
  roleTitle: string;
  institution: string;
  avatar: string;
  badge: string;
  badgeColor: string;
  primaryPath: string;
  metrics: {
    primaryLabel: string;
    primaryValue: string;
    secondaryLabel: string;
    secondaryValue: string;
    streak?: number;
    stars?: number;
    xp?: number;
    gpa?: string;
  };
  bio: string;
}

export const DEMO_PERSONAS: Record<RoleType, DemoPersona> = {
  achiever: {
    id: 'achiever',
    name: 'Kalu Nnamdi',
    roleTitle: 'Year 12 Secondary Candidate',
    institution: "King's College Lagos • Target JAMB 342+",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: 'Achiever Elite',
    badgeColor: 'bg-[#003f7a] text-white',
    primaryPath: '/achiever/dashboard',
    metrics: {
      primaryLabel: 'JAMB Readiness',
      primaryValue: '88.4%',
      secondaryLabel: 'WAEC Prediction',
      secondaryValue: '9 A1s',
      streak: 14,
      xp: 8420,
    },
    bio: 'Preparing for JAMB & WAEC examinations with high mastery in Physics, Chemistry, and Advanced Mathematics.',
  },
  explorer: {
    id: 'explorer',
    name: 'Zara Chen',
    roleTitle: 'Grade 5 Junior Cadet',
    institution: 'St. Claire Elementary • Science Division',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    badge: 'Galactic Cadet',
    badgeColor: 'bg-[#2b6c00] text-white',
    primaryPath: '/explorer/dashboard',
    metrics: {
      primaryLabel: 'Stars Collected',
      primaryValue: '2,850',
      secondaryLabel: 'Active Mission',
      secondaryValue: 'Mars Rover II',
      streak: 7,
      stars: 2850,
    },
    bio: 'Passionate about astronomy, robotics, and solving fun daily quests on the Adventure Journey Map.',
  },
  scholar: {
    id: 'scholar',
    name: 'Dr. Marcus Vance',
    roleTitle: 'Postdoctoral Research Fellow',
    institution: 'Imperial College London • Quantum Informatics',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'Ivy Scholar',
    badgeColor: 'bg-[#131b2e] text-white',
    primaryPath: '/scholar/dashboard',
    metrics: {
      primaryLabel: 'Cumulative GPA',
      primaryValue: '3.94 / 4.0',
      secondaryLabel: 'Citations',
      secondaryValue: '428 (h-index: 12)',
      gpa: '3.94',
    },
    bio: 'Conducting research on quantum error correction codes and topological quantum computing architectures.',
  },
  teacher: {
    id: 'teacher',
    name: 'Prof. Sarah Jenkins',
    roleTitle: 'Senior Faculty & Dept Chair',
    institution: 'Faculty of Physical Sciences • 3 Active Cohorts',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Faculty Master',
    badgeColor: 'bg-[#003f7a] text-white',
    primaryPath: '/teacher/dashboard',
    metrics: {
      primaryLabel: 'Total Students',
      primaryValue: '128',
      secondaryLabel: 'Submissions to Grade',
      secondaryValue: '48 Pending',
    },
    bio: 'Oversees AP Physics & Quantum Mechanics lecture courses with automated AI rubric grading.',
  },
  parent: {
    id: 'parent',
    name: 'Chioma Okafor',
    roleTitle: 'Household Guardian (2 Children)',
    institution: 'Lagos Island • Linked to Kalu & Zara',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    badge: 'Guardian Pro',
    badgeColor: 'bg-[#5b3700] text-white',
    primaryPath: '/parent/dashboard',
    metrics: {
      primaryLabel: 'Family Attendance',
      primaryValue: '98.4%',
      secondaryLabel: 'Tuition Balance',
      secondaryValue: '$0.00 (Current)',
    },
    bio: 'Monitoring academic performance and attendance across both Achiever and Explorer student profiles.',
  },
  admin: {
    id: 'admin',
    name: 'Principal Adeyemi',
    roleTitle: 'Chief Institutional Administrator',
    institution: 'Global High Academy • 1,240 Students',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badge: 'Institutional Admin',
    badgeColor: 'bg-slate-900 text-white',
    primaryPath: '/admin/dashboard',
    metrics: {
      primaryLabel: 'Institutional Health',
      primaryValue: '94 / 100',
      secondaryLabel: 'Intake Queue',
      secondaryValue: '42 CSV Records',
    },
    bio: 'Managing school-wide curriculum standards, teacher scheduling clashes, and bulk student onboarding.',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Elena Rodriguez',
    roleTitle: 'VP Talent & Upskilling',
    institution: 'TechGlobal Inc • 450 Enrolled Engineers',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: 'Enterprise VP',
    badgeColor: 'bg-[#003f7a] text-white',
    primaryPath: '/enterprise/dashboard',
    metrics: {
      primaryLabel: 'Upskilling ROI',
      primaryValue: '+34.2%',
      secondaryLabel: 'AI Track Completion',
      secondaryValue: '78.5%',
    },
    bio: 'Orchestrating workforce transformation with custom learning paths and skills gap matrix analytics.',
  },
  government: {
    id: 'government',
    name: 'Dr. Femi Olatunji',
    roleTitle: 'Director of National Curriculum',
    institution: 'Federal Ministry of Education • 36 States',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    badge: 'National Director',
    badgeColor: 'bg-[#006c49] text-white',
    primaryPath: '/government/dashboard',
    metrics: {
      primaryLabel: 'National Exam Candidates',
      primaryValue: '2.48 Million',
      secondaryLabel: 'Curriculum Equity Index',
      secondaryValue: '86.2%',
    },
    bio: 'Monitoring public examination benchmarks, digital classroom equity, and nationwide educator allocation.',
  },
};

const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Diagnostic Mastery Alert',
    message: 'Work, Energy & Power identified as high-priority recovery topic.',
    time: '5m ago',
    read: false,
    type: 'academic',
    link: '/achiever/diagnostic',
  },
  {
    id: 'n2',
    title: '14-Day Study Streak Active',
    message: 'You earned +120 XP for completing your daily CBT physics drill!',
    time: '1h ago',
    read: false,
    type: 'reward',
    link: '/achiever/shop',
  },
  {
    id: 'n3',
    title: 'New Socratic AI Tutor Recommendation',
    message: 'Dr. Socratic prepared a 10-question practice set on 2D Trajectories.',
    time: '3h ago',
    read: true,
    type: 'academic',
    link: '/achiever/ai-partner',
  },
];

interface DemoContextType {
  currentRole: RoleType;
  currentPersona: DemoPersona;
  switchRole: (role: RoleType) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  resetDemoData: () => void;
  notifications: AppNotification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, message: string, type?: AppNotification['type'], link?: string) => void;
  currency: 'USD' | 'NGN' | 'GBP';
  setCurrency: (c: 'USD' | 'NGN' | 'GBP') => void;
  formatCurrency: (amount: number) => string;
}

const DemoContext = createContext<DemoContextType | undefined>(undefined);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<RoleType>('achiever');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>(INITIAL_NOTIFICATIONS);
  const [currency, setCurrency] = useState<'USD' | 'NGN' | 'GBP'>('USD');
  const router = useRouter();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('eduworld_demo_role') as RoleType;
      if (stored && DEMO_PERSONAS[stored]) {
        setCurrentRole(stored);
      }
      const storedCurr = localStorage.getItem('eduworld_currency') as 'USD' | 'NGN' | 'GBP';
      if (storedCurr) {
        setCurrency(storedCurr);
      }
    } catch (e) {}
  }, []);

  const switchRole = (role: RoleType) => {
    setCurrentRole(role);
    try {
      localStorage.setItem('eduworld_demo_role', role);
    } catch (e) {}
    
    showToast(`Switched persona to ${DEMO_PERSONAS[role].name} (${DEMO_PERSONAS[role].badge})`);
    router.push(DEMO_PERSONAS[role].primaryPath);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const addNotification = (
    title: string,
    message: string,
    type: AppNotification['type'] = 'system',
    link?: string
  ) => {
    const newNotif: AppNotification = {
      id: 'notif_' + Date.now(),
      title,
      message,
      time: 'Just now',
      read: false,
      type,
      link,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const formatCurrency = (amount: number) => {
    if (currency === 'NGN') {
      return `₦${(amount * 1550).toLocaleString()}`;
    } else if (currency === 'GBP') {
      return `£${(amount * 0.78).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const resetDemoData = () => {
    try {
      localStorage.clear();
      localStorage.setItem('eduworld_demo_role', 'achiever');
      setCurrentRole('achiever');
      setNotifications(INITIAL_NOTIFICATIONS);
      showToast('Demo state and persona records successfully reset to factory defaults.');
      router.push('/achiever/dashboard');
    } catch (e) {}
  };

  const currentPersona = DEMO_PERSONAS[currentRole] || DEMO_PERSONAS.achiever;

  return (
    <DemoContext.Provider
      value={{
        currentRole,
        currentPersona,
        switchRole,
        toastMessage,
        showToast,
        resetDemoData,
        notifications,
        markNotificationAsRead,
        addNotification,
        currency,
        setCurrency,
        formatCurrency,
      }}
    >
      {children}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[99999] bg-[#131b2e] text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <span className="material-symbols-outlined text-[#6ffbbe] text-xl">verified</span>
          <span className="text-xs font-semibold tracking-wide font-sans">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="ml-2 text-slate-400 hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error('useDemo must be used within a DemoProvider');
  }
  return context;
}
