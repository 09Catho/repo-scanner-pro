import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Achievement } from '@/utils/achievementSystem';

interface AchievementBadgesProps {
  achievements: Achievement[];
}

const rarityColors = {
  common: '#808080',
  rare: '#0096ff',
  epic: '#9c27b0',
  legendary: '#ff9800',
};

export const AchievementBadges = ({ achievements }: AchievementBadgesProps) => {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <EmojiEventsIcon sx={{ fontSize: 40, color: '#ffff00' }} />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            ACHIEVEMENTS UNLOCKED
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {achievements.map((achievement) => (
            <Box
              key={achievement.id}
              sx={{
                border: `3px solid ${rarityColors[achievement.rarity]}`,
                p: 2,
                background: `linear-gradient(135deg, ${rarityColors[achievement.rarity]}22 0%, transparent 100%)`,
                minWidth: 200,
                position: 'relative',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: `0 0 20px ${rarityColors[achievement.rarity]}`,
                },
              }}
            >
              <Chip
                label={achievement.rarity.toUpperCase()}
                size="small"
                sx={{
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  background: rarityColors[achievement.rarity],
                  color: '#000',
                  fontWeight: 'bold',
                  fontSize: '0.6rem',
                }}
              />
              <Typography
                variant="h3"
                sx={{
                  fontSize: '3rem',
                  textAlign: 'center',
                  mb: 1,
                }}
              >
                {achievement.icon}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontSize: '0.9rem',
                  color: rarityColors[achievement.rarity],
                  textAlign: 'center',
                  mb: 1,
                }}
              >
                {achievement.title}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  color: '#00ffff',
                }}
              >
                {achievement.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
