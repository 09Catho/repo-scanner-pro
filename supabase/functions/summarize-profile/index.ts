import "https://deno.land/x/xhr@0.1.0/mod.ts";
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
    const { profileData } = await req.json();
    
    if (!profileData) {
      return new Response(
        JSON.stringify({ error: 'Profile data is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating AI summary for profile:', profileData.profile.login);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Construct a comprehensive prompt with all the profile data
    const prompt = `Analyze this GitHub profile and provide a comprehensive, insightful summary:

Username: ${profileData.profile.login}
Name: ${profileData.profile.name || 'Not provided'}
Bio: ${profileData.profile.bio || 'No bio'}
Location: ${profileData.profile.location || 'Not specified'}
Company: ${profileData.profile.company || 'Not specified'}

Statistics:
- Public Repositories: ${profileData.statistics.publicRepos}
- Total Stars Earned: ${profileData.statistics.totalStars}
- Total Forks: ${profileData.statistics.totalForks}
- Followers: ${profileData.statistics.followers}
- Following: ${profileData.statistics.following}

Top Languages: ${profileData.languages.map((l: any) => `${l.language} (${l.count} repos)`).join(', ')}

Top Repositories:
${profileData.topRepositories.slice(0, 5).map((r: any) => 
  `- ${r.name}: ${r.description || 'No description'} (⭐${r.stars}, 🍴${r.forks})`
).join('\n')}

Organizations: ${profileData.organizations.length > 0 ? profileData.organizations.map((o: any) => o.login).join(', ') : 'None'}

Please provide:
1. A brief professional summary (2-3 sentences) highlighting their expertise and impact
2. Key strengths based on their repositories and contributions
3. Notable achievements (most starred repos, language expertise, community engagement)
4. Overall developer profile assessment

Keep the tone professional yet approachable. Focus on actionable insights.`;

    // Call Lovable AI
    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert technical recruiter and developer advocate who analyzes GitHub profiles to identify talent and expertise. Provide clear, insightful summaries that highlight strengths and specializations.' 
          },
          { role: 'user', content: prompt }
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI credits exhausted. Please add credits to continue.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const errorText = await response.text();
      console.error('AI gateway error:', response.status, errorText);
      throw new Error('Failed to generate AI summary');
    }

    const data = await response.json();
    const summary = data.choices[0].message.content;

    console.log('Successfully generated AI summary');

    return new Response(
      JSON.stringify({ summary }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in summarize-profile function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Failed to generate summary' 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
