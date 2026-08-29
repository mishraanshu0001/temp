import React, { useState } from 'react';
import { 
  UserPlus, 
  Briefcase, 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  Clock, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  X, 
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Building,
  GraduationCap,
  Users,
  Calendar,
  FileSpreadsheet,
  Download
} from 'lucide-react';
import { updateApplicantStatus, createJobRequisition } from '../../services/api';

const STAGES = ['Applied', 'Screening', 'Interview', 'Selected', 'Onboarding'];

export default function RecruitmentPipelineTab({ recruitmentData, onRefresh }) {
  const { requisitions = [], applicants = [] } = recruitmentData || {};
  const [search, setSearch] = useState('');
  const [selectedReq, setSelectedReq] = useState('all');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');
  const [candidateModal, setCandidateModal] = useState(null);
  const [newReqModalOpen, setNewReqModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [updating, setUpdating] = useState(false);

  // New Requisition Form State
  const [reqForm, setReqForm] = useState({
    title: '',
    department: 'Computer Science',
    positions: 1,
    hourlyRate: '$75 - $95 / hr',
    urgency: 'High'
  });

  const showToast = (title, msg) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleStageChange = async (applicant, newStage) => {
    if (applicant.status === newStage) return;
    setUpdating(true);
    try {
      await updateApplicantStatus({
        applicantId: applicant.id,
        newStatus: newStage
      });
      showToast('Candidate Stage Updated', `Moved ${applicant.name} to: ${newStage}`);
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', 'Failed to update candidate stage');
    } finally {
      setUpdating(false);
    }
  };

  const handleCreateReqSubmit = async (e) => {
    e.preventDefault();
    if (!reqForm.title) return;
    try {
      await createJobRequisition(reqForm);
      showToast('Requisition Published', `Opened requisition for "${reqForm.title}".`);
      setNewReqModalOpen(false);
      setReqForm({
        title: '',
        department: 'Computer Science',
        positions: 1,
        hourlyRate: '$75 - $95 / hr',
        urgency: 'High'
      });
      if (onRefresh) onRefresh();
    } catch (err) {
      showToast('Error', 'Failed to create job requisition');
    }
  };

  const filteredApplicants = applicants.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(search.toLowerCase()) || 
                          app.email.toLowerCase().includes(search.toLowerCase()) ||
                          app.degree?.toLowerCase().includes(search.toLowerCase());
    const matchesReq = selectedReq === 'all' || app.jobId === selectedReq;
    const matchesStage = selectedStageFilter === 'all' || app.status === selectedStageFilter;
    return matchesSearch && matchesReq && matchesStage;
  });

  // Export to Excel / CSV Utility
  const handleExportExcel = () => {
    if (filteredApplicants.length === 0) {
      showToast('Export Notice', 'No candidate records to export with current filters.');
      return;
    }

    const headers = [
      'Candidate ID',
      'Candidate Name',
      'Email Address',
      'Phone Number',
      'Job Requisition',
      'Academic Degree & Institution',
      'Experience (Years)',
      'Expected Hourly Rate',
      'Match Score (%)',
      'Current Pipeline Stage',
      'Search Committee Evaluation'
    ];

    const rows = filteredApplicants.map(a => [
      `"${a.id || ''}"`,
      `"${a.name || ''}"`,
      `"${a.email || ''}"`,
      `"${a.phone || 'N/A'}"`,
      `"${a.jobId || ''}"`,
      `"${(a.degree || '').replace(/"/g, '""')}"`,
      `"${a.experienceYears || 0}"`,
      `"${a.expectedHourlyRate || ''}"`,
      `"${a.matchScore || 0}%"`,
      `"${a.status || ''}"`,
      `"${(a.notes || 'Vetted by Search Committee').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Faculty_Recruitment_ATS_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Excel Sheet Exported', `Downloaded ${filteredApplicants.length} candidate records as spreadsheet.`);
  };

  const inInterviewCount = applicants.filter(a => a.status === 'Interview').length;
  const selectedCount = applicants.filter(a => a.status === 'Selected').length;
  const totalOpenings = requisitions.reduce((sum, r) => sum + (r.positions || 1), 0);

  return (
    <div className="space-y-6 w-full max-w-full">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-3 animate-in slide-in-from-bottom-5 text-sm font-semibold">
          <CheckCircle2 className="text-emerald-400" size={18} />
          <div>
            <p className="font-bold">{toast.title}</p>
            <p className="text-xs text-slate-300 font-normal">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
              <UserPlus size={20} />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Faculty Recruitment & ATS
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Department hiring pipeline, candidate qualification dossiers, and search committee milestones.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
          {/* Export Excel Button */}
          <button
            onClick={handleExportExcel}
            className="px-4 py-2.5 text-sm font-bold bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 rounded-xl shadow-2xs flex items-center gap-2 transition-all cursor-pointer"
            title="Download Candidate Records as Excel CSV"
          >
            <FileSpreadsheet size={16} className="text-emerald-600" />
            <span>Export Excel Sheet</span>
          </button>

          <button
            onClick={() => setNewReqModalOpen(true)}
            className="px-5 py-2.5 text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Plus size={16} />
            Create Job Requisition
          </button>
        </div>
      </div>

      {/* 4-Metric Executive Overview Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active Openings</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{totalOpenings} Positions</span>
            <span className="text-xs text-slate-500 mt-0.5 block">{requisitions.length} Requisitions</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
            <Briefcase size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Candidates</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{applicants.length} Applicants</span>
            <span className="text-xs text-slate-500 mt-0.5 block">Vetted by Committee</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
            <Users size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">In Interview / Final</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{inInterviewCount + selectedCount} Faculty</span>
            <span className="text-xs text-slate-500 mt-0.5 block">{inInterviewCount} Interview • {selectedCount} Selected</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
            <GraduationCap size={18} />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg Time to Hire</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">14 Days</span>
            <span className="text-xs text-emerald-700 font-semibold mt-0.5 block">On Target (Term Fall 2026)</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 flex items-center justify-center">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Active Requisitions Grid */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-slate-900">Active Job Requisitions</h3>
          <span className="text-xs font-semibold text-slate-500">{requisitions.length} Open Positions</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {requisitions.map((req) => (
            <div
              key={req.id}
              onClick={() => setSelectedReq(selectedReq === req.id ? 'all' : req.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                selectedReq === req.id 
                  ? 'bg-slate-50 border-slate-900 ring-1 ring-slate-900' 
                  : 'bg-white hover:bg-slate-50/70 border-slate-200'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                    {req.id}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                    req.urgency === 'High' ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-amber-50 text-amber-700 border border-amber-200'
                  }`}>
                    {req.urgency} Urgency
                  </span>
                </div>
                <h4 className="font-bold text-sm text-slate-900 mt-1 leading-snug">{req.title}</h4>
                <p className="text-xs text-slate-500 mt-0.5">{req.department}</p>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-600 font-medium mt-4 pt-3 border-t border-slate-100">
                <span className="font-bold text-slate-900">{req.hourlyRate}</span>
                <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-800 font-semibold">{req.positions} Position</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search candidates, credentials, skills..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 focus:bg-white transition-all"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          {/* Requisition Filter */}
          <select
            value={selectedReq}
            onChange={(e) => setSelectedReq(e.target.value)}
            className="bg-slate-50 text-slate-900 text-sm font-semibold border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:border-slate-900"
          >
            <option value="all">All Requisitions</option>
            {requisitions.map(r => (
              <option key={r.id} value={r.id}>{r.id} - {r.title}</option>
            ))}
          </select>

          {/* Stage Filter */}
          <select
            value={selectedStageFilter}
            onChange={(e) => setSelectedStageFilter(e.target.value)}
            className="bg-slate-50 text-slate-900 text-sm font-semibold border border-slate-200 rounded-xl px-3.5 py-2 outline-none focus:border-slate-900"
          >
            <option value="all">All Pipeline Stages</option>
            {STAGES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <button
            onClick={handleExportExcel}
            className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl border border-slate-200 flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer"
            title="Export Excel Sheet"
          >
            <Download size={14} />
            CSV/Excel
          </button>

          <span className="font-bold text-slate-900 bg-slate-100 px-3 py-2 rounded-xl border border-slate-200 text-xs">
            {filteredApplicants.length} Candidates
          </span>
        </div>
      </div>

      {/* Candidate Pipeline Table (Full Width & No Screen Overflow) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-4 px-5">Candidate Name</th>
                <th className="py-4 px-5">Academic Credentials</th>
                <th className="py-4 px-5">Requisition & Rate</th>
                <th className="py-4 px-5">Match Score</th>
                <th className="py-4 px-5">Pipeline Stage</th>
                <th className="py-4 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredApplicants.map((cand) => (
                <tr 
                  key={cand.id}
                  className="hover:bg-slate-50/60 transition-colors"
                >
                  {/* Candidate Profile */}
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold text-sm flex items-center justify-center shadow-xs shrink-0">
                        {cand.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h4 
                          onClick={() => setCandidateModal(cand)}
                          className="font-extrabold text-slate-900 hover:underline cursor-pointer text-sm"
                        >
                          {cand.name}
                        </h4>
                        <span className="text-xs text-slate-400 font-medium block">{cand.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* Degree & Experience */}
                  <td className="py-4 px-5 font-medium text-slate-700">
                    <p className="font-semibold text-slate-800 text-xs line-clamp-1">{cand.degree}</p>
                    <span className="text-xs text-slate-400 font-normal">{cand.experienceYears} Years Academic Exp</span>
                  </td>

                  {/* Requisition ID & Rate */}
                  <td className="py-4 px-5">
                    <span className="font-mono text-xs font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {cand.jobId}
                    </span>
                    <p className="text-xs text-slate-900 font-extrabold mt-1">{cand.expectedHourlyRate}/hr</p>
                  </td>

                  {/* Match Score */}
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {cand.matchScore}% Match
                    </span>
                  </td>

                  {/* Stage Transition Dropdown */}
                  <td className="py-4 px-5">
                    <select
                      value={cand.status}
                      onChange={(e) => handleStageChange(cand, e.target.value)}
                      className="bg-slate-50 text-slate-900 text-xs font-bold border border-slate-200 rounded-xl px-3 py-1.5 outline-none focus:border-slate-900 cursor-pointer shadow-2xs"
                    >
                      {STAGES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-5 text-right">
                    <button
                      onClick={() => setCandidateModal(cand)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Dossier</span>
                      <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApplicants.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">
                    No candidates match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Details Dossier Modal */}
      {candidateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold text-base flex items-center justify-center shadow-xs">
                  {candidateModal.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">{candidateModal.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">{candidateModal.degree}</p>
                </div>
              </div>
              <button 
                onClick={() => setCandidateModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Requisition</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{candidateModal.jobId}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Match Score</span>
                  <span className="font-bold text-emerald-700 mt-0.5 block">{candidateModal.matchScore}% Match</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Experience</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{candidateModal.experienceYears} Years</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-400 block text-xs font-semibold uppercase">Expected Rate</span>
                  <span className="font-bold text-slate-900 mt-0.5 block">{candidateModal.expectedHourlyRate} / hr</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase text-xs block mb-1.5">Contact Information</span>
                <div className="flex items-center gap-4 text-slate-800 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs font-medium">
                  <span className="flex items-center gap-1.5"><Mail size={14} className="text-slate-500" /> {candidateModal.email}</span>
                  <span className="flex items-center gap-1.5"><Phone size={14} className="text-slate-500" /> {candidateModal.phone}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase text-xs block mb-1.5">Search Committee Evaluation</span>
                <p className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs leading-relaxed">
                  {candidateModal.notes || 'Candidate profile vetted by department search committee. Recommended for immediate secondary interview round.'}
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-700 uppercase text-xs block mb-1.5">Direct Stage Transition</span>
                <div className="flex flex-wrap gap-2">
                  {STAGES.map((s) => (
                    <button
                      key={s}
                      onClick={() => {
                        handleStageChange(candidateModal, s);
                        setCandidateModal({ ...candidateModal, status: s });
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        candidateModal.status === s 
                          ? 'bg-slate-900 text-white shadow-2xs' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 mt-5 border-t border-slate-100">
              <button
                onClick={() => setCandidateModal(null)}
                className="px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Requisition Modal */}
      {newReqModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <Briefcase className="text-slate-900" size={20} />
                <h3 className="font-extrabold text-slate-900 text-base">Create Job Requisition</h3>
              </div>
              <button 
                onClick={() => setNewReqModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateReqSubmit} className="mt-4 space-y-4 text-sm">
              <div>
                <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Position Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adjunct Professor - Distributed Systems"
                  value={reqForm.title}
                  onChange={(e) => setReqForm({ ...reqForm, title: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Department</label>
                <select
                  value={reqForm.department}
                  onChange={(e) => setReqForm({ ...reqForm, department: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                >
                  <option value="Computer Science">Computer Science</option>
                  <option value="AI & Data Science">AI & Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Open Positions</label>
                  <input
                    type="number"
                    min="1"
                    value={reqForm.positions}
                    onChange={(e) => setReqForm({ ...reqForm, positions: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Urgency</label>
                  <select
                    value={reqForm.urgency}
                    onChange={(e) => setReqForm({ ...reqForm, urgency: e.target.value })}
                    className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase text-xs mb-1.5">Hourly Compensation Range</label>
                <input
                  type="text"
                  value={reqForm.hourlyRate}
                  onChange={(e) => setReqForm({ ...reqForm, hourlyRate: e.target.value })}
                  className="w-full p-3 bg-white border border-slate-300 rounded-xl text-sm outline-none focus:border-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setNewReqModalOpen(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-100 rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-all cursor-pointer text-sm"
                >
                  Publish Requisition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
