import React, { createContext, useState, useContext, useMemo, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

// Create theme context
const ThemeContext = createContext({
  mode: 'light',
  toggleTheme: () => {},
});

// Custom hook to use the theme context
export const useThemeMode = () => useContext(ThemeContext);

// Theme provider component
export const ThemeModeProvider = ({ children }) => {
  // Try to get theme preference from localStorage
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  // Create memo to prevent unnecessary re-renders
  const themeContextValue = useMemo(
    () => ({
      mode,
      toggleTheme: () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('themeMode', newMode);
      },
    }),
    [mode]
  );

  // Determine the current theme based on mode
  const theme = mode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}; 