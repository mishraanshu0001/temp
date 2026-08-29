// Advisor Portal Stateful Dataset & Controller
let advisorDataStore = {
  advisorProfile: {
    id: 'adv1',
    name: 'Dr. Ramesh Iyer',
    email: 'ramesh.advisor@univ.edu.in',
    role: 'advisor',
    department: 'Computer Science & Engineering',
    office: 'Academic Block B, Room 304',
    maxCapacityPoints: 120,
    caseloadScore: 138,
    status: 'Overloaded',
    assignedCount: 65,
    officeHours: 'Mon, Wed, Fri • 2:00 PM - 5:00 PM'
  },

  students: [
    {
      id: 's1',
      rollNo: '2024CS101',
      name: 'Aarav Sharma',
      email: 'aarav.sharma@univ.edu.in',
      avatar: 'AS',
      semester: 4,
      cgpa: 5.4,
      attendance: 58,
      creditsEarned: 64,
      totalCreditsReq: 160,
      risk: 'high',
      riskPoints: 3,
      status: 'Critical Risk',
      standing: 'Academic Probation',
      lastMeetingDate: '2026-08-18',
      advisorNotes: 'Struggling with CS201 Algorithms mid-term. Referred to peer tutoring center.',
      courseBacklogs: ['CS201 Data Structures (Repeat)', 'MATH201 Discrete Structures'],
      coursesThisTerm: [
        { code: 'CS301', title: 'Advanced Python', grade: 'C+', attendance: 62 },
        { code: 'CS201', title: 'Data Structures', grade: 'D', attendance: 54 },
        { code: 'CS350', title: 'Database Systems', grade: 'C', attendance: 58 }
      ]
    },
    {
      id: 's2',
      rollNo: '2025CS142',
      name: 'Pooja Sundaram',
      email: 'pooja.s@univ.edu.in',
      avatar: 'PS',
      semester: 2,
      cgpa: 5.8,
      attendance: 62,
      creditsEarned: 28,
      totalCreditsReq: 160,
      risk: 'high',
      riskPoints: 3,
      status: 'Critical Risk',
      standing: 'Academic Warning',
      lastMeetingDate: '2026-08-22',
      advisorNotes: 'Attendance dipped due to medical absence. Medical certificates verified.',
      courseBacklogs: ['PHY101 Applied Physics'],
      coursesThisTerm: [
        { code: 'CS101', title: 'Introduction to CS', grade: 'C', attendance: 60 },
        { code: 'MATH101', title: 'Calculus I', grade: 'C-', attendance: 64 }
      ]
    },
    {
      id: 's3',
      rollNo: '2024CS118',
      name: 'Rohan Gupta',
      email: 'rohan.g@univ.edu.in',
      avatar: 'RG',
      semester: 3,
      cgpa: 6.8,
      attendance: 75,
      creditsEarned: 48,
      totalCreditsReq: 160,
      risk: 'medium',
      riskPoints: 2,
      status: 'Moderate Risk',
      standing: 'Good Standing',
      lastMeetingDate: '2026-08-10',
      advisorNotes: 'Discussed minor elective selection in AI & ML. Recommended DS301 next term.',
      courseBacklogs: [],
      coursesThisTerm: [
        { code: 'CS205', title: 'Discrete Math', grade: 'B', attendance: 78 },
        { code: 'CS201', title: 'Data Structures', grade: 'B-', attendance: 72 }
      ]
    },
    {
      id: 's4',
      rollNo: '2024CS129',
      name: 'Neha Verma',
      email: 'neha.v@univ.edu.in',
      avatar: 'NV',
      semester: 4,
      cgpa: 7.1,
      attendance: 78,
      creditsEarned: 66,
      totalCreditsReq: 160,
      risk: 'medium',
      riskPoints: 2,
      status: 'Moderate Risk',
      standing: 'Good Standing',
      lastMeetingDate: '2026-08-05',
      advisorNotes: 'Reviewed internship offer from TCS Innovate. Approved credit waiver form.',
      courseBacklogs: [],
      coursesThisTerm: [
        { code: 'CS301', title: 'Advanced Python', grade: 'B+', attendance: 80 },
        { code: 'CS350', title: 'Database Systems', grade: 'B', attendance: 76 }
      ]
    },
    {
      id: 's5',
      rollNo: '2024CS155',
      name: 'Maya Patel',
      email: 'maya.p@univ.edu.in',
      avatar: 'MP',
      semester: 3,
      cgpa: 8.9,
      attendance: 94,
      creditsEarned: 52,
      totalCreditsReq: 160,
      risk: 'low',
      riskPoints: 1,
      status: 'Healthy',
      standing: "Dean's List",
      lastMeetingDate: '2026-07-28',
      advisorNotes: 'Candidate for accelerated research honors program with Dr. Ananya Gupta.',
      courseBacklogs: [],
      coursesThisTerm: [
        { code: 'DS301', title: 'Big Data Processing', grade: 'A', attendance: 96 },
        { code: 'CS201', title: 'Data Structures', grade: 'A', attendance: 92 }
      ]
    },
    {
      id: 's6',
      rollNo: '2025CS108',
      name: 'Kunal Shah',
      email: 'kunal.s@univ.edu.in',
      avatar: 'KS',
      semester: 2,
      cgpa: 8.6,
      attendance: 91,
      creditsEarned: 32,
      totalCreditsReq: 160,
      risk: 'low',
      riskPoints: 1,
      status: 'Healthy',
      standing: "Dean's List",
      lastMeetingDate: '2026-08-12',
      advisorNotes: 'Interested in competitive coding hackathons. Directed to Google Developer Club.',
      courseBacklogs: [],
      coursesThisTerm: [
        { code: 'CS101', title: 'Intro to CS', grade: 'A', attendance: 92 },
        { code: 'MATH101', title: 'Calculus I', grade: 'A-', attendance: 90 }
      ]
    },
    {
      id: 's7',
      rollNo: '2023CS042',
      name: 'Aditi Nair',
      email: 'aditi.n@univ.edu.in',
      avatar: 'AN',
      semester: 5,
      cgpa: 9.1,
      attendance: 96,
      creditsEarned: 88,
      totalCreditsReq: 160,
      risk: 'low',
      riskPoints: 1,
      status: 'Healthy',
      standing: "Dean's List",
      lastMeetingDate: '2026-08-14',
      advisorNotes: 'Finalizing pre-requisites for Capstone Project in Distributed Blockchain Systems.',
      courseBacklogs: [],
      coursesThisTerm: [
        { code: 'SEC301', title: 'Network Security', grade: 'A+', attendance: 98 },
        { code: 'CS402', title: 'Machine Learning', grade: 'A', attendance: 94 }
      ]
    },
    {
      id: 's8',
      rollNo: '2024CS180',
      name: 'Siddharth Jain',
      email: 'siddharth.j@univ.edu.in',
      avatar: 'SJ',
      semester: 3,
      cgpa: 8.4,
      attendance: 89,
      creditsEarned: 50,
      totalCreditsReq: 160,
      risk: 'low',
      riskPoints: 1,
      status: 'Healthy',
      standing: 'Good Standing',
      lastMeetingDate: '2026-08-02',
      advisorNotes: 'Requested permission for cross-department elective in Financial Technology.',
      courseBacklogs: [],
      coursesThisTerm: [
        { code: 'CS350', title: 'Database Systems', grade: 'A-', attendance: 90 },
        { code: 'CS201', title: 'Data Structures', grade: 'B+', attendance: 88 }
      ]
    }
  ],

  meetings: [
    {
      id: 'm1',
      studentId: 's1',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@univ.edu.in',
      date: '2026-08-30',
      time: '14:30',
      durationMinutes: 30,
      type: 'Academic Probation Recovery',
      mode: 'In-Person (Room 304)',
      status: 'Upcoming',
      priority: 'Urgent',
      notes: 'Review bi-weekly attendance progress and quiz 2 preparation in Data Structures.'
    },
    {
      id: 'm2',
      studentId: 's2',
      studentName: 'Pooja Sundaram',
      studentEmail: 'pooja.s@univ.edu.in',
      date: '2026-08-31',
      time: '15:15',
      durationMinutes: 30,
      type: 'Attendance & Medical Review',
      mode: 'Google Meet',
      status: 'Upcoming',
      priority: 'Urgent',
      notes: 'Finalize compensatory assignment submission deadline with Physics professor.'
    },
    {
      id: 'm3',
      studentId: 's4',
      studentName: 'Neha Verma',
      studentEmail: 'neha.v@univ.edu.in',
      date: '2026-09-02',
      time: '16:00',
      durationMinutes: 20,
      type: 'Internship Credit Approval',
      mode: 'In-Person (Room 304)',
      status: 'Upcoming',
      priority: 'Normal',
      notes: 'Sign off on industry semester internship contract and elective credit mapping.'
    },
    {
      id: 'm4',
      studentId: 's3',
      studentName: 'Rohan Gupta',
      studentEmail: 'rohan.g@univ.edu.in',
      date: '2026-08-10',
      time: '11:00',
      durationMinutes: 25,
      type: 'Course Add/Drop Consultation',
      mode: 'In-Person (Room 304)',
      status: 'Completed',
      priority: 'Normal',
      notes: 'Successfully dropped elective without penalty. Registered for Data Structures.'
    },
    {
      id: 'm5',
      studentId: 's7',
      studentName: 'Aditi Nair',
      studentEmail: 'aditi.n@univ.edu.in',
      date: '2026-08-14',
      time: '10:30',
      durationMinutes: 30,
      type: 'Capstone Proposal Review',
      mode: 'Google Meet',
      status: 'Completed',
      priority: 'Normal',
      notes: 'Reviewed capstone topic synopsis. Approved collaboration with industry mentor.'
    }
  ],

  messages: [
    {
      id: 'msg1',
      studentId: 's1',
      studentName: 'Aarav Sharma',
      studentEmail: 'aarav.sharma@univ.edu.in',
      avatar: 'AS',
      subject: 'Assistance with Data Structures mid-term re-evaluation',
      course: 'CS201',
      timestamp: 'Today, 11:20 AM',
      status: 'Pending',
      urgency: 'High',
      content: 'Respected Sir, I received 18/50 in my CS201 mid-term. I felt question 3 was graded strictly on recursion trees. Can I meet during office hours to discuss how to cover the remaining 50 marks in the finals?',
      aiRecommendation: 'Aarav is on Academic Probation with a 5.4 CGPA. Offer a 1-on-1 counseling slot today at 2:30 PM and connect him with Teaching Assistant Prof. Priya Sharma for algorithm remediation.'
    },
    {
      id: 'msg2',
      studentId: 's2',
      studentName: 'Pooja Sundaram',
      studentEmail: 'pooja.s@univ.edu.in',
      avatar: 'PS',
      subject: 'Submission of Medical Fitness Certificate',
      course: 'General Advisory',
      timestamp: 'Yesterday, 4:45 PM',
      status: 'Pending',
      urgency: 'Medium',
      content: 'Sir, I have attached my medical discharge summary for the 2 weeks of missed classes. The examination office requires advisor endorsement before approving my attendance makeup form.',
      aiRecommendation: 'Verify hospital clearance certificate. Generate official Advisor Medical Concession Form and forward to Academic Registrar.'
    },
    {
      id: 'msg3',
      studentId: 's5',
      studentName: 'Maya Patel',
      studentEmail: 'maya.p@univ.edu.in',
      avatar: 'MP',
      subject: 'Honors Research Track Application',
      course: 'AI Honors',
      timestamp: '28 Aug 2026',
      status: 'Resolved',
      urgency: 'Normal',
      content: 'Dr. Ramesh, Dr. Ananya Gupta has agreed to supervise my research on Neural Architecture Search. Thank you for forwarding my recommendation letter!',
      aiRecommendation: 'Log Honors Research Milestone in Maya Patel student dossier.'
    }
  ],

  performanceData: {
    cohortSummary: {
      totalAdvisees: 65,
      avgCGPA: 7.42,
      avgAttendance: 86.4,
      deansListCount: 18,
      goodStandingCount: 35,
      academicWarningCount: 8,
      probationCount: 4,
      retentionRate: 96.8
    },
    gpaDistribution: [
      { range: '9.0 - 10.0', students: 12, category: 'Outstanding' },
      { range: '8.0 - 8.9', students: 22, category: 'Very Good' },
      { range: '7.0 - 7.9', students: 19, category: 'Good' },
      { range: '6.0 - 6.9', students: 8, category: 'Satisfactory' },
      { range: 'Under 6.0', students: 4, category: 'Critical Alert' }
    ],
    attendanceCorrelation: [
      { attendanceTier: '90-100%', avgCGPA: 8.85, studentCount: 28 },
      { attendanceTier: '80-89%', avgCGPA: 7.60, studentCount: 22 },
      { attendanceTier: '70-79%', avgCGPA: 6.75, studentCount: 9 },
      { attendanceTier: 'Below 70%', avgCGPA: 5.50, studentCount: 6 }
    ],
    subjectBottlenecks: [
      { code: 'CS101', title: 'Intro to Computer Science', atRiskCount: 6, failureRate: 14.2, faculty: 'Prof. Amit Patel' },
      { code: 'CS201', title: 'Data Structures & Algorithms', atRiskCount: 8, failureRate: 18.5, faculty: 'Dr. Alok Verma' },
      { code: 'MATH201', title: 'Discrete Mathematics', atRiskCount: 5, failureRate: 12.0, faculty: 'Prof. Priya Sharma' }
    ]
  },

  reports: {
    term: 'Fall 2026',
    generatedAt: '2026-08-30',
    complianceRate: 98.4,
    totalMeetingsConducted: 42,
    interventionSuccessRate: 82.5,
    probationClearanceRate: 75.0,
    deanSummary: 'Dr. Ramesh Iyer has managed 65 student portfolios with 42 recorded counseling interventions. 12 at-risk students are enrolled in structured peer tutoring. Recommended load rebalancing to bring caseload score from 138 to optimal 100.'
  }
};

