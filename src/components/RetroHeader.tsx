import { Box, Container, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface RetroHeaderProps {
  onSearch: (username: string) => void;
  isLoading: boolean;
}

export const RetroHeader = ({ onSearch, isLoading }: RetroHeaderProps) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onSearch(username.trim());
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)',
        borderBottom: '3px solid #ff00ff',
        boxShadow: '0 5px 30px rgba(255, 0, 255, 0.4)',
        py: 6,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg">
        <Box textAlign="center" position="relative" zIndex={1}>
          <Typography
            variant="h1"
            sx={{
              mb: 2,
              fontSize: { xs: '1.5rem', md: '2.5rem' },
              animation: 'glow 2s ease-in-out infinite alternate',
              '@keyframes glow': {
                from: {
                  textShadow: '0 0 10px #ff00ff, 0 0 20px #ff00ff, 0 0 30px #ff00ff',
                },
                to: {
                  textShadow: '0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff',
                },
              },
            }}
          >
            GITHUB ANALYZER
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#00ffff',
              mb: 4,
              textShadow: '0 0 10px #00ffff',
              fontFamily: '"VT323", monospace',
              fontSize: '1.5rem',
            }}
          >
            &gt;&gt; DECODE THE MATRIX • ANALYZE THE CODE • UNLOCK THE STATS &lt;&lt;
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: 600,
              mx: 'auto',
              flexDirection: { xs: 'column', sm: 'row' },
            }}
          >
            <TextField
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username..."
              disabled={isLoading}
              sx={{
                '& input': {
                  fontFamily: '"VT323", monospace',
                  fontSize: '1.3rem',
                  color: '#00ffff',
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading || !username.trim()}
              startIcon={<SearchIcon />}
              sx={{ minWidth: 150 }}
            >
              {isLoading ? 'SCANNING...' : 'ANALYZE'}
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
