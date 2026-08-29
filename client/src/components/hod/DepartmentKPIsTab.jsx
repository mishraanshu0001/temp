import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Star, 
  AlertTriangle, 
  IndianRupee, 
  ChevronRight,
  RefreshCw,
  Building2,
  TrendingUp,
  ShieldCheck,
  Clock,
  Briefcase
} from 'lucide-react';

export default function DepartmentKPIsTab({ overviewData, setActiveTab, onRefresh }) {
  const [selectedSemester, setSelectedSemester] = useState('Fall 2026');
  const [selectedDept, setSelectedDept] = useState('all');

  const { department, kpis, alerts } = overviewData || {};
  const budget = kpis?.budget || { 
    allocated: 1200000, 
    spent: 845000, 
    currency: 'INR', 
    adjunctHourlyRateAvg: 1250, 
    hoursLoggedThisMonth: 1126, 
    hoursAllocatedCap: 1600 
  };
  
  const budgetPercent = Math.round((budget.spent / budget.allocated) * 100);
  const hoursPercent = Math.round((budget.hoursLoggedThisMonth / budget.hoursAllocatedCap) * 100);

  return (
    <div className="space-y-6">
      {/* Academic Unit Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <Building2 size={20} />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              {department?.name || 'Department of Computer Science & Engineering'}
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Department Head: <strong className="text-slate-900">{department?.hodName || 'Dr. Rajesh Sharma'}</strong> • Semester: <strong className="text-slate-900">{selectedSemester}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select 
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="bg-sky-50/50 text-slate-900 text-sm font-semibold border border-sky-200/80 rounded-xl px-4 py-2.5 outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="Fall 2026">Fall 2026 (Current Term)</option>
            <option value="Spring 2026">Spring 2026</option>
            <option value="Fall 2025">Fall 2025</option>
          </select>

          <select 
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="bg-sky-50/50 text-slate-900 text-sm font-semibold border border-sky-200/80 rounded-xl px-4 py-2.5 outline-none focus:border-slate-900 cursor-pointer"
          >
            <option value="all">All Subjects</option>
            <option value="cs">Computer Science</option>
            <option value="ai">AI & Data Science</option>
            <option value="sec">Cybersecurity</option>
          </select>
        </div>
      </div>

      {/* 4 Primary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Teachers */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Teachers</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-black text-slate-900">{kpis?.totalFaculty || 18}</span>
              <span className="text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md">+2 New</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span><strong>{kpis?.fullTimeCount || 12}</strong> Full-Time</span>
              <span><strong>{kpis?.adjunctCount || 6}</strong> Part-Time</span>
            </div>
          </div>
        </div>

        {/* Students per Teacher */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Students per Teacher</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
              <GraduationCap size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-black text-slate-900">{kpis?.studentFacultyRatio || '26.6:1'}</span>
              <span className="text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md">480 Students</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Standard Goal: Under 30:1</span>
              <span className="font-bold text-slate-900">Good</span>
            </div>
          </div>
        </div>

        {/* Teacher Ratings */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Student Rating</span>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 flex items-center justify-center">
              <Star size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.avgTeachingRating || 4.72}</span>
              <span className="text-xs text-slate-400 font-medium">/ 5.0</span>
              <span className="text-xs font-bold text-sky-900 bg-sky-50 border border-sky-200 px-2 py-0.5 rounded-md ml-auto">94% Positive</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>842 Student Reviews</span>
              <span className="font-bold text-slate-900">Excellent</span>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs hover:shadow-md hover:border-sky-200 transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Needs Attention</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2.5">
              <span className="text-3xl font-black text-slate-900">
                {(kpis?.overloadedFacultyCount || 0) + (kpis?.overloadedAdvisorsCount || 0)}
              </span>
              <span className="text-xs font-bold text-rose-800 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">Action Needed</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span><strong>{kpis?.overloadedFacultyCount || 2}</strong> Overloaded Teachers</span>
              <span><strong>{kpis?.overloadedAdvisorsCount || 1}</strong> Busy Advisor</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Budget & Hours / Important Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Department Budget & Teaching Hours Card with Rupee Symbol */}
        <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <IndianRupee size={17} className="text-sky-700" />
                  Budget & Teaching Hours
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Money and class hours used this semester</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-900 border border-sky-200">
                {budgetPercent}% Used
              </span>
            </div>

            {/* Money Spent Section with Rupee */}
            <div className="mt-5 space-y-5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-600">Budget Spent</span>
                  <span className="text-slate-900 font-black">₹{budget.spent.toLocaleString('en-IN')} of ₹{budget.allocated.toLocaleString('en-IN')}</span>
                </div>
                <div className="w-full h-2 bg-sky-100/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-slate-900 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(budgetPercent, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1.5 flex justify-between font-medium">
                  <span>Money Left: ₹{(budget.allocated - budget.spent).toLocaleString('en-IN')}</span>
                  <span>Avg Pay: ₹{budget.adjunctHourlyRateAvg.toLocaleString('en-IN')}/hr</span>
                </div>
              </div>

              {/* Teaching Hours Section */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-600">Class Hours Taught</span>
                  <span className="text-slate-900 font-black">{budget.hoursLoggedThisMonth} of {budget.hoursAllocatedCap} hrs</span>
                </div>
                <div className="w-full h-2 bg-sky-100/70 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-sky-700 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(hoursPercent, 100)}%` }}
                  />
                </div>
                <div className="text-xs text-slate-400 mt-1.5 flex justify-between font-medium">
                  <span>Hours Left: {budget.hoursAllocatedCap - budget.hoursLoggedThisMonth} hrs</span>
                  <span>{hoursPercent}% of semester limit</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-2 gap-3 text-center">
            <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
              <span className="block text-xs text-slate-400 uppercase font-bold">In Training</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">{kpis?.pendingOnboardingCount || 2} Teachers</span>
            </div>
            <div className="p-3 rounded-xl bg-sky-50/50 border border-sky-100">
              <span className="block text-xs text-slate-400 uppercase font-bold">Open Hiring Posts</span>
              <span className="text-base font-extrabold text-slate-900 mt-0.5 block">{kpis?.openJobRequisitionsCount || 3} Openings</span>
            </div>
          </div>
        </div>

        {/* Important Alerts & Decisions */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Important Alerts & Decisions
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Things that need your review or approval</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-sky-50 text-sky-900 border border-sky-200">
                {alerts?.length || 0} Alerts
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {(alerts || []).map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 rounded-xl bg-sky-50/40 border border-sky-100 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-sky-700 shrink-0" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-extrabold text-slate-900 truncate">{alert.title}</h4>
                        <span className="text-xs text-slate-400">({alert.timestamp})</span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">{alert.message}</p>
                      {alert.suggestedAction && (
                        <p className="text-xs text-sky-950 font-bold mt-1.5">
                          Recommended: {alert.suggestedAction}
                        </p>
                      )}
                    </div>
                  </div>

                  {alert.category === 'workload' && (
                    <button 
                      onClick={() => setActiveTab('workload')}
                      className="shrink-0 px-3.5 py-1.5 text-xs font-bold bg-white hover:bg-sky-50 border border-sky-200 text-slate-900 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      Balance Load <ChevronRight size={13} />
                    </button>
                  )}
                  {alert.category === 'advisory' && (
                    <button 
                      onClick={() => setActiveTab('advisors')}
                      className="shrink-0 px-3.5 py-1.5 text-xs font-bold bg-white hover:bg-sky-50 border border-sky-200 text-slate-900 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      View Advisors <ChevronRight size={13} />
                    </button>
                  )}
                  {alert.category === 'outcomes' && (
                    <button 
                      onClick={() => setActiveTab('outcomes')}
                      className="shrink-0 px-3.5 py-1.5 text-xs font-bold bg-white hover:bg-sky-50 border border-sky-200 text-slate-900 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                    >
                      View Grades <ChevronRight size={13} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-sky-600" />
              Live system monitoring active
            </span>
            <span className="text-slate-900 font-bold cursor-pointer hover:underline flex items-center gap-1" onClick={onRefresh}>
              <RefreshCw size={12} /> Refresh
            </span>
          </div>
        </div>
      </div>

      {/* 3-Column Subject Divisions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
              CS
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Computer Science</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">280 Students • 10 Teachers</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-900 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            Normal
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
              AI
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">AI & Data Science</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">120 Students • 5 Teachers</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-50 text-sky-900 border border-sky-200">
            <span className="w-2 h-2 rounded-full bg-sky-600" />
            Normal
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-sky-100 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-xs shadow-xs">
              CY
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">Cybersecurity</h4>
              <p className="text-xs text-slate-500 font-medium mt-0.5">80 Students • 3 Teachers</p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200">
            <span className="w-2 h-2 rounded-full bg-slate-400" />
            Hiring
          </span>
        </div>
      </div>
    </div>
  );
}
