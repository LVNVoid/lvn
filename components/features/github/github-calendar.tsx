"use client";

import { useEffect, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { GitCommit, AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Activity } from "react-activity-calendar";

const ActivityCalendar = dynamic(
  () => import("react-activity-calendar").then((mod) => mod.ActivityCalendar),
  {
    ssr: false,
    loading: () => (
      <div className="h-[140px] w-full flex items-center justify-center text-xs font-mono text-muted-foreground animate-pulse">
        Initializing telemetry graph...
      </div>
    ),
  }
);

const oledTheme = {
  dark: ["#141414", "#093833", "#0F766E", "#0d9488", "#14B8A6"],
  light: ["#ebedf0", "#99f6e4", "#2dd4bf", "#0f766e", "#115e59"],
};

interface GitHubCalendarProps {
  username: string;
}

export function GitHubCalendarWrapper({ username }: GitHubCalendarProps) {
  const [data, setData] = useState<Activity[] | null>(null);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchContributions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/github/contributions?username=${encodeURIComponent(username)}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json.contributions || []);
      setTotalCount(json.totalCount ?? 0);
    } catch (err) {
      console.error("Failed to load contributions:", err);
      setError("Unable to sync live contribution telemetry at this time.");
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  return (
    <div className="w-full space-y-3">
      <div className="w-full overflow-x-auto rounded-xl border border-border/80 bg-card/60 p-4 sm:p-6 shadow-xs">
        <div className="min-w-[680px] flex flex-col items-center justify-center gap-4">
          {loading && !data && (
            <div className="h-[130px] w-full flex items-center justify-center text-xs font-mono text-muted-foreground animate-pulse">
              Fetching contribution telemetry from GitHub...
            </div>
          )}

          {error && !data && (
            <div className="py-8 flex flex-col items-center justify-center gap-2 text-center">
              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                <AlertCircle className="h-4 w-4 text-amber-500" />
                {error}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchContributions}
                className="mt-2 text-xs font-mono gap-1.5 border-border/60 hover:border-teal-500/30"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                Retry Telemetry
              </Button>
            </div>
          )}

          {data && (
            <div className="w-full flex flex-col items-center gap-4">
              <ActivityCalendar
                data={data}
                theme={oledTheme}
                fontSize={12}
                blockSize={12}
                blockMargin={4}
                maxLevel={4}
                colorScheme="dark"
                labels={{
                  totalCount: `{{count}} contributions in the last year`,
                }}
              />
              {totalCount !== null && (
                <div className="w-full flex items-center justify-between text-xs font-mono text-muted-foreground pt-1 border-t border-border/40">
                  <span className="inline-flex items-center gap-1.5 text-teal-400 font-medium">
                    <GitCommit className="h-3.5 w-3.5" />
                    {totalCount.toLocaleString()} contributions in the last year
                  </span>
                  <span className="text-[11px] text-muted-foreground/80">
                    Source: GitHub API / @{username}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