// -------------------------------------------------------------
// ADVISOR CONTROLLER HANDLERS
// -------------------------------------------------------------

const getAdvisorOverview = async (req, res) => {
  try {
    const totalStudents = advisorDataStore.students.length;
    const highRisk = advisorDataStore.students.filter(s => s.risk === 'high').length;
    const mediumRisk = advisorDataStore.students.filter(s => s.risk === 'medium').length;
    const lowRisk = advisorDataStore.students.filter(s => s.risk === 'low').length;

    const upcomingMeetings = advisorDataStore.meetings.filter(m => m.status === 'Upcoming');
    const pendingMessages = advisorDataStore.messages.filter(m => m.status === 'Pending');

    return res.json({
      profile: advisorDataStore.advisorProfile,
      kpis: {
        totalStudents: 65,
        caseloadScore: advisorDataStore.advisorProfile.caseloadScore,
        maxCapacity: advisorDataStore.advisorProfile.maxCapacityPoints,
        status: advisorDataStore.advisorProfile.status,
        highRiskCount: highRisk,
        mediumRiskCount: mediumRisk,
        lowRiskCount: lowRisk,
        atRiskTotal: highRisk + mediumRisk,
        avgCGPA: advisorDataStore.performanceData.cohortSummary.avgCGPA,
        avgAttendance: advisorDataStore.performanceData.cohortSummary.avgAttendance,
        upcomingMeetingsCount: upcomingMeetings.length,
        pendingMessagesCount: pendingMessages.length
      },
      alerts: [
        {
          id: 'adv-alt-1',
          title: 'Critical Academic Probation Alert',
          message: 'Aarav Sharma (2024CS101) attendance dropped to 58% with 2 course backlogs.',
          severity: 'high',
          studentId: 's1',
          action: 'Schedule Emergency Review'
        },
        {
          id: 'adv-alt-2',
          title: 'Caseload Capacity Exceeded',
          message: 'Your risk-weighted caseload score is 138 pts (> 120 threshold). Department Chair alerted.',
          severity: 'medium',
          action: 'View Redistribution Status'
        },
        {
          id: 'adv-alt-3',
          title: 'Dean\'s List Recommendation Due',
          message: '4 advisees qualify for accelerated semester honors and scholarship endorsements.',
          severity: 'low',
          action: 'Submit Endorsements'
        }
      ],
      todaySessions: upcomingMeetings.slice(0, 3)
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAdvisorStudents = async (req, res) => {
  try {
    return res.json({
      students: advisorDataStore.students
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateStudentNotes = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { notes } = req.body;
    const student = advisorDataStore.students.find(s => s.id === studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    student.advisorNotes = notes;
    student.lastMeetingDate = new Date().toISOString().split('T')[0];

    return res.json({ success: true, student });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAdvisorPerformance = async (req, res) => {
  try {
    return res.json(advisorDataStore.performanceData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAdvisorMeetings = async (req, res) => {
  try {
    return res.json({
      meetings: advisorDataStore.meetings
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const scheduleAdvisorMeeting = async (req, res) => {
  try {
    const { studentId, date, time, durationMinutes, type, mode, notes } = req.body;
    const student = advisorDataStore.students.find(s => s.id === studentId);
    if (!student) return res.status(404).json({ error: 'Student not found' });

    const newMeeting = {
      id: `m_${Date.now().toString().slice(-4)}`,
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      date: date || new Date().toISOString().split('T')[0],
      time: time || '14:00',
      durationMinutes: durationMinutes || 30,
      type: type || 'Academic Advisory Consultation',
      mode: mode || 'In-Person (Room 304)',
      status: 'Upcoming',
      priority: student.risk === 'high' ? 'Urgent' : 'Normal',
      notes: notes || 'Advisory check-in session.'
    };

    advisorDataStore.meetings.unshift(newMeeting);
    return res.json({ success: true, meeting: newMeeting });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateMeetingStatus = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const { status } = req.body;
    const meeting = advisorDataStore.meetings.find(m => m.id === meetingId);
    if (!meeting) return res.status(404).json({ error: 'Meeting not found' });

    meeting.status = status;
    return res.json({ success: true, meeting });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getAdvisorReports = async (req, res) => {
  try {
    return res.json({
      reports: advisorDataStore.reports,
      cohortSummary: advisorDataStore.performanceData.cohortSummary
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAdvisorOverview,
  getAdvisorStudents,
  updateStudentNotes,
  getAdvisorPerformance,
  getAdvisorMeetings,
  scheduleAdvisorMeeting,
  updateMeetingStatus,
  getAdvisorReports
};
