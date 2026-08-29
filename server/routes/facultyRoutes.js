const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

router.get('/overview', facultyController.getFacultyOverview);
router.get('/students', facultyController.getFacultyStudents);
router.get('/courses', facultyController.getFacultyCourses);
router.get('/timetable', facultyController.getFacultyTimetable);
router.get('/attendance', facultyController.getFacultyAttendance);
router.post('/attendance/mark', facultyController.markFacultyAttendance);
router.get('/results', facultyController.getFacultyResults);
router.post('/results/update', facultyController.updateStudentMarks);
router.get('/notices', facultyController.getFacultyNotices);
router.post('/notices/create', facultyController.createFacultyNotice);
router.get('/messages', facultyController.getFacultyMessages);
router.post('/messages/reply', facultyController.replyFacultyMessage);

module.exports = router;
