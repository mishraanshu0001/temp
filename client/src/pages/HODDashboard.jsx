import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  getHODOverview, 
  getFacultyWorkload, 
  getAdvisorCaseload, 
  getRecruitmentPipeline, 
  getOnboardingTracker, 
  getStudentOutcomes 
} from '../services/api';

import DepartmentKPIsTab from '../components/hod/DepartmentKPIsTab';
import FacultyWorkloadTab from '../components/hod/FacultyWorkloadTab';
import AdvisorCaseloadTab from '../components/hod/AdvisorCaseloadTab';
import RecruitmentPipelineTab from '../components/hod/RecruitmentPipelineTab';
import OnboardingTrackerTab from '../components/hod/OnboardingTrackerTab';
import PerformanceOutcomesTab from '../components/hod/PerformanceOutcomesTab';

import { RefreshCw } from 'lucide-react';
import './Dashboard.css';

export default function HODDashboard({ initialTab }) {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const queryTab = searchParams.get('tab');

  // Determine active tab from props, query param, or route path
  const resolveTab = () => {
    if (initialTab) return initialTab;
    if (queryTab) return queryTab;
    if (location.pathname.includes('/workload')) return 'workload';
    if (location.pathname.includes('/caseload')) return 'advisors';
    if (location.pathname.includes('/recruitment')) return 'recruitment';
    if (location.pathname.includes('/onboarding')) return 'onboarding';
    if (location.pathname.includes('/outcomes')) return 'outcomes';
    return 'kpis';
  };

  const [activeTab, setActiveTab] = useState(resolveTab);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Sync tab when location or initialTab changes
  useEffect(() => {
    setActiveTab(resolveTab());
  }, [location.pathname, location.search, initialTab]);

  // State for all 6 HOD modules
  const [overviewData, setOverviewData] = useState(null);
  const [workloadData, setWorkloadData] = useState(null);
  const [advisorData, setAdvisorData] = useState(null);
  const [recruitmentData, setRecruitmentData] = useState(null);
  const [onboardingData, setOnboardingData] = useState(null);
  const [outcomesData, setOutcomesData] = useState(null);

  const fetchAllData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const [
        overviewRes,
        workloadRes,
        advisorRes,
        recruitmentRes,
        onboardingRes,
        outcomesRes
      ] = await Promise.all([
        getHODOverview(),
        getFacultyWorkload(),
        getAdvisorCaseload(),
        getRecruitmentPipeline(),
        getOnboardingTracker(),
        getStudentOutcomes()
      ]);

      setOverviewData(overviewRes.data);
      setWorkloadData(workloadRes.data);
      setAdvisorData(advisorRes.data);
      setRecruitmentData(recruitmentRes.data);
      setOnboardingData(onboardingRes.data);
      setOutcomesData(outcomesRes.data);
    } catch (err) {
      console.error('Error loading HOD Dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'kpis') navigate('/dashboard');
    else if (tabId === 'workload') navigate('/dashboard/workload');
    else if (tabId === 'advisors') navigate('/dashboard/caseload');
    else if (tabId === 'recruitment') navigate('/dashboard/recruitment');
    else if (tabId === 'onboarding') navigate('/dashboard/onboarding');
    else if (tabId === 'outcomes') navigate('/dashboard/outcomes');
  };

  if (loading && !overviewData) {
    return (
      <div className="dashboard-content flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-600">Loading Department Command Center...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-content max-w-7xl mx-auto space-y-6 pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Head of Department Suite
            </h1>
            <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
              Department Chair Portal
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Welcome back, <strong className="text-slate-800">{user?.name || 'Dr. Rajesh Sharma'}</strong>. Real-time institutional health, faculty distribution & student success.
          </p>
        </div>

        <button
          onClick={() => fetchAllData(true)}
          disabled={refreshing}
          className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 transition-all cursor-pointer self-start md:self-auto disabled:opacity-50"
        >
          <RefreshCw size={13} className={refreshing ? 'animate-spin text-indigo-600' : ''} />
          {refreshing ? 'Syncing...' : 'Sync Department Live'}
        </button>
      </div>

      {/* Active Tab View */}
      <div className="animate-fade-in">
        {activeTab === 'kpis' && (
          <DepartmentKPIsTab 
            overviewData={overviewData} 
            setActiveTab={handleTabChange} 
            onRefresh={() => fetchAllData(true)} 
          />
        )}

        {activeTab === 'workload' && (
          <FacultyWorkloadTab 
            workloadData={workloadData} 
            onRefresh={() => fetchAllData(true)} 
          />
        )}

        {activeTab === 'advisors' && (
          <AdvisorCaseloadTab 
            advisorData={advisorData} 
            onRefresh={() => fetchAllData(true)} 
          />
        )}

        {activeTab === 'recruitment' && (
          <RecruitmentPipelineTab 
            recruitmentData={recruitmentData} 
            onRefresh={() => fetchAllData(true)} 
          />
        )}

        {activeTab === 'onboarding' && (
          <OnboardingTrackerTab 
            onboardingData={onboardingData} 
            onRefresh={() => fetchAllData(true)} 
          />
        )}

        {activeTab === 'outcomes' && (
          <PerformanceOutcomesTab 
            outcomesData={outcomesData} 
          />
        )}
      </div>
    </div>
  );
}
