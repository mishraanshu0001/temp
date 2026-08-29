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
  GraduationCap
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

const OTHER_ROLE_ITEMS = {
  adjunct_faculty: [
    { label: 'Teaching Portal', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Courses', path: '/dashboard/courses', icon: BookOpen },
    { label: 'Doubts & Inbox', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Staff Directory', path: '/dashboard/users', icon: Users },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
  advisor: [
    { label: 'Student Caseload', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Student Directory', path: '/dashboard/users', icon: Users },
    { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare },
    { label: 'Settings', path: '/dashboard/settings', icon: Settings },
  ],
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

  const isItemActive = (item) => {
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
          <p className="user-role">{user?.role ? user.role.replace('_', ' ') : 'Department Chair'}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">
          <LogOut size={15} />
        </button>
      </div>
    </aside>
  );
}
