
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
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role?: UserRole) => {
    console.log('Login attempt:', { email, role });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
    const mockUser: User = {
      id: '1',
      email,
      fullName: 'John Doe',
      role: role || 'fan',
      memberSince: '2024',
    };
    
    setUser(mockUser);
  };

  const register = async (email: string, password: string, fullName: string, role: UserRole) => {
    console.log('Register attempt:', { email, fullName, role });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock user data
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
    setUser(null);
  };

  const updateUserRole = (role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
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
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
