// Contribution calendar and featured repos for the homepage "Building in public" tile.
// Uses the GraphQL API when GITHUB_TOKEN is set, otherwise the public calendar page.
// Everything is cached for a day and degrades to an empty grid if GitHub is unreachable.

export type GitHubDay = { date: string; level: 0 | 1 | 2 | 3 | 4; count: number | null };
export type GitHubRepo = { name: string; description: string; stars: number; url: string };
export type GitHubYear = {
  total: number;
  activeDays: number;
  totalDays: number;
  longestStreak: number;
  busiest: { date: string; count: number } | null;
};
export type GitHubData = { days: GitHubDay[]; repos: GitHubRepo[]; live: boolean; year: GitHubYear | null };

const WEEKS = 30;
const DAY = 24 * 60 * 60 * 1000;
const REVALIDATE = { next: { revalidate: 60 * 60 * 24 } };

function emptyDays(): GitHubDay[] {
  const end = new Date();
  const start = new Date(end.getTime() - (WEEKS * 7 - 1) * DAY);
  start.setDate(start.getDate() - start.getDay());
  const days: GitHubDay[] = [];
  for (let t = start.getTime(); t <= end.getTime(); t += DAY) {
    days.push({ date: new Date(t).toISOString().slice(0, 10), level: 0, count: 0 });
  }
  return days;
}

function lastWeeks(days: GitHubDay[]) {
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  if (!sorted.length) return emptyDays();
  const keep = sorted.slice(-WEEKS * 7);
  // Start the grid on a Sunday so rows line up with weekdays.
  const offset = new Date(`${keep[0].date}T00:00:00Z`).getUTCDay();
  return keep.slice(offset ? 7 - offset : 0);
}

async function fromGraphQL(user: string, token: string): Promise<GitHubDay[] | null> {
  const query = `query($login:String!){user(login:$login){contributionsCollection{contributionCalendar{weeks{contributionDays{date contributionCount contributionLevel}}}}}}`;
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables: { login: user } }),
    ...REVALIDATE,
  });
  if (!res.ok) return null;
  const json = await res.json();
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;
  if (!Array.isArray(weeks)) return null;
  const LEVEL: Record<string, GitHubDay["level"]> = {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  };
  return weeks.flatMap((w: { contributionDays: { date: string; contributionCount: number; contributionLevel: string }[] }) =>
    w.contributionDays.map((d) => ({ date: d.date, count: d.contributionCount, level: LEVEL[d.contributionLevel] ?? 0 })),
  );
}

async function fromCalendarPage(user: string): Promise<GitHubDay[] | null> {
  const res = await fetch(`https://github.com/users/${user}/contributions`, REVALIDATE);
  if (!res.ok) return null;
  const html = await res.text();
  const counts = new Map<string, number>();
  for (const m of Array.from(html.matchAll(/<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g))) {
    const n = m[2].match(/^(\d+|No) contribution/);
    if (n) counts.set(m[1], n[1] === "No" ? 0 : Number(n[1]));
  }
  const days: GitHubDay[] = [];
  for (const m of Array.from(html.matchAll(/<td\b[^>]*data-date="([\d-]+)"[^>]*>/g))) {
    const tag = m[0];
    const id = tag.match(/id="([^"]+)"/)?.[1];
    const level = Number(tag.match(/data-level="(\d)"/)?.[1] ?? 0) as GitHubDay["level"];
    days.push({ date: m[1], level, count: id ? (counts.get(id) ?? null) : null });
  }
  return days.length ? days : null;
}

type Featured = { repo: string; description?: string };

async function featuredRepos(list: readonly Featured[], token?: string): Promise<GitHubRepo[]> {
  const repos = await Promise.all(
    list.map(async ({ repo, description }) => {
      const res = await fetch(`https://api.github.com/repos/${repo}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        ...REVALIDATE,
      });
      if (!res.ok) return null;
      const r: { full_name: string; description: string | null; stargazers_count: number; html_url: string } = await res.json();
      return { name: r.full_name, description: description ?? r.description ?? "", stars: r.stargazers_count, url: r.html_url };
    }),
  );
  return repos.filter((r): r is GitHubRepo => r !== null);
}

// Totals over the whole calendar GitHub returns (the last year), not just the weeks shown.
function yearStats(days: GitHubDay[]): GitHubYear | null {
  if (!days.length || days.some((d) => d.count === null)) return null;
  const sorted = [...days].sort((a, b) => a.date.localeCompare(b.date));
  let streak = 0;
  let longestStreak = 0;
  let busiest: GitHubYear["busiest"] = null;
  for (const d of sorted) {
    const c = d.count ?? 0;
    streak = c > 0 ? streak + 1 : 0;
    longestStreak = Math.max(longestStreak, streak);
    if (c > 0 && (!busiest || c > busiest.count)) busiest = { date: d.date, count: c };
  }
  return {
    total: sorted.reduce((a, d) => a + (d.count ?? 0), 0),
    activeDays: sorted.filter((d) => (d.count ?? 0) > 0).length,
    totalDays: sorted.length,
    longestStreak,
    busiest,
  };
}

export async function getGitHub(user: string, featured: readonly Featured[]): Promise<GitHubData> {
  const token = process.env.GITHUB_TOKEN;
  let days: GitHubDay[] | null = null;
  let repos: GitHubRepo[] = [];
  try {
    days = token ? await fromGraphQL(user, token) : null;
    days ??= await fromCalendarPage(user);
  } catch {
    days = null;
  }
  try {
    repos = await featuredRepos(featured, token);
  } catch {
    repos = [];
  }
  return { days: lastWeeks(days ?? emptyDays()), repos, live: !!days, year: days ? yearStats(days) : null };
}
