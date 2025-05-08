import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb', // Bright blue
      light: '#60a5fa',
      dark: '#1d4ed8',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7c3aed', // Purple
      light: '#a78bfa',
      dark: '#5b21b6',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8fafc',
      paper: '#ffffff',
    },
    error: {
      main: '#ef4444',
    },
    warning: {
      main: '#f59e0b',
    },
    info: {
      main: '#3b82f6',
    },
    success: {
      main: '#10b981',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 10,
  },
  shadows: [
    'none',
    '0px 2px 1px -1px rgba(0,0,0,0.05),0px 1px 1px 0px rgba(0,0,0,0.03),0px 1px 3px 0px rgba(0,0,0,0.05)',
    '0px 3px 3px -2px rgba(0,0,0,0.06),0px 2px 6px 0px rgba(0,0,0,0.04),0px 1px 8px 0px rgba(0,0,0,0.06)',
    '0px 3px 4px -2px rgba(0,0,0,0.07),0px 3px 8px -1px rgba(0,0,0,0.05),0px 1px 12px 0px rgba(0,0,0,0.07)',
    '0px 2px 5px -1px rgba(0,0,0,0.08),0px 4px 10px -2px rgba(0,0,0,0.06),0px 1px 14px -1px rgba(0,0,0,0.08)',
    '0px 3px 6px -1px rgba(0,0,0,0.09),0px 5px 12px -2px rgba(0,0,0,0.07),0px 1px 18px -1px rgba(0,0,0,0.09)',
    '0px 4px 7px -2px rgba(0,0,0,0.1),0px 6px 14px -3px rgba(0,0,0,0.08),0px 1px 22px -1px rgba(0,0,0,0.1)',
    '0px 5px 8px -2px rgba(0,0,0,0.11),0px 7px 16px -3px rgba(0,0,0,0.09),0px 2px 25px -2px rgba(0,0,0,0.11)',
    '0px 5px 10px -3px rgba(0,0,0,0.12),0px 8px 18px -4px rgba(0,0,0,0.1),0px 3px 28px -2px rgba(0,0,0,0.12)',
    '0px 6px 11px -3px rgba(0,0,0,0.13),0px 9px 20px -4px rgba(0,0,0,0.11),0px 4px 31px -3px rgba(0,0,0,0.13)',
    '0px 7px 12px -4px rgba(0,0,0,0.14),0px 10px 22px -5px rgba(0,0,0,0.12),0px 5px 34px -3px rgba(0,0,0,0.14)',
    '0px 7px 14px -4px rgba(0,0,0,0.15),0px 11px 24px -5px rgba(0,0,0,0.13),0px 6px 37px -4px rgba(0,0,0,0.15)',
    '0px 8px 15px -5px rgba(0,0,0,0.16),0px 12px 26px -6px rgba(0,0,0,0.14),0px 7px 40px -4px rgba(0,0,0,0.16)',
    '0px 8px 17px -5px rgba(0,0,0,0.17),0px 13px 28px -6px rgba(0,0,0,0.15),0px 8px 43px -5px rgba(0,0,0,0.17)',
    '0px 9px 18px -6px rgba(0,0,0,0.18),0px 14px 30px -7px rgba(0,0,0,0.16),0px 9px 46px -5px rgba(0,0,0,0.18)',
    '0px 10px 20px -6px rgba(0,0,0,0.19),0px 15px 32px -7px rgba(0,0,0,0.17),0px 10px 49px -6px rgba(0,0,0,0.19)',
    '0px 10px 21px -7px rgba(0,0,0,0.2),0px 16px 34px -8px rgba(0,0,0,0.18),0px 11px 52px -6px rgba(0,0,0,0.2)',
    '0px 11px 23px -7px rgba(0,0,0,0.21),0px 17px 36px -8px rgba(0,0,0,0.19),0px 12px 55px -7px rgba(0,0,0,0.21)',
    '0px 11px 24px -8px rgba(0,0,0,0.22),0px 18px 38px -9px rgba(0,0,0,0.2),0px 13px 58px -7px rgba(0,0,0,0.22)',
    '0px 12px 26px -8px rgba(0,0,0,0.23),0px 19px 40px -9px rgba(0,0,0,0.21),0px 14px 61px -8px rgba(0,0,0,0.23)',
    '0px 13px 27px -9px rgba(0,0,0,0.24),0px 20px 42px -10px rgba(0,0,0,0.22),0px 15px 64px -8px rgba(0,0,0,0.24)',
    '0px 13px 29px -9px rgba(0,0,0,0.25),0px 21px 44px -10px rgba(0,0,0,0.23),0px 16px 67px -9px rgba(0,0,0,0.25)',
    '0px 14px 30px -10px rgba(0,0,0,0.26),0px 22px 46px -11px rgba(0,0,0,0.24),0px 17px 70px -9px rgba(0,0,0,0.26)',
    '0px 14px 32px -10px rgba(0,0,0,0.27),0px 23px 48px -11px rgba(0,0,0,0.25),0px 18px 73px -10px rgba(0,0,0,0.27)',
    '0px 15px 33px -11px rgba(0,0,0,0.28),0px 24px 50px -12px rgba(0,0,0,0.26),0px 19px 76px -10px rgba(0,0,0,0.28)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        },
        contained: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #e2e8f0',
          boxShadow: 'none',
        },
      },
    },
  },
});

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
); 