'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const mockUsers: User[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    phone: '+919876543210',
    role: 'customer'
  },
  {
    id: '2',
    name: 'Priya Patel',
    phone: '+919876543211',
    role: 'customer'
  },
  {
    id: '3',
    name: 'Amit Kumar',
    username: 'amit.kumar',
    role: 'agent'
  },
  {
    id: '4',
    name: 'Sneha Singh',
    username: 'sneha.singh',
    role: 'agent'
  }
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (credentials: { phone?: string; username?: string }): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(u =>
      (credentials.phone && u.phone === credentials.phone) ||
      (credentials.username && u.username === credentials.username)
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};