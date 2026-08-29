// In-memory Stateful Store for Adjunct Faculty Training Portal (Prof. Priya Sharma)

const facultyProfile = {
  id: 'u_fac_1',
  name: 'Prof. Priya Sharma',
  email: 'priya.faculty@univ.edu.in',
  role: 'Adjunct Faculty (Visiting Industry Trainer)',
  department: 'Computer Science & Engineering • Industry Training & Bootcamps',
  cabin: 'Training Complex A, Room 204',
  experience: '9 Years (Industry Fellow)',
  rating: '4.85 / 5.0 (Training Feedback)'
};

const facultyKPIs = {
  activeCourses: 3,
  totalStudents: 184,
  avgAttendance: 88.5,
  teachingRating: 4.85,
  pendingGrading: 14,
  unresolvedDoubts: 5
};

const todayLectures = [
  {
    id: 'lec_1',
    courseCode: 'CS301',
    courseTitle: 'Advanced Cloud Computing',
    time: '09:30 AM - 11:00 AM',
    room: 'Lecture Hall 4B',
    batch: 'B.Tech CSE - Section A',
    enrolledCount: 62,
    topic: 'Module 4: Kubernetes Cluster Architecture & Pod Scheduling',
    status: 'Upcoming'
  },
  {
    id: 'lec_2',
    courseCode: 'CS204',
    courseTitle: 'Distributed Systems Lab',
    time: '11:30 AM - 01:00 PM',
    room: 'Lab Complex 201',
    batch: 'B.Tech CSE - Section B',
    enrolledCount: 38,
    topic: 'Hands-on Lab 6: Raft Consensus Implementation in Go',
    status: 'Upcoming'
  },
  {
    id: 'lec_3',
    courseCode: 'CS402',
    courseTitle: 'High Performance Computing',
    time: '02:30 PM - 04:00 PM',
    room: 'Seminar Hall 1',
    batch: 'B.Tech CSE - Elective',
    enrolledCount: 84,
    topic: 'Module 5: GPU Kernel Parallelism & CUDA Thread Hierarchies',
    status: 'Upcoming'
  }
];

let facultyStudents = [
  {
    id: 'fs_1',
    rollNo: '2024CS101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@univ.edu.in',
    courseCode: 'CS301',
    semester: 4,
    internalMarks: 22,
    midtermMarks: 18,
    attendance: 58,
    standing: 'At Risk',
    avatar: 'AS'
  },
  {
    id: 'fs_2',
    rollNo: '2025CS142',
    name: 'Pooja Sundaram',
    email: 'pooja.s@univ.edu.in',
    courseCode: 'CS204',
    semester: 2,
    internalMarks: 20,
    midtermMarks: 19,
    attendance: 62,
    standing: 'At Risk',
    avatar: 'PS'
  },
  {
    id: 'fs_3',
    rollNo: '2024CS118',
    name: 'Rohan Gupta',
    email: 'rohan.g@univ.edu.in',
    courseCode: 'CS301',
    semester: 3,
    internalMarks: 26,
    midtermMarks: 24,
    attendance: 75,
    standing: 'Good Standing',
    avatar: 'RG'
  },
  {
    id: 'fs_4',
    rollNo: '2024CS129',
    name: 'Neha Verma',
    email: 'neha.v@univ.edu.in',
    courseCode: 'CS402',
    semester: 4,
    internalMarks: 27,
    midtermMarks: 25,
    attendance: 78,
    standing: 'Good Standing',
    avatar: 'NV'
  },
  {
    id: 'fs_5',
    rollNo: '2024CS155',
    name: 'Maya Patel',
    email: 'maya.p@univ.edu.in',
    courseCode: 'CS301',
    semester: 3,
    internalMarks: 29,
    midtermMarks: 28,
    attendance: 94,
    standing: "Dean's List",
    avatar: 'MP'
  },
  {
    id: 'fs_6',
    rollNo: '2025CS108',
    name: 'Kunal Shah',
    email: 'kunal.s@univ.edu.in',
    courseCode: 'CS204',
    semester: 2,
    internalMarks: 28,
    midtermMarks: 29,
    attendance: 91,
    standing: "Dean's List",
    avatar: 'KS'
  },
  {
    id: 'fs_7',
    rollNo: '2023CS042',
    name: 'Aditi Nair',
    email: 'aditi.n@univ.edu.in',
    courseCode: 'CS402',
    semester: 5,
    internalMarks: 30,
    midtermMarks: 30,
    attendance: 96,
    standing: "Dean's List",
    avatar: 'AN'
  },
  {
    id: 'fs_8',
    rollNo: '2024CS180',
    name: 'Siddharth Jain',
    email: 'siddharth.j@univ.edu.in',
    courseCode: 'CS301',
    semester: 3,
    internalMarks: 27,
    midtermMarks: 26,
    attendance: 89,
    standing: 'Good Standing',
    avatar: 'SJ'
  }
];

