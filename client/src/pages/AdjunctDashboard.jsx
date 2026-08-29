import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  RefreshCw, 
  GraduationCap 
} from 'lucide-react';
import FacultyOverviewTab from '../components/faculty/FacultyOverviewTab';
import FacultyStudentsTab from '../components/faculty/FacultyStudentsTab';
import FacultyCoursesTab from '../components/faculty/FacultyCoursesTab';
import FacultyTimetableTab from '../components/faculty/FacultyTimetableTab';
import FacultyAttendanceTab from '../components/faculty/FacultyAttendanceTab';
import FacultyResultsTab from '../components/faculty/FacultyResultsTab';
import FacultyNoticesTab from '../components/faculty/FacultyNoticesTab';
import FacultyMessagesTab from '../components/faculty/FacultyMessagesTab';
import { 
  getFacultyPortalOverview, 
  getFacultyPortalStudents, 
  getFacultyPortalCourses, 
  getFacultyPortalTimetable, 
  getFacultyPortalAttendance, 
  markFacultyPortalAttendance, 
  getFacultyPortalResults, 
  updateFacultyStudentMarks, 
  getFacultyPortalNotices, 
  createFacultyPortalNotice, 
  getFacultyPortalMessages, 
  replyFacultyPortalMessage 
} from '../services/api';

export default function AdjunctDashboard({ initialTab = 'dashboard' }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || initialTab || 'dashboard');

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [overviewData, setOverviewData] = useState(null);
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [timetable, setTimetable] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [resultsData, setResultsData] = useState(null);
  const [notices, setNotices] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (tabFromUrl && tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    navigate(`/dashboard?tab=${tabId}`);
  };

  const fetchFacultyData = async (isManual = false) => {
    if (isManual) setRefreshing(true);
    else setLoading(true);

    try {
      const [overRes, stuRes, crsRes, timeRes, attRes, resRes, notRes, msgRes] = await Promise.allSettled([
        getFacultyPortalOverview(),
        getFacultyPortalStudents(),
        getFacultyPortalCourses(),
        getFacultyPortalTimetable(),
        getFacultyPortalAttendance(),
        getFacultyPortalResults(),
        getFacultyPortalNotices(),
        getFacultyPortalMessages()
      ]);

      if (overRes.status === 'fulfilled') setOverviewData(overRes.value.data);
      if (stuRes.status === 'fulfilled') setStudents(stuRes.value.data.students || []);
      if (crsRes.status === 'fulfilled') setCourses(crsRes.value.data.courses || []);
      if (timeRes.status === 'fulfilled') setTimetable(timeRes.value.data.timetable || []);
      if (attRes.status === 'fulfilled') setAttendanceData(attRes.value.data);
      if (resRes.status === 'fulfilled') setResultsData(resRes.value.data);
      if (notRes.status === 'fulfilled') setNotices(notRes.value.data.notices || []);
      if (msgRes.status === 'fulfilled') setMessages(msgRes.value.data.messages || []);
    } catch (err) {
      console.error('Error fetching faculty data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFacultyData();
  }, []);

  const handleMarkAttendance = async (payload) => {
    try {
      await markFacultyPortalAttendance(payload);
      fetchFacultyData(true);
    } catch (err) {
      console.error('Error marking attendance:', err);
    }
  };

  const handleUpdateMarks = async (payload) => {
    try {
      await updateFacultyStudentMarks(payload);
    } catch (err) {
      console.error('Error updating marks:', err);
    }
  };

  const handleCreateNotice = async (payload) => {
    try {
      const res = await createFacultyPortalNotice(payload);
      if (res.data?.notice) {
        setNotices(prev => [res.data.notice, ...prev]);
      }
    } catch (err) {
      console.error('Error creating notice:', err);
    }
  };

  const handleReplyMessage = async (payload) => {
    try {
      await replyFacultyPortalMessage(payload);
    } catch (err) {
      console.error('Error replying message:', err);
    }
  };

  return (
    <div className="dashboard-content max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="print-hide flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Adjunct Faculty & Training Portal
            </h1>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-900 border border-slate-300">
              Visiting Industry Fellow & Training Suite
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, <strong className="text-slate-900">{user?.name || 'Prof. Priya Sharma'}</strong>. Manage training modules, timetable, daily trainee attendance, assessment results & announcements.
          </p>
        </div>

        <button
          onClick={() => fetchFacultyData(true)}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-slate-100 text-slate-900 border border-slate-300 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin text-slate-700' : 'text-slate-600'} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh Feed'}</span>
        </button>
      </div>

      {/* Main Tab Render */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <RefreshCw size={24} className="animate-spin text-slate-700 mb-3" />
          <p className="text-xs text-slate-500 font-semibold">Loading Faculty Teaching Portal...</p>
        </div>
      ) : (
        <div>
          {activeTab === 'dashboard' && (
            <FacultyOverviewTab 
              overviewData={overviewData} 
              setActiveTab={handleTabChange} 
            />
          )}

          {activeTab === 'students' && (
            <FacultyStudentsTab 
              students={students} 
            />
          )}

          {activeTab === 'courses' && (
            <FacultyCoursesTab 
              courses={courses} 
            />
          )}

          {activeTab === 'timetable' && (
            <FacultyTimetableTab 
              timetable={timetable} 
            />
          )}

          {activeTab === 'attendance' && (
            <FacultyAttendanceTab 
              attendanceData={attendanceData} 
              onMarkAttendance={handleMarkAttendance} 
            />
          )}

          {activeTab === 'results' && (
            <FacultyResultsTab 
              resultsData={resultsData} 
              onUpdateMarks={handleUpdateMarks} 
            />
          )}

          {activeTab === 'notices' && (
            <FacultyNoticesTab 
              notices={notices} 
              onCreateNotice={handleCreateNotice} 
            />
          )}

          {activeTab === 'messages' && (
            <FacultyMessagesTab 
              messages={messages} 
              onReplyMessage={handleReplyMessage} 
            />
          )}
        </div>
      )}
    </div>
  );
}
