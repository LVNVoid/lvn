"use client";

import dynamic from 'next/dynamic';

const GitHubCalendarComponent = dynamic(
    () => import('react-github-calendar').then((mod) => mod.GitHubCalendar),
    { ssr: false }
);

interface GitHubCalendarProps {
    username: string;
}

export function GitHubCalendarWrapper({ username }: GitHubCalendarProps) {
    return <GitHubCalendarComponent username={username} />;
}
