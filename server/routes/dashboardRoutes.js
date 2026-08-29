const express = require('express');
const router = express.Router();
const {
  getHODOverview,
  getFacultyWorkload,
  rebalanceFacultyWorkload,
  getAdvisorCaseload,
  redistributeAdvisorCaseload,
  getRecruitmentPipeline,
  updateApplicantStatus,
  createJobRequisition,
  getOnboardingTracker,
  updateOnboardingTask,
  activateFacultyCandidate,
  getStudentOutcomes,
  getHODStats,
  getFacultyRoster,
  getAdvisorStudents,
  getStudentData,
  submitFeedback
} = require('../controllers/dashboardController');

// --- HOD Suite Endpoints ---
router.get('/hod/overview', getHODOverview);
router.get('/hod/workload', getFacultyWorkload);
router.post('/hod/workload/rebalance', rebalanceFacultyWorkload);

router.get('/hod/advisors', getAdvisorCaseload);
router.post('/hod/advisors/redistribute', redistributeAdvisorCaseload);

router.get('/hod/recruitment', getRecruitmentPipeline);
router.post('/hod/recruitment/update-status', updateApplicantStatus);
router.post('/hod/recruitment/requisitions', createJobRequisition);

router.get('/hod/onboarding', getOnboardingTracker);
router.post('/hod/onboarding/update-task', updateOnboardingTask);
router.post('/hod/onboarding/activate', activateFacultyCandidate);

router.get('/hod/outcomes', getStudentOutcomes);

// Compatibility Routes
router.get('/hod/stats', getHODStats);
router.get('/hod/roster', getFacultyRoster);
router.get('/advisor/:advisorId/students', getAdvisorStudents);
router.get('/student/:studentId', getStudentData);
router.post('/feedback', submitFeedback);

module.exports = router;
