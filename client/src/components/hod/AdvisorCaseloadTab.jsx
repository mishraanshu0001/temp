import React, { useState } from 'react';
import { 
  UserCheck, 
  ShieldAlert, 
  ArrowRightLeft, 
  Users, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  ChevronDown, 
  ChevronUp, 
  X
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';
import { redistributeAdvisorCaseload } from '../../services/api';

export default function AdvisorCaseloadTab({ advisorData, onRefresh }) {
  const { advisors = [], recommendations = [] } = advisorData || {};
  const [expandedAdvisorId, setExpandedAdvisorId] = useState(null);
  const [redistributing, setRedistributing] = useState(false);
  const [toast, setToast] = useState(null);

  // Manual Transfer Modal State
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [sourceAdvisor, setSourceAdvisor] = useState(null);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [targetAdvisorId, setTargetAdvisorId] = useState('');

  const showToast = (title, msg, type = 'success') => {
    setToast({ title, msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleExecuteRecommendation = async (rec) => {
    setRedistributing(true);
    try {
      await redistributeAdvisorCaseload({
        fromAdvisorId: rec.fromAdvisorId,
        toAdvisorId: rec.toAdvisorId,
        studentIds: rec.students.map(s => s.id)
      });
      showToast('Caseload Rebalanced', `Transferred ${rec.studentCount} low-risk students to ${rec.toAdvisorName}.`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to redistribute caseload', 'error');
    } finally {
      setRedistributing(false);
    }
  };

  const handleManualTransfer = async (e) => {
    e.preventDefault();
    if (!sourceAdvisor || selectedStudentIds.length === 0 || !targetAdvisorId) return;

    setRedistributing(true);
    try {
      const targetAdvisor = advisors.find(a => a.id === targetAdvisorId);
      await redistributeAdvisorCaseload({
        fromAdvisorId: sourceAdvisor.id,
        toAdvisorId: targetAdvisorId,
        studentIds: selectedStudentIds
      });

      showToast('Students Transferred', `Moved ${selectedStudentIds.length} students to ${targetAdvisor?.name}.`);
      setTransferModalOpen(false);
      setSelectedStudentIds([]);
      setSourceAdvisor(null);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', err.response?.data?.error || 'Failed to transfer students', 'error');
    } finally {
      setRedistributing(false);
    }
  };

  const openTransferModal = (advisor) => {
    setSourceAdvisor(advisor);
    setSelectedStudentIds([]);
    const defaultTarget = advisors.find(a => a.id !== advisor.id && a.status === 'Available') || advisors.find(a => a.id !== advisor.id);
    setTargetAdvisorId(defaultTarget?.id || '');
    setTransferModalOpen(true);
  };

  const toggleStudentSelection = (id) => {
    setSelectedStudentIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
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

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <UserCheck size={20} />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Advisor Caseload Balancing
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Risk-weighted student support: High Risk (3 pts), Medium Risk (2 pts), Low Risk (1 pt). Target safe ceiling: 120 points.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="px-4 py-2 rounded-xl bg-sky-50 border border-sky-200 text-sm font-bold text-sky-900">
            {advisors.length} Active Advisors
          </div>
        </div>
      </div>

      {/* Smart Redistribution Recommendation Banner */}
      {recommendations.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-sky-200 shadow-2xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 shrink-0">
                <SmartIcon size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded bg-sky-50 text-sky-900 border border-sky-200 uppercase tracking-wider">
                    AI Caseload Redistribution
                  </span>
                  <span className="text-xs text-slate-400">Risk-Balanced Routing</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1.5">
                  Redistribute {recommendations[0].studentCount} Low-Risk Students from {recommendations[0].fromAdvisorName}
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                  {recommendations[0].reason}
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-3.5 text-sm">
                  <div className="flex items-center gap-2 bg-sky-50/50 px-3 py-1.5 rounded-xl border border-sky-100">
                    <span className="text-slate-500">{recommendations[0].fromAdvisorName}:</span>
                    <span className="text-rose-600 font-bold line-through">138 pts</span>
                    <span>→</span>
                    <span className="text-slate-900 font-bold">{recommendations[0].expectedFromScore} pts (Optimal)</span>
                  </div>
                  <div className="flex items-center gap-2 bg-sky-50/50 px-3 py-1.5 rounded-xl border border-sky-100">
                    <span className="text-slate-500">{recommendations[0].toAdvisorName}:</span>
                    <span className="text-slate-500 font-bold">72 pts</span>
                    <span>→</span>
                    <span className="text-slate-900 font-bold">{recommendations[0].expectedToScore} pts (Optimal)</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleExecuteRecommendation(recommendations[0])}
              disabled={redistributing}
              className="shrink-0 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 shadow-xs"
            >
              <ArrowRightLeft size={16} />
              {redistributing ? 'Applying...' : 'Apply Smart Redistribution'}
            </button>
          </div>
        </div>
      )}

      {/* Advisor Cards Grid - Light Blue, White, Black */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advisors.map((adv) => {
          const isOverloaded = adv.status === 'Overloaded';
          const isAvailable = adv.status === 'Available';
          const isOptimal = adv.status === 'Optimal';
          const capacityPercent = Math.min(Math.round((adv.caseloadScore / adv.maxCapacityPoints) * 100), 130);
          const isExpanded = expandedAdvisorId === adv.id;

          const highRiskCount = adv.assignedStudents.filter(s => s.risk === 'high').length;
          const medRiskCount = adv.assignedStudents.filter(s => s.risk === 'medium').length;
          const lowRiskCount = adv.assignedStudents.filter(s => s.risk === 'low').length;

          return (
            <div 
              key={adv.id}
              className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Advisor Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                      {adv.avatar || adv.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-base text-slate-900 leading-snug">{adv.name}</h4>
                      <p className="text-xs text-slate-500 font-medium mt-0.5">{adv.department}</p>
                    </div>
                  </div>

                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-2xs ${
                    isOverloaded 
                      ? 'bg-rose-50 text-rose-800 border-rose-200' 
                      : isOptimal 
                        ? 'bg-sky-50 text-sky-900 border-sky-200' 
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      isOverloaded ? 'bg-rose-500' : isOptimal ? 'bg-sky-600' : 'bg-slate-400'
                    }`} />
                    {adv.status}
                  </span>
                </div>

                {/* Score Progress Bar */}
                <div className="mt-5 p-4 rounded-xl bg-sky-50/40 border border-sky-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <ShieldAlert size={14} className="text-sky-700" />
                      Weighted Caseload Load
                    </span>
                    <span className={`text-sm font-black ${isOverloaded ? 'text-rose-600' : 'text-slate-900'}`}>
                      {adv.caseloadScore} / {adv.maxCapacityPoints} pts ({capacityPercent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-sky-100/70 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        isOverloaded ? 'bg-rose-600' : 'bg-slate-900'
                      }`}
                      style={{ width: `${Math.min(capacityPercent, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-medium mt-2">
                    <span>{adv.totalStudentsCount} Assigned Students</span>
                    <span>Safe Limit: 120 pts</span>
                  </div>
                </div>

                {/* Risk Distribution Breakdown Grid */}
                <div className="grid grid-cols-3 gap-2.5 mt-4 text-center">
                  <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                    <span className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> High (3pt)
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 mt-1 block">{highRiskCount}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                    <span className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Med (2pt)
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 mt-1 block">{medRiskCount}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                    <span className="text-xs font-semibold text-slate-500 flex items-center justify-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400" /> Low (1pt)
                    </span>
                    <span className="text-lg font-extrabold text-slate-900 mt-1 block">{lowRiskCount}</span>
                  </div>
                </div>

                {/* Toggle View Students Accordion Button */}
                <button
                  onClick={() => setExpandedAdvisorId(isExpanded ? null : adv.id)}
                  className="w-full mt-4 py-2.5 px-3.5 rounded-xl bg-sky-50/60 hover:bg-sky-100 text-xs font-bold text-sky-900 flex items-center justify-between transition-colors cursor-pointer border border-sky-200"
                >
                  <span>Student Breakdown ({adv.assignedStudents.length} Profiles)</span>
                  {isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>

                {/* Expanded Student List */}
                {isExpanded && (
                  <div className="mt-3 space-y-2 max-h-56 overflow-y-auto pr-1">
                    {adv.assignedStudents.map((s) => (
                      <div 
                        key={s.id}
                        className="p-2.5 rounded-xl bg-sky-50/30 border border-sky-100 text-xs flex items-center justify-between"
                      >
                        <div>
                          <p className="font-bold text-slate-900 text-xs">{s.name}</p>
                          <p className="text-xs text-slate-500 mt-0.5 font-medium">CGPA: {s.cgpa} • Att: {s.attendance}%</p>
                        </div>
                        <span className="px-2 py-0.5 rounded-md text-xs font-bold bg-white border border-sky-200 text-sky-900 shadow-2xs">
                          +{s.riskPoints} pt
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">
                  {isOverloaded ? 'Over safe limit' : isAvailable ? 'Can accept load' : 'Balanced load'}
                </span>
                <button
                  onClick={() => openTransferModal(adv)}
                  className="px-4 py-2 text-xs font-bold text-slate-900 bg-white hover:bg-sky-50 border border-sky-200 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  <ArrowRightLeft size={14} />
                  Transfer Students
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manual Transfer Modal */}
      {transferModalOpen && sourceAdvisor && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <ArrowRightLeft className="text-slate-900" size={18} />
                <h3 className="font-extrabold text-slate-900 text-base">Transfer Students from {sourceAdvisor.name}</h3>
              </div>
              <button 
                onClick={() => setTransferModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleManualTransfer} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Target Advisor (Recipient)</label>
                <select
                  value={targetAdvisorId}
                  onChange={(e) => setTargetAdvisorId(e.target.value)}
                  className="w-full bg-white text-slate-900 text-sm rounded-xl p-3 border border-slate-300 font-semibold outline-none focus:border-slate-900"
                  required
                >
                  {advisors.filter(a => a.id !== sourceAdvisor.id).map(a => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.status} • {a.caseloadScore} pts • {a.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Select Students to Move ({selectedStudentIds.length} selected)
                </label>
                <div className="border border-slate-200 rounded-xl p-2 max-h-56 overflow-y-auto space-y-1.5">
                  {sourceAdvisor.assignedStudents.map((s) => {
                    const isSelected = selectedStudentIds.includes(s.id);
                    return (
                      <div 
                        key={s.id}
                        onClick={() => toggleStudentSelection(s.id)}
                        className={`p-3 rounded-xl text-xs flex items-center justify-between cursor-pointer transition-all ${
                          isSelected ? 'bg-sky-50 border border-sky-300 font-bold text-sky-900' : 'bg-slate-50 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <input 
                            type="checkbox" 
                            checked={isSelected} 
                            onChange={() => {}} 
                            className="rounded text-slate-900 w-4 h-4"
                          />
                          <div>
                            <span className="text-slate-900 font-semibold text-sm">{s.name}</span>
                            <span className="text-xs text-slate-400 ml-2 font-medium">CGPA {s.cgpa}</span>
                          </div>
                        </div>
                        <span className="text-xs px-2 py-0.5 rounded-md font-bold bg-white border border-slate-200 text-slate-800">
                          {s.risk.toUpperCase()} (+{s.riskPoints} pt)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100 text-xs text-slate-600 flex items-start gap-2.5">
                <Info size={16} className="text-sky-600 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Reallocating lower-risk students avoids disrupting interventions for high-risk students.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setTransferModalOpen(false)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={redistributing || selectedStudentIds.length === 0}
                  className="px-5 py-2 text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all cursor-pointer disabled:opacity-50 shadow-xs"
                >
                  {redistributing ? 'Transferring...' : `Transfer ${selectedStudentIds.length} Students`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
