import React, { useState } from 'react';
import { 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Info, 
  ShieldAlert, 
  X,
  BarChart2,
  Percent
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
        <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl border border-slate-800 text-xs space-y-1.5 min-w-[170px]">
          <div className="flex justify-between items-center pb-1.5 border-b border-slate-800">
            <span className="font-bold text-white">{label}</span>
            <span className="text-[10px] text-slate-400">{course?.enrolled} Enrolled</span>
          </div>

          {chartView === 'grades' ? (
            <>
              {payload.map((entry, index) => (
                <div key={index} className="flex justify-between items-center text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-slate-300">{entry.name}</span>
                  </div>
                  <span className="font-semibold text-white">{entry.value}</span>
                </div>
              ))}
              {course && (
                <div className="pt-1.5 border-t border-slate-800 flex justify-between text-[10px] text-slate-400">
                  <span>Pass Rate</span>
                  <span className="font-bold text-white">{course.passRate}%</span>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-slate-400">Pass Rate:</span>
                <span className="font-bold text-emerald-400">{payload[0]?.value}%</span>
              </div>
              <div className="flex justify-between text-[11px]">
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
    <div className="space-y-5">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-lg shadow-md bg-slate-900 border border-slate-700 text-white flex items-center gap-3 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="text-emerald-400" size={16} />
          <div>
            <p className="font-semibold text-xs">{toast.title}</p>
            <p className="text-[11px] text-slate-300">{toast.msg}</p>
          </div>
        </div>
      )}

      {/* Header Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-900">Performance & Student Academic Outcomes</h2>
          <p className="text-xs text-slate-500">
            Course retention analytics, grade distributions, and student intervention monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
              filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Courses ({courseOutcomes.length})
          </button>
          <button
            onClick={() => setFilter('at-risk')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
              filter === 'at-risk' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            At-Risk ({courseOutcomes.filter(c => c.riskStatus === 'Critical Risk').length})
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Avg Department GPA</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{summary.avgDepartmentGPA || 3.38}</span>
            <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">Baseline &gt; 3.0</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Overall Pass Rate</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{summary.overallPassRate || 88.6}%</span>
            <span className="text-[11px] text-slate-400">24 Sections</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Faculty Rating Avg</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{summary.studentSatisfaction || 94.2}%</span>
            <span className="text-[11px] text-slate-400">4.72★</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Doubt SLA Compliance</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{summary.doubtSlaCompliance || 94.8}%</span>
            <span className="text-[11px] text-slate-400">&lt; 24h</span>
          </div>
        </div>
      </div>

      {/* Clean Modern Chart Section */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">
              {chartView === 'grades' ? 'Course Grade Breakdown' : 'Course Pass Rates (%)'}
            </h3>
            <p className="text-xs text-slate-400">Academic performance indicators by subject</p>
          </div>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="bg-slate-100 p-0.5 rounded-lg flex gap-0.5 border border-slate-200">
              <button
                onClick={() => setChartView('grades')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  chartView === 'grades' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Grade Counts
              </button>
              <button
                onClick={() => setChartView('passRate')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  chartView === 'passRate' ? 'bg-white text-slate-900 shadow-2xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Pass Rate (%)
              </button>
            </div>

            {/* Minimalist Legend */}
            {chartView === 'grades' && (
              <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-900" /> A</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-600" /> B</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-400" /> C</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /> F</span>
              </div>
            )}
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartView === 'grades' ? (
              <BarChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="Grade A" fill="#0f172a" radius={[2, 2, 0, 0]} maxBarSize={14} />
                <Bar dataKey="Grade B" fill="#475569" radius={[2, 2, 0, 0]} maxBarSize={14} />
                <Bar dataKey="Grade C" fill="#94a3b8" radius={[2, 2, 0, 0]} maxBarSize={14} />
                <Bar dataKey="Grade F (Fail)" fill="#f43f5e" radius={[2, 2, 0, 0]} maxBarSize={14} />
              </BarChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 15, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={{ stroke: '#e2e8f0' }} />
                <YAxis domain={[0, 100]} stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <ReferenceLine y={85} stroke="#94a3b8" strokeDasharray="3 3" label={{ value: 'Target 85%', position: 'top', fill: '#94a3b8', fontSize: 10 }} />
                <Bar dataKey="passRate" fill="#0f172a" radius={[4, 4, 0, 0]} maxBarSize={28} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Course Outcomes List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-sm">Course Outcome Dossiers</h3>
            <p className="text-xs text-slate-400">Instructor evaluation score vs student completion rates</p>
          </div>
          <span className="text-xs text-slate-500">Showing {filteredCourses.length} courses</span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredCourses.map((course) => {
            const isRisk = course.riskStatus === 'Critical Risk';
            const totalGrades = (course.grades?.A || 0) + (course.grades?.B || 0) + (course.grades?.C || 0) + (course.grades?.F || 0);

            return (
              <div 
                key={course.id} 
                className="p-4 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
                  {/* Course & Faculty Info */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-900">{course.code}</span>
                      <h4 className="font-semibold text-slate-800 text-xs">{course.title}</h4>
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.2 rounded text-[10px] font-medium bg-slate-50 text-slate-700 border border-slate-200">
                        <span className={`w-1.5 h-1.5 rounded-full ${isRisk ? 'bg-rose-500' : 'bg-emerald-500'}`} />
                        {course.riskStatus}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Instructor: <strong className="text-slate-700">{course.instructor}</strong> • {course.enrolled} Enrolled
                    </p>
                  </div>

                  {/* Metrics Badges */}
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center min-w-[70px]">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold block">Pass Rate</span>
                      <span className={`font-semibold text-xs ${isRisk ? 'text-rose-600' : 'text-slate-900'}`}>
                        {course.passRate}%
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center min-w-[70px]">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold block">Avg GPA</span>
                      <span className="font-semibold text-xs text-slate-900">{course.avgGPA}</span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center min-w-[70px]">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold block">Rating</span>
                      <span className="font-semibold text-xs text-slate-900">
                        {course.feedbackRating}★
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-center min-w-[70px]">
                      <span className="text-[9px] text-slate-400 uppercase font-semibold block">SLA</span>
                      <span className="font-semibold text-xs text-slate-900">{course.doubtSla}%</span>
                    </div>

                    {/* Action Button */}
                    {isRisk && (
                      <button
                        onClick={() => setInterventionModal(course)}
                        className="px-3 py-1.5 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <ShieldAlert size={13} />
                        Deploy SI Tutor
                      </button>
                    )}
                  </div>
                </div>

                {/* Grade Mini-Bar - Refined Sleek Palette */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-3 text-xs">
                  <span className="text-[10px] font-medium text-slate-500 shrink-0">Grade Distribution:</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden flex">
                    <div style={{ width: `${(course.grades.A / totalGrades) * 100}%` }} className="bg-slate-900" title={`A: ${course.grades.A}`} />
                    <div style={{ width: `${(course.grades.B / totalGrades) * 100}%` }} className="bg-slate-600" title={`B: ${course.grades.B}`} />
                    <div style={{ width: `${(course.grades.C / totalGrades) * 100}%` }} className="bg-slate-400" title={`C: ${course.grades.C}`} />
                    <div style={{ width: `${(course.grades.F / totalGrades) * 100}%` }} className="bg-rose-500" title={`F: ${course.grades.F}`} />
                  </div>
                  <span className="text-[10px] text-slate-400">
                    A: {course.grades.A} | B: {course.grades.B} | C: {course.grades.C} | F: {course.grades.F}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Intervention Modal */}
      {interventionModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-5 shadow-lg border border-slate-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert className="text-slate-800" size={16} />
                <h3 className="font-bold text-slate-900 text-xs">Academic Intervention Plan</h3>
              </div>
              <button 
                onClick={() => setInterventionModal(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X size={15} />
              </button>
            </div>

            <div className="mt-3 space-y-3 text-xs">
              <p className="text-slate-600">
                <strong>{interventionModal.code} - {interventionModal.title}</strong> is currently flagged with a <strong>{interventionModal.passRate}% projected pass rate</strong> and {interventionModal.grades.F} at-risk students.
              </p>

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-semibold text-slate-700 uppercase text-[10px] block">Automated Remedial Actions</span>
                <div className="space-y-1 text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-slate-800" />
                    <span>Allocate Supplemental Instruction (SI) Teaching Assistant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-slate-800" />
                    <span>Schedule mid-term diagnostic review session</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={13} className="text-slate-800" />
                    <span>Alert assigned Academic Advisors for flagged students</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInterventionModal(null)}
                  className="px-3 py-1.5 font-medium text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeployIntervention(interventionModal)}
                  className="px-4 py-1.5 font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-all cursor-pointer"
                >
                  Confirm & Deploy SI Tutor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
