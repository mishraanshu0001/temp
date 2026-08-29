import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  TrendingUp, 
  Users, 
  Award, 
  ShieldCheck,
  Building2,
  Calendar,
  GraduationCap
} from 'lucide-react';

export default function AdvisorReportsTab({ reportsData, students = [] }) {
  const { reports, cohortSummary } = reportsData || {};

  const handleExportSummaryCSV = () => {
    const headers = ["Metric", "Value", "Benchmark Goal", "Status"];
    const rows = [
      ["Term", reports?.term || "Fall 2026", "Current Academic Year", "Active"],
      ["Total Assigned Advisees", cohortSummary?.totalAdvisees || 65, "60 Target", "Healthy"],
      ["Average Cohort CGPA", cohortSummary?.avgCGPA || 7.42, "7.00 Min Target", "Exceeded"],
      ["Average Attendance Rate", `${cohortSummary?.avgAttendance || 86.4}%`, "80% Minimum", "Compliant"],
      ["Intervention Success Rate", `${reports?.interventionSuccessRate || 82.5}%`, "75% Target", "High Performing"],
      ["Probation Clearance Rate", `${reports?.probationClearanceRate || 75.0}%`, "70% Target", "Compliant"],
      ["Total Counseling Sessions", reports?.totalMeetingsConducted || 42, "30 Minimum", "Complete"],
      ["Advisory Compliance Rate", `${reports?.complianceRate || 98.4}%`, "95% Mandatory", "Verified"]
    ];

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(e => e.map(cell => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Advisor_Compliance_Report_Fall_2026.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. PRINT-ONLY OFFICIAL UNIVERSITY LETTERHEAD DOSSIER HEADER               */}
      {/* ========================================================================= */}
      <div className="print-only mb-6 border-b-2 border-slate-900 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-black text-xl">
              AC
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-wider text-slate-900">
                Department of Computer Science & Engineering
              </h1>
              <p className="text-xs font-bold text-slate-600 tracking-wide">
                OFFICE OF ACADEMIC ADVISING & STUDENT RETENTION • AUDIT DOSSIER
              </p>
            </div>
          </div>
          <div className="text-right text-xs">
            <p className="font-extrabold text-slate-900">Accreditation Ref: UGC-NAAC/2026/CS-042</p>
            <p className="text-slate-500 font-medium">Generated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4 pt-3 border-t border-slate-200 text-xs font-semibold">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Academic Advisor</span>
            <strong className="text-slate-900 text-sm">Dr. Ramesh Iyer</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Department Chair</span>
            <strong className="text-slate-900 text-sm">Dr. Rajesh Sharma</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Academic Term</span>
            <strong className="text-slate-900 text-sm">Fall Semester 2026</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">Accreditation Status</span>
            <strong className="text-slate-900 text-sm">100% Compliant</strong>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. ON-SCREEN HEADER & ACTION BUTTONS (Hidden in Print)                     */}
      {/* ========================================================================= */}
      <div className="print-hide bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-base flex items-center justify-center">
              <FileText size={22} />
            </span>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                Advisory Portfolio & Compliance Reports
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Official accreditation logs, intervention recovery rates & dean audit exports
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Printer size={16} />
            <span>Print Audit (PDF)</span>
          </button>
          <button
            onClick={handleExportSummaryCSV}
            className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
          >
            <Download size={16} />
            <span>Export Report (CSV)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. PERFORMANCE & COMPLIANCE BENCHMARK CARDS / TABLE                        */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 break-inside-avoid">
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Compliance Score</span>
            <ShieldCheck size={18} className="text-slate-800" />
          </div>
          <div className="mt-3">
            <span className="text-2xl md:text-3xl font-black text-slate-900">{reports?.complianceRate || 98.4}%</span>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>Goal: 95.0%</span>
              <span className="text-slate-900 font-bold">Accredited</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Intervention Recovery</span>
            <TrendingUp size={18} className="text-slate-800" />
          </div>
          <div className="mt-3">
            <span className="text-2xl md:text-3xl font-black text-slate-900">{reports?.interventionSuccessRate || 82.5}%</span>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>GPA: <strong className="text-slate-900 font-bold">+0.65 Avg</strong></span>
              <span className="text-slate-900 font-bold">Effective</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Probation Clearance</span>
            <Award size={18} className="text-slate-800" />
          </div>
          <div className="mt-3">
            <span className="text-2xl md:text-3xl font-black text-slate-900">{reports?.probationClearanceRate || 75.0}%</span>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>3 of 4 Restored</span>
              <span className="text-slate-900 font-bold">75% Rate</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Sessions Logged</span>
            <Calendar size={18} className="text-slate-800" />
          </div>
          <div className="mt-3">
            <span className="text-2xl md:text-3xl font-black text-slate-900">{reports?.totalMeetingsConducted || 42}</span>
            <div className="mt-2 flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100 font-medium">
              <span>100% Documented</span>
              <span className="text-slate-900 font-bold">Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DEAN & CHAIR OFFICIAL AUDIT EVALUATION STATEMENT                        */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5 break-inside-avoid">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base md:text-lg flex items-center gap-2">
              <Building2 size={18} className="text-slate-800" />
              Department Chair & Dean's Official Audit Dossier
            </h3>
            <p className="text-xs md:text-sm text-slate-500 mt-0.5">Formal semester summary for UGC / NAAC academic accreditation</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-900 border border-slate-300">
            Audit Ready
          </span>
        </div>

        {/* Executive Summary Statement Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <h4 className="font-black text-xs md:text-sm text-slate-900 uppercase tracking-wider">
            Executive Summary Statement:
          </h4>
          <p className="text-sm md:text-base text-slate-800 leading-relaxed font-medium">
            "{reports?.deanSummary || 'Dr. Ramesh Iyer has managed 65 student portfolios with 42 recorded counseling interventions. 12 at-risk students are enrolled in structured peer tutoring. Recommended load rebalancing to bring caseload score from 138 to optimal 100.'}"
          </p>
        </div>

        {/* Milestones & Action Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-slate-800" />
              Key Accreditations & Milestones
            </h4>
            <ul className="text-xs md:text-sm text-slate-700 space-y-1.5 font-medium">
              <li>• <strong>18 Advisees</strong> qualified for Institutional Dean's Honors List (CGPA &gt; 8.5)</li>
              <li>• <strong>96.8%</strong> First-to-Second Year Student Retention Rate</li>
              <li>• Zero unaddressed student grievance escalation cases</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-2">
            <h4 className="font-bold text-sm text-slate-900 flex items-center gap-2">
              <TrendingUp size={16} className="text-slate-800" />
              Action Items for Next Term (Spring 2027)
            </h4>
            <ul className="text-xs md:text-sm text-slate-700 space-y-1.5 font-medium">
              <li>• Request HOD load rebalancing to reassign 4 low-risk students to Prof. Sneha Deshmukh</li>
              <li>• Implement early mid-term algebra workshops for Semester 2 students</li>
            </ul>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. COMPLETE STUDENT CASELOAD LEDGER (Organized Table for PDF / Screen)     */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden break-inside-avoid">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900">
              Assigned Advisee Caseload Ledger
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Comprehensive list of advisees with academic standings and intervention records</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-900 border border-slate-300">
            {students.length} Advisees Logged
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Roll No</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Semester</th>
                <th className="py-3 px-4">CGPA</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Risk Level</th>
                <th className="py-3 px-4">Standing</th>
                <th className="py-3 px-4">Last Contact</th>
                <th className="py-3 px-4">Intervention Strategy / Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60">
                  <td className="py-3 px-4 font-mono font-bold text-slate-900">{s.rollNo}</td>
                  <td className="py-3 px-4 font-extrabold text-slate-900">{s.name}</td>
                  <td className="py-3 px-4 font-medium text-slate-700">Sem {s.semester}</td>
                  <td className="py-3 px-4 font-black text-slate-900">{s.cgpa}</td>
                  <td className="py-3 px-4 font-bold text-slate-900">{s.attendance}%</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border inline-block ${
                      s.risk === 'high' ? 'bg-slate-900 text-white' : s.risk === 'medium' ? 'bg-slate-100 text-slate-800 border-slate-300' : 'bg-white text-slate-600 border-slate-200'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{s.standing}</td>
                  <td className="py-3 px-4 text-slate-500 font-medium">{s.lastMeetingDate || 'N/A'}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium max-w-[200px] truncate">
                    {s.advisorNotes || 'Periodic advisory review conducted.'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. FORMAL SIGN-OFF & ACCREDITATION STAMP (Visible in Print & PDF)          */}
      {/* ========================================================================= */}
      <div className="print-only mt-8 pt-8 border-t-2 border-slate-900 break-inside-avoid">
        <div className="grid grid-cols-3 gap-8 text-center text-xs">
          <div className="space-y-8">
            <div className="border-b border-slate-400 pb-1 h-12 flex items-end justify-center font-serif italic text-slate-700">
              Dr. Ramesh Iyer
            </div>
            <div>
              <p className="font-extrabold text-slate-900">Dr. Ramesh Iyer</p>
              <p className="text-slate-500">Senior Academic Advisor</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-b border-slate-400 pb-1 h-12 flex items-end justify-center font-serif italic text-slate-700">
              Dr. Rajesh Sharma
            </div>
            <div>
              <p className="font-extrabold text-slate-900">Dr. Rajesh Sharma</p>
              <p className="text-slate-500">Head of Department (CSE)</p>
            </div>
          </div>

          <div className="space-y-8">
            <div className="border-b border-slate-400 pb-1 h-12 flex items-end justify-center font-serif italic text-slate-700">
              Dean (Academic Affairs)
            </div>
            <div>
              <p className="font-extrabold text-slate-900">Dean of Academic Affairs</p>
              <p className="text-slate-500">University Accreditation Board</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
