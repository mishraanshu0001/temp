import React, { useState } from 'react';
import { 
  TrendingUp, 
  Download, 
  Save, 
  CheckCircle2, 
  BarChart2, 
  Award, 
  AlertCircle,
  Check 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';

export default function FacultyResultsTab({ resultsData, onUpdateMarks }) {
  const { students = [], gradeDistribution = [] } = resultsData || {};

  const [chartView, setChartView] = useState('grades');
  const [localStudents, setLocalStudents] = useState(students);
  const [saving, setSaving] = useState(false);
  const [toastMsg, setToastMsg] = useState(null);

  // Strict Validation Constraints: Max 30M each, no negative values, Total max 60M
  const handleScoreChange = (id, field, rawValue) => {
    if (rawValue === '') {
      setLocalStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: '' } : s));
      return;
    }

    let num = Number(rawValue);
    if (isNaN(num)) return;

    // Constraint 1: Negative marks not allowed
    if (num < 0) {
      num = 0;
      setToastMsg('⚠️ Negative marks are not allowed. Clamped to 0.');
      setTimeout(() => setToastMsg(null), 3000);
    }

    // Constraint 2: Max 30 Marks per assessment component
    if (num > 30) {
      num = 30;
      setToastMsg(`⚠️ Maximum marks allowed for ${field === 'internalMarks' ? 'Internal' : 'Midterm'} is 30M (Total max 60M).`);
      setTimeout(() => setToastMsg(null), 3500);
    }

    setLocalStudents(prev => prev.map(s => s.id === id ? { ...s, [field]: num } : s));
  };

  const handleSaveMarks = async () => {
    if (!onUpdateMarks) return;
    setSaving(true);
    for (const s of localStudents) {
      const validInternal = Math.max(0, Math.min(30, Number(s.internalMarks || 0)));
      const validMidterm = Math.max(0, Math.min(30, Number(s.midtermMarks || 0)));
      await onUpdateMarks({
        studentId: s.id,
        internalMarks: validInternal,
        midtermMarks: validMidterm
      });
    }
    setSaving(false);
    setToastMsg('All student marks verified [0-30M each] and saved to gradebook.');
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleExportCSV = () => {
    const headers = ["Roll No", "Student Name", "Course", "Internal (30M)", "Midterm (30M)", "Total (60M)", "Grade Estimate"];
    const rows = localStudents.map(s => {
      const internal = Math.max(0, Math.min(30, Number(s.internalMarks || 0)));
      const midterm = Math.max(0, Math.min(30, Number(s.midtermMarks || 0)));
      const total = internal + midterm;
      const grade = total >= 50 ? 'A' : total >= 40 ? 'B' : total >= 30 ? 'C' : 'F';
      return [
        s.rollNo,
        `"${s.name}"`,
        s.courseCode,
        internal,
        midterm,
        total,
        grade
      ];
    });

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Course_Gradebook_Evaluation_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900 border border-slate-700 p-3 rounded-xl shadow-xl text-white text-xs space-y-1.5 min-w-[140px]">
          <p className="font-black text-sky-300">{label}</p>
          {chartView === 'grades' ? (
            payload.map((entry, index) => (
              <div key={index} className="flex justify-between items-center text-[11px]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                  <span className="text-slate-300">{entry.name}</span>
                </div>
                <span className="font-bold text-white">{entry.value}</span>
              </div>
            ))
          ) : (
            <div className="flex justify-between text-[11px]">
              <span className="text-slate-400">Pass Rate:</span>
              <span className="font-bold text-sky-400">{payload[0]?.value}%</span>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-xl bg-slate-900 border border-slate-700 text-white flex items-center gap-3 text-sm font-semibold animate-fade-in">
          <AlertCircle className="text-amber-400" size={18} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <TrendingUp size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Exam Evaluation & Gradebook Entry
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Input scores with strict bounds [Internal: 0-30M • Midterm: 0-30M • Total: 0-60M]
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download size={14} className="text-slate-700" />
            <span>Export Gradebook</span>
          </button>
          <button
            onClick={handleSaveMarks}
            disabled={saving}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
          >
            <Save size={14} />
            <span>{saving ? 'Saving Marks...' : 'Save All Marks'}</span>
          </button>
        </div>
      </div>

      {/* Recharts Course Grade Breakdown Graph (Design Match) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Course Grade Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Academic performance indicators by subject</p>
          </div>

          {/* Right Header Controls: Toggle + Inline Legend */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center p-1 rounded-xl bg-slate-100/80 border border-slate-200 text-xs">
              <button
                onClick={() => setChartView('grades')}
                className={`px-3.5 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                  chartView === 'grades' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Grade Counts
              </button>
              <button
                onClick={() => setChartView('passRate')}
                className={`px-3.5 py-1.5 font-bold rounded-lg transition-all cursor-pointer ${
                  chartView === 'passRate' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Pass Rate (%)
              </button>
            </div>

            {chartView === 'grades' && (
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0f172a]" /> A
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#334155]" /> B
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#94a3b8]" /> C
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#f43f5e]" /> F
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Chart View */}
        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'grades' ? (
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="28%" barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#f1f5f9' }} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <YAxis domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Grade A" fill="#0f172a" radius={[3, 3, 0, 0]} maxBarSize={18} />
                <Bar dataKey="Grade B" fill="#334155" radius={[3, 3, 0, 0]} maxBarSize={18} />
                <Bar dataKey="Grade C" fill="#94a3b8" radius={[3, 3, 0, 0]} maxBarSize={18} />
                <Bar dataKey="Grade F" fill="#f43f5e" radius={[3, 3, 0, 0]} maxBarSize={18} />
              </BarChart>
            ) : (
              <BarChart data={gradeDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#f1f5f9' }} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <YAxis domain={[0, 100]} ticks={[0, 25, 50, 75, 100]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <ReferenceLine y={75} stroke="#f43f5e" strokeDasharray="3 3" label={{ value: 'Target 75%', fill: '#f43f5e', fontSize: 10 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="passRate" fill="#0f172a" radius={[4, 4, 0, 0]} maxBarSize={32} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Marks Entry Spreadsheet */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3.5 px-4">Student & Roll No</th>
                <th className="py-3.5 px-4">Course</th>
                <th className="py-3.5 px-4">Internal Marks (Max 30M)</th>
                <th className="py-3.5 px-4">Midterm Exam (Max 30M)</th>
                <th className="py-3.5 px-4">Total (Max 60M)</th>
                <th className="py-3.5 px-4">Projected Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {localStudents.map((s) => {
                const internal = Math.max(0, Math.min(30, Number(s.internalMarks || 0)));
                const midterm = Math.max(0, Math.min(30, Number(s.midtermMarks || 0)));
                const total = internal + midterm;
                const grade = total >= 50 ? 'A' : total >= 40 ? 'B' : total >= 30 ? 'C' : 'F';
                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-extrabold text-slate-900 text-xs block">{s.name}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{s.rollNo}</span>
                    </td>

                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {s.courseCode}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={s.internalMarks}
                          onKeyDown={(e) => { if (e.key === '-' || e.key === '+' || e.key === 'e') e.preventDefault(); }}
                          onChange={(e) => handleScoreChange(s.id, 'internalMarks', e.target.value)}
                          className="w-16 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                        />
                        <span className="text-[11px] text-slate-400 font-medium">/ 30</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <input
                          type="number"
                          min="0"
                          max="30"
                          value={s.midtermMarks}
                          onKeyDown={(e) => { if (e.key === '-' || e.key === '+' || e.key === 'e') e.preventDefault(); }}
                          onChange={(e) => handleScoreChange(s.id, 'midtermMarks', e.target.value)}
                          className="w-16 p-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-black text-slate-900 outline-none focus:border-slate-900 focus:bg-white"
                        />
                        <span className="text-[11px] text-slate-400 font-medium">/ 30</span>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-black text-sm text-slate-900">
                      {total} <span className="text-[11px] text-slate-400 font-medium">/ 60</span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-black border ${
                        grade === 'A' 
                          ? 'bg-slate-900 text-white' 
                          : grade === 'B'
                          ? 'bg-slate-100 text-slate-900 border-slate-300'
                          : grade === 'C'
                          ? 'bg-white text-slate-600 border-slate-200'
                          : 'bg-rose-50 text-rose-900 border-rose-200'
                      }`}>
                        Grade {grade}
                      </span>
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
