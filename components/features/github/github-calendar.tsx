"use client";

import dynamic from "next/dynamic";

const GitHubCalendarComponent = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false }
);

interface GitHubCalendarProps {
  username: string;
}

export function GitHubCalendarWrapper({ username }: GitHubCalendarProps) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-border/80 bg-card/60 p-4 sm:p-6 shadow-xs">
      <div className="min-w-[680px] flex justify-center">
        <GitHubCalendarComponent
          username={username}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    </div>
  );
}
