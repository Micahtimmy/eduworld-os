import type { Metadata } from 'next';
import './globals.css';
import { CommandPalette } from '@/components/global/CommandPalette';
import { DemoProvider } from '@/components/global/DemoContext';
import { DemoSwitcher } from '@/components/global/DemoSwitcher';

export const metadata: Metadata = {
  title: 'EduWorld — Unified Global Learning OS',
  description: 'Next-generation intelligent educational operating system spanning K-12, Exam Prep, University Research, and Institutional Administration.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="h-full bg-surface text-on-surface antialiased font-sans selection:bg-primary-fixed selection:text-primary">
        <DemoProvider>
          {children}
          <CommandPalette />
          <DemoSwitcher />
        </DemoProvider>
      </body>
    </html>
  );
}
