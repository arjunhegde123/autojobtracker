import { createTheme } from '@mui/material/styles';

// Define shared theme settings
const getTheme = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light' 
      ? {
        // Light mode colors
        primary: {
          main: '#2D81FF', // Bright blue similar to Figma
          light: '#E8F1FF',
          dark: '#1A66CC',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#6C5CE7', // Purple accent (from Figma/Canva)
          light: '#A29BFE',
          dark: '#5541D9',
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#FCFCFD', // Very light gray (Notion-like)
          paper: '#FFFFFF',
        },
        text: {
          primary: '#37352F', // Notion text color
          secondary: '#6D6D6D',
        },
        divider: 'rgba(0, 0, 0, 0.06)',
      } 
      : {
        // Dark mode colors
        primary: {
          main: '#4D8EFF', // Brighter blue for dark mode visibility
          light: '#1E293B',
          dark: '#81A7FF',
          contrastText: '#FFFFFF',
        },
        secondary: {
          main: '#9F94FF', // Lighter purple for dark mode
          light: '#6C5CE7',
          dark: '#B9B0FF',
          contrastText: '#FFFFFF',
        },
        background: {
          default: '#0F172A', // Dark blue (like Figma dark mode)
          paper: '#1E293B',  // Slightly lighter than background
        },
        text: {
          primary: '#F8FAFC', // Light text for dark mode
          secondary: '#CBD5E1',
        },
        divider: 'rgba(255, 255, 255, 0.08)',
      }),
    error: {
      main: mode === 'light' ? '#FF4D4F' : '#FF6B6B',
    },
    warning: {
      main: mode === 'light' ? '#FAAD14' : '#FFD166',
    },
    info: {
      main: mode === 'light' ? '#2D81FF' : '#4D8EFF',
    },
    success: {
      main: mode === 'light' ? '#52C41A' : '#68D391',
    },
  },
  typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '0.875rem',
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '0.875rem',
    },
    body2: {
      fontSize: '0.75rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  shadows: [
    'none',
    mode === 'light' 
      ? '0px 1px 2px rgba(0, 0, 0, 0.06)'
      : '0px 1px 2px rgba(0, 0, 0, 0.3)',
    mode === 'light'
      ? '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
      : '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.2)',
    mode === 'light'
      ? '0px 4px 8px -2px rgba(0, 0, 0, 0.1), 0px 2px 4px -2px rgba(0, 0, 0, 0.06)'
      : '0px 4px 8px -2px rgba(0, 0, 0, 0.4), 0px 2px 4px -2px rgba(0, 0, 0, 0.2)',
    mode === 'light'
      ? '0px 12px 16px -4px rgba(0, 0, 0, 0.08), 0px 4px 6px -2px rgba(0, 0, 0, 0.03)'
      : '0px 12px 16px -4px rgba(0, 0, 0, 0.5), 0px 4px 6px -2px rgba(0, 0, 0, 0.3)',
    mode === 'light'
      ? '0px 20px 24px -4px rgba(0, 0, 0, 0.08), 0px 8px 8px -4px rgba(0, 0, 0, 0.03)'
      : '0px 20px 24px -4px rgba(0, 0, 0, 0.5), 0px 8px 8px -4px rgba(0, 0, 0, 0.2)',
    ...Array(19).fill('none'),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 16px',
          fontWeight: 500,
          boxShadow: 'none',
          textTransform: 'none',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: mode === 'light'
              ? '0px 4px 8px -2px rgba(45, 129, 255, 0.2), 0px 2px 4px -2px rgba(45, 129, 255, 0.1)'
              : '0px 4px 8px -2px rgba(77, 142, 255, 0.3), 0px 2px 4px -2px rgba(77, 142, 255, 0.2)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light'
            ? '0px 4px 12px rgba(0, 0, 0, 0.05)'
            : '0px 4px 12px rgba(0, 0, 0, 0.2)',
        },
        elevation1: {
          boxShadow: mode === 'light'
            ? '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
            : '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: mode === 'light'
            ? '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
            : '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: mode === 'light'
            ? '1px solid rgba(0, 0, 0, 0.06)'
            : '1px solid rgba(255, 255, 255, 0.08)',
          padding: '16px',
        },
        head: {
          fontWeight: 600,
          backgroundColor: mode === 'light'
            ? 'rgba(0, 0, 0, 0.02)'
            : 'rgba(255, 255, 255, 0.03)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 6,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: mode === 'light'
            ? '1px solid rgba(0, 0, 0, 0.06)'
            : '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: mode === 'light'
            ? '0px 4px 12px rgba(0, 0, 0, 0.05)'
            : 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light'
            ? '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)'
            : '0px 1px 3px rgba(0, 0, 0, 0.3), 0px 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          padding: 8,
        },
        track: {
          borderRadius: 22 / 2,
          backgroundColor: mode === 'light' 
            ? '#E9E9EA' 
            : '#39393D',
        },
        thumb: {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2)',
          backgroundColor: mode === 'light' 
            ? '#FFF' 
            : '#F1F1F1',
        },
      },
    },
  },
});

// Create the theme instance with initial mode
const lightTheme = createTheme(getTheme('light'));
const darkTheme = createTheme(getTheme('dark'));

export { lightTheme, darkTheme }; 