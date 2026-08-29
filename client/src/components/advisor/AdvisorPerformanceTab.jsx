import React, { useState } from 'react';
import { 
  TrendingUp, 
  BarChart2, 
  AlertTriangle, 
  CheckCircle2, 
  Award, 
  Layers, 
  GraduationCap,
  BookOpen
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  Cell,
  ReferenceLine
} from 'recharts';

const COURSE_GRADE_DATA = [
  { name: 'CS301', 'Grade A': 42, 'Grade B': 51, 'Grade C': 21, 'Grade F': 11, passRate: 91.2 },
  { name: 'CS402', 'Grade A': 28, 'Grade B': 34, 'Grade C': 12, 'Grade F': 11, passRate: 87.0 },
  { name: 'CS101', 'Grade A': 25, 'Grade B': 45, 'Grade C': 38, 'Grade F': 30, passRate: 78.2 },
  { name: 'DS301', 'Grade A': 24, 'Grade B': 20, 'Grade C': 5, 'Grade F': 3, passRate: 94.2 },
  { name: 'SEC301', 'Grade A': 14, 'Grade B': 18, 'Grade C': 4, 'Grade F': 4, passRate: 90.0 }
];

export default function AdvisorPerformanceTab({ performanceData }) {
  const { cohortSummary, gpaDistribution, attendanceCorrelation, subjectBottlenecks } = performanceData || {};
  const [chartView, setChartView] = useState('grades');

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
      {/* Top Academic Standing Summary */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <TrendingUp size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Cohort Academic Analytics & Trends
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                GPA distributions, attendance correlation & subject bottlenecks across 65 advisees
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-sky-50 text-sky-950 border border-sky-200">
            Average CGPA: <strong className="text-slate-900">{cohortSummary?.avgCGPA || 7.42}</strong>
          </span>
          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200">
            Retention Rate: <strong className="text-slate-900">{cohortSummary?.retentionRate || 96.8}%</strong>
          </span>
        </div>
      </div>

      {/* 4 Standing Breakdown Mini Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Dean's List</span>
            <Award size={16} className="text-sky-700" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{cohortSummary?.deansListCount || 18}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA 8.5+ with no backlogs</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Good Standing</span>
            <CheckCircle2 size={16} className="text-emerald-700" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{cohortSummary?.goodStandingCount || 35}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA 6.5 - 8.4 Normal Track</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Academic Warning</span>
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <span className="text-2xl font-black text-slate-900 mt-2 block">{cohortSummary?.academicWarningCount || 8}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA 6.0 - 6.4 Intervention</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase">Academic Probation</span>
            <AlertTriangle size={16} className="text-rose-600" />
          </div>
          <span className="text-2xl font-black text-rose-600 mt-2 block">{cohortSummary?.probationCount || 4}</span>
          <span className="text-[11px] text-slate-500 font-medium">CGPA &lt; 6.0 Action Required</span>
        </div>
      </div>

      {/* Recharts Course Grade Breakdown Graph (Design Match) */}
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
              <BarChart data={COURSE_GRADE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barCategoryGap="28%" barGap={2}>
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
              <BarChart data={COURSE_GRADE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

      {/* Subject Bottlenecks Table */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              <BookOpen size={16} className="text-rose-600" />
              Identified Course Bottlenecks & High Failure Rates
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Courses where assigned advisees have highest concentration of struggle</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-sky-50/60 border-b border-sky-100 text-slate-600 font-bold uppercase">
                <th className="py-3 px-4">Course Code & Title</th>
                <th className="py-3 px-4">Advisees At Risk</th>
                <th className="py-3 px-4">Cohort Failure Rate</th>
                <th className="py-3 px-4">Instructor In-Charge</th>
                <th className="py-3 px-4 text-right">Intervention Strategy</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(subjectBottlenecks || []).map((b, i) => (
                <tr key={i} className="hover:bg-sky-50/30">
                  <td className="py-3.5 px-4 font-black text-slate-900">
                    {b.code} • {b.title}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded">
                      {b.atRiskCount} Students
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    {b.failureRate}%
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-700">
                    {b.faculty}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2.5 py-1 rounded-md">
                      Peer Tutor Deployed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
