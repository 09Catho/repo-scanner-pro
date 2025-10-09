import { Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

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
              SCANNING NEURAL PATHWAYS...
            </Typography>
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{
              fontFamily: '"VT323", monospace',
              fontSize: '1.2rem',
              lineHeight: 1.6,
              whiteSpace: 'pre-wrap',
              color: '#ffffff',
            }}
          >
            {summary}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};
