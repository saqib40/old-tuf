// src/theme.ts
import { createTheme, alpha } from '@mui/material/styles';

// Define the custom palette colors
const palette = {
  primary: {
    main: '#f97316', // Orange 500
    light: '#fdba74',
    dark: '#c2410c',
    contrastText: '#ffffff',
  },
  secondary: {
    main: '#64748b', // Slate 500
  },
  background: {
    default: '#0f0f0f', // Deep Rich Dark Grey
    paper: '#0f172a',   // Slate 900
  },
  text: {
    primary: '#e2e8f0', // Slate 200
    secondary: '#94a3b8', // Slate 400
  },
  divider: '#1e293b', // Slate 800
};

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    ...palette,
  },
  typography: {
    fontFamily: "'Outfit', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#ffffff',
      letterSpacing: '-0.02em',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 600,
      color: '#ffffff',
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
      color: '#ffffff',
    },
    h4: {
      fontWeight: 500,
      color: '#ffffff',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#ffffff',
    },
    h6: {
      fontWeight: 500,
      color: '#ffffff',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: palette.text.primary,
      fontWeight: 400,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      color: palette.text.secondary,
      fontWeight: 400,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: palette.background.default,
          scrollbarColor: '#334155 #020617',
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            background: '#020617',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#334155',
            borderRadius: '4px',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.background.paper, 0.4),
          backdropFilter: 'blur(12px)',
          border: `1px solid ${alpha('#ffffff', 0.08)}`,
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        containedPrimary: {
          background: palette.primary.main, // Solid color instead of gradient for less "orangish" feel
          '&:hover': {
            background: palette.primary.dark,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.background.paper, 0.3),
          backdropFilter: 'blur(8px)',
          border: `1px solid ${alpha('#ffffff', 0.05)}`,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: '8px 0',
            backgroundColor: alpha(palette.background.paper, 0.5),
            border: `1px solid ${alpha(palette.primary.main, 0.2)}`,
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px solid ${alpha('#ffffff', 0.05)}`,
        },
        head: {
          fontWeight: 600,
          backgroundColor: alpha(palette.background.paper, 0.6),
        },
      },
    },
  },
});