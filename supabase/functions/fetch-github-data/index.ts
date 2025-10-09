import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { username } = await req.json();
    
    if (!username) {
      return new Response(
        JSON.stringify({ error: 'Username is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching GitHub data for username:', username);

    // Fetch user profile
    const userResponse = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'GitHub-Analyzer-App',
      },
    });

    if (!userResponse.ok) {
      if (userResponse.status === 404) {
        return new Response(
          JSON.stringify({ error: 'User not found' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`GitHub API error: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    // Fetch user's repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Analyzer-App',
        },
      }
    );

    const reposData = await reposResponse.json();

    // Fetch user's events (recent activity)
    const eventsResponse = await fetch(
      `https://api.github.com/users/${username}/events/public?per_page=30`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Analyzer-App',
        },
      }
    );

    const eventsData = await eventsResponse.json();

    // Fetch organizations
    const orgsResponse = await fetch(
      `https://api.github.com/users/${username}/orgs`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'GitHub-Analyzer-App',
        },
      }
    );

    const orgsData = await orgsResponse.json();

    // Fetch README files for top 2 repos
    const readmePromises = reposData.slice(0, 2).map(async (repo: any) => {
      try {
        const readmeResponse = await fetch(
          `https://api.github.com/repos/${username}/${repo.name}/readme`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
              'User-Agent': 'GitHub-Analyzer-App',
            },
          }
        );
        
        if (readmeResponse.ok) {
          const readmeData = await readmeResponse.json();
          const readmeContent = atob(readmeData.content); // Decode base64
          return {
            repo: repo.name,
            content: readmeContent,
          };
        }
        return null;
      } catch (error) {
        console.error(`Failed to fetch README for ${repo.name}:`, error);
        return null;
      }
    });

    const readmeFiles = (await Promise.all(readmePromises)).filter(Boolean);

    // Calculate statistics
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
    const totalForks = reposData.reduce((acc: number, repo: any) => acc + (repo.forks_count || 0), 0);
    const totalWatchers = reposData.reduce((acc: number, repo: any) => acc + (repo.watchers_count || 0), 0);

    // Language statistics
    const languageStats: { [key: string]: number } = {};
    reposData.forEach((repo: any) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
    });

    // Sort languages by frequency
    const topLanguages = Object.entries(languageStats)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([language, count]) => ({ language, count }));

    // Get top repositories by stars
    const topRepos = [...reposData]
      .sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
      .slice(0, 10)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        watchers: repo.watchers_count,
        language: repo.language,
        url: repo.html_url,
        topics: repo.topics || [],
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        license: repo.license?.name || null,
        open_issues: repo.open_issues_count,
      }));

    // Process recent activity
    const recentActivity = eventsData.slice(0, 10).map((event: any) => ({
      type: event.type,
      repo: event.repo.name,
      created_at: event.created_at,
      payload: {
        action: event.payload.action,
        ref: event.payload.ref,
        ref_type: event.payload.ref_type,
      },
    }));

    // Compile comprehensive response
    const response = {
      profile: {
        login: userData.login,
        name: userData.name,
        avatar_url: userData.avatar_url,
        bio: userData.bio,
        company: userData.company,
        location: userData.location,
        email: userData.email,
        blog: userData.blog,
        twitter_username: userData.twitter_username,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists,
        followers: userData.followers,
        following: userData.following,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        hireable: userData.hireable,
      },
      statistics: {
        totalStars,
        totalForks,
        totalWatchers,
        publicRepos: userData.public_repos,
        publicGists: userData.public_gists,
        followers: userData.followers,
        following: userData.following,
      },
      languages: topLanguages,
      topRepositories: topRepos,
      recentActivity,
      organizations: orgsData.map((org: any) => ({
        login: org.login,
        avatar_url: org.avatar_url,
        description: org.description,
      })),
      allRepositories: reposData.map((repo: any) => ({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        url: repo.html_url,
        topics: repo.topics || [],
      })),
      readmeFiles,
    };

    console.log('Successfully fetched GitHub data');

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in fetch-github-data function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to fetch GitHub data' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
