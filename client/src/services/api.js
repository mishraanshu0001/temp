import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// --- Auth ---
export const loginByEmail = (email) => API.post('/auth/login', { email });
export const getDemoAccounts = () => API.get('/auth/demo-accounts');

// --- HOD Suite Endpoints ---
export const getHODOverview = () => API.get('/dashboard/hod/overview');

export const getFacultyWorkload = () => API.get('/dashboard/hod/workload');
export const rebalanceFacultyWorkload = (payload) => API.post('/dashboard/hod/workload/rebalance', payload);

export const getAdvisorCaseload = () => API.get('/dashboard/hod/advisors');
export const redistributeAdvisorCaseload = (payload) => API.post('/dashboard/hod/advisors/redistribute', payload);

export const getRecruitmentPipeline = () => API.get('/dashboard/hod/recruitment');
export const updateApplicantStatus = (payload) => API.post('/dashboard/hod/recruitment/update-status', payload);
export const createJobRequisition = (payload) => API.post('/dashboard/hod/recruitment/requisitions', payload);

export const getOnboardingTracker = () => API.get('/dashboard/hod/onboarding');
export const updateOnboardingTask = (payload) => API.post('/dashboard/hod/onboarding/update-task', payload);
export const activateFacultyCandidate = (payload) => API.post('/dashboard/hod/onboarding/activate', payload);

export const getStudentOutcomes = () => API.get('/dashboard/hod/outcomes');

// --- Legacy & Other Dashboards ---
export const getHODStats = () => API.get('/dashboard/hod/stats');
export const getFacultyRoster = () => API.get('/dashboard/hod/roster');
export const getAdvisorStudents = (advisorId) => API.get(`/dashboard/advisor/${advisorId}/students`);
export const getStudentData = (studentId) => API.get(`/dashboard/student/${studentId}`);
export const submitFeedback = (payload) => API.post('/dashboard/feedback', payload);

// --- Users ---
export const getAllUsers = () => API.get('/users');
export const getFacultyProfile = (id) => API.get(`/users/${id}`);
