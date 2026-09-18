import { getRecentActivity } from "@/lib/github";
import { SlideUp, StaggerContainer } from "@/components/ui/animated";
import { GithubIcon, HistoryIcon, GitCommit } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { GitHubCalendarWrapper } from "@/components/features/github/github-calendar";
import { PageHeader } from "@/components/ui/page-header";
import { LayoutDashboard } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Dashboard | Telemetry & Activity",
  description:
    "Live GitHub contribution telemetry, deployment activity, and version control metrics.",
};

interface GitHubEvent {
  id: string;
  type: string;
  repo: {
    name: string;
  };
  created_at: string;
}

export default async function DashboardPage() {
  let activity: GitHubEvent[] = [];
  try {
    activity = await getRecentActivity();
  } catch (error) {
    console.error("Failed to load GitHub activity:", error);
  }

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Dashboard"
        description="Live GitHub activity telemetry, version control commits, and repository metrics."
        icon={LayoutDashboard}
      />

      {/* GitHub Calendar Section */}
      <section className="space-y-4">
        <SlideUp delay={0.1}>
          <div className="flex items-center gap-2.5">
            <GithubIcon className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Contribution Telemetry
            </h2>
          </div>
        </SlideUp>

        <SlideUp delay={0.2}>
          <GitHubCalendarWrapper username="LVNVoid" />
        </SlideUp>
      </section>

      {/* Recent Activity Section */}
      <section className="space-y-4">
        <SlideUp delay={0.3}>
          <div className="flex items-center gap-2.5">
            <HistoryIcon className="h-5 w-5 text-primary shrink-0" />
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
              Recent Activity
            </h2>
          </div>
        </SlideUp>

        <SlideUp delay={0.4}>
          <StaggerContainer className="space-y-3">
            {activity.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/80 p-8 text-center text-sm text-muted-foreground">
                No recent public activity discovered.
              </div>
            ) : (
              activity.slice(0, 10).map((event: GitHubEvent) => (
                <SlideUp
                  key={event.id}
                  className="rounded-xl border border-border/80 bg-card/60 p-3.5 sm:p-4 transition-colors hover:border-teal-500/40"
                >
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4">
                    <div className="rounded-lg border border-teal-500/20 bg-teal-500/10 p-2 text-teal-400 shrink-0 mt-0.5 sm:mt-0">
                      <GitCommit className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-1">
                      <p className="text-xs sm:text-sm font-medium text-foreground truncate">
                        {event.type.replace("Event", "")} on{" "}
                        <span className="font-mono text-teal-400 font-semibold">
                          {event.repo.name}
                        </span>
                      </p>
                      <p className="text-[11px] font-mono text-muted-foreground">
                        {formatDate(event.created_at)}
                      </p>
                    </div>
                  </div>
                </SlideUp>
              ))
            )}
          </StaggerContainer>
        </SlideUp>
      </section>
    </div>
  );
}