const facultyCourses = [
  {
    id: 'fc_1',
    code: 'CS301',
    title: 'Advanced Cloud Computing',
    credits: 4,
    enrolledCount: 62,
    syllabusWeeks: 14,
    completedWeeks: 9,
    syllabusPercent: 64,
    room: 'Lecture Hall 4B',
    schedule: 'Mon, Wed (09:30 AM - 11:00 AM)',
    nextAssignment: 'Lab Assignment 4: Microservice Deployment',
    assignmentDueDate: '2026-09-05',
    materialsCount: 16
  },
  {
    id: 'fc_2',
    code: 'CS204',
    title: 'Distributed Systems & Networks',
    credits: 4,
    enrolledCount: 38,
    syllabusWeeks: 14,
    completedWeeks: 8,
    syllabusPercent: 57,
    room: 'Lab Complex 201',
    schedule: 'Tue, Thu (11:30 AM - 01:00 PM)',
    nextAssignment: 'Project Milestone 2: Paxos Leader Election',
    assignmentDueDate: '2026-09-08',
    materialsCount: 12
  },
  {
    id: 'fc_3',
    code: 'CS402',
    title: 'High Performance Computing',
    credits: 3,
    enrolledCount: 84,
    syllabusWeeks: 14,
    completedWeeks: 10,
    syllabusPercent: 71,
    room: 'Seminar Hall 1',
    schedule: 'Mon, Fri (02:30 PM - 04:00 PM)',
    nextAssignment: 'Benchmark Report: OpenMP vs MPI Scaling',
    assignmentDueDate: '2026-09-12',
    materialsCount: 19
  }
];

const weeklyTimetable = [
  { day: 'Monday', time: '09:30 AM - 11:00 AM', course: 'CS301: Cloud Computing', type: 'Lecture', room: 'Hall 4B', batch: 'CSE-A' },
  { day: 'Monday', time: '02:30 PM - 04:00 PM', course: 'CS402: HPC Systems', type: 'Lecture', room: 'Seminar Hall 1', batch: 'CSE-Elective' },
  { day: 'Tuesday', time: '11:30 AM - 01:00 PM', course: 'CS204: Distributed Systems', type: 'Lab', room: 'Lab 201', batch: 'CSE-B' },
  { day: 'Tuesday', time: '03:00 PM - 04:30 PM', course: 'Office Hours & Research', type: 'Office Hours', room: 'Cabin 308', batch: 'All Advisees' },
  { day: 'Wednesday', time: '09:30 AM - 11:00 AM', course: 'CS301: Cloud Computing', type: 'Lecture', room: 'Hall 4B', batch: 'CSE-A' },
  { day: 'Thursday', time: '11:30 AM - 01:00 PM', course: 'CS204: Distributed Systems', type: 'Lecture', room: 'Hall 2A', batch: 'CSE-B' },
  { day: 'Thursday', time: '02:00 PM - 03:30 PM', course: 'Department Faculty Meeting', type: 'Meeting', room: 'Conference Room', batch: 'CSE Faculty' },
  { day: 'Friday', time: '02:30 PM - 04:00 PM', course: 'CS402: HPC Systems', type: 'Tutorial', room: 'Seminar Hall 1', batch: 'CSE-Elective' }
];

