import React from 'react';
import { 
  Users, 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  Calendar, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  RefreshCw,
  Award,
  BookOpen
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

export default function AdvisorOverviewTab({ overviewData, setActiveTab, onRefresh }) {
  const { profile, kpis, alerts, todaySessions } = overviewData || {};

  const caseloadScore = profile?.caseloadScore || 138;
  const maxCapacity = profile?.maxCapacity || 120;
  const isOverloaded = caseloadScore > maxCapacity;

  return (
    <div className="space-y-6">
      {/* Advisor Welcome & Status Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-lg shadow-sm">
            {profile?.name?.split(' ').map(n => n[0]).join('') || 'RI'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
                {profile?.name || 'Dr. Ramesh Iyer'}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-100 text-slate-800 border border-slate-300">
                Senior Academic Advisor
              </span>
            </div>
            <p className="text-sm text-slate-500 mt-1">
              Department of Computer Science & Engineering • Advising B.Tech Batches 2023-2027
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className={`px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-2 ${
            isOverloaded 
              ? 'bg-slate-900 text-white border-slate-900' 
              : 'bg-slate-100 text-slate-800 border-slate-300'
          }`}>
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            Caseload: {profile?.status || 'Overloaded'} ({caseloadScore} pts)
          </span>
          <button
            onClick={() => setActiveTab('meetings')}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Calendar size={16} />
            <span>Schedule Session</span>
          </button>
        </div>
      </div>

      {/* 4 Primary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Assigned Students */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Assigned Advisees</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.totalStudents || 65}</span>
              <span className="text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">B.Tech CSE</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Low Risk: <strong>{kpis?.lowRiskCount || 53}</strong></span>
              <span>At Risk: <strong className="text-slate-900 font-bold">{kpis?.atRiskTotal || 12}</strong></span>
            </div>
          </div>
        </div>

        {/* Caseload Weight Score */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Caseload Weight</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <Scale size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{caseloadScore}</span>
              <span className="text-sm text-slate-400 font-medium">/ {maxCapacity} Max</span>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md ml-auto">+18 Over</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>HOD Rebalance: <strong>Pending</strong></span>
              <span className="text-slate-900 font-bold">115% Load</span>
            </div>
          </div>
        </div>

        {/* Critical Interventions Required */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Urgent Interventions</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.highRiskCount || 4}</span>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-md">Probation</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Moderate: <strong>{kpis?.mediumRiskCount || 8}</strong></span>
              <span className="text-slate-900 font-bold">Action Needed</span>
            </div>
          </div>
        </div>

        {/* Cohort Health Indicator */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg CGPA & Attendance</span>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 flex items-center justify-center">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-slate-900">{kpis?.avgCGPA || '7.42'}</span>
              <span className="text-xs font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                {kpis?.avgAttendance || 86.4}% Att.
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-500 pt-3 border-t border-slate-100 font-medium">
              <span>Dean's List: <strong>18 Students</strong></span>
              <span className="font-bold text-slate-900">Healthy</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2-Column Split: AI Action Alerts & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Early Warning AI Alerts (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg flex items-center gap-2">
                  <SmartIcon size={18} className="text-slate-800" />
                  Early Warning & Intervention Alerts
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">Automated algorithmic detection of at-risk students</p>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-300">
                {(alerts || []).length} Active Alerts
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {(alerts || []).map((alert) => (
                <div 
                  key={alert.id}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 bg-slate-900" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm md:text-base font-extrabold text-slate-900 truncate">{alert.title}</h4>
                      </div>
                      <p className="text-sm text-slate-700 mt-1 leading-relaxed">{alert.message}</p>
                      {alert.action && (
                        <p className="text-sm text-slate-900 font-bold mt-1.5">
                          Action: {alert.action}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (alert.studentId) setActiveTab('students');
                      else setActiveTab('meetings');
                    }}
                    className="shrink-0 px-3.5 py-2 text-xs font-bold bg-white hover:bg-slate-900 hover:text-white border border-slate-300 text-slate-900 rounded-xl transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
                  >
                    <span>Resolve</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>Automated risk scoring runs every 6 hours</span>
            <span className="text-slate-900 font-bold cursor-pointer hover:underline flex items-center gap-1" onClick={onRefresh}>
              <RefreshCw size={13} /> Refresh
            </span>
          </div>
        </div>

        {/* Right Column: Today's Scheduled Advisory Sessions (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base md:text-lg flex items-center gap-2">
                  <Clock size={18} className="text-slate-800" />
                  Today's Advisory Sessions
                </h3>
                <p className="text-sm text-slate-500 mt-0.5">Scheduled 1-on-1 student counseling</p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                {(todaySessions || []).length} Sessions
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {(todaySessions || []).map((s) => (
                <div key={s.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-900">{s.time}</span>
                      <span className="text-sm font-bold text-slate-800 truncate">{s.studentName}</span>
                    </div>
                    <p className="text-xs text-slate-600 font-medium mt-0.5">{s.type}</p>
                    <span className="text-xs font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200 mt-1.5 inline-block">
                      {s.mode}
                    </span>
                  </div>

                  <button 
                    onClick={() => setActiveTab('meetings')}
                    className="shrink-0 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:text-white hover:bg-slate-900 text-xs font-bold transition-all cursor-pointer shadow-2xs"
                  >
                    View
                  </button>
                </div>
              ))}

              {(!todaySessions || todaySessions.length === 0) && (
                <p className="text-sm text-slate-400 py-6 text-center">No more sessions scheduled for today.</p>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100">
            <button
              onClick={() => setActiveTab('meetings')}
              className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-300 text-sm font-bold transition-all text-center block cursor-pointer"
            >
              Open Full Advisory Calendar →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
