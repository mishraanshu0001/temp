import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Plus, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Video, 
  Building2, 
  X, 
  Filter,
  Check,
  ChevronRight
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function AdvisorMeetingsTab({ meetings = [], students = [], onScheduleMeeting, onUpdateMeetingStatus }) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    studentId: students[0]?.id || 's1',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    durationMinutes: 30,
    type: 'Academic Advisory Consultation',
    mode: 'In-Person (Room 304)',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const filteredMeetings = meetings.filter(m => {
    if (filterStatus === 'all') return true;
    return m.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!onScheduleMeeting) return;
    setSubmitting(true);
    await onScheduleMeeting(formData);
    setSubmitting(false);
    setShowModal(false);
    setFormData({
      studentId: students[0]?.id || 's1',
      date: new Date().toISOString().split('T')[0],
      time: '14:00',
      durationMinutes: 30,
      type: 'Academic Advisory Consultation',
      mode: 'In-Person (Room 304)',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Schedule Button */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <Calendar size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Advisory Calendar & Counseling Sessions
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Book 1-on-1 consultations, track intervention logs & verify student check-ins
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterStatus === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              All ({meetings.length})
            </button>
            <button
              onClick={() => setFilterStatus('upcoming')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterStatus === 'upcoming' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              Upcoming ({meetings.filter(m => m.status === 'Upcoming').length})
            </button>
            <button
              onClick={() => setFilterStatus('completed')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterStatus === 'completed' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              Completed ({meetings.filter(m => m.status === 'Completed').length})
            </button>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={15} />
            <span>Schedule Session</span>
          </button>
        </div>
      </div>

      {/* Meetings List Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMeetings.map((m) => (
          <div 
            key={m.id}
            className="bg-white rounded-2xl p-5 border border-sky-100 shadow-2xs hover:border-sky-200 transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-black flex items-center justify-center text-xs shrink-0 shadow-2xs">
                    <User size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">{m.studentName}</h3>
                    <p className="text-[11px] text-slate-400 font-mono">{m.studentEmail}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                  m.status === 'Upcoming' 
                    ? 'bg-sky-50 text-sky-900 border-sky-200' 
                    : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                }`}>
                  {m.status}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span className="text-slate-500 font-medium">Session Type:</span>
                  <span>{m.type}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span className="text-slate-500 font-medium">Date & Time:</span>
                  <span className="font-bold text-slate-900 flex items-center gap-1">
                    <Clock size={12} className="text-sky-700" />
                    {m.date} • {m.time} ({m.durationMinutes} mins)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
                  <span className="text-slate-500 font-medium">Mode / Location:</span>
                  <span className="text-sky-900 bg-sky-50 px-2 py-0.5 rounded text-[11px] font-bold border border-sky-200">
                    {m.mode}
                  </span>
                </div>
                {m.notes && (
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 mt-2 leading-relaxed font-medium">
                    "{m.notes}"
                  </p>
                )}
              </div>
            </div>

            {m.status === 'Upcoming' && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => onUpdateMeetingStatus && onUpdateMeetingStatus(m.id, 'Completed')}
                  className="flex-1 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
                >
                  <Check size={13} />
                  <span>Mark Completed</span>
                </button>
              </div>
            )}
          </div>
        ))}

        {filteredMeetings.length === 0 && (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-sky-100 text-slate-400">
            No advisory sessions found in this view.
          </div>
        )}
      </div>

      {/* Schedule Session Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Calendar size={18} className="text-sky-700" />
                Schedule Advisory Consultation
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Select Advisee
                </label>
                <select
                  value={formData.studentId}
                  onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.rollNo} • Semester {s.semester})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Consultation Purpose
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                >
                  <option value="Academic Probation Recovery">Academic Probation Recovery</option>
                  <option value="Attendance & Medical Review">Attendance & Medical Review</option>
                  <option value="Career & Honors Roadmap">Career & Honors Roadmap</option>
                  <option value="Internship Credit Approval">Internship Credit Approval</option>
                  <option value="Course Add/Drop Consultation">Course Add/Drop Consultation</option>
                  <option value="General Academic Check-in">General Academic Check-in</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Meeting Location / Mode
                </label>
                <select
                  value={formData.mode}
                  onChange={(e) => setFormData({ ...formData, mode: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                >
                  <option value="In-Person (Room 304)">In-Person (Office Room 304)</option>
                  <option value="Google Meet">Google Meet (Online Video)</option>
                  <option value="Telephone Call">Telephone Call</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Advisor Agenda Notes
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Key topics or preparation required..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-slate-900 resize-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs"
                >
                  {submitting ? 'Booking...' : 'Confirm Session'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
