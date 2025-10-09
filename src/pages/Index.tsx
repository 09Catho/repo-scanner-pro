import { useState } from "react";
import { Github, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SearchForm } from "@/components/SearchForm";
import { ProfileHeader } from "@/components/ProfileHeader";
import { LanguageChart } from "@/components/LanguageChart";
import { TopRepositories } from "@/components/TopRepositories";
import { ActivityTimeline } from "@/components/ActivityTimeline";
import { StatsOverview } from "@/components/StatsOverview";
import { useToast } from "@/hooks/use-toast";

interface GitHubData {
  profile: any;
  statistics: any;
  languages: any[];
  topRepositories: any[];
  recentActivity: any[];
  organizations: any[];
  allRepositories: any[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [githubData, setGithubData] = useState<GitHubData | null>(null);
  const { toast } = useToast();

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setGithubData(null);

    try {
      const { data, error } = await supabase.functions.invoke('fetch-github-data', {
        body: { username },
      });

      if (error) throw error;

      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
        return;
      }

      setGithubData(data);
      toast({
        title: "Success",
        description: `Analyzed @${username}'s profile!`,
      });
    } catch (error) {
      console.error('Error fetching GitHub data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch GitHub data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-20" />
        
        <div className="relative container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-glow">
              <Github size={40} className="text-background" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              GitHub Analyzer
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive profile analysis with insights, statistics, and visualizations
            </p>
          </div>

          <SearchForm onSearch={handleSearch} isLoading={isLoading} />

          {isLoading && (
            <div className="flex flex-col items-center justify-center mt-12 space-y-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="text-muted-foreground">Analyzing GitHub profile...</p>
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      {githubData && !isLoading && (
        <div className="container mx-auto px-4 py-12 space-y-8">
          <ProfileHeader 
            profile={githubData.profile} 
            statistics={githubData.statistics}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LanguageChart languages={githubData.languages} />
            <StatsOverview repositories={githubData.topRepositories} />
          </div>

          <TopRepositories repositories={githubData.topRepositories} />
          
          <ActivityTimeline activities={githubData.recentActivity} />

          {githubData.organizations.length > 0 && (
            <div className="p-6 rounded-lg bg-card border border-border shadow-card">
              <h2 className="text-2xl font-bold text-foreground mb-4">Organizations</h2>
              <div className="flex flex-wrap gap-4">
                {githubData.organizations.map((org: any, index: number) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                    <img
                      src={org.avatar_url}
                      alt={org.login}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="font-medium text-foreground">{org.login}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;
