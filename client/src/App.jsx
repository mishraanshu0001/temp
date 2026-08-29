import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import HODDashboard from './pages/HODDashboard';
import AdvisorDashboard from './pages/AdvisorDashboard';
import AdjunctDashboard from './pages/AdjunctDashboard';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UsersDirectory from './pages/UsersDirectory';
import FacultyProfile from './pages/FacultyProfile';
import RecruitmentPage from './pages/RecruitmentPage';
import Courses from './pages/Courses';
import Messages from './pages/Messages';
import Settings from './pages/Settings';
import CareersPage from './pages/CareersPage';
import JobApplyPage from './pages/JobApplyPage';
import DashboardLayout from './components/layout/DashboardLayout';
import './index.css';

function DashboardRouter({ initialTab }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  
  const role = (user.role || '').toLowerCase();
  if (role === 'hod' || !role) return <HODDashboard initialTab={initialTab} />;
  if (role === 'advisor') return <AdvisorDashboard />;
  if (role === 'adjunct_faculty') return <AdjunctDashboard />;
  if (role === 'student') return <StudentDashboard />;
  if (role === 'admin') return <AdminDashboard />;
  return <HODDashboard initialTab={initialTab} />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/apply/:jobId" element={<JobApplyPage />} />

          {/* Authenticated Dashboard Pages */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardRouter initialTab="kpis" />} />
            <Route path="/dashboard/workload" element={<DashboardRouter initialTab="workload" />} />
            <Route path="/dashboard/caseload" element={<DashboardRouter initialTab="advisors" />} />
            <Route path="/dashboard/onboarding" element={<DashboardRouter initialTab="onboarding" />} />
            <Route path="/dashboard/outcomes" element={<DashboardRouter initialTab="outcomes" />} />
            <Route path="/dashboard/recruitment" element={<DashboardRouter initialTab="recruitment" />} />
            
            <Route path="/dashboard/users" element={<UsersDirectory />} />
            <Route path="/dashboard/users/:id" element={<FacultyProfile />} />
            <Route path="/dashboard/courses" element={<Courses />} />
            <Route path="/dashboard/messages" element={<Messages />} />
            <Route path="/dashboard/settings" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
