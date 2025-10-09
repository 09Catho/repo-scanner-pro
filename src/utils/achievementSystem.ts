export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  earned: boolean;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export const calculateAchievements = (data: any): Achievement[] => {
  const achievements: Achievement[] = [];
  const stats = data.statistics;
  const repos = data.topRepositories;

  // Star Hunter
  if (stats.totalStars >= 100) {
    achievements.push({
      id: 'star-hunter',
      title: '⭐ Star Hunter',
      description: `Earned ${stats.totalStars} total stars!`,
      icon: '⭐',
      earned: true,
      rarity: stats.totalStars >= 1000 ? 'legendary' : stats.totalStars >= 500 ? 'epic' : 'rare',
    });
  }

  // Repo Master
  if (stats.publicRepos >= 20) {
    achievements.push({
      id: 'repo-master',
      title: '📦 Repo Master',
      description: `Created ${stats.publicRepos} public repositories!`,
      icon: '📦',
      earned: true,
      rarity: stats.publicRepos >= 100 ? 'legendary' : stats.publicRepos >= 50 ? 'epic' : 'rare',
    });
  }

  // Social Butterfly
  if (stats.followers >= 50) {
    achievements.push({
      id: 'social-butterfly',
      title: '🦋 Social Butterfly',
      description: `${stats.followers} developers follow you!`,
      icon: '🦋',
      earned: true,
      rarity: stats.followers >= 500 ? 'legendary' : stats.followers >= 200 ? 'epic' : 'rare',
    });
  }

  // Fork Champion
  if (stats.totalForks >= 50) {
    achievements.push({
      id: 'fork-champion',
      title: '🍴 Fork Champion',
      description: `Projects forked ${stats.totalForks} times!`,
      icon: '🍴',
      earned: true,
      rarity: stats.totalForks >= 500 ? 'legendary' : stats.totalForks >= 200 ? 'epic' : 'rare',
    });
  }

  // Polyglot
  if (data.languages.length >= 5) {
    achievements.push({
      id: 'polyglot',
      title: '🌐 Polyglot',
      description: `Mastered ${data.languages.length} programming languages!`,
      icon: '🌐',
      earned: true,
      rarity: data.languages.length >= 15 ? 'legendary' : data.languages.length >= 10 ? 'epic' : 'rare',
    });
  }

  // Early Adopter
  const accountAge = new Date().getFullYear() - new Date(data.profile.created_at).getFullYear();
  if (accountAge >= 5) {
    achievements.push({
      id: 'early-adopter',
      title: '🏆 Early Adopter',
      description: `${accountAge} years on GitHub!`,
      icon: '🏆',
      earned: true,
      rarity: accountAge >= 10 ? 'legendary' : accountAge >= 8 ? 'epic' : 'rare',
    });
  }

  // Active Contributor
  if (data.recentActivity.length >= 5) {
    achievements.push({
      id: 'active-contributor',
      title: '⚡ Active Contributor',
      description: 'Recently active in the community!',
      icon: '⚡',
      earned: true,
      rarity: 'common',
    });
  }

  // Organization Member
  if (data.organizations.length > 0) {
    achievements.push({
      id: 'team-player',
      title: '👥 Team Player',
      description: `Member of ${data.organizations.length} organizations!`,
      icon: '👥',
      earned: true,
      rarity: data.organizations.length >= 5 ? 'epic' : 'rare',
    });
  }

  return achievements;
};

export const calculateRepoHealth = (repo: any): number => {
  let score = 0;
  
  // Stars contribute to health
  if (repo.stars > 0) score += Math.min(repo.stars * 2, 30);
  
  // Recent activity
  const daysSinceUpdate = Math.floor((Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24));
  if (daysSinceUpdate < 30) score += 25;
  else if (daysSinceUpdate < 90) score += 15;
  else if (daysSinceUpdate < 180) score += 5;
  
  // Has description
  if (repo.description) score += 10;
  
  // Has topics
  if (repo.topics && repo.topics.length > 0) score += 10;
  
  // Forks indicate interest
  if (repo.forks > 0) score += Math.min(repo.forks * 3, 15);
  
  // Has license
  if (repo.license) score += 10;
  
  return Math.min(score, 100);
};
