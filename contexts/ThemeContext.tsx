
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

export type ThemeMode = 'light' | 'dark' | 'system';

export const lightColors = {
  background: '#FFFFFF',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#6200EE',
  secondary: '#03DAC6',
  accent: '#FF4081',
  card: '#F5F5F5',
  highlight: '#E8E8E8',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  border: '#E0E0E0',
};

export const darkColors = {
  background: '#121212',
  text: '#FFFFFF',
  textSecondary: '#A9A9A9',
  primary: '#BB86FC',
  secondary: '#03DAC6',
  accent: '#FF4081',
  card: '#1E1E1E',
  highlight: '#292929',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  border: '#333333',
};

interface ThemeContextType {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colors: typeof darkColors;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');

  const isDark = themeMode === 'system' 
    ? systemColorScheme === 'dark' 
    : themeMode === 'dark';

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, colors, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within ThemeProvider');
  }
  return context;
};
