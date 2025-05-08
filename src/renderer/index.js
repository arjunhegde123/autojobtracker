import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider } from './ThemeContext';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <ThemeModeProvider>
    <CssBaseline />
    <App />
  </ThemeModeProvider>
); 