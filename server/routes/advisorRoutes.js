const express = require('express');
const router = express.Router();
const {
  getAdvisorOverview,
  getAdvisorStudents,
  updateStudentNotes,
  getAdvisorPerformance,
  getAdvisorMeetings,
  scheduleAdvisorMeeting,
  updateMeetingStatus,
  getAdvisorReports
} = require('../controllers/advisorController');

// --- Advisor Portal Endpoints ---
router.get('/overview', getAdvisorOverview);
router.get('/students', getAdvisorStudents);
router.post('/students/:studentId/notes', updateStudentNotes);
router.get('/performance', getAdvisorPerformance);
router.get('/meetings', getAdvisorMeetings);
router.post('/meetings/schedule', scheduleAdvisorMeeting);
router.post('/meetings/:meetingId/status', updateMeetingStatus);
router.get('/reports', getAdvisorReports);

module.exports = router;
