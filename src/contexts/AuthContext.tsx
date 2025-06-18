import React, { createContext, useContext, useState, useEffect } from 'react';
import usersData from '../data/users.json';

interface User {
  id: string;
  username: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  isLoggedIn: boolean;
}

const SESSION_TIMEOUT = 1000 * 60 * 60; // 1 hour
const AUTH_KEY = 'auth_data';
const LOCKOUT_ATTEMPTS = 3;
const LOCKOUT_DURATION = 1000 * 60 * 5; // 5 minutes

const getLockoutKey = (username: string) => `lockout_${username}`;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    if (savedAuth) {
      const { user: savedUser, timestamp } = JSON.parse(savedAuth);
      const isValid = Date.now() - timestamp < SESSION_TIMEOUT;
      return isValid ? savedUser : null;
    }
    return null;
  });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (user) {
      timeoutId = setTimeout(() => {
        logout();
      }, SESSION_TIMEOUT);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [user]);

  const login = (username: string, password: string): boolean => {
    // Check lockout status
    const lockoutData = localStorage.getItem(getLockoutKey(username));
    if (lockoutData) {
      const { attempts, lockoutUntil } = JSON.parse(lockoutData);
      if (lockoutUntil && Date.now() < lockoutUntil) {
        // Still locked out
        return false;
      }
    }

    // Basic password hashing (for demo purposes only)
    const hashedPassword = btoa(password);
    const foundUser = usersData.users.find(
      (u) => u.username === username && btoa(u.password) === hashedPassword
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      // Save auth data with timestamp
      localStorage.setItem(AUTH_KEY, JSON.stringify({
        user: userWithoutPassword,
        timestamp: Date.now()
      }));
      // Reset lockout on success
      localStorage.removeItem(getLockoutKey(username));
      return true;
    } else {
      // Handle failed attempt
      let attempts = 1;
      let lockoutUntil = null;
      if (lockoutData) {
        const parsed = JSON.parse(lockoutData);
        attempts = (parsed.attempts || 0) + 1;
      }
      if (attempts >= LOCKOUT_ATTEMPTS) {
        lockoutUntil = Date.now() + LOCKOUT_DURATION;
      }
      localStorage.setItem(getLockoutKey(username), JSON.stringify({ attempts, lockoutUntil }));
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};