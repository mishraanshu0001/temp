import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  FileText, 
  Laptop, 
  BookOpen, 
  Users, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { updateOnboardingTask, activateFacultyCandidate } from '../../services/api';

export default function OnboardingTrackerTab({ onboardingData, onRefresh }) {
  const { candidates = [] } = onboardingData || {};
  const [activeCandidateId, setActiveCandidateId] = useState(candidates[0]?.id || null);
  const [toast, setToast] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const showToast = (title, msg, type = 'success') => {
    setToast({ title, msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleToggleTask = async (candidateId, taskId, currentStatus) => {
    try {
      await updateOnboardingTask({
        candidateId,
        taskId,
        completed: !currentStatus
      });
      showToast('Milestone Updated', 'Onboarding progress recalculated in real-time.');
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', 'Failed to update task status', 'error');
    }
  };

  const handleActivateFaculty = async (candidateId, name) => {
    setActionLoading(true);
    try {
      await activateFacultyCandidate({ candidateId });
      showToast('Faculty Activated', `${name} is now certified and added to the active Faculty Roster.`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', 'Failed to activate faculty candidate', 'error');
    } finally {
      setActionLoading(false);
    }
  };

  const selectedCandidate = candidates.find(c => c.id === activeCandidateId) || candidates[0];

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case 'Documents': return <FileText size={15} className="text-slate-500" />;
      case 'IT & LMS': return <Laptop size={15} className="text-slate-500" />;
      case 'Curriculum': return <BookOpen size={15} className="text-slate-500" />;
      case 'Orientation': return <Users size={15} className="text-slate-500" />;
      case 'Readiness': return <ShieldCheck size={15} className="text-slate-500" />;
      default: return <ClipboardCheck size={15} className="text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="text-emerald-400" size={18} />
          <div>
            <p className="font-bold text-xs">{toast.title}</p>
            <p className="text-[11px] text-slate-300">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Header Banner - Clean Light Theme */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <ClipboardCheck size={18} />
            </span>
            <h2 className="text-xl font-bold text-slate-900">Faculty Onboarding & Readiness Tracker</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            5-phase verification workflow ensuring accreditation compliance, LMS readiness, and pedagogical mentoring.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold">
          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200">
            {candidates.length} Active Candidates
          </span>
        </div>
      </div>

      {/* Main Split Layout: Left Candidates List / Right Detailed Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Candidate Selector List */}
        <div className="space-y-3">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block px-1">
            Onboarding Cohort ({candidates.length})
          </span>

          {candidates.map((cand) => {
            const isSelected = selectedCandidate?.id === cand.id;
            const isReady = cand.overallProgress === 100 || cand.status === 'Ready for Activation';

            return (
              <div
                key={cand.id}
                onClick={() => setActiveCandidateId(cand.id)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  isSelected 
                    ? 'bg-white border-indigo-600 shadow-sm ring-1 ring-indigo-200' 
                    : 'bg-white hover:bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center">
                      {cand.avatar || cand.candidateName.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">{cand.candidateName}</h4>
                      <p className="text-[11px] text-slate-500">{cand.role}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    isReady ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700 border border-slate-200'
                  }`}>
                    {cand.overallProgress}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        isReady ? 'bg-emerald-600' : 'bg-indigo-600'
                      }`}
                      style={{ width: `${cand.overallProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 mt-1.5">
                    <span>Starts: {cand.startDate}</span>
                    <span>Mentor: {cand.assignedMentor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Milestones & Checklist for Selected Candidate */}
        {selectedCandidate && (
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              {/* Selected Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{selectedCandidate.candidateName}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-medium border border-slate-200">
                      {selectedCandidate.department}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedCandidate.role} • {selectedCandidate.email}</p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Readiness</span>
                    <span className="text-sm font-extrabold text-slate-900">{selectedCandidate.overallProgress}%</span>
                  </div>

                  {selectedCandidate.overallProgress === 100 && selectedCandidate.status !== 'Active Faculty' ? (
                    <button
                      onClick={() => handleActivateFaculty(selectedCandidate.id, selectedCandidate.candidateName)}
                      disabled={actionLoading}
                      className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <UserCheck size={15} />
                      {actionLoading ? 'Certifying...' : 'Certify & Activate'}
                    </button>
                  ) : selectedCandidate.status === 'Active Faculty' ? (
                    <span className="px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold flex items-center gap-1">
                      <CheckCircle2 size={14} /> Active Faculty
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400 font-medium italic">
                      {selectedCandidate.tasks.filter(t => !t.completed).length} tasks pending
                    </span>
                  )}
                </div>
              </div>

              {/* Checklist Grouped by Phase */}
              <div className="mt-4 space-y-2.5">
                {selectedCandidate.tasks.map((task) => (
                  <div
                    key={task.id}
                    onClick={() => handleToggleTask(selectedCandidate.id, task.id, task.completed)}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                      task.completed 
                        ? 'bg-emerald-50/30 border-emerald-200 hover:bg-emerald-50/60' 
                        : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                        task.completed 
                          ? 'bg-emerald-600 border-emerald-600 text-white' 
                          : 'bg-white border-slate-300'
                      }`}>
                        {task.completed && <CheckCircle2 size={13} />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500">
                            {getPhaseIcon(task.phase)}
                            {task.phase}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[10px] text-slate-400">Req: {task.requiredBy}</span>
                        </div>
                        <h4 className={`text-xs font-medium mt-0.5 ${
                          task.completed ? 'text-slate-700 line-through opacity-75' : 'text-slate-900'
                        }`}>
                          {task.title}
                        </h4>
                      </div>
                    </div>

                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                      task.completed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {task.completed ? 'Completed' : 'Pending'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Info Banner */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-500 gap-2">
              <span>Faculty Mentor: <strong className="text-slate-800">{selectedCandidate.assignedMentor}</strong></span>
              <span className="text-slate-400">Click any milestone above to toggle sign-off</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
