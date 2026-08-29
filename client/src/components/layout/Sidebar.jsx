import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  LayoutDashboard, 
  BarChart3,
  Scale,
  UserCheck,
  UserPlus, 
  ClipboardCheck,
  TrendingUp,
  Users, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  LogOut,
  GraduationCap,
  Calendar,
  FileText,
  Bell
} from 'lucide-react';
import './Sidebar.css';

const HOD_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { label: 'Department KPIs', path: '/dashboard', tab: 'kpis', icon: BarChart3 },
    ]
  },
  {
    title: 'Academic Operations',
    items: [
      { label: 'Faculty Workload', path: '/dashboard/workload', tab: 'workload', icon: Scale },
      { label: 'Advisor Caseload', path: '/dashboard/caseload', tab: 'advisors', icon: UserCheck },
      { label: 'Performance & Outcomes', path: '/dashboard/outcomes', tab: 'outcomes', icon: TrendingUp },
    ]
  },
  {
    title: 'Faculty & Recruiting',
    items: [
      { label: 'Recruitment (ATS)', path: '/dashboard/recruitment', tab: 'recruitment', icon: UserPlus },
    ]
  },
  {
    title: 'Department',
    items: [
      { label: 'Courses & Catalog', path: '/dashboard/courses', icon: BookOpen },
      { label: 'Messages & Doubts', path: '/dashboard/messages', icon: MessageSquare },
      { label: 'Settings', path: '/dashboard/settings', icon: Settings },
    ]
  }
];

const ADVISOR_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', path: '/dashboard?tab=dashboard', tab: 'dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Caseload Management',
    items: [
      { label: 'Students', path: '/dashboard?tab=students', tab: 'students', icon: Users },
      { label: 'Performance', path: '/dashboard?tab=performance', tab: 'performance', icon: TrendingUp },
    ]
  },
  {
    title: 'Engagement & Actions',
    items: [
      { label: 'Meetings', path: '/dashboard?tab=meetings', tab: 'meetings', icon: Calendar },
      { label: 'Messages', path: '/dashboard?tab=messages', tab: 'messages', icon: MessageSquare },
      { label: 'Reports', path: '/dashboard?tab=reports', tab: 'reports', icon: FileText },
    ]
  }
];

const FACULTY_SECTIONS = [
  {
    title: 'Overview',
    items: [
      { label: 'Dashboard', path: '/dashboard?tab=dashboard', tab: 'dashboard', icon: LayoutDashboard },
    ]
  },
  {
    title: 'Academic & Courses',
    items: [
      { label: 'My Students', path: '/dashboard?tab=students', tab: 'students', icon: Users },
      { label: 'Courses', path: '/dashboard?tab=courses', tab: 'courses', icon: BookOpen },
      { label: 'Timetable', path: '/dashboard?tab=timetable', tab: 'timetable', icon: Calendar },
    ]
  },
  {
    title: 'Assessment & Operations',
    items: [
      { label: 'Attendance', path: '/dashboard?tab=attendance', tab: 'attendance', icon: ClipboardCheck },
      { label: 'Results', path: '/dashboard?tab=results', tab: 'results', icon: TrendingUp },
      { label: 'Notices', path: '/dashboard?tab=notices', tab: 'notices', icon: Bell },
      { label: 'Messages', path: '/dashboard?tab=messages', tab: 'messages', icon: MessageSquare },
    ]
  }
];

const OTHER_ROLE_ITEMS = {
  student: [
    { label: 'My Learning', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Courses & Subjects', path: '/dashboard/courses', icon: BookOpen },
    { label: 'Doubts Center', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Faculty Directory', path: '/dashboard/users', icon: Users },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  admin: [
    { label: 'Admin Controls', path: '/dashboard', icon: LayoutDashboard },
    { label: 'User Directory', path: '/dashboard/users', icon: Users },
    { label: 'Recruitment', path: '/dashboard/recruitment', icon: UserPlus },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const userRole = (user?.role || '').toLowerCase();
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isHOD = userRole === 'hod' || !userRole;
  const isAdvisor = userRole === 'advisor';
  const isFaculty = userRole === 'adjunct_faculty' || userRole === 'faculty';

  const isItemActive = (item) => {
    if (isAdvisor || isFaculty) {
      if (item.tab) {
        if (!currentTab && item.tab === 'dashboard') return true;
        return currentTab === item.tab;
      }
      return location.pathname === item.path;
    }

    if (item.tab) {
      if (location.pathname === item.path) return true;
      if (location.pathname === '/dashboard' && currentTab === item.tab) return true;
      if (location.pathname === '/dashboard' && !currentTab && item.tab === 'kpis') return true;
      return false;
    }
    return location.pathname === item.path;
  };

  const handleNavigate = (item) => {
    navigate(item.path);
  };

  return (
    <aside className="sidebar">
      {/* Brand Header */}
      <div className="sidebar-logo" onClick={() => navigate('/')}>
        <div className="logo-icon-wrapper">
          <GraduationCap size={18} className="text-slate-800" />
        </div>
        <div className="logo-text">
          AcadCore
        </div>
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav custom-scrollbar">
        {isHOD ? (
          HOD_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="nav-section">
              <div className="section-header">{section.title}</div>
              <div className="section-items">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item);
                  return (
                    <button
                      key={item.label}
                      className={`nav-item ${active ? 'active' : ''}`}
                      onClick={() => handleNavigate(item)}
                    >
                      {Icon && <Icon size={16} className="nav-icon shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : isAdvisor ? (
          ADVISOR_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="nav-section">
              <div className="section-header">{section.title}</div>
              <div className="section-items">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item);
                  return (
                    <button
                      key={item.label}
                      className={`nav-item ${active ? 'active' : ''}`}
                      onClick={() => handleNavigate(item)}
                    >
                      {Icon && <Icon size={16} className="nav-icon shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : isFaculty ? (
          FACULTY_SECTIONS.map((section, sIdx) => (
            <div key={sIdx} className="nav-section">
              <div className="section-header">{section.title}</div>
              <div className="section-items">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isItemActive(item);
                  return (
                    <button
                      key={item.label}
                      className={`nav-item ${active ? 'active' : ''}`}
                      onClick={() => handleNavigate(item)}
                    >
                      {Icon && <Icon size={16} className="nav-icon shrink-0" />}
                      <span className="truncate">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="nav-section">
            <div className="section-header">Navigation</div>
            <div className="section-items">
              {(OTHER_ROLE_ITEMS[userRole] || OTHER_ROLE_ITEMS.admin).map((item) => {
                const Icon = item.icon;
                const active = location.pathname === item.path;
                return (
                  <button
                    key={item.label}
                    className={`nav-item ${active ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                  >
                    {Icon && <Icon size={16} className="nav-icon shrink-0" />}
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </nav>

      {/* User Card Footer */}
      <div className="sidebar-user">
        <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
        <div className="user-info">
          <p className="user-name">{user?.name || 'User'}</p>
          <p className="user-role">
            {isHOD ? 'Department Chair' : isAdvisor ? 'Academic Advisor' : isFaculty ? 'Adjunct Faculty (Trainer)' : user?.role ? user.role.replace('_', ' ') : 'Faculty'}
          </p>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
