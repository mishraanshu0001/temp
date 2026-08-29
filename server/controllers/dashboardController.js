const supabase = require('../config/supabase');

// --- In-Memory Stateful Store for Interactive Real-Time Demonstrations ---
let hodDataStore = {
  // Department Meta
  department: {
    name: 'Department of Computer Science & Engineering',
    code: 'CSE',
    term: 'Fall 2026',
    hodName: 'Dr. Alan Smith',
    budget: {
      allocated: 120000,
      spent: 84500,
      currency: 'USD',
      adjunctHourlyRateAvg: 75,
      hoursLoggedThisMonth: 1126,
      hoursAllocatedCap: 1600
    }
  },

  // Faculty Workload
  facultyWorkload: [
    {
      id: 'f1',
      name: 'Prof. Jane Doe',
      email: 'jane.adjunct@univ.edu',
      type: 'Adjunct',
      department: 'Computer Science',
      avatar: 'JD',
      maxWeeklyHours: 18,
      currentWeeklyHours: 22,
      workloadScore: 92,
      status: 'Overloaded',
      rating: 4.8,
      doubtSlaPercent: 98.2,
      assignedCourses: [
        { id: 'c101', code: 'CS301', title: 'Advanced Python Programming', section: 'Sec A', credits: 4, students: 65, weeklyHours: 8, labHours: 2 },
        { id: 'c102', code: 'CS402', title: 'Machine Learning Basics', section: 'Sec A', credits: 3, students: 58, weeklyHours: 6, labHours: 2 },
        { id: 'c103', code: 'CS301', title: 'Advanced Python Programming', section: 'Sec B', credits: 4, students: 60, weeklyHours: 8, labHours: 0 }
      ]
    },
    {
      id: 'f2',
      name: 'Dr. Alex Rivera',
      email: 'alex.rivera@univ.edu',
      type: 'Full-Time',
      department: 'Computer Science',
      avatar: 'AR',
      maxWeeklyHours: 20,
      currentWeeklyHours: 10,
      workloadScore: 50,
      status: 'Available',
      rating: 4.6,
      doubtSlaPercent: 93.5,
      assignedCourses: [
        { id: 'c201', code: 'CS201', title: 'Data Structures & Algorithms', section: 'Sec A', credits: 4, students: 45, weeklyHours: 8, labHours: 2 }
      ]
    },
    {
      id: 'f3',
      name: 'Dr. Sarah Jenkins',
      email: 'sarah.j@univ.edu',
      type: 'Full-Time',
      department: 'AI & Data Science',
      avatar: 'SJ',
      maxWeeklyHours: 20,
      currentWeeklyHours: 16,
      workloadScore: 78,
      status: 'Optimal',
      rating: 4.9,
      doubtSlaPercent: 99.0,
      assignedCourses: [
        { id: 'c301', code: 'DS301', title: 'Big Data Processing', section: 'Sec A', credits: 4, students: 52, weeklyHours: 8, labHours: 2 },
        { id: 'c302', code: 'DS401', title: 'Deep Learning Architectures', section: 'Sec A', credits: 3, students: 48, weeklyHours: 6, labHours: 0 }
      ]
    },
    {
      id: 'f4',
      name: 'Prof. Michael Chang',
      email: 'm.chang@univ.edu',
      type: 'Adjunct',
      department: 'Computer Science',
      avatar: 'MC',
      maxWeeklyHours: 18,
      currentWeeklyHours: 20,
      workloadScore: 89,
      status: 'Overloaded',
      rating: 4.2,
      doubtSlaPercent: 82.1,
      assignedCourses: [
        { id: 'c401', code: 'CS101', title: 'Introduction to CS', section: 'Sec A', credits: 3, students: 70, weeklyHours: 7, labHours: 2 },
        { id: 'c402', code: 'CS101', title: 'Introduction to CS', section: 'Sec B', credits: 3, students: 68, weeklyHours: 7, labHours: 2 },
        { id: 'c403', code: 'CS205', title: 'Discrete Mathematics', section: 'Sec A', credits: 3, students: 55, weeklyHours: 6, labHours: 0 }
      ]
    },
    {
      id: 'f5',
      name: 'Dr. Priya Sharma',
      email: 'priya.s@univ.edu',
      type: 'Adjunct',
      department: 'Cybersecurity',
      avatar: 'PS',
      maxWeeklyHours: 16,
      currentWeeklyHours: 8,
      workloadScore: 50,
      status: 'Available',
      rating: 4.7,
      doubtSlaPercent: 96.0,
      assignedCourses: [
        { id: 'c501', code: 'SEC301', title: 'Network Security Fundamentals', section: 'Sec A', credits: 3, students: 40, weeklyHours: 6, labHours: 2 }
      ]
    },
    {
      id: 'f6',
      name: 'Prof. Robert Taylor',
      email: 'r.taylor@univ.edu',
      type: 'Full-Time',
      department: 'Computer Science',
      avatar: 'RT',
      maxWeeklyHours: 20,
      currentWeeklyHours: 16,
      workloadScore: 80,
      status: 'Optimal',
      rating: 4.7,
      doubtSlaPercent: 95.4,
      assignedCourses: [
        { id: 'c601', code: 'CS350', title: 'Database Management Systems', section: 'Sec A', credits: 4, students: 50, weeklyHours: 8, labHours: 2 },
        { id: 'c602', code: 'CS350', title: 'Database Management Systems', section: 'Sec B', credits: 4, students: 48, weeklyHours: 8, labHours: 0 }
      ]
    }
  ],

  // Advisor Caseload
  advisors: [
    {
      id: 'adv1',
      name: 'Mark Evans',
      email: 'mark.advisor@univ.edu',
      department: 'Computer Science',
      avatar: 'ME',
      maxCapacityPoints: 120,
      caseloadScore: 138,
      status: 'Overloaded',
      totalStudentsCount: 65,
      assignedStudents: [
        { id: 's1', name: 'Alice Wong', email: 'alice.wong@univ.edu', semester: 4, cgpa: 5.4, attendance: 58, risk: 'high', riskPoints: 3, major: 'Computer Science' },
        { id: 's2', name: 'Liam Wilson', email: 'liam.w@univ.edu', semester: 2, cgpa: 5.8, attendance: 62, risk: 'high', riskPoints: 3, major: 'Computer Science' },
        { id: 's3', name: 'Alex Johnson', email: 'alex.j@univ.edu', semester: 3, cgpa: 6.8, attendance: 75, risk: 'medium', riskPoints: 2, major: 'Computer Science' },
        { id: 's4', name: 'Daniel Garcia', email: 'd.garcia@univ.edu', semester: 4, cgpa: 7.1, attendance: 78, risk: 'medium', riskPoints: 2, major: 'Computer Science' },
        { id: 's5', name: 'Maya Patel', email: 'maya.p@univ.edu', semester: 3, cgpa: 8.9, attendance: 94, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's6', name: 'Ethan Brooks', email: 'e.brooks@univ.edu', semester: 2, cgpa: 8.6, attendance: 91, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's7', name: 'Hannah Lee', email: 'hannah.l@univ.edu', semester: 5, cgpa: 9.1, attendance: 96, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's8', name: 'Tyler Reed', email: 'tyler.r@univ.edu', semester: 3, cgpa: 8.4, attendance: 89, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's9', name: 'Chloe Adams', email: 'chloe.a@univ.edu', semester: 4, cgpa: 8.8, attendance: 92, risk: 'low', riskPoints: 1, major: 'Computer Science' }
      ]
    },
    {
      id: 'adv2',
      name: 'Elena Rostova',
      email: 'elena.r@univ.edu',
      department: 'Computer Science',
      avatar: 'ER',
      maxCapacityPoints: 120,
      caseloadScore: 72,
      status: 'Available',
      totalStudentsCount: 38,
      assignedStudents: [
        { id: 's10', name: 'Kevin Zhang', email: 'kevin.z@univ.edu', semester: 3, cgpa: 7.9, attendance: 85, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's11', name: 'Rachel Green', email: 'rachel.g@univ.edu', semester: 2, cgpa: 7.2, attendance: 76, risk: 'medium', riskPoints: 2, major: 'Computer Science' },
        { id: 's12', name: 'Nina Simone', email: 'nina.s@univ.edu', semester: 1, cgpa: 8.5, attendance: 90, risk: 'low', riskPoints: 1, major: 'Computer Science' }
      ]
    },
    {
      id: 'adv3',
      name: 'David Kalu',
      email: 'david.kalu@univ.edu',
      department: 'AI & Data Science',
      avatar: 'DK',
      maxCapacityPoints: 120,
      caseloadScore: 94,
      status: 'Optimal',
      totalStudentsCount: 48,
      assignedStudents: [
        { id: 's13', name: 'Marcus Bell', email: 'm.bell@univ.edu', semester: 4, cgpa: 6.4, attendance: 70, risk: 'medium', riskPoints: 2, major: 'AI & Data Science' },
        { id: 's14', name: 'Zoe Campbell', email: 'z.campbell@univ.edu', semester: 1, cgpa: 8.9, attendance: 95, risk: 'low', riskPoints: 1, major: 'AI & Data Science' },
        { id: 's15', name: 'Tariq Vance', email: 't.vance@univ.edu', semester: 3, cgpa: 5.7, attendance: 63, risk: 'high', riskPoints: 3, major: 'AI & Data Science' }
      ]
    }
  ],

  // Recruitment Requisitions & ATS Applicants
  jobRequisitions: [
    {
      id: 'REQ-01',
      title: 'Adjunct Professor - Cloud Architecture',
      department: 'Computer Science',
      positions: 2,
      applicantsCount: 5,
      status: 'Active',
      hourlyRate: '$75 - $95 / hr',
      urgency: 'High',
      postedDate: '2026-08-10'
    },
    {
      id: 'REQ-02',
      title: 'Guest Lecturer - Applied Machine Learning',
      department: 'AI & Data Science',
      positions: 1,
      applicantsCount: 4,
      status: 'Active',
      hourlyRate: '$80 - $105 / hr',
      urgency: 'Medium',
      postedDate: '2026-08-14'
    },
    {
      id: 'REQ-03',
      title: 'Instructor - Ethical Hacking & SecOps',
      department: 'Cybersecurity',
      positions: 1,
      applicantsCount: 3,
      status: 'Active',
      hourlyRate: '$70 - $90 / hr',
      urgency: 'Normal',
      postedDate: '2026-08-18'
    }
  ],

  applicants: [
    {
      id: 'APP-201',
      jobId: 'REQ-01',
      name: 'Dr. Emily Watson',
      email: 'emily.watson@example.com',
      phone: '+1 (555) 234-5678',
      experienceYears: 9,
      status: 'Applied',
      matchScore: 92,
      appliedDate: '2026-08-28',
      expectedHourlyRate: '$85',
      degree: 'Ph.D. in Distributed Systems (MIT)',
      notes: 'Strong industry background at AWS. Specialized in Kubernetes and Microservices.'
    },
    {
      id: 'APP-202',
      jobId: 'REQ-01',
      name: 'Brian Miller',
      email: 'brian.miller@example.com',
      phone: '+1 (555) 345-6789',
      experienceYears: 7,
      status: 'Applied',
      matchScore: 84,
      appliedDate: '2026-08-27',
      expectedHourlyRate: '$78',
      degree: 'M.S. in Computer Engineering (Stanford)',
      notes: 'Solutions Architect at Datadog with prior teaching assistant experience.'
    },
    {
      id: 'APP-203',
      jobId: 'REQ-02',
      name: 'Dr. Rajesh Verma',
      email: 'rajesh.v@example.com',
      phone: '+1 (555) 456-7890',
      experienceYears: 12,
      status: 'Screening',
      matchScore: 95,
      appliedDate: '2026-08-24',
      expectedHourlyRate: '$95',
      degree: 'Ph.D. in Machine Learning (CMU)',
      notes: 'Passed initial background screening. Demo lecture scheduled for Tuesday.'
    },
    {
      id: 'APP-204',
      jobId: 'REQ-02',
      name: 'Dr. Carlos Mendez',
      email: 'carlos.m@example.com',
      phone: '+1 (555) 567-8901',
      experienceYears: 6,
      status: 'Interview',
      matchScore: 89,
      appliedDate: '2026-08-20',
      expectedHourlyRate: '$85',
      degree: 'Ph.D. in Computational AI (Oxford)',
      notes: 'Interview committee rated pedagogical clarity 4.8/5.0. Recommended for selection.'
    },
    {
      id: 'APP-205',
      jobId: 'REQ-03',
      name: 'Dr. Sophia Martinez',
      email: 'sophia.m@example.com',
      phone: '+1 (555) 678-9012',
      experienceYears: 11,
      status: 'Selected',
      matchScore: 97,
      appliedDate: '2026-08-15',
      expectedHourlyRate: '$90',
      degree: 'Ph.D. in Cyber Defense (Georgia Tech)',
      notes: 'Offer letter signed. Moved to onboarding workflow.'
    },
    {
      id: 'APP-206',
      jobId: 'REQ-01',
      name: 'Prof. Eve Brown',
      email: 'eve.b@example.com',
      phone: '+1 (555) 789-0123',
      experienceYears: 10,
      status: 'Onboarding',
      matchScore: 93,
      appliedDate: '2026-08-01',
      expectedHourlyRate: '$80',
      degree: 'M.S. in Computer Science (UC Berkeley)',
      notes: 'Onboarding in final stages. LMS and mentor verification underway.'
    }
  ],

  // Onboarding Tracker
  onboardingList: [
    {
      id: 'ONB-01',
      candidateName: 'Dr. Sophia Martinez',
      email: 'sophia.m@univ.edu',
      role: 'Adjunct Professor - Cloud Security',
      department: 'Cybersecurity',
      avatar: 'SM',
      startDate: '2026-09-15',
      overallProgress: 60,
      status: 'In Progress',
      assignedMentor: 'Dr. Priya Sharma',
      tasks: [
        { id: 't1', title: 'Identity & SSN/Tax Verification (W-9)', phase: 'Documents', completed: true, requiredBy: 'HR Compliance' },
        { id: 't2', title: 'Ph.D. Transcripts & Credential Audit', phase: 'Documents', completed: true, requiredBy: 'Academic Council' },
        { id: 't3', title: 'University Email Provisioning', phase: 'IT & LMS', completed: true, requiredBy: 'IT Services' },
        { id: 't4', title: 'Canvas LMS Instructor Sandbox Setup', phase: 'IT & LMS', completed: true, requiredBy: 'E-Learning Support' },
        { id: 't5', title: 'Course Syllabus & Grading Rubric Sign-off', phase: 'Curriculum', completed: false, requiredBy: 'HOD Dr. Alan Smith' },
        { id: 't6', title: 'Department Faculty Orientation & SLA Training', phase: 'Orientation', completed: false, requiredBy: 'Department Chair' },
        { id: 't7', title: 'Classroom Tech Dry-run & Mentor Sign-off', phase: 'Readiness', completed: false, requiredBy: 'Assigned Mentor' }
      ]
    },
    {
      id: 'ONB-02',
      candidateName: 'Prof. Eve Brown',
      email: 'eve.b@univ.edu',
      role: 'Adjunct Lecturer - Python Programming',
      department: 'Computer Science',
      avatar: 'EB',
      startDate: '2026-09-01',
      overallProgress: 86,
      status: 'In Progress',
      assignedMentor: 'Prof. Jane Doe',
      tasks: [
        { id: 't11', title: 'Identity & SSN/Tax Verification (W-9)', phase: 'Documents', completed: true, requiredBy: 'HR Compliance' },
        { id: 't12', title: 'M.S. Transcripts & Credential Audit', phase: 'Documents', completed: true, requiredBy: 'Academic Council' },
        { id: 't13', title: 'University Email Provisioning', phase: 'IT & LMS', completed: true, requiredBy: 'IT Services' },
        { id: 't14', title: 'Canvas LMS Instructor Sandbox Setup', phase: 'IT & LMS', completed: true, requiredBy: 'E-Learning Support' },
        { id: 't15', title: 'Course Syllabus & Grading Rubric Sign-off', phase: 'Curriculum', completed: true, requiredBy: 'HOD Dr. Alan Smith' },
        { id: 't16', title: 'Department Faculty Orientation & SLA Training', phase: 'Orientation', completed: true, requiredBy: 'Department Chair' },
        { id: 't17', title: 'Classroom Tech Dry-run & Mentor Sign-off', phase: 'Readiness', completed: false, requiredBy: 'Assigned Mentor' }
      ]
    }
  ],

  // Performance & Student Outcomes
  outcomes: {
    summary: {
      avgDepartmentGPA: 3.38,
      overallPassRate: 88.6,
      studentSatisfaction: 94.2,
      doubtSlaCompliance: 94.8,
      atRiskStudentCount: 45
    },
    courseOutcomes: [
      {
        id: 'co1',
        code: 'CS301',
        title: 'Advanced Python Programming',
        instructor: 'Prof. Jane Doe',
        enrolled: 125,
        passRate: 91.2,
        avgGPA: 3.42,
        feedbackRating: 4.8,
        doubtSla: 98.2,
        riskStatus: 'Healthy',
        grades: { A: 42, B: 51, C: 21, F: 11 }
      },
      {
        id: 'co2',
        code: 'CS402',
        title: 'Machine Learning Basics',
        instructor: 'Prof. Jane Doe',
        enrolled: 85,
        passRate: 87.0,
        avgGPA: 3.25,
        feedbackRating: 4.7,
        doubtSla: 94.5,
        riskStatus: 'Moderate',
        grades: { A: 28, B: 34, C: 12, F: 11 }
      },
      {
        id: 'co3',
        code: 'CS101',
        title: 'Introduction to CS',
        instructor: 'Prof. Michael Chang',
        enrolled: 138,
        passRate: 78.2,
        avgGPA: 2.85,
        feedbackRating: 4.2,
        doubtSla: 82.1,
        riskStatus: 'Critical Risk',
        interventionNeeded: true,
        grades: { A: 25, B: 45, C: 38, F: 30 }
      },
      {
        id: 'co4',
        code: 'DS301',
        title: 'Big Data Processing',
        instructor: 'Dr. Sarah Jenkins',
        enrolled: 52,
        passRate: 94.2,
        avgGPA: 3.65,
        feedbackRating: 4.9,
        doubtSla: 99.0,
        riskStatus: 'Healthy',
        grades: { A: 24, B: 20, C: 5, F: 3 }
      },
      {
        id: 'co5',
        code: 'SEC301',
        title: 'Network Security Fundamentals',
        instructor: 'Dr. Priya Sharma',
        enrolled: 40,
        passRate: 90.0,
        avgGPA: 3.30,
        feedbackRating: 4.7,
        doubtSla: 96.0,
        riskStatus: 'Healthy',
        grades: { A: 14, B: 18, C: 4, F: 4 }
      }
    ]
  },

  // Real-time Alerts Feed
  alerts: [
    {
      id: 'alt-1',
      title: 'Faculty Overload Detected',
      message: 'Prof. Jane Doe is teaching 22 weekly hours across 3 sections (> 18h maximum guideline).',
      severity: 'high',
      timestamp: '15 mins ago',
      category: 'workload',
      actionable: true,
      suggestedAction: 'Reassign CS301 Sec B to Dr. Alex Rivera'
    },
    {
      id: 'alt-2',
      title: 'Advisor Capacity Exceeded',
      message: 'Mark Evans has a risk-weighted score of 138 pts (> 120 max capacity).',
      severity: 'high',
      timestamp: '45 mins ago',
      category: 'advisory',
      actionable: true,
      suggestedAction: 'Redistribute 5 low-risk students to Elena Rostova'
    },
    {
      id: 'alt-3',
      title: 'Course Pass Rate Alert (CS101)',
      message: 'CS101 Intro to CS currently has a 78.2% projected pass rate with 30 at-risk students.',
      severity: 'medium',
      timestamp: '2 hours ago',
      category: 'outcomes',
      actionable: true,
      suggestedAction: 'Deploy Supplemental Instruction (SI) tutor'
    },
    {
      id: 'alt-4',
      title: 'Onboarding Milestone Reached',
      message: 'Prof. Eve Brown reached 86% onboarding completion. Pending final mentor sign-off.',
      severity: 'low',
      timestamp: '5 hours ago',
      category: 'onboarding',
      actionable: false
    }
  ]
};

