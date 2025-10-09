import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitCommit, GitPullRequest, GitBranch, Star, Code } from "lucide-react";

interface Activity {
  type: string;
  repo: string;
  created_at: string;
}

interface ActivityTimelineProps {
  activities: Activity[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'PushEvent':
      return <GitCommit size={16} />;
    case 'PullRequestEvent':
      return <GitPullRequest size={16} />;
    case 'CreateEvent':
      return <GitBranch size={16} />;
    case 'WatchEvent':
      return <Star size={16} />;
    default:
      return <Code size={16} />;
  }
};

const getActivityLabel = (type: string) => {
  const labels: { [key: string]: string } = {
    'PushEvent': 'Pushed commits',
    'PullRequestEvent': 'Pull request',
    'CreateEvent': 'Created',
    'WatchEvent': 'Starred',
    'ForkEvent': 'Forked',
    'IssuesEvent': 'Issue',
  };
  return labels[type] || type.replace('Event', '');
};

const getActivityColor = (type: string) => {
  const colors: { [key: string]: string } = {
    'PushEvent': 'bg-primary/10 text-primary',
    'PullRequestEvent': 'bg-secondary/10 text-secondary',
    'CreateEvent': 'bg-green-500/10 text-green-500',
    'WatchEvent': 'bg-yellow-500/10 text-yellow-500',
    'ForkEvent': 'bg-purple-500/10 text-purple-500',
  };
  return colors[type] || 'bg-muted text-muted-foreground';
};

export const ActivityTimeline = ({ activities }: ActivityTimelineProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-card animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <Badge className={`${getActivityColor(activity.type)} flex items-center gap-1 px-2 py-1`}>
              {getActivityIcon(activity.type)}
              {getActivityLabel(activity.type)}
            </Badge>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{activity.repo}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.created_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
