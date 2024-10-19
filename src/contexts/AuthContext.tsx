import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (userData: SignupData) => Promise<void>;
}

interface SignupData {
  name: string;
  company: string;
  username: string;
  password: string;
  groupwareId: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always "succeed" and set a mock user
    setUser({ id: '1', username, name: 'Test User' });
  };

  const logout = () => {
    setUser(null);
  };

  const signup = async (userData: SignupData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always "succeed" and set a mock user
    setUser({ id: '1', username: userData.username, name: userData.name });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};