// Helper to recalculate workload score and status
function recalculateFacultyWorkload(faculty) {
  const totalWeeklyHours = faculty.assignedCourses.reduce((acc, c) => acc + (c.weeklyHours || 0) + (c.labHours || 0), 0);
  faculty.currentWeeklyHours = totalWeeklyHours;
  const ratio = totalWeeklyHours / (faculty.maxWeeklyHours || 18);
  faculty.workloadScore = Math.round(ratio * 75);
  if (faculty.workloadScore > 85) {
    faculty.status = 'Overloaded';
  } else if (faculty.workloadScore < 60) {
    faculty.status = 'Available';
  } else {
    faculty.status = 'Optimal';
  }
}

// Helper to recalculate advisor caseload
function recalculateAdvisorCaseload(advisor) {
  const points = advisor.assignedStudents.reduce((acc, s) => acc + (s.riskPoints || 1), 0);
  advisor.totalStudentsCount = advisor.assignedStudents.length;
  advisor.caseloadScore = Math.round(points * 9.2);
  if (advisor.caseloadScore > 120) {
    advisor.status = 'Overloaded';
  } else if (advisor.caseloadScore < 80) {
    advisor.status = 'Available';
  } else {
    advisor.status = 'Optimal';
  }
}

// -------------------------------------------------------------
// CONTROLLER HANDLERS
// -------------------------------------------------------------

