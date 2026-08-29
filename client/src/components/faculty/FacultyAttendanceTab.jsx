import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Save, 
  Check, 
  Calendar, 
  Users, 
  History,
  Download
} from 'lucide-react';

export default function FacultyAttendanceTab({ attendanceData, onMarkAttendance }) {
  const { sessions = [], activeRoster = [] } = attendanceData || {};

  const [selectedCourse, setSelectedCourse] = useState('CS301');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceState, setAttendanceState] = useState(() => {
    const initial = {};
    activeRoster.forEach(s => { initial[s.id] = 'present'; });
    return initial;
  });
  const [submitting, setSubmitting] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  const courseStudents = activeRoster.filter(s => s.courseCode === selectedCourse || selectedCourse === 'ALL');

  const handleToggle = (id, status) => {
    setAttendanceState(prev => ({ ...prev, [id]: status }));
  };

  const handleMarkAll = (status) => {
    const updated = { ...attendanceState };
    courseStudents.forEach(s => { updated[s.id] = status; });
    setAttendanceState(updated);
  };

  const handleSubmitAttendance = async () => {
    if (!onMarkAttendance) return;
    setSubmitting(true);
    const presentIds = courseStudents.filter(s => attendanceState[s.id] === 'present').map(s => s.id);
    await onMarkAttendance({
      courseCode: selectedCourse,
      date: selectedDate,
      presentStudentIds: presentIds
    });
    setSubmitting(false);
    setToastMsg(`Attendance recorded successfully for ${selectedCourse} (${presentIds.length}/${courseStudents.length} Present).`);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const presentCount = courseStudents.filter(s => (attendanceState[s.id] || 'present') === 'present').length;
  const absentCount = courseStudents.length - presentCount;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-3 text-sm font-semibold animate-fade-in">
          <CheckCircle2 className="text-emerald-400" size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <CheckCircle2 size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Daily Class Attendance Register
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Mark lecture attendance, log absent records & export daily verification sheets
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Course Selector */}
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="CS301">CS301: Cloud Computing (Sec A)</option>
            <option value="CS204">CS204: Distributed Systems (Sec B)</option>
            <option value="CS402">CS402: High Performance Computing</option>
          </select>

          {/* Date Picker */}
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 outline-none focus:border-slate-900"
          />

          <button
            onClick={() => handleMarkAll('present')}
            className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-900 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            Mark All Present
          </button>

          <button
            onClick={handleSubmitAttendance}
            disabled={submitting}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>{submitting ? 'Saving...' : 'Save Attendance'}</span>
          </button>
        </div>
      </div>

      {/* Attendance Stats Bar */}
      <div className="grid grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Enrolled Students</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{courseStudents.length}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Present Today</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{presentCount}</span>
        </div>
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs text-center">
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Absent Today</span>
          <span className="text-2xl font-black text-slate-900 mt-1 block">{absentCount}</span>
        </div>
      </div>

      {/* Roster Marking Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Student & Roll No</th>
                <th className="py-3.5 px-4">Term Cumulative Attendance</th>
                <th className="py-3.5 px-4 text-center">Status Toggle</th>
                <th className="py-3.5 px-4 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {courseStudents.map((s) => {
                const isPresent = (attendanceState[s.id] || 'present') === 'present';
                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                          {s.avatar}
                        </div>
                        <div>
                          <span className="font-extrabold text-slate-900 text-xs block">{s.name}</span>
                          <span className="text-[11px] text-slate-400 font-mono">{s.rollNo}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-black text-slate-900 text-xs">{s.attendance}%</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleToggle(s.id, 'present')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            isPresent 
                              ? 'bg-slate-900 text-white shadow-xs' 
                              : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() => handleToggle(s.id, 'absent')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            !isPresent 
                              ? 'bg-slate-900 text-white shadow-xs' 
                              : 'bg-slate-100 text-slate-500 hover:text-slate-900'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[11px] text-slate-400">Regular</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
