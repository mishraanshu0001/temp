import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Download, 
  ChevronRight, 
  X, 
  BookOpen, 
  Award, 
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

export default function FacultyStudentsTab({ students = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = courseFilter === 'all' || s.courseCode === courseFilter;
    return matchesSearch && matchesCourse;
  });

  const handleExportCSV = () => {
    const headers = ["Roll No", "Student Name", "Email", "Course Code", "Semester", "Internal Marks (30M)", "Midterm Marks (30M)", "Attendance %", "Standing"];
    const rows = filteredStudents.map(s => [
      s.rollNo,
      `"${s.name}"`,
      s.email,
      s.courseCode,
      `Semester ${s.semester}`,
      s.internalMarks,
      s.midtermMarks,
      `${s.attendance}%`,
      `"${s.standing}"`
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Faculty_Course_Roster_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Search Controls */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <Users size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                My Enrolled Students Roster
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Monitoring performance, attendance & internal assessments across active course sections
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Search Box */}
          <div className="relative min-w-[220px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search name, roll no..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 font-medium"
            />
          </div>

          {/* Course Filter Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs">
            {['all', 'CS301', 'CS204', 'CS402'].map((code) => (
              <button
                key={code}
                onClick={() => setCourseFilter(code)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                  courseFilter === code 
                    ? 'bg-slate-900 text-white shadow-xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {code === 'all' ? 'All Sections' : code}
              </button>
            ))}
          </div>

          {/* Export to Excel */}
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download size={14} className="text-slate-700" />
            <span>Export Roster</span>
          </button>
        </div>
      </div>

      {/* Students Table (Grey, Black and White) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Student & Roll No</th>
                <th className="py-3.5 px-4">Course Section</th>
                <th className="py-3.5 px-4">Internal (30M)</th>
                <th className="py-3.5 px-4">Midterm (30M)</th>
                <th className="py-3.5 px-4">Attendance</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((s) => (
                <tr 
                  key={s.id}
                  className="hover:bg-slate-50/70 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                        {s.avatar}
                      </div>
                      <div>
                        <span className="font-extrabold text-slate-900 text-xs block">{s.name}</span>
                        <span className="text-[11px] text-slate-400 font-mono">{s.rollNo} • {s.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold bg-slate-100 border border-slate-300 text-slate-900 px-2 py-0.5 rounded text-[11px]">
                      {s.courseCode} (Sem {s.semester})
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {s.internalMarks} <span className="text-[10px] text-slate-400 font-medium">/ 30</span>
                  </td>

                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {s.midtermMarks} <span className="text-[10px] text-slate-400 font-medium">/ 30</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="font-bold text-slate-900 w-9">
                        {s.attendance}%
                      </span>
                      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-slate-900 rounded-full"
                          style={{ width: `${s.attendance}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold border inline-block ${
                      s.standing === 'At Risk' 
                        ? 'bg-slate-900 text-white border-slate-900' 
                        : s.standing === "Dean's List"
                        ? 'bg-slate-100 text-slate-900 border-slate-300'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}>
                      {s.standing}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedStudent(s)}
                      className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-900 hover:text-white text-slate-900 border border-slate-300 font-bold text-xs transition-all cursor-pointer shadow-2xs"
                    >
                      View Student →
                    </button>
                  </td>
                </tr>
              ))}

              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-10 text-slate-400">
                    No students found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Student Drawer */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 overflow-y-auto space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-black flex items-center justify-center text-sm shadow-xs">
                    {selectedStudent.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900">{selectedStudent.name}</h3>
                    <p className="text-xs text-slate-500">{selectedStudent.rollNo} • {selectedStudent.email}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Internal Score</span>
                  <span className="text-xl font-black text-slate-900 mt-0.5 block">{selectedStudent.internalMarks} / 30</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="block text-[10px] font-bold text-slate-400 uppercase">Attendance</span>
                  <span className="text-xl font-black text-slate-900 mt-0.5 block">{selectedStudent.attendance}%</span>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2 text-xs">
                <span className="font-bold text-slate-900 block">Enrolled Course Details</span>
                <p className="text-slate-600 font-medium">Course Code: <strong>{selectedStudent.courseCode}</strong></p>
                <p className="text-slate-600 font-medium">Academic Semester: <strong>Semester {selectedStudent.semester}</strong></p>
                <p className="text-slate-600 font-medium">Evaluation Standing: <strong>{selectedStudent.standing}</strong></p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs text-center cursor-pointer"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