let attendanceSessions = [
  { id: 'att_1', courseCode: 'CS301', date: '2026-08-28', totalEnrolled: 62, presentCount: 56, absentCount: 6, status: 'Completed' },
  { id: 'att_2', courseCode: 'CS204', date: '2026-08-27', totalEnrolled: 38, presentCount: 35, absentCount: 3, status: 'Completed' },
  { id: 'att_3', courseCode: 'CS402', date: '2026-08-26', totalEnrolled: 84, presentCount: 76, absentCount: 8, status: 'Completed' }
];

let facultyNotices = [
  {
    id: 'not_1',
    title: 'Midterm Exam Schedule & Syllabus Guidelines (Fall 2026)',
    courseCode: 'All Courses',
    priority: 'Urgent',
    date: '2026-08-28',
    content: 'Midterm assessments will commence on September 15. The syllabus encompasses Modules 1 through 4. Sample numerical questions have been uploaded to the course catalog repository.'
  },
  {
    id: 'not_2',
    title: 'Kubernetes Cluster Lab Access Credentials Distributed',
    courseCode: 'CS301',
    priority: 'Important',
    date: '2026-08-26',
    content: 'All enrolled students have been provisioned SSH keys for the GPU cluster. Please verify connectivity before Lab 5 this Wednesday.'
  },
  {
    id: 'not_3',
    title: 'Rescheduled Office Hours Notice for Thursday',
    courseCode: 'General',
    priority: 'General',
    date: '2026-08-24',
    content: 'Office hours this Thursday are shifted from 3:00 PM to 4:30 PM due to the Department Curriculum Committee meeting.'
  }
];

let facultyMessages = [
  {
    id: 'msg_1',
    studentName: 'Aarav Sharma',
    studentEmail: 'aarav.sharma@univ.edu.in',
    course: 'CS301',
    subject: 'Clarification on Kubernetes CNI Plugin Network Policies',
    content: 'Professor, during the lecture on Calico vs Flannel CNI, I was confused regarding how network egress policies are enforced at the pod level.',
    status: 'Pending',
    timestamp: 'Today, 08:45 AM',
    avatar: 'AS',
    aiRecommendation: 'Explain that Calico utilizes Linux iptables and eBPF data planes to enforce fine-grained egress rules directly at the veth pair interface of each container pod.'
  },
  {
    id: 'msg_2',
    studentName: 'Pooja Sundaram',
    studentEmail: 'pooja.s@univ.edu.in',
    course: 'CS204',
    subject: 'Lab 6 Paxos Leader Election Heartbeat Timer Issue',
    content: 'In my Go implementation, split-brain scenario triggers when the heartbeat timeout is below 150ms. Should we implement randomized election timeouts?',
    status: 'Pending',
    timestamp: 'Yesterday, 04:20 PM',
    avatar: 'PS',
    aiRecommendation: 'Recommend utilizing randomized election timeouts (150ms-300ms) as specified in Section 5.2 of the Raft whitepaper to prevent simultaneous candidate splits.'
  },
  {
    id: 'msg_3',
    studentName: 'Rohan Gupta',
    studentEmail: 'rohan.g@univ.edu.in',
    course: 'CS301',
    subject: 'Assignment 3 Extension Request for Medical Grounds',
    content: 'Dear Prof. Priya, I was hospitalized for fever this weekend. I have submitted medical certificates to my advisor Dr. Ramesh Iyer and request a 2-day submission buffer.',
    status: 'Resolved',
    timestamp: '2026-08-25',
    avatar: 'RG',
    aiRecommendation: 'Verify advisor endorsement and grant a 48-hour extension without late penalty.'
  }
];

