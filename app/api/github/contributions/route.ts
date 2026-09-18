import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface ActivityDay {
  date: string;
  count: number;
  level: number;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username") || process.env.GITHUB_USERNAME || "LVNVoid";

  try {
    const url = `https://github.com/users/${username}/contributions`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        Accept: "text/html,application/xhtml+xml",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch GitHub contributions: HTTP ${res.status}` },
        { status: res.status }
      );
    }

    const html = await res.text();

    const totalMatch = html.match(/([\d,]+)\s+contributions\s+in the last year/i);
    const totalCount = totalMatch ? parseInt(totalMatch[1].replace(/,/g, ""), 10) : 0;

    const tooltips = new Map<string, number>();
    const tooltipRegex = /<tool-tip[^>]+for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
    let tMatch: RegExpExecArray | null;
    while ((tMatch = tooltipRegex.exec(html)) !== null) {
      const forId = tMatch[1];
      const text = tMatch[2];
      const cMatch = text.match(/(\d+)\s+contribution/);
      tooltips.set(forId, cMatch ? parseInt(cMatch[1], 10) : 0);
    }

    const days: ActivityDay[] = [];
    const dayRegex = /<td[^>]+data-date="(\d{4}-\d{2}-\d{2})"[^>]+id="([^"]+)"[^>]+data-level="(\d)"/g;
    let match: RegExpExecArray | null;

    while ((match = dayRegex.exec(html)) !== null) {
      const date = match[1];
      const id = match[2];
      const level = Math.min(Math.max(parseInt(match[3], 10) || 0, 0), 4);
      const count = tooltips.get(id) ?? (level > 0 ? 1 : 0);
      days.push({ date, count, level });
    }

    days.sort((a, b) => a.date.localeCompare(b.date));

    return NextResponse.json(
      {
        username,
        totalCount,
        contributions: days,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    );
  } catch (err) {
    console.error("Error retrieving GitHub contributions:", err);
    return NextResponse.json(
      { error: "Internal server error fetching contribution data" },
      { status: 500 }
    );
  }
}
