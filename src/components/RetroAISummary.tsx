import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RetroAISummaryProps {
  summary: string | null;
  isLoading: boolean;
}

export const RetroAISummary = ({ summary, isLoading }: RetroAISummaryProps) => {
  if (!summary && !isLoading) return null;

  return (
    <Card
      sx={{
        background: 'linear-gradient(135deg, rgba(255, 0, 255, 0.2) 0%, rgba(0, 255, 255, 0.2) 100%)',
        border: '3px solid #ff00ff',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 0, 255, 0.4), transparent)',
          animation: 'scan 3s infinite',
        },
        '@keyframes scan': {
          '0%': { left: '-100%' },
          '100%': { left: '100%' },
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <AutoAwesomeIcon
            sx={{
              fontSize: 40,
              color: '#ff00ff',
              animation: 'pulse 2s infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1 },
                '50%': { opacity: 0.5 },
              },
            }}
          />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            AI INTELLIGENCE REPORT
          </Typography>
        </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 4 }}>
          <CircularProgress sx={{ color: '#00ffff' }} />
          <Typography variant="body1" sx={{ color: '#00ffff' }}>
            ANALYZING CODE REPOSITORIES & DOCUMENTATION...
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            '& h2': {
              color: '#ff00ff',
              fontFamily: '"Orbitron", monospace',
              fontSize: '1.3rem',
              marginTop: 3,
              marginBottom: 2,
              textShadow: '0 0 10px #ff00ff',
            },
            '& h3': {
              color: '#00ffff',
              fontFamily: '"Orbitron", monospace',
              fontSize: '1.1rem',
              marginTop: 2,
              marginBottom: 1.5,
              textShadow: '0 0 8px #00ffff',
            },
            '& p': {
              fontFamily: '"VT323", monospace',
              fontSize: '1.2rem',
              lineHeight: 1.8,
              color: '#ffffff',
              marginBottom: 2,
            },
            '& ul, & ol': {
              fontFamily: '"VT323", monospace',
              fontSize: '1.1rem',
              color: '#00ffff',
              marginLeft: 3,
              marginBottom: 2,
            },
            '& li': {
              marginBottom: 1,
            },
            '& strong': {
              color: '#ffff00',
              fontWeight: 'bold',
            },
            '& em': {
              color: '#ff00ff',
              fontStyle: 'italic',
            },
            '& code': {
              backgroundColor: 'rgba(255, 0, 255, 0.2)',
              padding: '2px 6px',
              borderRadius: 0,
              border: '1px solid #ff00ff',
              fontFamily: 'monospace',
              fontSize: '0.9em',
            },
            '& pre': {
              backgroundColor: 'rgba(0, 255, 255, 0.1)',
              border: '2px solid #00ffff',
              padding: 2,
              overflow: 'auto',
              marginBottom: 2,
            },
            '& a': {
              color: '#00ffff',
              textDecoration: 'underline',
              '&:hover': {
                color: '#ff00ff',
              },
            },
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {summary || ''}
          </ReactMarkdown>
        </Box>
      )}
      </CardContent>
    </Card>
  );
};