// 1. Department Overview & Executive KPIs
const getHODOverview = async (req, res) => {
  try {
    const totalFaculty = hodDataStore.facultyWorkload.length;
    const adjunctCount = hodDataStore.facultyWorkload.filter(f => f.type === 'Adjunct').length;
    const fullTimeCount = totalFaculty - adjunctCount;
    const overloadedFacultyCount = hodDataStore.facultyWorkload.filter(f => f.status === 'Overloaded').length;
    const overloadedAdvisorsCount = hodDataStore.advisors.filter(a => a.status === 'Overloaded').length;
    const pendingOnboardingCount = hodDataStore.onboardingList.filter(o => o.overallProgress < 100).length;
    const openJobRequisitionsCount = hodDataStore.jobRequisitions.filter(j => j.status === 'Active').length;

    const totalStudents = 480;
    const studentFacultyRatio = `${(totalStudents / totalFaculty).toFixed(1)}:1`;

    return res.json({
      department: hodDataStore.department,
      kpis: {
        totalFaculty,
        adjunctCount,
        fullTimeCount,
        totalStudents,
        studentFacultyRatio,
        avgTeachingRating: 4.72,
        doubtSlaCompliance: 94.8,
        activeCourses: 24,
        overloadedFacultyCount,
        overloadedAdvisorsCount,
        pendingOnboardingCount,
        openJobRequisitionsCount,
        budget: hodDataStore.department.budget
      },
      alerts: hodDataStore.alerts
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 2. Faculty Workload Balancing
const getFacultyWorkload = async (req, res) => {
  try {
    const overloaded = hodDataStore.facultyWorkload.filter(f => f.status === 'Overloaded');
    const available = hodDataStore.facultyWorkload.filter(f => f.status === 'Available');

    let recommendations = [];
    if (overloaded.length > 0 && available.length > 0) {
      overloaded.forEach(src => {
        if (src.assignedCourses.length > 1) {
          const courseToMove = src.assignedCourses[src.assignedCourses.length - 1];
          const target = available[0];
          recommendations.push({
            id: `rec-${src.id}-${target.id}`,
            fromFacultyId: src.id,
            fromFacultyName: src.name,
            toFacultyId: target.id,
            toFacultyName: target.name,
            courseId: courseToMove.id,
            courseCode: courseToMove.code,
            courseTitle: courseToMove.title,
            courseSection: courseToMove.section,
            hoursShift: courseToMove.weeklyHours,
            expectedFromScore: Math.round(src.workloadScore - 20),
            expectedToScore: Math.round(target.workloadScore + 28),
            reason: `${src.name} exceeds weekly hours capacity (${src.currentWeeklyHours}h / ${src.maxWeeklyHours}h max). Transferring ${courseToMove.code} ${courseToMove.section} brings both instructors to Optimal status.`
          });
        }
      });
    }

    return res.json({
      faculty: hodDataStore.facultyWorkload,
      recommendations
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Rebalance a course between faculty members
const rebalanceFacultyWorkload = async (req, res) => {
  try {
    const { fromFacultyId, toFacultyId, courseId } = req.body;

    const fromFaculty = hodDataStore.facultyWorkload.find(f => f.id === fromFacultyId);
    const toFaculty = hodDataStore.facultyWorkload.find(f => f.id === toFacultyId);

    if (!fromFaculty || !toFaculty) {
      return res.status(404).json({ error: 'Faculty member not found' });
    }

    const courseIndex = fromFaculty.assignedCourses.findIndex(c => c.id === courseId);
    if (courseIndex === -1) {
      return res.status(404).json({ error: 'Course not found on source faculty' });
    }

    const [course] = fromFaculty.assignedCourses.splice(courseIndex, 1);
    toFaculty.assignedCourses.push(course);

    recalculateFacultyWorkload(fromFaculty);
    recalculateFacultyWorkload(toFaculty);

    hodDataStore.alerts = hodDataStore.alerts.filter(a => !(a.category === 'workload' && a.message.includes(fromFaculty.name)));

    return res.json({
      success: true,
      message: `Successfully rebalanced ${course.code} (${course.section}) to ${toFaculty.name}.`,
      updatedFaculty: [fromFaculty, toFaculty]
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 3. Advisor Caseload Balancing
const getAdvisorCaseload = async (req, res) => {
  try {
    const overloaded = hodDataStore.advisors.filter(a => a.status === 'Overloaded');
    const available = hodDataStore.advisors.filter(a => a.status === 'Available');

    let recommendations = [];
    if (overloaded.length > 0 && available.length > 0) {
      overloaded.forEach(src => {
        const target = available[0];
        const lowRiskStudents = src.assignedStudents.filter(s => s.risk === 'low');
        const studentsToMove = lowRiskStudents.slice(0, 4);

        if (studentsToMove.length > 0) {
          recommendations.push({
            id: `adv-rec-${src.id}-${target.id}`,
            fromAdvisorId: src.id,
            fromAdvisorName: src.name,
            toAdvisorId: target.id,
            toAdvisorName: target.name,
            students: studentsToMove,
            studentCount: studentsToMove.length,
            expectedFromScore: Math.round(src.caseloadScore - 38),
            expectedToScore: Math.round(target.caseloadScore + 26),
            reason: `${src.name} caseload (${src.caseloadScore} pts) exceeds 120 threshold. Reassigning ${studentsToMove.length} low-risk students to ${target.name} maintains continuity for high-risk students while balancing department load.`
          });
        }
      });
    }

    return res.json({
      advisors: hodDataStore.advisors,
      recommendations
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Execute Advisor Redistribution
const redistributeAdvisorCaseload = async (req, res) => {
  try {
    const { fromAdvisorId, toAdvisorId, studentIds } = req.body;

    const fromAdvisor = hodDataStore.advisors.find(a => a.id === fromAdvisorId);
    const toAdvisor = hodDataStore.advisors.find(a => a.id === toAdvisorId);

    if (!fromAdvisor || !toAdvisor) {
      return res.status(404).json({ error: 'Advisor not found' });
    }

    const movedStudents = [];
    fromAdvisor.assignedStudents = fromAdvisor.assignedStudents.filter(s => {
      if (studentIds.includes(s.id)) {
        movedStudents.push(s);
        return false;
      }
      return true;
    });

    toAdvisor.assignedStudents.push(...movedStudents);

    recalculateAdvisorCaseload(fromAdvisor);
    recalculateAdvisorCaseload(toAdvisor);

    hodDataStore.alerts = hodDataStore.alerts.filter(a => !(a.category === 'advisory' && a.message.includes(fromAdvisor.name)));

    return res.json({
      success: true,
      message: `Redistributed ${movedStudents.length} students from ${fromAdvisor.name} to ${toAdvisor.name}.`,
      updatedAdvisors: [fromAdvisor, toAdvisor]
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 4. Recruitment Pipeline
const getRecruitmentPipeline = async (req, res) => {
  try {
    return res.json({
      requisitions: hodDataStore.jobRequisitions,
      applicants: hodDataStore.applicants
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateApplicantStatus = async (req, res) => {
  try {
    const { applicantId, newStatus } = req.body;
    const applicant = hodDataStore.applicants.find(a => a.id === applicantId);

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    applicant.status = newStatus;
    applicant.lastUpdated = new Date().toISOString().split('T')[0];

    if (newStatus === 'Onboarding') {
      const existing = hodDataStore.onboardingList.find(o => o.candidateName === applicant.name);
      if (!existing) {
        hodDataStore.onboardingList.push({
          id: `ONB-${Date.now().toString().slice(-4)}`,
          candidateName: applicant.name,
          email: applicant.email,
          role: 'Adjunct Faculty Candidate',
          department: 'Computer Science',
          avatar: applicant.name.split(' ').map(n => n[0]).join(''),
          startDate: '2026-09-20',
          overallProgress: 15,
          status: 'In Progress',
          assignedMentor: 'Dr. Alex Rivera',
          tasks: [
            { id: `t_${Date.now()}_1`, title: 'Identity & SSN/Tax Verification (W-9)', phase: 'Documents', completed: false, requiredBy: 'HR Compliance' },
            { id: `t_${Date.now()}_2`, title: 'Transcripts & Credential Audit', phase: 'Documents', completed: false, requiredBy: 'Academic Council' },
            { id: `t_${Date.now()}_3`, title: 'University Email Provisioning', phase: 'IT & LMS', completed: false, requiredBy: 'IT Services' },
            { id: `t_${Date.now()}_4`, title: 'Canvas LMS Sandbox Setup', phase: 'IT & LMS', completed: false, requiredBy: 'E-Learning Support' },
            { id: `t_${Date.now()}_5`, title: 'Course Syllabus & Grading Rubric Sign-off', phase: 'Curriculum', completed: false, requiredBy: 'HOD Dr. Alan Smith' },
            { id: `t_${Date.now()}_6`, title: 'Department Faculty Orientation & SLA Training', phase: 'Orientation', completed: false, requiredBy: 'Department Chair' },
            { id: `t_${Date.now()}_7`, title: 'Classroom Tech Dry-run & Mentor Sign-off', phase: 'Readiness', completed: false, requiredBy: 'Assigned Mentor' }
          ]
        });
      }
    }

    return res.json({
      success: true,
      applicant
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createJobRequisition = async (req, res) => {
  try {
    const { title, department, positions, hourlyRate, urgency } = req.body;
    const newReq = {
      id: `REQ-${(hodDataStore.jobRequisitions.length + 1).toString().padStart(2, '0')}`,
      title,
      department: department || 'Computer Science',
      positions: parseInt(positions, 10) || 1,
      applicantsCount: 0,
      status: 'Active',
      hourlyRate: hourlyRate || '$75 - $95 / hr',
      urgency: urgency || 'Medium',
      postedDate: new Date().toISOString().split('T')[0]
    };
    hodDataStore.jobRequisitions.unshift(newReq);
    return res.json({ success: true, requisition: newReq });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 5. Onboarding Tracker
const getOnboardingTracker = async (req, res) => {
  try {
    return res.json({
      candidates: hodDataStore.onboardingList
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateOnboardingTask = async (req, res) => {
  try {
    const { candidateId, taskId, completed } = req.body;
    const candidate = hodDataStore.onboardingList.find(c => c.id === candidateId);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    const task = candidate.tasks.find(t => t.id === taskId);
    if (task) {
      task.completed = completed;
    }

    const completedCount = candidate.tasks.filter(t => t.completed).length;
    candidate.overallProgress = Math.round((completedCount / candidate.tasks.length) * 100);
    if (candidate.overallProgress === 100) {
      candidate.status = 'Ready for Activation';
    } else {
      candidate.status = 'In Progress';
    }

    return res.json({
      success: true,
      candidate
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const activateFacultyCandidate = async (req, res) => {
  try {
    const { candidateId } = req.body;
    const candidate = hodDataStore.onboardingList.find(c => c.id === candidateId);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    candidate.status = 'Active Faculty';
    candidate.overallProgress = 100;

    const newFacultyId = `f_${Date.now()}`;
    hodDataStore.facultyWorkload.push({
      id: newFacultyId,
      name: candidate.candidateName,
      email: candidate.email,
      type: 'Adjunct',
      department: candidate.department,
      avatar: candidate.avatar,
      maxWeeklyHours: 16,
      currentWeeklyHours: 0,
      workloadScore: 0,
      status: 'Available',
      rating: 5.0,
      doubtSlaPercent: 100.0,
      assignedCourses: []
    });

    return res.json({
      success: true,
      message: `${candidate.candidateName} is now activated as an active Faculty member.`,
      candidate
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 6. Performance + Student Outcomes
const getStudentOutcomes = async (req, res) => {
  try {
    return res.json(hodDataStore.outcomes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Existing compatibility endpoints
const getHODStats = async (req, res) => {
  return res.json({
    facultyCount: hodDataStore.facultyWorkload.length,
    alerts: hodDataStore.alerts
  });
};

const getFacultyRoster = async (req, res) => {
  return res.json({ roster: hodDataStore.facultyWorkload });
};

const getAdvisorStudents = async (req, res) => {
  const { advisorId } = req.params;
  const advisor = hodDataStore.advisors.find(a => a.id === advisorId) || hodDataStore.advisors[0];
  return res.json({ students: advisor.assignedStudents });
};

const getStudentData = async (req, res) => {
  const { studentId } = req.params;
  return res.json({
    student: {
      id: studentId,
      name: 'Alice Wong',
      email: 'alice.student@univ.edu',
      semester: 4,
      cgpa: 3.4,
      attendance: 92
    }
  });
};

const submitFeedback = async (req, res) => {
  return res.json({ success: true, message: 'Feedback submitted successfully' });
};

module.exports = {
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
};
