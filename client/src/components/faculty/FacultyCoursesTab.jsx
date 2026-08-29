import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Calendar, 
  FileText, 
  CheckCircle2, 
  Plus, 
  Clock,
  ArrowUpRight
} from 'lucide-react';

export default function FacultyCoursesTab({ courses = [] }) {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <BookOpen size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Assigned Teaching Courses & Modules
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Manage weekly syllabus progress, uploaded lecture slides & assignment release schedules
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => alert('Course Syllabus & Slide Upload Modal will open.')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer self-start md:self-auto"
        >
          <Plus size={15} />
          <span>Upload Lecture Material</span>
        </button>
      </div>

      {/* Courses Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div 
            key={c.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded">
                  {c.code}
                </span>
                <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded">
                  {c.credits} Credits • {c.enrolledCount} Students
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mt-3">{c.title}</h3>
              <p className="text-xs text-slate-500 font-medium mt-1">📍 {c.room} • ⏰ {c.schedule}</p>

              {/* Syllabus Progress Meter */}
              <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="text-slate-500 font-medium">Syllabus Covered:</span>
                  <span>Week {c.completedWeeks} / {c.syllabusWeeks} ({c.syllabusPercent}%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 rounded-full transition-all duration-300"
                    style={{ width: `${c.syllabusPercent}%` }}
                  />
                </div>
              </div>

              {/* Assignment Notice Box */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Next Assignment & Deadline
                </span>
                <p className="font-extrabold text-slate-900 truncate">{c.nextAssignment}</p>
                <p className="text-slate-500 font-medium text-[11px]">Due: {c.assignmentDueDate}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-slate-500">
                <FileText size={13} className="text-slate-800" />
                {c.materialsCount} Lecture Slides
              </span>
              <button
                onClick={() => alert(`Opening ${c.code} Catalog & Materials Manager.`)}
                className="text-slate-900 hover:underline flex items-center gap-0.5 cursor-pointer"
              >
                <span>Manage Course</span>
                <ArrowUpRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
