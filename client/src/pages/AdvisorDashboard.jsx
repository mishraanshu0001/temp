import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Calendar, 
  MessageSquare, 
  FileText,
  RefreshCw,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import AdvisorOverviewTab from '../components/advisor/AdvisorOverviewTab';
import AdvisorStudentsTab from '../components/advisor/AdvisorStudentsTab';
import AdvisorPerformanceTab from '../components/advisor/AdvisorPerformanceTab';
import AdvisorMeetingsTab from '../components/advisor/AdvisorMeetingsTab';
import AdvisorMessagesTab from '../components/advisor/AdvisorMessagesTab';
import AdvisorReportsTab from '../components/advisor/AdvisorReportsTab';
import { 
  getAdvisorPortalOverview, 
  getAdvisorPortalStudents, 
  updateAdvisorStudentNotes,
  getAdvisorPortalPerformance, 
  getAdvisorPortalMeetings, 
  scheduleAdvisorPortalMeeting,
  updateAdvisorMeetingStatus,
  getAdvisorPortalReports
} from '../services/api';

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'performance', label: 'Performance', icon: TrendingUp },
  { id: 'meetings', label: 'Meetings', icon: Calendar },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'reports', label: 'Reports', icon: FileText },
];

export default function AdvisorDashboard({ initialTab = 'dashboard' }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab from URL query params or prop
  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || initialTab || 'dashboard');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overviewData, setOverviewData] = useState(null);
  const [students, setStudents] = useState([]);
  const [performanceData, setPerformanceData] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [reportsData, setReportsData] = useState(null);

  // Sync tab with URL
  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/dashboard?tab=${tabId}`);
  };

  const fetchAllAdvisorData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const [overRes, stuRes, perfRes, meetRes, repRes] = await Promise.allSettled([
        getAdvisorPortalOverview(),
        getAdvisorPortalStudents(),
        getAdvisorPortalPerformance(),
        getAdvisorPortalMeetings(),
        getAdvisorPortalReports()
      ]);

      if (overRes.status === 'fulfilled') setOverviewData(overRes.value.data);
      if (stuRes.status === 'fulfilled') setStudents(stuRes.value.data.students || []);
      if (perfRes.status === 'fulfilled') setPerformanceData(perfRes.value.data);
      if (meetRes.status === 'fulfilled') setMeetings(meetRes.value.data.meetings || []);
      if (repRes.status === 'fulfilled') setReportsData(repRes.value.data);
    } catch (err) {
      console.error('Error loading advisor portal data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllAdvisorData();
  }, []);

  const handleUpdateStudentNotes = async (studentId, notes) => {
    try {
      await updateAdvisorStudentNotes(studentId, notes);
      setStudents(prev => prev.map(s => s.id === studentId ? { ...s, advisorNotes: notes } : s));
    } catch (err) {
      console.error('Error updating notes:', err);
    }
  };

  const handleScheduleMeeting = async (payload) => {
    try {
      const res = await scheduleAdvisorPortalMeeting(payload);
      if (res.data?.meeting) {
        setMeetings(prev => [res.data.meeting, ...prev]);
      }
    } catch (err) {
      console.error('Error scheduling meeting:', err);
    }
  };

  const handleUpdateMeetingStatus = async (meetingId, status) => {
    try {
      await updateAdvisorMeetingStatus(meetingId, status);
      setMeetings(prev => prev.map(m => m.id === meetingId ? { ...m, status } : m));
    } catch (err) {
      console.error('Error updating meeting status:', err);
    }
  };

  return (
    <div className="dashboard-content max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="print-hide flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-sky-100 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Academic Advisor Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-sky-50 text-sky-900 border border-sky-200">
              Advising & Student Retention Suite
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, <strong className="text-slate-900">{user?.name || 'Dr. Ramesh Iyer'}</strong>. Proactive risk intervention, student caseload & academic performance tracking.
          </p>
        </div>

        <button
          onClick={() => fetchAllAdvisorData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-sky-50 text-slate-900 border border-sky-200 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin text-sky-600' : 'text-slate-600'} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Feed'}</span>
        </button>
      </div>

      {/* Main Tab Render */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-sky-100 shadow-2xs">
          <RefreshCw size={24} className="animate-spin text-sky-600 mb-3" />
          <p className="text-xs text-slate-500 font-semibold">Loading Advisor Portal Suite...</p>
        </div>
      ) : (
        <div>
          {activeTab === 'dashboard' && (
            <AdvisorOverviewTab 
              overviewData={overviewData} 
              setActiveTab={handleTabChange} 
              onRefresh={() => fetchAllAdvisorData(true)} 
            />
          )}

          {activeTab === 'students' && (
            <AdvisorStudentsTab 
              students={students} 
              onUpdateNotes={handleUpdateStudentNotes}
              onScheduleClick={() => handleTabChange('meetings')}
              onMessageClick={() => handleTabChange('messages')}
            />
          )}

          {activeTab === 'performance' && (
            <AdvisorPerformanceTab 
              performanceData={performanceData} 
            />
          )}

          {activeTab === 'meetings' && (
            <AdvisorMeetingsTab 
              meetings={meetings} 
              students={students} 
              onScheduleMeeting={handleScheduleMeeting}
              onUpdateMeetingStatus={handleUpdateMeetingStatus}
            />
          )}

          {activeTab === 'messages' && (
            <AdvisorMessagesTab 
              messages={overviewData?.messages || []} 
            />
          )}

          {activeTab === 'reports' && (
            <AdvisorReportsTab 
              reportsData={reportsData} 
              students={students} 
            />
          )}
        </div>
      )}
    </div>
  );
}