// Controller Handlers
exports.getFacultyOverview = (req, res) => {
  res.json({
    success: true,
    profile: facultyProfile,
    kpis: facultyKPIs,
    todayLectures,
    recentDoubts: facultyMessages.slice(0, 3),
    courses: facultyCourses
  });
};

exports.getFacultyStudents = (req, res) => {
  res.json({
    success: true,
    students: facultyStudents,
    totalCount: facultyStudents.length
  });
};

exports.getFacultyCourses = (req, res) => {
  res.json({
    success: true,
    courses: facultyCourses
  });
};

exports.getFacultyTimetable = (req, res) => {
  res.json({
    success: true,
    timetable: weeklyTimetable
  });
};

exports.getFacultyAttendance = (req, res) => {
  res.json({
    success: true,
    sessions: attendanceSessions,
    activeRoster: facultyStudents
  });
};

exports.markFacultyAttendance = (req, res) => {
  const { courseCode, date, presentStudentIds } = req.body;
  const totalEnrolled = facultyStudents.filter(s => s.courseCode === courseCode).length || facultyStudents.length;
  const presentCount = (presentStudentIds || []).length;
  const absentCount = Math.max(0, totalEnrolled - presentCount);

  const newSession = {
    id: `att_${Date.now()}`,
    courseCode: courseCode || 'CS301',
    date: date || new Date().toISOString().split('T')[0],
    totalEnrolled,
    presentCount,
    absentCount,
    status: 'Completed'
  };

  attendanceSessions.unshift(newSession);
  res.json({ success: true, session: newSession, message: 'Attendance registered successfully.' });
};

exports.getFacultyResults = (req, res) => {
  const gradeDistribution = [
    { name: 'CS301', 'Grade A': 42, 'Grade B': 51, 'Grade C': 21, 'Grade F': 11, passRate: 91.2 },
    { name: 'CS204', 'Grade A': 28, 'Grade B': 34, 'Grade C': 12, 'Grade F': 11, passRate: 87.0 },
    { name: 'CS402', 'Grade A': 25, 'Grade B': 45, 'Grade C': 38, 'Grade F': 30, passRate: 78.2 }
  ];

  res.json({
    success: true,
    students: facultyStudents,
    gradeDistribution
  });
};

exports.updateStudentMarks = (req, res) => {
  const { studentId, internalMarks, midtermMarks } = req.body;
  facultyStudents = facultyStudents.map(s => {
    if (s.id === studentId) {
      const sanitizedInternal = internalMarks !== undefined 
        ? Math.max(0, Math.min(30, Number(internalMarks) || 0)) 
        : s.internalMarks;
      const sanitizedMidterm = midtermMarks !== undefined 
        ? Math.max(0, Math.min(30, Number(midtermMarks) || 0)) 
        : s.midtermMarks;
      return {
        ...s,
        internalMarks: sanitizedInternal,
        midtermMarks: sanitizedMidterm
      };
    }
    return s;
  });

  res.json({ success: true, message: 'Marks validated and updated successfully within [0, 30].' });
};

exports.getFacultyNotices = (req, res) => {
  res.json({
    success: true,
    notices: facultyNotices
  });
};

exports.createFacultyNotice = (req, res) => {
  const { title, courseCode, priority, content } = req.body;
  const newNotice = {
    id: `not_${Date.now()}`,
    title: title || 'Course Announcement',
    courseCode: courseCode || 'All Courses',
    priority: priority || 'General',
    date: new Date().toISOString().split('T')[0],
    content: content || ''
  };

  facultyNotices.unshift(newNotice);
  res.json({ success: true, notice: newNotice, message: 'Notice published successfully.' });
};

exports.getFacultyMessages = (req, res) => {
  res.json({
    success: true,
    messages: facultyMessages
  });
};

exports.replyFacultyMessage = (req, res) => {
  const { messageId, reply } = req.body;
  facultyMessages = facultyMessages.map(m => {
    if (m.id === messageId) {
      return { ...m, status: 'Resolved', reply };
    }
    return m;
  });

  res.json({ success: true, message: 'Doubt query resolved successfully.' });
};
