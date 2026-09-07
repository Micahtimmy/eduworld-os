'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDemo } from '@/components/global/DemoContext';
import { GlobalHeaderNotifications } from '@/components/global/GlobalHeaderNotifications';

interface StudentRosterItem {
  id: string;
  name: string;
  initials: string;
  average: number;
  streak: number;
  status: 'Present' | 'Late' | 'Absent';
  flag?: string;
}

interface LabSubmission {
  id: string;
  studentName: string;
  title: string;
  submittedAt: string;
  graded: boolean;
  score?: number;
}

export default function TeacherDashboardPage() {
  const { currentPersona, showToast, addNotification } = useDemo();
  const [activeTab, setActiveTab] = useState<'roster' | 'lesson-planner' | 'grading'>('roster');
  const [selectedCohort, setSelectedCohort] = useState<'physics-a' | 'quantum-b' | 'lab-c'>('physics-a');

  // Attendance roster state
  const [roster, setRoster] = useState<StudentRosterItem[]>([
    { id: 's1', name: 'Kalu Nnamdi', initials: 'KN', average: 92, streak: 14, status: 'Present', flag: 'Top Performer' },
    { id: 's2', name: 'Fatima Al-Mansoor', initials: 'FA', average: 89, streak: 10, status: 'Present', flag: 'High Mastery' },
    { id: 's3', name: 'Tunde Bakare', initials: 'TB', average: 64, streak: 2, status: 'Late', flag: 'Needs Work/Energy Review' },
    { id: 's4', name: 'David Adeleke', initials: 'DA', average: 78, streak: 5, status: 'Present' },
    { id: 's5', name: 'Amina Bello', initials: 'AB', average: 95, streak: 18, status: 'Present', flag: 'Top Performer' },
    { id: 's6', name: 'Chidi Eze', initials: 'CE', average: 81, streak: 8, status: 'Present' },
  ]);

  // Lesson planner state
  const [curriculum, setCurriculum] = useState('WAEC WASSCE');
  const [topic, setTopic] = useState("Electromagnetic Induction & Faraday's Law");
  const [duration, setDuration] = useState('45 min');
  const [pedagogy, setPedagogy] = useState('5E Instructional Model');
  const [generatedPlan, setGeneratedPlan] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Grading workspace state
  const [submissions, setSubmissions] = useState<LabSubmission[]>([
    { id: 'sub1', studentName: 'Kalu Nnamdi', title: 'Projectile Motion & Drag Coefficient Lab Report', submittedAt: '2 hours ago', graded: false },
    { id: 'sub2', studentName: 'Fatima Al-Mansoor', title: 'Double-Slit Wave Interference Experiment', submittedAt: '4 hours ago', graded: false },
    { id: 'sub3', studentName: 'Tunde Bakare', title: 'Lenz’s Law & Eddy Currents Scaffolding', submittedAt: 'Yesterday', graded: false },
  ]);
  const [activeGradingSub, setActiveGradingSub] = useState<LabSubmission | null>(null);
  const [rubricScores, setRubricScores] = useState({ hypothesis: 24, precision: 25, errorAnalysis: 23, citations: 24 });
  const [teacherFeedback, setTeacherFeedback] = useState('Exceptional mathematical derivation of ballistic trajectory with thorough air-resistance error propagation analysis.');

  // Announcement modal
  const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);
  const [announcementText, setAnnouncementText] = useState('');

  const updateAttendance = (id: string, newStatus: 'Present' | 'Late' | 'Absent') => {
    setRoster((prev) => prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  const presentCount = roster.filter((s) => s.status === 'Present').length;
  const attendancePercentage = ((presentCount / roster.length) * 100).toFixed(1);

  const handleSubmitAttendance = () => {
    showToast(`Attendance register submitted for ${roster.length} students (${attendancePercentage}% present).`);
    addNotification('Attendance Synchronized', `Official daily register logged for Senior Secondary Physics.`, 'system');
  };

  const handleGenerateLessonPlan = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedPlan(true);
      showToast(`AI Lesson Plan & Socratic Scaffolding generated for "${topic}"!`);
    }, 800);
  };

  const handlePushQuizToStudents = () => {
    showToast('In-class diagnostic quiz successfully pushed to all 32 student portal dashboards!');
    addNotification('New Homework Assigned', `In-class diagnostic quiz on ${topic} dispatched to students.`, 'academic');
  };

  const handleBroadcastAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    setIsAnnouncementModalOpen(false);
    showToast(`Announcement broadcasted to all enrolled students in Cohort A.`);
    addNotification('Faculty Announcement', announcementText, 'academic');
    setAnnouncementText('');
  };

  const totalRubricScore = rubricScores.hypothesis + rubricScores.precision + rubricScores.errorAnalysis + rubricScores.citations;

  const handleSubmitGrade = () => {
    if (!activeGradingSub) return;
    setSubmissions((prev) =>
      prev.map((s) => (s.id === activeGradingSub.id ? { ...s, graded: true, score: totalRubricScore } : s))
    );
    showToast(`Grade ${totalRubricScore}/100 published for ${activeGradingSub.studentName}.`);
    addNotification(
      'Grading Complete',
      `Graded ${activeGradingSub.studentName}'s ${activeGradingSub.title}: ${totalRubricScore}/100 (Distinction).`,
      'academic'
    );
    setActiveGradingSub(null);
  };

  return (
    <div className="flex min-h-screen bg-surface font-sans">
      {/* Teacher Sidebar */}
      <aside className="w-64 bg-surface-container-lowest border-r border-outline-variant flex flex-col shrink-0 h-screen sticky top-0 z-20">
        <div className="p-5 border-b border-outline-variant flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center font-bold shadow-xs">
            <span className="material-symbols-outlined text-2xl">draw</span>
          </div>
          <div>
            <h1 className="font-jakarta font-bold text-base text-on-surface">EduWorld Teacher</h1>
            <span className="text-[10px] font-mono uppercase text-secondary font-bold">Classroom Command</span>
          </div>
        </div>

        {/* Cohort Selector */}
        <div className="p-4 mx-3 my-3 bg-surface-container-low rounded-2xl border border-outline-variant space-y-2">
          <span className="text-[10px] font-mono uppercase text-outline font-bold">Active Lecture Cohort:</span>
          <select
            value={selectedCohort}
            onChange={(e) => setSelectedCohort(e.target.value as any)}
            className="w-full p-2 rounded-xl border border-outline-variant bg-white font-jakarta text-xs font-bold text-on-surface outline-none focus:border-primary"
          >
            <option value="physics-a">Senior Physics (Cohort A • 32)</option>
            <option value="quantum-b">AP Quantum Mechanics (Cohort B • 24)</option>
            <option value="lab-c">Electromagnetism Lab (Cohort C • 18)</option>
          </select>
        </div>

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('roster')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'roster'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">group</span>
            <span>Student Roster &amp; Attendance</span>
          </button>

          <button
            onClick={() => setActiveTab('lesson-planner')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'lesson-planner'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <span className="material-symbols-outlined text-base">auto_awesome</span>
            <span>AI Lesson Plan Creator</span>
          </button>

          <button
            onClick={() => setActiveTab('grading')}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-jakarta text-xs font-semibold transition-all ${
              activeTab === 'grading'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface hover:bg-surface-container-low'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-base">rate_review</span>
              <span>Rubric Grading Workspace</span>
            </div>
            {submissions.filter((s) => !s.graded).length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full bg-amber-400 text-amber-950 font-bold text-[10px] font-mono">
                {submissions.filter((s) => !s.graded).length}
              </span>
            )}
          </button>
        </nav>

        {/* Footer User Info */}
        <div className="p-4 border-t border-outline-variant bg-surface-container-low text-xs space-y-2">
          <Link
            href="/role-select"
            className="text-xs font-jakarta font-bold text-primary hover:underline flex items-center justify-between"
          >
            <span>Switch Role Tier</span>
            <span className="material-symbols-outlined text-sm">swap_horiz</span>
          </Link>
          <div className="flex items-center gap-2.5 pt-1">
            <img
              src={currentPersona.avatar}
              alt={currentPersona.name}
              className="w-8 h-8 rounded-full object-cover border border-slate-300 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-on-surface truncate">{currentPersona.name}</p>
              <p className="text-[10px] text-outline font-mono truncate">{currentPersona.roleTitle}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 px-6 md:px-8 bg-surface-container-lowest border-b border-outline-variant flex items-center justify-between sticky top-0 z-30 shadow-xs">
          <div>
            <h2 className="font-jakarta font-bold text-base text-on-surface">Classroom Command Center</h2>
            <p className="text-xs text-on-surface-variant font-inter">
              Senior Secondary Physics • 32 Enrolled Candidates • Term 2 Week 6
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAnnouncementModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl border border-outline-variant bg-surface-container text-xs font-jakarta font-bold text-on-surface hover:border-primary transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm text-primary">campaign</span>
              <span>Broadcast Announcement</span>
            </button>

            <span className="hidden sm:inline-flex px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold font-jakarta">
              ✦ Live Sync Active
            </span>

            <GlobalHeaderNotifications />

            <Link href="/settings" className="shrink-0">
              <img
                src={currentPersona.avatar}
                alt={currentPersona.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 max-w-6xl mx-auto w-full space-y-6">
          {/* TAB 1: ROSTER & ATTENDANCE */}
          {activeTab === 'roster' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Top Banner */}
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-jakarta font-extrabold text-xl text-on-surface">
                      Daily Attendance Register
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary-fixed/50 text-primary">
                      {attendancePercentage}% Present
                    </span>
                  </div>
                  <p className="text-xs text-outline font-inter mt-1">
                    Mark student arrival status in real-time to synchronize with Guardian portals.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleSubmitAttendance}
                    className="px-5 py-2.5 rounded-xl bg-primary text-white font-jakarta font-bold text-xs hover:bg-primary-container shadow-xs transition-all flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm">cloud_upload</span>
                    <span>Submit &amp; Sync Register</span>
                  </button>
                </div>
              </div>

              {/* Roster Table */}
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant overflow-hidden shadow-md">
                <div className="p-5 border-b border-surface-container flex justify-between items-center bg-surface-container-low">
                  <h3 className="font-jakarta font-bold text-sm text-on-surface">Enrolled Students ({roster.length})</h3>
                  <span className="text-xs font-mono text-outline">Sorted by Diagnostic Performance</span>
                </div>

                <div className="divide-y divide-surface-container">
                  {roster.map((student) => (
                    <div key={student.id} className="p-4 sm:px-6 flex flex-wrap items-center justify-between gap-4 hover:bg-surface-container-low/50 transition-colors">
                      <div className="flex items-center gap-3.5">
                        <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-jakarta font-extrabold flex items-center justify-center text-xs shadow-xs">
                          {student.initials}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-jakarta font-bold text-sm text-on-surface">{student.name}</h4>
                            {student.flag && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-jakarta ${
                                  student.flag.includes('Top')
                                    ? 'bg-green-100 text-green-900 border border-green-300'
                                    : student.flag.includes('Needs')
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-blue-100 text-blue-900'
                                }`}
                              >
                                {student.flag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-outline font-inter mt-0.5">
                            Average Score: <strong className="text-on-surface">{student.average}%</strong> • Streak: 🔥 {student.streak} days
                          </p>
                        </div>
                      </div>

                      {/* Attendance Buttons */}
                      <div className="flex items-center gap-1.5">
                        {(['Present', 'Late', 'Absent'] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => updateAttendance(student.id, st)}
                            className={`px-3 py-1 rounded-xl text-xs font-jakarta font-bold transition-all border ${
                              student.status === st
                                ? st === 'Present'
                                  ? 'bg-green-600 text-white border-green-700 shadow-xs'
                                  : st === 'Late'
                                  ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                                  : 'bg-red-600 text-white border-red-700 shadow-xs'
                                : 'bg-surface-container-low text-on-surface border-outline-variant hover:bg-surface-container'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: AI LESSON PLAN CREATOR */}
          {activeTab === 'lesson-planner' && (
            <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 md:p-8 shadow-md space-y-6 animate-in fade-in">
              <div className="flex items-center gap-2 text-secondary font-jakarta font-bold text-sm">
                <span className="material-symbols-outlined text-xl">auto_awesome</span>
                <span>EduWorld AI Instant Lesson Architect &amp; Formative Quiz Generator</span>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-inter">
                <div>
                  <label className="block font-bold text-on-surface mb-1">Curriculum Standard:</label>
                  <select
                    value={curriculum}
                    onChange={(e) => setCurriculum(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface font-semibold"
                  >
                    <option value="WAEC WASSCE">WAEC WASSCE (West Africa)</option>
                    <option value="JAMB UTME">JAMB UTME (National Standard)</option>
                    <option value="Cambridge IGCSE">Cambridge IGCSE / A-Levels</option>
                    <option value="AP Physics C">AP Physics C: Electricity &amp; Magnetism</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Duration &amp; Period:</label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface font-semibold"
                  >
                    <option value="30 min">30 Minutes (Rapid Drill)</option>
                    <option value="45 min">45 Minutes (Standard Period)</option>
                    <option value="60 min">60 Minutes (Lecture &amp; Lab)</option>
                    <option value="90 min">90 Minutes (Double Practical Block)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-on-surface mb-1">Pedagogical Framework:</label>
                  <select
                    value={pedagogy}
                    onChange={(e) => setPedagogy(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface font-semibold"
                  >
                    <option value="5E Instructional Model">5E Model (Engage, Explore, Explain, Elaborate, Evaluate)</option>
                    <option value="Socratic Inquiry Scaffold">Socratic Inquiry &amp; Peer Guided Drill</option>
                    <option value="Direct Instruction & Lab Practicum">Direct Instruction &amp; Experimental Verification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface font-jakarta mb-1">
                  Specific Lesson Topic / Sub-Concept:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="flex-1 p-3 rounded-xl border border-outline-variant bg-surface-container-low text-xs font-inter text-on-surface outline-none focus:border-primary"
                  />
                  <button
                    onClick={handleGenerateLessonPlan}
                    disabled={isGenerating}
                    className="px-6 py-3 rounded-xl bg-secondary text-on-secondary font-jakarta font-bold text-xs hover:bg-secondary/90 shadow-xs transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                  >
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    <span>{isGenerating ? 'Synthesizing...' : 'Generate Plan'}</span>
                  </button>
                </div>
              </div>

              {/* Generated Plan Output */}
              {generatedPlan && (
                <div className="p-6 rounded-2xl bg-surface-container-low border border-outline-variant space-y-4 animate-in fade-in">
                  <div className="flex flex-wrap items-center justify-between pb-3 border-b border-surface-container gap-2">
                    <div>
                      <h4 className="font-jakarta font-extrabold text-base text-on-surface">
                        {curriculum} • {topic} ({duration})
                      </h4>
                      <p className="text-xs text-secondary font-mono font-bold mt-0.5">
                        Structure: {pedagogy}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => showToast('Lesson Plan syllabus exported to printable PDF!')}
                        className="px-3.5 py-1.5 rounded-xl border border-outline-variant bg-white text-xs font-jakarta font-bold text-on-surface hover:bg-surface-container-high transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">download</span>
                        <span>Export PDF</span>
                      </button>

                      <button
                        onClick={handlePushQuizToStudents}
                        className="px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-jakarta font-bold hover:bg-primary-container transition-all flex items-center gap-1"
                      >
                        <span className="material-symbols-outlined text-sm">send</span>
                        <span>Push Quiz to Students</span>
                      </button>
                    </div>
                  </div>

                  {/* Scaffolding Timeline */}
                  <div className="space-y-3 text-xs font-inter text-on-surface-variant">
                    <div className="p-3.5 rounded-xl bg-white border border-outline-variant space-y-1">
                      <span className="font-mono text-primary font-bold">00:00 - 00:08 (Phase 1: Engage / Hook)</span>
                      <p className="text-on-surface">
                        Physical demonstration with a neodymium magnet dropped through an aluminum tube vs. PVC tube. Prompt class to hypothesize why the magnet falls slower through the non-magnetic aluminum conductor.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-outline-variant space-y-1">
                      <span className="font-mono text-secondary font-bold">00:08 - 00:22 (Phase 2: Explore &amp; Formal Derivation)</span>
                      <p className="text-on-surface">
                        Mathematical proof of induced Electromotive Force (EMF) using Faraday&apos;s Equation: ε = -N (ΔΦ/Δt). Demonstrate the physical meaning of the negative sign through Lenz&apos;s Law and conservation of energy.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-outline-variant space-y-1">
                      <span className="font-mono text-amber-700 font-bold">00:22 - 00:37 (Phase 3: Socratic Diagnostic Pair Drill)</span>
                      <p className="text-on-surface">
                        Students launch EduWorld Student App for a 3-question live formative poll calculating induced currents in rotating coils. Automated error clustering highlights common angle resolution mistakes.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-white border border-outline-variant space-y-1">
                      <span className="font-mono text-primary font-bold">00:37 - 00:45 (Phase 4: Real-World Synthesis &amp; Homework)</span>
                      <p className="text-on-surface">
                        Real-world case study: Hydroelectric turbines at Kainji Dam and electromagnetic braking in magnetic levitation trains. Assign 5 past WAEC questions for tonight&apos;s homework.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: RUBRIC GRADING WORKSPACE */}
          {activeTab === 'grading' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-surface-container-lowest rounded-3xl border border-outline-variant p-6 shadow-md space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-surface-container">
                  <div>
                    <h3 className="font-jakarta font-bold text-base text-on-surface">
                      Pending Student Submissions ({submissions.filter((s) => !s.graded).length})
                    </h3>
                    <p className="text-xs text-outline font-inter">
                      Split-view rubric evaluation with automated AI mathematical step-checking.
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant flex flex-wrap items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-jakarta font-bold text-sm text-on-surface">{sub.title}</h4>
                          {sub.graded ? (
                            <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-mono font-bold">
                              Graded: {sub.score}/100 (A1)
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-mono font-bold">
                              Pending Evaluation
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-outline font-inter mt-1">
                          Author: <strong className="text-on-surface">{sub.studentName}</strong> • Submitted {sub.submittedAt}
                        </p>
                      </div>

                      <button
                        onClick={() => setActiveGradingSub(sub)}
                        className={`px-4 py-2 rounded-xl text-xs font-jakarta font-bold transition-all shadow-xs ${
                          sub.graded
                            ? 'bg-surface-container-highest text-on-surface hover:bg-surface-container-high'
                            : 'bg-primary text-white hover:bg-primary-container'
                        }`}
                      >
                        {sub.graded ? 'Review Rubric Feedback' : 'Open Split-View Rubric'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Split-View Rubric Modal */}
      {activeGradingSub && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 md:p-8">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in">
            {/* Modal Header */}
            <div className="p-4 md:px-6 bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-secondary font-bold">Split-View AI Rubric Workspace</span>
                <h3 className="font-jakarta font-bold text-base text-on-surface">
                  {activeGradingSub.title} — {activeGradingSub.studentName}
                </h3>
              </div>
              <button
                onClick={() => setActiveGradingSub(null)}
                className="p-1.5 text-outline hover:text-on-surface rounded-lg hover:bg-surface-container"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Split Body */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-outline-variant overflow-hidden">
              {/* Left: Student Document Simulator */}
              <div className="p-6 overflow-y-auto space-y-4 bg-white font-serif text-slate-800 text-xs leading-relaxed">
                <div className="border-b border-slate-200 pb-3">
                  <p className="font-bold text-slate-900 text-sm">Experiment 4: Projectile Trajectory &amp; Air Resistance</p>
                  <p className="text-[11px] text-slate-500 font-sans">Author: {activeGradingSub.studentName} • Date: Term 2</p>
                </div>

                <div className="space-y-2">
                  <p className="font-sans font-bold text-slate-900 uppercase text-[10px]">1. Abstract &amp; Hypothesis</p>
                  <p>
                    The launch angle θ that maximizes projectile range in a vacuum is 45°. However, in viscous fluid media, the optimal launch angle shifts downward to approximately 39.2° due to turbulent quadratic drag F_d = 1/2 ρ v² C_d A.
                  </p>
                </div>

                <div className="space-y-2">
                  <p className="font-sans font-bold text-slate-900 uppercase text-[10px]">2. Mathematical Derivation &amp; Data Analysis</p>
                  <div className="p-3 bg-slate-50 rounded-xl font-mono text-[11px] text-slate-900 border border-slate-200">
                    y(x) = x · tan(θ) - [g x²] / [2 v₀² cos²(θ)]<br />
                    v_terminal = sqrt([2 m g] / [ρ C_d A]) = 34.2 m/s ± 0.4
                  </div>
                  <p>
                    Experimental trials with optical photogates yielded initial velocity v₀ = 12.45 m/s with standard error σ = ±0.08 m/s.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-sans text-[11px] text-emerald-900 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-emerald-700">verified</span>
                  <span>AI Verification: Equations and uncertainty bounds are mathematically consistent.</span>
                </div>
              </div>

              {/* Right: Rubric Evaluation Form */}
              <div className="p-6 overflow-y-auto space-y-5 bg-surface-container-lowest font-sans text-xs">
                <div className="flex justify-between items-center pb-3 border-b border-surface-container">
                  <h4 className="font-jakarta font-bold text-sm text-on-surface">Grading Rubric (Total: 100)</h4>
                  <span className="font-mono text-base font-extrabold text-primary bg-primary-fixed/40 px-3 py-1 rounded-xl">
                    Score: {totalRubricScore} / 100
                  </span>
                </div>

                {/* Criteria 1 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-on-surface">
                    <span>1. Hypothesis &amp; Theoretical Framework</span>
                    <span className="font-mono text-primary">{rubricScores.hypothesis} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={rubricScores.hypothesis}
                    onChange={(e) => setRubricScores({ ...rubricScores, hypothesis: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Criteria 2 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-on-surface">
                    <span>2. Experimental Data Precision &amp; Graphing</span>
                    <span className="font-mono text-primary">{rubricScores.precision} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={rubricScores.precision}
                    onChange={(e) => setRubricScores({ ...rubricScores, precision: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Criteria 3 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-on-surface">
                    <span>3. Quantitative Error &amp; Uncertainty Propagation</span>
                    <span className="font-mono text-primary">{rubricScores.errorAnalysis} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={rubricScores.errorAnalysis}
                    onChange={(e) => setRubricScores({ ...rubricScores, errorAnalysis: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Criteria 4 */}
                <div className="space-y-1.5">
                  <div className="flex justify-between font-bold text-on-surface">
                    <span>4. Citations &amp; Academic Synthesis</span>
                    <span className="font-mono text-primary">{rubricScores.citations} / 25</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="25"
                    value={rubricScores.citations}
                    onChange={(e) => setRubricScores({ ...rubricScores, citations: parseInt(e.target.value) })}
                    className="w-full accent-primary"
                  />
                </div>

                {/* Teacher Comment Box */}
                <div className="space-y-1.5 pt-2">
                  <label className="block font-bold text-on-surface">Constructive Faculty Feedback:</label>
                  <textarea
                    rows={3}
                    value={teacherFeedback}
                    onChange={(e) => setTeacherFeedback(e.target.value)}
                    className="w-full p-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface font-inter text-xs outline-none focus:border-primary"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setActiveGradingSub(null)}
                    className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitGrade}
                    className="px-5 py-2 rounded-xl bg-primary text-white font-jakarta font-bold hover:bg-primary-container shadow-xs flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">check_circle</span>
                    <span>Submit Grade ({totalRubricScore}/100)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Broadcast Announcement Modal */}
      {isAnnouncementModalOpen && (
        <div className="fixed inset-0 z-[99999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
              <h3 className="font-jakarta font-bold text-base text-on-surface">Broadcast Class Announcement</h3>
              <button onClick={() => setIsAnnouncementModalOpen(false)} className="text-outline hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleBroadcastAnnouncement} className="space-y-4 text-xs font-inter">
              <div>
                <label className="block font-bold text-on-surface mb-1">Target Cohort:</label>
                <div className="p-2.5 rounded-xl bg-surface-container-low border border-outline-variant font-bold text-on-surface">
                  Senior Physics (Cohort A • 32 Students)
                </div>
              </div>

              <div>
                <label className="block font-bold text-on-surface mb-1">Announcement Message:</label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. Please note that tomorrow's Faraday induction lab requires safety goggles and notebook submissions..."
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  className="w-full p-3 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface outline-none focus:border-primary"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAnnouncementModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-white font-jakarta font-bold hover:bg-primary-container shadow-xs flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">send</span>
                  <span>Push Broadcast to 32 Students</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
