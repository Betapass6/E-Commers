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
      
      return true;
    }
    return false;
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