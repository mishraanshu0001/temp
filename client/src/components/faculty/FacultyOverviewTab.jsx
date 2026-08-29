import React from 'react';
import { 
  BookOpen, 
  Users, 
  CheckCircle2, 
  Star, 
  Clock, 
  Calendar, 
  ChevronRight, 
  AlertCircle, 
  MessageSquare,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function FacultyOverviewTab({ overviewData, setActiveTab }) {
  const { profile, kpis, todayLectures, recentDoubts, courses } = overviewData || {};

  return (
    <div className="space-y-6">
      {/* Faculty Profile Welcome Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
            {profile?.name?.split(' ').map(n => n[0]).join('') || 'PS'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {profile?.name || 'Prof. Priya Sharma'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
                Adjunct Faculty (Visiting Trainer)
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Department of Computer Science & Engineering • Industry Training & Bootcamp Track
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('attendance')}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 rounded-xl text-sm font-bold transition-all shadow-2xs cursor-pointer flex items-center gap-1.5"
          >
            <CheckCircle2 size={16} />
            <span>Mark Attendance</span>
          </button>
          <button
            onClick={() => setActiveTab('timetable')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar size={16} />
            <span>Full Schedule</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Teaching Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Courses</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <BookOpen size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.activeCourses || 3}</span>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">11 Credits</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Cloud, Dist. Systems, HPC</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Students Enrolled</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.totalStudents || 184}</span>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">3 Batches</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Sections: CSE-A, CSE-B</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg Class Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.avgAttendance || 88.5}%</span>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">Compliant</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Goal: 85% Minimum</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Feedback</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <Star size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.teachingRating || 4.85}</span>
              <span className="text-sm text-slate-400 font-medium">/ 5.0</span>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md ml-auto">Top 5%</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Semester Appraisal</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Today's Lectures & Recent Doubt Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Today's Lectures Schedule (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base md:text-lg flex items-center gap-2">
                <Clock size={18} className="text-slate-800" />
                Today's Teaching Schedule
              </h3>
              <p className="text-sm text-slate-500 mt-0.5">Lectures, lab sessions & student interactions for today</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              {(todayLectures || []).length} Sessions
            </span>
          </div>

          <div className="space-y-3">
            {(todayLectures || []).map((lec) => (
              <div 
                key={lec.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-50 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
                      {lec.courseCode}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900">{lec.courseTitle}</h4>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{lec.topic}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 pt-1">
                    <span className="font-bold text-slate-800">⏰ {lec.time}</span>
                    <span>•</span>
                    <span>📍 {lec.room}</span>
                    <span>•</span>
                    <span>👥 {lec.batch} ({lec.enrolledCount} Students)</span>
                  </div>
                </div>

                <button
                  onClick={() => setActiveTab('attendance')}
                  className="shrink-0 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-900 hover:text-white border border-slate-300 text-slate-900 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  Mark Class →
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Doubt Inquiries (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg flex items-center gap-2">
                  <MessageSquare size={18} className="text-slate-800" />
                  Student Doubt Inquiries
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">Unresolved student conceptual queries</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                {(recentDoubts || []).length} Pending
              </span>
            </div>

            <div className="mt-3 space-y-3">
              {(recentDoubts || []).map((msg) => (
                <div key={msg.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-slate-900 text-white font-bold text-[10px] flex items-center justify-center">
                        {msg.avatar}
                      </div>
                      <span className="font-bold text-xs text-slate-900">{msg.studentName}</span>
                    </div>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-200 text-slate-800">
                      {msg.course}
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 font-medium line-clamp-2">
                    "{msg.content}"
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                    <span>{msg.timestamp}</span>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-slate-900 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <span>Resolve</span>
                      <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('messages')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-sm font-bold transition-all text-center block cursor-pointer"
            >
              Open Full Doubts Desk →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
