import { Card, CardContent, Typography, Box, LinearProgress, Chip } from '@mui/material';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import { calculateRepoHealth } from '@/utils/achievementSystem';

interface RepoHealthScoresProps {
  repositories: any[];
}

const getHealthColor = (score: number) => {
  if (score >= 80) return '#00ff00';
  if (score >= 60) return '#ffff00';
  if (score >= 40) return '#ff9800';
  return '#ff0066';
};

const getHealthLabel = (score: number) => {
  if (score >= 80) return 'EXCELLENT';
  if (score >= 60) return 'GOOD';
  if (score >= 40) return 'AVERAGE';
  return 'NEEDS ATTENTION';
};

export const RepoHealthScores = ({ repositories }: RepoHealthScoresProps) => {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#00ff00' }} />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            REPOSITORY HEALTH ANALYSIS
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {repositories.slice(0, 8).map((repo, index) => {
            const healthScore = calculateRepoHealth(repo);
            const healthColor = getHealthColor(healthScore);

            return (
              <Box
                key={index}
                sx={{
                  border: `2px solid ${healthColor}`,
                  p: 2,
                  background: `linear-gradient(90deg, ${healthColor}11 0%, transparent 100%)`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: `0 0 20px ${healthColor}`,
                    transform: 'translateX(5px)',
                  },
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: '1rem',
                      color: '#ff00ff',
                      fontFamily: '"Orbitron", monospace',
                    }}
                  >
                    {repo.name}
                  </Typography>
                  <Chip
                    label={getHealthLabel(healthScore)}
                    size="small"
                    sx={{
                      background: healthColor,
                      color: '#000',
                      fontWeight: 'bold',
                      fontSize: '0.7rem',
                    }}
                  />
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={healthScore}
                  sx={{
                    height: 10,
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid #00ffff',
                    '& .MuiLinearProgress-bar': {
                      background: `linear-gradient(90deg, ${healthColor} 0%, ${healthColor}88 100%)`,
                    },
                  }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body1" sx={{ fontSize: '0.9rem', color: '#00ffff' }}>
                    Health Score
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: '0.9rem', color: healthColor, fontWeight: 'bold' }}>
                    {healthScore}/100
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
