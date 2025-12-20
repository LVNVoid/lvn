const GITHUB_API = 'https://api.github.com';

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
};

export async function getRecentActivity() {
  const res = await fetch(
    `${GITHUB_API}/users/${process.env.GITHUB_USERNAME}/events/public`,
    {
      headers,
      next: { revalidate: 300 },
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch GitHub activity');
  }

  return res.json();
}
