import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Building2, 
  GraduationCap, 
  UserCheck, 
  BookOpen, 
  ShieldCheck, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ArrowLeft,
  AlertCircle,
  KeyRound,
  User
} from 'lucide-react';

const ROLE_PRESETS = [
  {
    id: 'hod',
    label: 'HOD',
    fullName: 'HOD / Chair',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.hod@univ.edu.in',
    legacyEmail: 'alan.hod@univ.edu',
    password: 'demo123',
    icon: Building2
  },
  {
    id: 'adjunct_faculty',
    label: 'Adjunct Faculty',
    fullName: 'Adjunct Faculty (Visiting Trainer)',
    name: 'Prof. Priya Sharma',
    email: 'priya.faculty@univ.edu.in',
    legacyEmail: 'jane.adjunct@univ.edu',
    password: 'demo123',
    icon: BookOpen
  },
  {
    id: 'advisor',
    label: 'Advisor',
    fullName: 'Academic Advisor',
    name: 'Dr. Ramesh Iyer',
    email: 'ramesh.advisor@univ.edu.in',
    legacyEmail: 'mark.advisor@univ.edu',
    password: 'demo123',
    icon: UserCheck
  },
  {
    id: 'student',
    label: 'Student',
    fullName: 'Student',
    name: 'Aarav Sharma',
    email: 'aarav.student@univ.edu.in',
    legacyEmail: 'alice.student@univ.edu',
    password: 'demo123',
    icon: GraduationCap
  },
  {
    id: 'admin',
    label: 'Admin',
    fullName: 'Administrator',
    name: 'System Admin',
    email: 'admin@univ.edu.in',
    legacyEmail: 'admin@univ.edu',
    password: 'demo123',
    icon: ShieldCheck
  }
];

export default function Login() {
  const [selectedRole, setSelectedRole] = useState('hod');
  const [email, setEmail] = useState(ROLE_PRESETS[0].email);
  const [password, setPassword] = useState(ROLE_PRESETS[0].password);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const currentRole = ROLE_PRESETS.find(r => r.id === selectedRole) || ROLE_PRESETS[0];

  const handleRoleSelect = (roleItem) => {
    setSelectedRole(roleItem.id);
    setEmail(roleItem.email);
    setPassword(roleItem.password);
    setError('');
  };

  const handleLoginSubmit = async (e, targetEmail = email) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(targetEmail, selectedRole);
      navigate('/dashboard');
    } catch (err) {
      const serverMsg = err.response?.data?.error;
      if (serverMsg) {
        setError(serverMsg);
      } else {
        // Fallback demo login if local backend is offline
        const matched = ROLE_PRESETS.find(r => r.id === selectedRole);
        if (matched) {
          const simulatedUser = {
            id: `u_${selectedRole}`,
            name: matched.name,
            email: targetEmail,
            role: selectedRole === 'faculty' ? 'adjunct_faculty' : selectedRole,
            department: 'Computer Science'
          };
          localStorage.setItem('adjunct_user', JSON.stringify(simulatedUser));
          navigate('/dashboard');
        } else {
          setError(`Access Denied: This account is not authorized for the ${currentRole.label} portal.`);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between p-4 sm:p-6 font-sans">
      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-start">
        <button 
          onClick={() => navigate('/')}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors cursor-pointer py-1 px-2 -ml-2 rounded-lg hover:bg-slate-200/60"
        >
          <ArrowLeft size={15} />
          <span>Back to Home</span>
        </button>
      </div>

      {/* Center Unified Single Box */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
          
          {/* Box Header */}
          <div className="text-center space-y-1">
            <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 text-white font-black text-base shadow-xs mb-1">
              AC
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Acad<span className="text-slate-500">Core</span>
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Sign in to your university portal dashboard
            </p>
          </div>

          {/* Role Selector Tabs Row */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center">
              Choose Role
            </span>
            <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
              {ROLE_PRESETS.map((r) => {
                const isSelected = selectedRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => handleRoleSelect(r)}
                    className={`py-1.5 text-xs font-bold rounded-lg transition-all text-center cursor-pointer ${
                      isSelected 
                        ? 'bg-slate-900 text-white shadow-xs' 
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                    }`}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>

            {/* Active Demo Profile Badge */}
            <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-[11px] text-slate-600 flex items-center justify-between font-medium">
              <span className="flex items-center gap-1.5 text-slate-900 font-semibold truncate">
                <User size={13} className="text-sky-700 shrink-0" />
                <span>{currentRole.name}</span>
              </span>
              <span className="flex items-center gap-1 text-slate-500 text-[10px] shrink-0 font-mono bg-white px-2 py-0.5 rounded border border-sky-100">
                <KeyRound size={11} className="text-slate-400" />
                Pass: {currentRole.password}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 text-xs font-medium flex items-start gap-2.5 leading-relaxed">
              <AlertCircle size={16} className="shrink-0 text-rose-600 mt-0.5" />
              <span className="font-semibold text-rose-900">{error}</span>
            </div>
          )}

          {/* Email / Password Form */}
          <form onSubmit={handleLoginSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <a 
                  href="#forgot" 
                  onClick={(e) => { e.preventDefault(); alert(`Demo password for ${currentRole.label} is '${currentRole.password}'`); }} 
                  className="text-xs text-slate-500 hover:text-slate-900 font-semibold"
                >
                  Forgot?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-0.5">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-slate-900 w-3.5 h-3.5"
                />
                <span>Remember me</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50 mt-1"
            >
              <span>{loading ? 'Signing in...' : `Sign In as ${currentRole.label} (Demo)`}</span>
              <ArrowRight size={15} />
            </button>
          </form>

        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-400">
        Institutional Portal • Protected by RBAC Security
      </footer>
    </div>
  );
}
