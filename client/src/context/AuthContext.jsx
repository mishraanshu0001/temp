import { createContext, useContext, useState, useEffect } from 'react';
import { loginByEmail, getDemoAccounts } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('adjunct_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [demoAccounts, setDemoAccounts] = useState([]);

  useEffect(() => {
    getDemoAccounts()
      .then(res => setDemoAccounts(res.data.accounts || []))
      .catch(() => {});
  }, []);

  const login = async (email, role) => {
    const res = await loginByEmail(email, role);
    const userData = res.data.user;
    setUser(userData);
    localStorage.setItem('adjunct_user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adjunct_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, demoAccounts }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
