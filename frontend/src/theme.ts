import { createTheme } from '@mui/material/styles';
export const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#FF6200', // YouTube-like yellowish-orange
      },
      background: {
        default: '#121212',
        paper: '#1d1d1d',
      },
    },
    typography: {
      h1: {
        fontSize: '3rem',
        fontWeight: 700,
        background: 'linear-gradient(45deg, #FF6200, #FFB300)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
      body1: {
        fontSize: '1.1rem',
      },
    },
  });