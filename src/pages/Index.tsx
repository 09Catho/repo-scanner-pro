import { useState } from "react";
import { ThemeProvider, CssBaseline, Container, Box, CircularProgress, Typography, Grid2 as Grid } from "@mui/material";
import { retroTheme } from "@/theme/retroTheme";
import { supabase } from "@/integrations/supabase/client";
import { RetroHeader } from "@/components/RetroHeader";
import { ProfileCard } from "@/components/ProfileCard";
import { RetroAISummary } from "@/components/RetroAISummary";
import { AchievementBadges } from "@/components/AchievementBadges";
import { RepoHealthScores } from "@/components/RepoHealthScores";
import { LanguageBreakdown } from "@/components/LanguageBreakdown";
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
    <ThemeProvider theme={retroTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: '#0a0e27',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255, 0, 255, 0.1) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            pointerEvents: 'none',
            zIndex: 0,
          },
        }}
      >
        <RetroHeader onSearch={handleSearch} isLoading={isLoading} />

        {isLoading && (
          <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
            <CircularProgress
              size={80}
              sx={{
                color: '#ff00ff',
                mb: 3,
              }}
            />
            <Typography
              variant="h3"
              sx={{
                color: '#00ffff',
                textShadow: '0 0 10px #00ffff',
                animation: 'blink 1s infinite',
                '@keyframes blink': {
                  '0%, 100%': { opacity: 1 },
                  '50%': { opacity: 0.3 },
                },
              }}
            >
              DECODING GITHUB MATRIX...
            </Typography>
          </Container>
        )}

        {githubData && !isLoading && (
          <Container maxWidth="lg" sx={{ py: 6, position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <ProfileCard profile={githubData.profile} statistics={githubData.statistics} />
              
              <RetroAISummary summary={aiSummary} isLoading={isSummaryLoading} />

              {achievements.length > 0 && <AchievementBadges achievements={achievements} />}

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <LanguageBreakdown languages={githubData.languages} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <ActivityFeed activities={githubData.recentActivity} />
                </Grid>
              </Grid>

              <RepoHealthScores repositories={githubData.topRepositories} />
            </Box>
          </Container>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default Index;
