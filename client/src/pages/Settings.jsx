import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Bell, 
  User, 
  MonitorSmartphone, 
  Key, 
  CheckCircle2, 
  Lock,
  Globe,
  Smartphone
} from 'lucide-react';

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [toast, setToast] = useState(null);

  const [formData, setFormData] = useState({
    name: user?.name || 'Dr. Alan Smith',
    email: user?.email || 'alan.smith@university.edu',
    phone: '+1 (555) 019-2831',
    language: 'en',
    visibility: 'private'
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile settings saved successfully.');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-3.5 rounded-lg shadow-md bg-slate-900 border border-slate-700 text-white flex items-center gap-2 animate-in slide-in-from-bottom-5 text-xs font-semibold">
          <CheckCircle2 size={16} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 className="text-xl font-bold text-slate-900">Account & Department Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Manage profile credentials, authentication, and notification preferences.</p>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Sub-Navigation */}
        <div className="w-full md:w-56 shrink-0 space-y-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'profile' ? 'bg-slate-900 text-white font-semibold shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <User size={15} /> Profile & Details
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'security' ? 'bg-slate-900 text-white font-semibold shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Shield size={15} /> Security & 2FA
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'notifications' ? 'bg-slate-900 text-white font-semibold shadow-2xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Bell size={15} /> Notification Alerts
          </button>
        </div>

        {/* Content Panel */}
        <div className="flex-1">
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-5">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Personal Information</h3>
                <p className="text-xs text-slate-400">Update your public institutional contact information.</p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-600 uppercase mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-slate-800 focus:bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 uppercase mb-1">Institutional Email</label>
                    <input 
                      type="email" 
                      disabled
                      value={formData.email} 
                      className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-500 font-mono" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-600 uppercase mb-1">Contact Phone</label>
                    <input 
                      type="text" 
                      value={formData.phone} 
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-slate-800 focus:bg-white" 
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-600 uppercase mb-1">Interface Language</label>
                    <select 
                      value={formData.language}
                      onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-slate-800"
                    >
                      <option value="en">English (US)</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-all">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <Key size={14} className="text-slate-700" /> Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">Protect your faculty portal with Authenticator OTP.</p>
                </div>
                <button 
                  onClick={() => showToast('2FA setup instructions sent to your email.')}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-medium text-slate-700"
                >
                  Enable 2FA
                </button>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5 mb-3">
                  <MonitorSmartphone size={14} className="text-slate-700" /> Active Institutional Sessions
                </h4>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="py-3 flex justify-between items-center">
                    <div>
                      <span className="font-semibold text-slate-900 block">Workstation Chrome (Current)</span>
                      <span className="text-[10px] text-slate-400">IP: 192.168.1.45 • Active Now</span>
                    </div>
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-semibold">Active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeTab === 'notifications' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Notification Alerts</h3>
                <p className="text-xs text-slate-400">Configure alerts for student queries and workload rebalancing.</p>
              </div>

              <div className="space-y-2 text-xs">
                {[
                  { id: '1', title: 'Faculty Workload Capacity Warnings', desc: 'Notify when any faculty member exceeds 18 hrs/week.' },
                  { id: '2', title: 'Advisor Caseload Risk Thresholds', desc: 'Alert when risk-weighted scores reach 120+ points.' },
                  { id: '3', title: 'New Job Candidate Applications', desc: 'Instant email alert upon new ATS candidate submission.' },
                  { id: '4', title: 'Unresolved Student Doubts (SLA > 24h)', desc: 'Daily summary of unanswered questions.' }
                ].map((item) => (
                  <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                    <div>
                      <h5 className="font-semibold text-slate-800">{item.title}</h5>
                      <p className="text-[10px] text-slate-400">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked className="rounded text-slate-900" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
