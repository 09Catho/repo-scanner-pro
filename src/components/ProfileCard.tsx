import { Card, CardContent, Box, Typography, Avatar, Chip, Grid2 as Grid } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import PeopleIcon from '@mui/icons-material/People';
import CodeIcon from '@mui/icons-material/Code';

interface ProfileCardProps {
  profile: any;
  statistics: any;
}

export const ProfileCard = ({ profile, statistics }: ProfileCardProps) => {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: 'linear-gradient(45deg, #ff00ff, #00ffff, #ff00ff)',
          borderRadius: 0,
          zIndex: -1,
          animation: 'rotate 4s linear infinite',
        },
        '@keyframes rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 4 }} sx={{ textAlign: 'center' }}>
            <Avatar
              src={profile.avatar_url}
              alt={profile.name}
              sx={{
                width: 200,
                height: 200,
                mx: 'auto',
                border: '4px solid #ff00ff',
                boxShadow: '0 0 30px rgba(255, 0, 255, 0.6)',
              }}
            />
            <Typography variant="h3" sx={{ mt: 2, color: '#ff00ff' }}>
              {profile.name || profile.login}
            </Typography>
            <Typography variant="body1" sx={{ color: '#00ffff' }}>
              @{profile.login}
            </Typography>
            {profile.bio && (
              <Typography variant="body1" sx={{ mt: 2, fontFamily: '"VT323", monospace' }}>
                {profile.bio}
              </Typography>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 8 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              {profile.company && (
                <Chip
                  label={`🏢 ${profile.company}`}
                  sx={{
                    background: 'linear-gradient(45deg, #ff00ff, #00ffff)',
                    color: '#000',
                    fontWeight: 'bold',
                    border: '2px solid #00ffff',
                  }}
                />
              )}
              {profile.location && (
                <Chip
                  label={`📍 ${profile.location}`}
                  sx={{
                    background: 'linear-gradient(45deg, #00ffff, #ff00ff)',
                    color: '#000',
                    fontWeight: 'bold',
                    border: '2px solid #ff00ff',
                  }}
                />
              )}
            </Box>

            <Grid container spacing={2}>
              <Grid size={{ xs: 6, sm: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    border: '2px solid #00ffff',
                    textAlign: 'center',
                    background: 'rgba(0, 255, 255, 0.1)',
                  }}
                >
                  <StarIcon sx={{ color: '#ffff00', fontSize: 40 }} />
                  <Typography variant="h3" sx={{ color: '#ffff00', mt: 1 }}>
                    {statistics.totalStars}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#00ffff' }}>
                    STARS
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    border: '2px solid #ff00ff',
                    textAlign: 'center',
                    background: 'rgba(255, 0, 255, 0.1)',
                  }}
                >
                  <ForkRightIcon sx={{ color: '#ff00ff', fontSize: 40 }} />
                  <Typography variant="h3" sx={{ color: '#ff00ff', mt: 1 }}>
                    {statistics.totalForks}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#00ffff' }}>
                    FORKS
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    border: '2px solid #00ff00',
                    textAlign: 'center',
                    background: 'rgba(0, 255, 0, 0.1)',
                  }}
                >
                  <PeopleIcon sx={{ color: '#00ff00', fontSize: 40 }} />
                  <Typography variant="h3" sx={{ color: '#00ff00', mt: 1 }}>
                    {statistics.followers}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#00ffff' }}>
                    FOLLOWERS
                  </Typography>
                </Box>
              </Grid>

              <Grid size={{ xs: 6, sm: 3 }}>
                <Box
                  sx={{
                    p: 2,
                    border: '2px solid #ffff00',
                    textAlign: 'center',
                    background: 'rgba(255, 255, 0, 0.1)',
                  }}
                >
                  <CodeIcon sx={{ color: '#ffff00', fontSize: 40 }} />
                  <Typography variant="h3" sx={{ color: '#ffff00', mt: 1 }}>
                    {statistics.publicRepos}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#00ffff' }}>
                    REPOS
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
