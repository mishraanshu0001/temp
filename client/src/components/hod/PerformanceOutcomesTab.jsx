import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ShieldAlert, 
  X, 
  BarChart2, 
  Percent,
  GraduationCap
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine 
} from 'recharts';

export default function PerformanceOutcomesTab({ outcomesData }) {
  const { summary = {}, courseOutcomes = [] } = outcomesData || {};
  const [filter, setFilter] = useState('all');
  const [chartView, setChartView] = useState('grades'); // 'grades' | 'passRate'
  const [interventionModal, setInterventionModal] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (title, msg) => {
    setToast({ title, msg });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDeployIntervention = (course) => {
    showToast('Intervention Initiated', `Supplemental Instruction (SI) tutor scheduled for ${course.code}.`);
    setInterventionModal(null);
  };

  const filteredCourses = filter === 'all' 
    ? courseOutcomes 
    : filter === 'at-risk'
    ? courseOutcomes.filter(c => c.riskStatus === 'Critical Risk' || c.interventionNeeded)
    : courseOutcomes.filter(c => c.riskStatus.toLowerCase() === filter.toLowerCase());

  const chartData = courseOutcomes.map(c => ({
    name: c.code,
    'Grade A': c.grades?.A || 0,
    'Grade B': c.grades?.B || 0,
    'Grade C': c.grades?.C || 0,
    'Grade F (Fail)': c.grades?.F || 0,
    passRate: c.passRate,
    enrolled: c.enrolled,
    avgGPA: c.avgGPA
  }));

  // Clean Custom Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const course = courseOutcomes.find(c => c.code === label);
      return (
        <div className="bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-800 text-xs space-y-1.5 min-w-[180px]">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <span className="font-extrabold text-white">{label}</span>
            <span className="text-xs text-sky-400 font-medium">{course?.enrolled} Enrolled</span>
          </div>

          {chartView === 'grades' ? (
            <>
              {payload.map((entry, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-300">{entry.name}</span>
                  </div>
                  <span className="font-bold text-white">{entry.value}</span>
                </div>
              ))}
              {course && (
                <div className="pt-2 border-t border-slate-800 flex justify-between text-xs text-slate-400">
                  <span>Pass Rate</span>
                  <span className="font-bold text-sky-400">{course.passRate}%</span>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Pass Rate:</span>
                <span className="font-bold text-sky-400">{payload[0]?.value}%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Average GPA:</span>
                <span className="font-semibold text-slate-200">{course?.avgGPA}</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-3 animate-in slide-in-from-bottom-5 text-sm font-semibold">
          <CheckCircle2 className="text-emerald-400" size={18} />
          <div>
            <p className="font-bold">{toast.title}</p>
            <p className="text-xs text-slate-300 font-normal">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Header Toolbar */}
      <div className="bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <GraduationCap size={20} />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Academic Outcomes & Performance
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Student grade distributions, at-risk course detection, and Supplemental Instruction (SI) interventions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'bg-sky-50/60 text-slate-700 border border-sky-100 hover:bg-sky-50'
            }`}
          >
            All Courses ({courseOutcomes.length})
          </button>
          <button
            onClick={() => setFilter('at-risk')}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-1.5 ${
              filter === 'at-risk' ? 'bg-slate-900 text-white' : 'bg-rose-50 text-rose-800 border border-rose-200 hover:bg-rose-100'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            Interventions Needed
          </button>
        </div>
      </div>

      {/* 4 Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Dept Pass Rate</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{summary.avgPassRate || 88.4}%</span>
            <span className="text-xs text-sky-900 font-bold mt-0.5 block">Standard Goal &gt; 85%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
            <Percent size={18} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Department GPA</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{summary.avgGPA || 3.38} / 4.0</span>
            <span className="text-xs text-slate-500 font-medium mt-0.5 block">Consistent with prior term</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
            <TrendingUp size={18} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">At-Risk Courses</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">{summary.flaggedCoursesCount || 1} Course</span>
            <span className="text-xs text-rose-700 font-bold mt-0.5 block">Pass rate &lt; 75%</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 flex items-center justify-center">
            <AlertTriangle size={18} />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Active SI Interventions</span>
            <span className="text-2xl font-black text-slate-900 mt-1 block">1 Assigned</span>
            <span className="text-xs text-sky-900 font-bold mt-0.5 block">Tutoring In Progress</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
            <ShieldAlert size={18} />
          </div>
        </div>
      </div>

      {/* Grade Distribution Recharts Graph */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Course Grade Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Academic performance indicators by subject</p>
          </div>

          {/* Right Header Controls: Toggle + Inline Legend */}
          <div className="flex flex-wrap items-center gap-4">
            {/* View Mode Toggle Switch */}
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

            {/* Inline Legend Dots */}
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
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="28%" barGap={2}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: '#f1f5f9' }} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 'bold' }} />
                <YAxis domain={[0, 60]} ticks={[0, 15, 30, 45, 60]} tickLine={false} axisLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="Grade A" fill="#0f172a" radius={[3, 3, 0, 0]} maxBarSize={18} />
                <Bar dataKey="Grade B" fill="#334155" radius={[3, 3, 0, 0]} maxBarSize={18} />
                <Bar dataKey="Grade C" fill="#94a3b8" radius={[3, 3, 0, 0]} maxBarSize={18} />
                <Bar dataKey="Grade F (Fail)" fill="#f43f5e" radius={[3, 3, 0, 0]} maxBarSize={18} />
              </BarChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

      {/* Course Cards Detailed Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredCourses.map((course) => {
          const isRisk = course.riskStatus === 'Critical Risk' || course.passRate < 75;
          const totalGrades = (course.grades.A + course.grades.B + course.grades.C + course.grades.F) || 1;

          return (
            <div 
              key={course.id}
              className={`p-6 rounded-2xl bg-white border shadow-2xs transition-all ${
                isRisk ? 'border-rose-200' : 'border-sky-100 hover:border-sky-200'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded">
                      {course.code}
                    </span>
                    <span className="text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded">
                      Section {course.section}
                    </span>
                  </div>
                  <h4 className="font-extrabold text-base text-slate-900 mt-2">{course.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Instructor: <strong className="text-slate-800">{course.facultyName}</strong></p>
                </div>

                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  isRisk ? 'bg-rose-50 text-rose-800 border border-rose-200' : 'bg-sky-50 text-sky-900 border border-sky-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isRisk ? 'bg-rose-500' : 'bg-sky-600'}`} />
                  {isRisk ? 'Intervention Required' : 'On Track'}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="mt-5 grid grid-cols-4 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                  <span className="text-xs text-slate-400 uppercase font-bold block">Pass Rate</span>
                  <span className={`font-black text-sm mt-0.5 block ${isRisk ? 'text-rose-600' : 'text-slate-900'}`}>
                    {course.passRate}%
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                  <span className="text-xs text-slate-400 uppercase font-bold block">Avg GPA</span>
                  <span className="font-black text-sm text-slate-900 mt-0.5 block">{course.avgGPA}</span>
                </div>
                <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                  <span className="text-xs text-slate-400 uppercase font-bold block">Rating</span>
                  <span className="font-black text-sm text-slate-900 mt-0.5 block">{course.feedbackRating}★</span>
                </div>
                <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
                  <span className="text-xs text-slate-400 uppercase font-bold block">SLA</span>
                  <span className="font-black text-sm text-slate-900 mt-0.5 block">{course.doubtSla}%</span>
                </div>
              </div>

              {/* Grade Distribution Bar */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-3 text-xs">
                <span className="text-xs font-bold text-slate-500 shrink-0">Grades:</span>
                <div className="flex-1 h-2 rounded-full bg-sky-100/70 overflow-hidden flex">
                  <div style={{ width: `${(course.grades.A / totalGrades) * 100}%` }} className="bg-slate-900" title={`A: ${course.grades.A}`} />
                  <div style={{ width: `${(course.grades.B / totalGrades) * 100}%` }} className="bg-sky-600" title={`B: ${course.grades.B}`} />
                  <div style={{ width: `${(course.grades.C / totalGrades) * 100}%` }} className="bg-slate-400" title={`C: ${course.grades.C}`} />
                  <div style={{ width: `${(course.grades.F / totalGrades) * 100}%` }} className="bg-rose-500" title={`F: ${course.grades.F}`} />
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  A:{course.grades.A} | B:{course.grades.B} | C:{course.grades.C} | F:{course.grades.F}
                </span>
              </div>

              {/* Action Button for at risk */}
              {isRisk && (
                <div className="mt-4 pt-3 border-t border-rose-100 flex justify-end">
                  <button
                    onClick={() => setInterventionModal(course)}
                    className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <ShieldAlert size={14} />
                    Deploy SI Tutor
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Intervention Modal */}
      {interventionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <ShieldAlert className="text-slate-900" size={18} />
                <h3 className="font-extrabold text-slate-900 text-base">Academic Intervention Plan</h3>
              </div>
              <button 
                onClick={() => setInterventionModal(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-4 space-y-3.5 text-sm">
              <p className="text-slate-600 leading-relaxed">
                <strong>{interventionModal.code} - {interventionModal.title}</strong> is currently flagged with a <strong className="text-rose-600">{interventionModal.passRate}% projected pass rate</strong> and {interventionModal.grades.F} at-risk students.
              </p>

              <div className="p-4 rounded-xl bg-sky-50/60 border border-sky-100 space-y-2.5">
                <span className="font-bold text-sky-950 uppercase text-xs block">Automated Remedial Actions</span>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-sky-700" />
                    <span>Allocate Supplemental Instruction (SI) Teaching Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-sky-700" />
                    <span>Schedule mid-term diagnostic review session</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={15} className="text-sky-700" />
                    <span>Alert assigned Academic Advisors for flagged students</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInterventionModal(null)}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeployIntervention(interventionModal)}
                  className="px-5 py-2.5 text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-all cursor-pointer"
                >
                  Confirm SI Deployment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
