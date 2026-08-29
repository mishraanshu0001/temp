import React, { useState } from 'react';
import { 
  Scale, 
  ArrowRightLeft, 
  Clock, 
  BookOpen, 
  Users, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  X
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';
import { rebalanceFacultyWorkload } from '../../services/api';

export default function FacultyWorkloadTab({ workloadData, onRefresh }) {
  const { faculty = [], recommendations = [] } = workloadData || {};
  const [filter, setFilter] = useState('all');
  const [rebalancing, setRebalancing] = useState(false);
  const [toast, setToast] = useState(null);

  // Manual reassign modal state
  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [selectedSourceFaculty, setSelectedSourceFaculty] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedTargetFacultyId, setSelectedTargetFacultyId] = useState('');

  const showToast = (title, msg, type = 'success') => {
    setToast({ title, msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleExecuteRecommendation = async (rec) => {
    setRebalancing(true);
    try {
      await rebalanceFacultyWorkload({
        fromFacultyId: rec.fromFacultyId,
        toFacultyId: rec.toFacultyId,
        courseId: rec.courseId
      });
      showToast('Workload Rebalanced', `Reassigned ${rec.courseCode} (${rec.courseSection}) to ${rec.toFacultyName}.`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to execute rebalance', 'error');
    } finally {
      setRebalancing(false);
    }
  };

  const handleManualReassign = async (e) => {
    e.preventDefault();
    if (!selectedSourceFaculty || !selectedCourseId || !selectedTargetFacultyId) return;

    setRebalancing(true);
    try {
      const targetFaculty = faculty.find(f => f.id === selectedTargetFacultyId);
      const course = selectedSourceFaculty.assignedCourses.find(c => c.id === selectedCourseId);
      
      await rebalanceFacultyWorkload({
        fromFacultyId: selectedSourceFaculty.id,
        toFacultyId: selectedTargetFacultyId,
        courseId: selectedCourseId
      });

      showToast('Course Reassigned', `Transferred ${course?.code} to ${targetFaculty?.name}.`);
      setReassignModalOpen(false);
      setSelectedSourceFaculty(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to reassign course', 'error');
    } finally {
      setRebalancing(false);
    }
  };

  const openModalForFaculty = (f) => {
    setSelectedSourceFaculty(f);
    setSelectedCourseId(f.assignedCourses[0]?.id || '');
    const defaultTarget = faculty.find(fac => fac.id !== f.id && fac.status === 'Available') || faculty.find(fac => fac.id !== f.id);
    setSelectedTargetFacultyId(defaultTarget?.id || '');
    setReassignModalOpen(true);
  };

  const filteredFaculty = filter === 'all' 
    ? faculty 
    : faculty.filter(f => f.status.toLowerCase() === filter.toLowerCase() || f.type.toLowerCase() === filter.toLowerCase());

  const overloadedCount = faculty.filter(f => f.status === 'Overloaded').length;
  const availableCount = faculty.filter(f => f.status === 'Available').length;
  const optimalCount = faculty.filter(f => f.status === 'Optimal').length;

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg text-white flex items-center gap-3 animate-in slide-in-from-bottom-5 border text-sm ${
          toast.type === 'error' ? 'bg-slate-900 border-rose-600' : 'bg-slate-900 border-slate-700'
        }`}>
          {toast.type === 'error' ? <AlertTriangle className="text-rose-400" size={18} /> : <CheckCircle2 className="text-emerald-400" size={18} />}
          <div>
            <p className="font-bold">{toast.title}</p>
            <p className="text-xs text-slate-300">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900">Faculty Workload Balancing</h2>
          <p className="text-sm text-slate-500">Live distribution of lecture credits and laboratory sessions.</p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({faculty.length})
          </button>
          <button
            onClick={() => setFilter('overloaded')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'overloaded' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Overloaded ({overloadedCount})
          </button>
          <button
            onClick={() => setFilter('optimal')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'optimal' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Optimal ({optimalCount})
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-3.5 py-1.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-1.5 ${
              filter === 'available' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Available ({availableCount})
          </button>
        </div>
      </div>

      {/* AI Smart Rebalance Suggestion Card */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                <SmartIcon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 uppercase tracking-wider">
                    Smart Rebalance Suggestion
                  </span>
                  <span className="text-xs text-slate-400">Automated Optimizer</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1.5">
                  Reallocate {recommendations[0].courseCode} ({recommendations[0].courseSection})
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {recommendations[0].reason}
                </p>

                {/* Score Projection Visual */}
                <div className="flex flex-wrap items-center gap-3 mt-3.5 text-sm">
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500">{recommendations[0].fromFacultyName}:</span>
                    <span className="text-rose-600 font-bold line-through">92%</span>
                    <span>→</span>
                    <span className="text-slate-900 font-bold">{recommendations[0].expectedFromScore}% (Optimal)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                    <span className="text-slate-500">{recommendations[0].toFacultyName}:</span>
                    <span className="text-slate-500 font-bold">50%</span>
                    <span>→</span>
                    <span className="text-slate-900 font-bold">{recommendations[0].expectedToScore}% (Optimal)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExecuteRecommendation(recommendations[0])}
              disabled={rebalancing}
              className="shrink-0 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <ArrowRightLeft size={16} />
              {rebalancing ? 'Applying...' : 'Execute 1-Click Rebalance'}
            </button>
          </div>
        </div>
      )}

      {/* Faculty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFaculty.map((f) => {
          const isOverloaded = f.status === 'Overloaded';
          const isAvailable = f.status === 'Available';
          const isOptimal = f.status === 'Optimal';
          const percent = Math.min(Math.round((f.currentWeeklyHours / f.maxWeeklyHours) * 100), 125);

          return (
            <div 
              key={f.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between"
            >
              <div>
                {/* Faculty Card Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-bold text-sm flex items-center justify-center">
                      {f.avatar || f.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm leading-snug">{f.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{f.department}</p>
                    </div>
                  </div>

                  {/* Clean Status Badge */}
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-50 text-slate-800 border border-slate-200">
                    <span className={`w-2 h-2 rounded-full ${
                      isOverloaded ? 'bg-rose-500' : isOptimal ? 'bg-emerald-500' : 'bg-slate-400'
                    }`} />
                    {f.status}
                  </span>
                </div>

                {/* Badges & Meta */}
                <div className="flex items-center gap-2 mt-4 text-xs">
                  <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-semibold border border-slate-200">
                    {f.type}
                  </span>
                  <span className="text-slate-600">
                    Rating: <strong className="text-slate-900">{f.rating || 4.7}★</strong>
                  </span>
                  <span className="text-slate-600 ml-auto">
                    SLA: <strong className="text-slate-900">{f.doubtSlaPercent || 95}%</strong>
                  </span>
                </div>

                {/* Workload Progress Bar */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <Clock size={14} className="text-slate-400" />
                      Weekly Load
                    </span>
                    <span className={isOverloaded ? 'text-rose-600 font-bold' : 'text-slate-900'}>
                      {f.currentWeeklyHours}h / {f.maxWeeklyHours}h ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOverloaded ? 'bg-rose-600' : 'bg-slate-800'
                      }`}
                      style={{ width: `${Math.min(percent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 mt-2">
                    <span>Score: {f.workloadScore} pts</span>
                    <span>{f.assignedCourses.length} Sections</span>
                  </div>
                </div>

                {/* Assigned Courses List */}
                <div className="mt-4 space-y-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                    Current Course Allocation
                  </span>
                  {f.assignedCourses.length === 0 ? (
                    <p className="text-xs text-slate-400 italic py-2">No courses allocated currently.</p>
                  ) : (
                    f.assignedCourses.map((c) => (
                      <div 
                        key={c.id}
                        className="p-3 rounded-xl bg-slate-50/70 border border-slate-200 flex items-center justify-between gap-2"
                      >
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs text-slate-900">{c.code}</span>
                            <span className="text-xs text-slate-600 bg-white border border-slate-200 px-2 py-0.2 rounded font-medium">
                              {c.section}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 truncate mt-1">{c.title}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-bold text-slate-900 block">{c.weeklyHours}h/wk</span>
                          <span className="text-xs text-slate-400">{c.students} students</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {isOverloaded ? 'Over limit' : isAvailable ? 'Can accept load' : 'Balanced'}
                </span>
                {f.assignedCourses.length > 0 && (
                  <button
                    onClick={() => openModalForFaculty(f)}
                    className="px-3.5 py-1.5 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <ArrowRightLeft size={13} />
                    Reassign Section
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
