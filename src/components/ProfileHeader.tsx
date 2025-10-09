import { Users, GitFork, Star, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProfileHeaderProps {
  profile: {
    login: string;
    name: string;
    avatar_url: string;
    bio: string;
    company?: string;
    location?: string;
    email?: string;
    blog?: string;
    twitter_username?: string;
    followers: number;
    following: number;
    public_repos: number;
    public_gists: number;
  };
  statistics: {
    totalStars: number;
    totalForks: number;
  };
}

export const ProfileHeader = ({ profile, statistics }: ProfileHeaderProps) => {
  return (
    <Card className="p-6 bg-gradient-to-br from-card to-card/50 border-border shadow-card animate-fade-in">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={profile.avatar_url}
          alt={profile.name}
          className="w-32 h-32 rounded-full border-4 border-primary/20 shadow-glow"
        />
        
        <div className="flex-1">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">{profile.name}</h1>
              <p className="text-xl text-muted-foreground">@{profile.login}</p>
            </div>
            {profile.company && (
              <Badge className="bg-primary/10 text-primary border-primary/20">
                {profile.company}
              </Badge>
            )}
          </div>
          
          {profile.bio && (
            <p className="mt-4 text-foreground/90">{profile.bio}</p>
          )}
          
          <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
            {profile.location && <span>📍 {profile.location}</span>}
            {profile.blog && (
              <a
                href={profile.blog}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                🔗 {profile.blog}
              </a>
            )}
            {profile.twitter_username && (
              <span>🐦 @{profile.twitter_username}</span>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard icon={<Users size={20} />} label="Followers" value={profile.followers} />
            <StatCard icon={<Users size={20} />} label="Following" value={profile.following} />
            <StatCard icon={<Star size={20} />} label="Total Stars" value={statistics.totalStars} />
            <StatCard icon={<GitFork size={20} />} label="Total Forks" value={statistics.totalForks} />
          </div>
        </div>
      </div>
    </Card>
  );
};

const StatCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) => (
  <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
    <div className="text-primary">{icon}</div>
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-bold text-foreground">{value.toLocaleString()}</p>
    </div>
  </div>
);
