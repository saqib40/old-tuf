// src/theme.ts
import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF6200', // Orange, adjust if different
    },
    background: {
      default: '#121212',
      paper: 'rgba(29, 29, 29, 0.8)',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontSize: '2.8rem', // Increased for "Coding Sheets"
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h5: {
      fontSize: '1.25rem', // Increased for card titles
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '0.9rem', // Increased for subtitle, disclaimer
      fontWeight: 400,
      '@media (max-width:600px)': {
        fontSize: '0.8rem',
      },
    },
    button: {
      fontSize: '1rem', // Increased
      fontWeight: 500,
    },
  },
});