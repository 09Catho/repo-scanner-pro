import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, Eye, ExternalLink } from "lucide-react";

interface Repository {
  name: string;
  description: string;
  stars: number;
  forks: number;
  watchers: number;
  language: string;
  url: string;
  topics: string[];
}

interface TopRepositoriesProps {
  repositories: Repository[];
}

export const TopRepositories = ({ repositories }: TopRepositoriesProps) => {
  return (
    <Card className="p-6 bg-card border-border shadow-card animate-fade-in">
      <h2 className="text-2xl font-bold text-foreground mb-6">Top Repositories</h2>
      <div className="space-y-4">
        {repositories.map((repo, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-all group"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-lg font-semibold text-foreground hover:text-primary transition-colors group-hover:underline"
                >
                  {repo.name}
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                {repo.description && (
                  <p className="mt-1 text-sm text-muted-foreground">{repo.description}</p>
                )}
                
                <div className="flex flex-wrap gap-2 mt-3">
                  {repo.language && (
                    <Badge variant="secondary" className="bg-primary/10 text-primary">
                      {repo.language}
                    </Badge>
                  )}
                  {repo.topics.slice(0, 3).map((topic) => (
                    <Badge key={topic} variant="outline" className="text-xs">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star size={14} className="text-primary" />
                  {repo.stars.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork size={14} />
                  {repo.forks.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {repo.watchers.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
