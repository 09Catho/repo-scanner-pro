import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { RetroHeader } from "@/components/RetroHeader";
import { ProfileCard } from "@/components/ProfileCard";
import { RetroAISummary } from "@/components/RetroAISummary";
import { AchievementBadges } from "@/components/AchievementBadges";
import { RepoHealthScores } from "@/components/RepoHealthScores";
import { LanguageDoughnutChart } from "@/components/LanguageDoughnutChart";
import { RepoBarChart } from "@/components/RepoBarChart";
import { ActivityFeed } from "@/components/ActivityFeed";
import { calculateAchievements } from "@/utils/achievementSystem";
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
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (username: string) => {
    setIsLoading(true);
    setGithubData(null);
    setAiSummary(null);

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

      // Generate AI summary
      setIsSummaryLoading(true);
      try {
        const { data: summaryData, error: summaryError } = await supabase.functions.invoke('summarize-profile', {
          body: { profileData: data },
        });

        if (summaryError) throw summaryError;

        if (summaryData.error) {
          toast({
            title: "AI Summary Warning",
            description: summaryData.error,
            variant: "destructive",
          });
        } else {
          setAiSummary(summaryData.summary);
        }
      } catch (summaryError) {
        console.error('Error generating AI summary:', summaryError);
      } finally {
        setIsSummaryLoading(false);
      }

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

  const achievements = githubData ? calculateAchievements(githubData) : [];

  return (
    <div className="min-h-screen bg-[#0a0e27] relative">
      {/* Retro grid background */}
      <div className="fixed inset-0 pointer-events-none z-0" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255, 0, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
      }} />
      
      <RetroHeader onSearch={handleSearch} isLoading={isLoading} />

      {isLoading && (
        <div className="relative z-10 max-w-7xl mx-auto py-20 text-center">
          <div className="inline-block w-20 h-20 border-4 border-[#ff00ff] border-t-transparent rounded-full animate-spin mb-6" />
          <h2 className="text-4xl font-['Press_Start_2P'] text-[#00ffff] animate-pulse">
            DECODING GITHUB MATRIX...
          </h2>
        </div>
      )}

      {githubData && !isLoading && (
        <div className="relative z-10 max-w-7xl mx-auto py-12 px-4">
          <div className="flex flex-col gap-8">
            <ProfileCard profile={githubData.profile} statistics={githubData.statistics} />
            
            <RetroAISummary summary={aiSummary} isLoading={isSummaryLoading} />

            {achievements.length > 0 && <AchievementBadges achievements={achievements} />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LanguageDoughnutChart languages={githubData.languages} />
              <RepoBarChart repositories={githubData.topRepositories} />
            </div>

            <ActivityFeed activities={githubData.recentActivity} />

            <RepoHealthScores repositories={githubData.topRepositories} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
