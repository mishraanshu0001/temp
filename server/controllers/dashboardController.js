const supabase = require('../config/supabase');

// --- In-Memory Stateful Store for Interactive Real-Time Demonstrations ---
let hodDataStore = {
  // Department Meta
  department: {
    name: 'Department of Computer Science & Engineering',
    code: 'CSE',
    term: 'Fall 2026',
    hodName: 'Dr. Rajesh Sharma',
    budget: {
      allocated: 1200000,
      spent: 845000,
      currency: 'INR',
      adjunctHourlyRateAvg: 1250,
      hoursLoggedThisMonth: 1126,
      hoursAllocatedCap: 1600
    }
  },

  // Faculty Workload
  facultyWorkload: [
    {
      id: 'f1',
      name: 'Prof. Priya Sharma',
      email: 'priya.sharma@univ.edu.in',
      type: 'Adjunct',
      department: 'Computer Science',
      avatar: 'PS',
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
      name: 'Dr. Alok Verma',
      email: 'alok.verma@univ.edu.in',
      type: 'Full-Time',
      department: 'Computer Science',
      avatar: 'AV',
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
      name: 'Dr. Ananya Gupta',
      email: 'ananya.gupta@univ.edu.in',
      type: 'Full-Time',
      department: 'AI & Data Science',
      avatar: 'AG',
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
      name: 'Prof. Amit Patel',
      email: 'amit.patel@univ.edu.in',
      type: 'Adjunct',
      department: 'Computer Science',
      avatar: 'AP',
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
      name: 'Dr. Sunita Reddy',
      email: 'sunita.reddy@univ.edu.in',
      type: 'Adjunct',
      department: 'Cybersecurity',
      avatar: 'SR',
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
      name: 'Prof. Vikram Rao',
      email: 'vikram.rao@univ.edu.in',
      type: 'Full-Time',
      department: 'Computer Science',
      avatar: 'VR',
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
      name: 'Dr. Ramesh Iyer',
      email: 'ramesh.iyer@univ.edu.in',
      department: 'Computer Science',
      avatar: 'RI',
      maxCapacityPoints: 120,
      caseloadScore: 138,
      status: 'Overloaded',
      totalStudentsCount: 65,
      assignedStudents: [
        { id: 's1', name: 'Aarav Sharma', email: 'aarav.sharma@univ.edu.in', semester: 4, cgpa: 5.4, attendance: 58, risk: 'high', riskPoints: 3, major: 'Computer Science' },
        { id: 's2', name: 'Pooja Sundaram', email: 'pooja.s@univ.edu.in', semester: 2, cgpa: 5.8, attendance: 62, risk: 'high', riskPoints: 3, major: 'Computer Science' },
        { id: 's3', name: 'Rohan Gupta', email: 'rohan.g@univ.edu.in', semester: 3, cgpa: 6.8, attendance: 75, risk: 'medium', riskPoints: 2, major: 'Computer Science' },
        { id: 's4', name: 'Neha Verma', email: 'neha.v@univ.edu.in', semester: 4, cgpa: 7.1, attendance: 78, risk: 'medium', riskPoints: 2, major: 'Computer Science' },
        { id: 's5', name: 'Maya Patel', email: 'maya.p@univ.edu.in', semester: 3, cgpa: 8.9, attendance: 94, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's6', name: 'Kunal Shah', email: 'kunal.s@univ.edu.in', semester: 2, cgpa: 8.6, attendance: 91, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's7', name: 'Aditi Nair', email: 'aditi.n@univ.edu.in', semester: 5, cgpa: 9.1, attendance: 96, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's8', name: 'Siddharth Jain', email: 'siddharth.j@univ.edu.in', semester: 3, cgpa: 8.4, attendance: 89, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's9', name: 'Ananya Roy', email: 'ananya.r@univ.edu.in', semester: 4, cgpa: 8.8, attendance: 92, risk: 'low', riskPoints: 1, major: 'Computer Science' }
      ]
    },
    {
      id: 'adv2',
      name: 'Prof. Sneha Deshmukh',
      email: 'sneha.deshmukh@univ.edu.in',
      department: 'Computer Science',
      avatar: 'SD',
      maxCapacityPoints: 120,
      caseloadScore: 72,
      status: 'Available',
      totalStudentsCount: 38,
      assignedStudents: [
        { id: 's10', name: 'Vikram Singh', email: 'vikram.s@univ.edu.in', semester: 3, cgpa: 7.9, attendance: 85, risk: 'low', riskPoints: 1, major: 'Computer Science' },
        { id: 's11', name: 'Tanvi Joshi', email: 'tanvi.j@univ.edu.in', semester: 2, cgpa: 7.2, attendance: 76, risk: 'medium', riskPoints: 2, major: 'Computer Science' },
        { id: 's12', name: 'Meera Sen', email: 'meera.s@univ.edu.in', semester: 1, cgpa: 8.5, attendance: 90, risk: 'low', riskPoints: 1, major: 'Computer Science' }
      ]
    },
    {
      id: 'adv3',
      name: 'Dr. Sanjay Kulkarni',
      email: 'sanjay.kulkarni@univ.edu.in',
      department: 'AI & Data Science',
      avatar: 'SK',
      maxCapacityPoints: 120,
      caseloadScore: 94,
      status: 'Optimal',
      totalStudentsCount: 48,
      assignedStudents: [
        { id: 's13', name: 'Harsh Vardhan', email: 'harsh.v@univ.edu.in', semester: 4, cgpa: 6.4, attendance: 70, risk: 'medium', riskPoints: 2, major: 'AI & Data Science' },
        { id: 's14', name: 'Deepa Krishnan', email: 'deepa.k@univ.edu.in', semester: 1, cgpa: 8.9, attendance: 95, risk: 'low', riskPoints: 1, major: 'AI & Data Science' },
        { id: 's15', name: 'Abhishek Rao', email: 'abhishek.r@univ.edu.in', semester: 3, cgpa: 5.7, attendance: 63, risk: 'high', riskPoints: 3, major: 'AI & Data Science' }
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
      hourlyRate: '₹1,200 - ₹1,800 / hr',
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
      hourlyRate: '₹1,500 - ₹2,200 / hr',
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
      hourlyRate: '₹1,000 - ₹1,600 / hr',
      urgency: 'Normal',
      postedDate: '2026-08-18'
    }
  ],

  applicants: [
    {
      id: 'APP-201',
      jobId: 'REQ-01',
      name: 'Dr. Meera Nambiar',
      email: 'meera.nambiar@example.com',
      phone: '+91 98765 43210',
      experienceYears: 9,
      status: 'Applied',
      matchScore: 92,
      appliedDate: '2026-08-28',
      expectedHourlyRate: '₹1,600',
      degree: 'Ph.D. in Distributed Systems (IIT Bombay)',
      notes: 'Strong industry background at AWS Cloud. Specialized in Kubernetes and Microservices.'
    },
    {
      id: 'APP-202',
      jobId: 'REQ-01',
      name: 'Ankit Verma',
      email: 'ankit.verma@example.com',
      phone: '+91 98123 45678',
      experienceYears: 7,
      status: 'Applied',
      matchScore: 84,
      appliedDate: '2026-08-27',
      expectedHourlyRate: '₹1,400',
      degree: 'M.Tech in Computer Engineering (IIT Delhi)',
      notes: 'Solutions Architect at Datadog with prior university teaching assistant experience.'
    },
    {
      id: 'APP-203',
      jobId: 'REQ-02',
      name: 'Dr. Rajesh Verma',
      email: 'rajesh.verma@example.com',
      phone: '+91 97654 32109',
      experienceYears: 12,
      status: 'Screening',
      matchScore: 95,
      appliedDate: '2026-08-24',
      expectedHourlyRate: '₹1,800',
      degree: 'Ph.D. in Machine Learning (IISc Bangalore)',
      notes: 'Passed initial background screening. Demo lecture scheduled for Tuesday.'
    },
    {
      id: 'APP-204',
      jobId: 'REQ-02',
      name: 'Dr. Arjun Mehta',
      email: 'arjun.mehta@example.com',
      phone: '+91 96543 21098',
      experienceYears: 6,
      status: 'Interview',
      matchScore: 89,
      appliedDate: '2026-08-20',
      expectedHourlyRate: '₹1,650',
      degree: 'Ph.D. in Computational AI (IIT Madras)',
      notes: 'Interview committee rated pedagogical clarity 4.8/5.0. Recommended for selection.'
    },
    {
      id: 'APP-205',
      jobId: 'REQ-03',
      name: 'Dr. Deepa Nair',
      email: 'deepa.nair@example.com',
      phone: '+91 95432 10987',
      experienceYears: 11,
      status: 'Selected',
      matchScore: 97,
      appliedDate: '2026-08-15',
      expectedHourlyRate: '₹1,750',
      degree: 'Ph.D. in Cyber Defense (IIT Kanpur)',
      notes: 'Offer letter signed. Moved to onboarding workflow.'
    },
    {
      id: 'APP-206',
      jobId: 'REQ-01',
      name: 'Prof. Kavita Joshi',
      email: 'kavita.joshi@example.com',
      phone: '+91 94321 09876',
      experienceYears: 10,
      status: 'Onboarding',
      matchScore: 93,
      appliedDate: '2026-08-01',
      expectedHourlyRate: '₹1,500',
      degree: 'M.Tech in Computer Science (BITS Pilani)',
      notes: 'Onboarding in final stages. LMS and mentor verification underway.'
    }
  ],

  // Onboarding Tracker
  onboardingList: [
    {
      id: 'ONB-01',
      candidateName: 'Dr. Deepa Nair',
      email: 'deepa.nair@univ.edu.in',
      role: 'Adjunct Professor - Cloud Security',
      department: 'Cybersecurity',
      avatar: 'DN',
      startDate: '2026-09-15',
      overallProgress: 60,
      status: 'In Progress',
      assignedMentor: 'Dr. Sunita Reddy',
      tasks: [
        { id: 't1', title: 'Identity & PAN/Aadhaar/Tax Verification', phase: 'Documents', completed: true, requiredBy: 'HR Compliance' },
        { id: 't2', title: 'Ph.D. Transcripts & Credential Audit', phase: 'Documents', completed: true, requiredBy: 'Academic Council' },
        { id: 't3', title: 'University Institutional Email Provisioning', phase: 'IT & LMS', completed: true, requiredBy: 'IT Services' },
        { id: 't4', title: 'LMS Instructor Sandbox Setup', phase: 'IT & LMS', completed: true, requiredBy: 'E-Learning Support' },
        { id: 't5', title: 'Course Syllabus & Grading Rubric Sign-off', phase: 'Curriculum', completed: false, requiredBy: 'HOD Dr. Rajesh Sharma' },
        { id: 't6', title: 'Department Faculty Orientation & SLA Training', phase: 'Orientation', completed: false, requiredBy: 'Department Chair' },
        { id: 't7', title: 'Classroom Tech Dry-run & Mentor Sign-off', phase: 'Readiness', completed: false, requiredBy: 'Assigned Mentor' }
      ]
    },
    {
      id: 'ONB-02',
      candidateName: 'Prof. Kavita Joshi',
      email: 'kavita.joshi@univ.edu.in',
      role: 'Adjunct Lecturer - Python Programming',
      department: 'Computer Science',
      avatar: 'KJ',
      startDate: '2026-09-01',
      overallProgress: 86,
      status: 'In Progress',
      assignedMentor: 'Prof. Priya Sharma',
      tasks: [
        { id: 't11', title: 'Identity & PAN/Aadhaar/Tax Verification', phase: 'Documents', completed: true, requiredBy: 'HR Compliance' },
        { id: 't12', title: 'M.Tech Transcripts & Credential Audit', phase: 'Documents', completed: true, requiredBy: 'Academic Council' },
        { id: 't13', title: 'University Institutional Email Provisioning', phase: 'IT & LMS', completed: true, requiredBy: 'IT Services' },
        { id: 't14', title: 'LMS Instructor Sandbox Setup', phase: 'IT & LMS', completed: true, requiredBy: 'E-Learning Support' },
        { id: 't15', title: 'Course Syllabus & Grading Rubric Sign-off', phase: 'Curriculum', completed: true, requiredBy: 'HOD Dr. Rajesh Sharma' },
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
        facultyName: 'Prof. Priya Sharma',
        section: 'A',
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
        facultyName: 'Prof. Priya Sharma',
        section: 'A',
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
        facultyName: 'Prof. Amit Patel',
        section: 'A',
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
        facultyName: 'Dr. Ananya Gupta',
        section: 'A',
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
        facultyName: 'Dr. Sunita Reddy',
        section: 'A',
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
      message: 'Prof. Priya Sharma is teaching 22 weekly hours across 3 sections (> 18h maximum guideline).',
      severity: 'high',
      timestamp: '15 mins ago',
      category: 'workload',
      actionable: true,
      suggestedAction: 'Reassign CS301 Sec B to Dr. Alok Verma'
    },
    {
      id: 'alt-2',
      title: 'Advisor Capacity Exceeded',
      message: 'Dr. Ramesh Iyer has a risk-weighted score of 138 pts (> 120 max capacity).',
      severity: 'high',
      timestamp: '45 mins ago',
      category: 'advisory',
      actionable: true,
      suggestedAction: 'Redistribute 5 low-risk students to Prof. Sneha Deshmukh'
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
      message: 'Prof. Kavita Joshi reached 86% onboarding completion. Pending final mentor sign-off.',
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
          assignedMentor: 'Dr. Alok Verma',
          tasks: [
            { id: `t_${Date.now()}_1`, title: 'Identity & PAN/Aadhaar/Tax Verification', phase: 'Documents', completed: false, requiredBy: 'HR Compliance' },
            { id: `t_${Date.now()}_2`, title: 'Transcripts & Credential Audit', phase: 'Documents', completed: false, requiredBy: 'Academic Council' },
            { id: `t_${Date.now()}_3`, title: 'University Institutional Email Provisioning', phase: 'IT & LMS', completed: false, requiredBy: 'IT Services' },
            { id: `t_${Date.now()}_4`, title: 'LMS Sandbox Setup', phase: 'IT & LMS', completed: false, requiredBy: 'E-Learning Support' },
            { id: `t_${Date.now()}_5`, title: 'Course Syllabus & Grading Rubric Sign-off', phase: 'Curriculum', completed: false, requiredBy: 'HOD Dr. Rajesh Sharma' },
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
      hourlyRate: hourlyRate || '₹1,200 - ₹1,800 / hr',
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
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.completed = completed;
    const totalTasks = candidate.tasks.length;
    const completedTasks = candidate.tasks.filter(t => t.completed).length;
    candidate.overallProgress = Math.round((completedTasks / totalTasks) * 100);

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

    const existingFaculty = hodDataStore.facultyWorkload.find(f => f.email === candidate.email);
    if (!existingFaculty) {
      hodDataStore.facultyWorkload.push({
        id: `f_${Date.now().toString().slice(-4)}`,
        name: candidate.candidateName,
        email: candidate.email,
        type: 'Adjunct',
        department: candidate.department,
        avatar: candidate.avatar,
        maxWeeklyHours: 18,
        currentWeeklyHours: 0,
        workloadScore: 25,
        status: 'Available',
        rating: 5.0,
        doubtSlaPercent: 100.0,
        assignedCourses: []
      });
    }

    return res.json({
      success: true,
      message: `${candidate.candidateName} activated and added to faculty roster.`,
      candidate
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// 6. Student & Performance Outcomes
const getStudentOutcomes = async (req, res) => {
  try {
    return res.json(hodDataStore.outcomes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// Compatibility Endpoints
const getHODStats = async (req, res) => {
  return getHODOverview(req, res);
};

const getFacultyRoster = async (req, res) => {
  return res.json({ faculty: hodDataStore.facultyWorkload });
};

const getAdvisorStudents = async (req, res) => {
  const advisor = hodDataStore.advisors.find(a => a.id === req.params.advisorId) || hodDataStore.advisors[0];
  return res.json({ students: advisor ? advisor.assignedStudents : [] });
};

const getStudentData = async (req, res) => {
  for (const adv of hodDataStore.advisors) {
    const s = adv.assignedStudents.find(stu => stu.id === req.params.studentId);
    if (s) return res.json({ student: s });
  }
  return res.json({ student: hodDataStore.advisors[0]?.assignedStudents[0] || null });
};

const submitFeedback = async (req, res) => {
  return res.json({ success: true, message: 'Feedback recorded successfully.' });
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
