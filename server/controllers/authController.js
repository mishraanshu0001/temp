const supabase = require('../config/supabase');

// Known University Profile Store with Strict Role Enforcement
const ACADEMIC_PROFILES = [
  {
    id: 'u_hod_1',
    name: 'Dr. Rajesh Sharma',
    email: 'rajesh.hod@univ.edu.in',
    legacyEmail: 'alan.hod@univ.edu',
    role: 'hod',
    department: 'Computer Science & Engineering',
    avatar: 'RS'
  },
  {
    id: 'u_fac_1',
    name: 'Prof. Priya Sharma',
    email: 'priya.faculty@univ.edu.in',
    legacyEmail: 'jane.adjunct@univ.edu',
    role: 'adjunct_faculty',
    department: 'Computer Science & Engineering (Executive & Industry Training)',
    avatar: 'PS'
  },
  {
    id: 'u_adv_1',
    name: 'Dr. Ramesh Iyer',
    email: 'ramesh.advisor@univ.edu.in',
    legacyEmail: 'mark.advisor@univ.edu',
    role: 'advisor',
    department: 'Computer Science',
    avatar: 'RI'
  },
  {
    id: 'u_stu_1',
    name: 'Aarav Sharma',
    email: 'aarav.student@univ.edu.in',
    legacyEmail: 'alice.student@univ.edu',
    role: 'student',
    department: 'Computer Science',
    avatar: 'AS'
  },
  {
    id: 'u_stu_2',
    name: 'Alex Rivera',
    email: 'alex.student@univ.edu',
    role: 'student',
    department: 'Computer Science',
    avatar: 'AR'
  },
  {
    id: 'u_adm_1',
    name: 'System Administrator',
    email: 'admin@univ.edu.in',
    legacyEmail: 'admin@univ.edu',
    role: 'admin',
    department: 'IT & Infrastructure',
    avatar: 'SA'
  }
];

// Helper to normalize and match role strings
function normalizeRole(role) {
  if (!role) return '';
  const r = role.toLowerCase().trim();
  if (r === 'hod' || r === 'chair' || r === 'department head') return 'hod';
  if (r === 'faculty' || r === 'adjunct_faculty' || r === 'adjunct' || r === 'professor') return 'adjunct_faculty';
  if (r === 'advisor' || r === 'academic advisor') return 'advisor';
  if (r === 'student') return 'student';
  if (r === 'admin' || r === 'administrator') return 'admin';
  return r;
}

const ROLE_DISPLAY_NAMES = {
  hod: 'HOD',
  adjunct_faculty: 'Faculty',
  advisor: 'Advisor',
  student: 'Student',
  admin: 'Admin'
};

// Strict Role-Based Authentication
const loginByEmail = async (req, res) => {
  const { email, role: requestedRole } = req.body;
  if (!email) return res.status(400).json({ error: 'Email address is required.' });

  const cleanEmail = email.toLowerCase().trim();
  const normalizedRequestedRole = normalizeRole(requestedRole);

  // 1. Check local academic registry first
  let userProfile = ACADEMIC_PROFILES.find(
    p => p.email.toLowerCase() === cleanEmail || (p.legacyEmail && p.legacyEmail.toLowerCase() === cleanEmail)
  );

  // 2. Check Supabase if not found locally
  if (!userProfile) {
    try {
      const data = await supabase('profiles').selectOne(`email=eq.${encodeURIComponent(cleanEmail)}&select=*`);
      if (data && !data.code && data.email) {
        userProfile = data;
      }
    } catch (e) {
      console.log('Supabase check fallback:', e.message);
    }
  }

  // 3. If account is NOT found in the system, show clean "Account Not Found" error (no false role assumptions)
  if (!userProfile) {
    return res.status(404).json({
      error: `No account found for "${cleanEmail}". Please check your email or choose a valid demo role.`
    });
  }

  const userActualRole = normalizeRole(userProfile.role);

  // 4. Strict Role Mismatch Check
  if (normalizedRequestedRole && userActualRole !== normalizedRequestedRole) {
    const actualRoleLabel = ROLE_DISPLAY_NAMES[userActualRole] || userActualRole;
    const requestedRoleLabel = ROLE_DISPLAY_NAMES[normalizedRequestedRole] || normalizedRequestedRole;

    return res.status(403).json({
      error: `Role Mismatch: "${cleanEmail}" is registered as ${actualRoleLabel}. Please switch to the ${actualRoleLabel} tab to sign in.`
    });
  }

  return res.json({ user: userProfile });
};

// Get all demo accounts for the login screen
const getDemoAccounts = async (req, res) => {
  return res.json({ accounts: ACADEMIC_PROFILES });
};

module.exports = { loginByEmail, getDemoAccounts };
