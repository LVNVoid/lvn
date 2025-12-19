import { mockGithubStats, mockRecentActivity } from "@/data/mock";

const GITHUB_USERNAME = "elvien"; // Should be env var or config
// In a real app, use process.env.GITHUB_TOKEN to avoid rate limits

export async function getGitHubStats() {
  try {
    const [userRes, reposRes, contributionsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=owner`, { next: { revalidate: 3600 } }),
      fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, { next: { revalidate: 3600 } })
    ]);

    if (!userRes.ok) throw new Error("Failed to fetch user stats");
    
    const user = await userRes.json();
    const repos = reposRes.ok ? await reposRes.json() : [];
    const contributions = contributionsRes.ok ? await contributionsRes.json() : null;

    // Calculate total stars
    const total_stars = Array.isArray(repos) 
      ? repos.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0)
      : 0;

    // Get total contributions (fallback to 0 if api fails)
    const total_contributions = contributions?.total?.[new Date().getFullYear()] || 0; 

    return {
      followers: user.followers,
      following: user.following,
      public_repos: user.public_repos,
      total_stars,
      total_contributions
    };
  } catch (error) {
    console.error("GitHub API Error:", error);
    return mockGithubStats;
  }
}

export async function getRecentActivity() {
  try {
    const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events`, {
       next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed to fetch activity");

    return await res.json();
  } catch (error) {
    console.error("GitHub API Error:", error);
    return mockRecentActivity;
  }
}
