import { createTheme } from '@mui/material/styles';

export const retroTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ff00ff', // Neon magenta
      light: '#ff66ff',
      dark: '#cc00cc',
    },
    secondary: {
      main: '#00ffff', // Neon cyan
      light: '#66ffff',
      dark: '#00cccc',
    },
    background: {
      default: '#0a0e27',
      paper: '#1a1f3a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#00ffff',
    },
    success: {
      main: '#00ff00',
    },
    warning: {
      main: '#ffff00',
    },
    error: {
      main: '#ff0066',
    },
  },
  typography: {
    fontFamily: '"Orbitron", "VT323", "Press Start 2P", monospace',
    h1: {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '2.5rem',
      textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff',
    },
    h2: {
      fontFamily: '"Press Start 2P", monospace',
      fontSize: '1.8rem',
      textShadow: '0 0 8px #00ffff',
    },
    h3: {
      fontFamily: '"Orbitron", monospace',
      fontWeight: 900,
    },
    body1: {
      fontFamily: '"VT323", monospace',
      fontSize: '1.2rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          textTransform: 'uppercase',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.7rem',
          padding: '12px 24px',
          border: '2px solid #ff00ff',
          background: 'linear-gradient(45deg, #ff00ff 0%, #00ffff 100%)',
          boxShadow: '0 0 20px rgba(255, 0, 255, 0.5), inset 0 0 20px rgba(0, 255, 255, 0.3)',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 30px rgba(255, 0, 255, 0.8), inset 0 0 30px rgba(0, 255, 255, 0.5)',
            transform: 'scale(1.05)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(135deg, #1a1f3a 0%, #0a0e27 100%)',
          border: '2px solid #ff00ff',
          boxShadow: '0 0 30px rgba(255, 0, 255, 0.3), inset 0 0 30px rgba(0, 255, 255, 0.1)',
          borderRadius: 0,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '2px solid #00ffff',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)',
          background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.9) 0%, rgba(10, 14, 39, 0.9) 100%)',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            '& fieldset': {
              borderColor: '#00ffff',
              borderWidth: '2px',
            },
            '&:hover fieldset': {
              borderColor: '#ff00ff',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#ff00ff',
              boxShadow: '0 0 15px rgba(255, 0, 255, 0.5)',
            },
          },
        },
      },
    },
  },
});
