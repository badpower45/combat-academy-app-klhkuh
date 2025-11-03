
import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'fan' | 'fighter' | 'admin';

interface User {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  avatar?: string;
  memberSince?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  register: (email: string, password: string, fullName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUserRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>({
    id: '1',
    email: 'admin@academy.com',
    fullName: 'Admin User',
    role: 'admin',
    memberSince: '2024',
  });

  const login = async (email: string, password: string, role?: UserRole) => {
    console.log('Login attempt:', { email, role });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      fullName: email.includes('admin') ? 'Admin User' : 'John Doe',
      role: email.includes('admin') ? 'admin' : (role || 'fan'),
      memberSince: '2024',
    };
    
    setUser(mockUser);
  };

  const register = async (email: string, password: string, fullName: string, role: UserRole) => {
    console.log('Register attempt:', { email, fullName, role });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = {
      id: '1',
      email,
      fullName,
      role,
      memberSince: new Date().getFullYear().toString(),
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    console.log('User logged out');
    setUser(null);
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
      console.log('User role updated to:', role);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new error('useAuth must be used within AuthProvider');
  }
  return context;
};
