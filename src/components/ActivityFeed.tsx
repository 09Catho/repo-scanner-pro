import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import TimelineIcon from '@mui/icons-material/Timeline';

interface ActivityFeedProps {
  activities: Array<{
    type: string;
    repo: string;
    created_at: string;
  }>;
}

const activityEmojis: { [key: string]: string } = {
  PushEvent: '📤',
  PullRequestEvent: '🔀',
  CreateEvent: '✨',
  WatchEvent: '⭐',
  ForkEvent: '🍴',
  IssuesEvent: '❗',
  IssueCommentEvent: '💬',
  DeleteEvent: '🗑️',
};

const activityColors: { [key: string]: string } = {
  PushEvent: '#00ff00',
  PullRequestEvent: '#ff00ff',
  CreateEvent: '#ffff00',
  WatchEvent: '#ff9800',
  ForkEvent: '#00ffff',
  IssuesEvent: '#ff0066',
  IssueCommentEvent: '#0096ff',
  DeleteEvent: '#808080',
};

export const ActivityFeed = ({ activities }: ActivityFeedProps) => {
  return (
    <Card>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <TimelineIcon sx={{ fontSize: 40, color: '#00ff00' }} />
          <Typography variant="h2" sx={{ fontSize: '1.5rem' }}>
            ACTIVITY STREAM
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {activities.map((activity, index) => {
            const emoji = activityEmojis[activity.type] || '📊';
            const color = activityColors[activity.type] || '#00ffff';
            const eventType = activity.type.replace('Event', '');

            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2,
                  border: `2px solid ${color}`,
                  background: `linear-gradient(90deg, ${color}22 0%, transparent 100%)`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateX(10px)',
                    boxShadow: `0 0 20px ${color}`,
                  },
                }}
              >
                <Typography sx={{ fontSize: '2rem' }}>{emoji}</Typography>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: '"VT323", monospace',
                      fontSize: '1.1rem',
                      color: '#ffffff',
                    }}
                  >
                    {activity.repo}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '0.8rem',
                      color: '#00ffff',
                      fontFamily: '"VT323", monospace',
                    }}
                  >
                    {new Date(activity.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>
                <Chip
                  label={eventType}
                  size="small"
                  sx={{
                    background: color,
                    color: '#000',
                    fontWeight: 'bold',
                    fontFamily: '"Press Start 2P", monospace',
                    fontSize: '0.5rem',
                  }}
                />
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
};
