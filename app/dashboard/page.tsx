import { getRecentActivity } from '@/lib/github';
import { SlideUp, StaggerContainer } from '@/components/ui/animated';
import { Activity, GithubIcon, HistoryIcon } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { GitHubCalendarWrapper } from '@/components/github-calendar';
import { PageHeader } from '@/components/ui/page-header';
import { LayoutDashboard } from 'lucide-react';

export default async function DashboardPage() {
  const activity = await getRecentActivity();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="My coding activity and statistics from GitHub."
        icon={LayoutDashboard}
      />
      <SlideUp delay={0.1}>
        <div className="flex item-center space-x-2">
          <GithubIcon className="h-6 w-6 text-primary shrink-0" />
          <h2 className="text-xl font-bold tracking-tight mb-4">
            GitHub Stats
          </h2>
        </div>
      </SlideUp>

      <SlideUp delay={0.2}>
        <GitHubCalendarWrapper username="LVNVoid" />
      </SlideUp>

      <SlideUp delay={0.3}>
        <div className="flex item-center space-x-2">
          <HistoryIcon className="h-6 w-6 text-primary shrink-0" />
          <h2 className="text-xl font-bold tracking-tight mb-4">
            Recent Activity
          </h2>
        </div>
      </SlideUp>
      <SlideUp delay={0.4}>
        <StaggerContainer className="space-y-4">
          {activity.slice(0, 10).map((event: any) => (
            <SlideUp
              key={event.id}
              className="border rounded-lg p-4 bg-card/50"
            >
              <div className="flex items-center gap-4">
                <Activity className="h-5 w-5 text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {event.type.replace('Event', '')} on{' '}
                    <span className="text-primary">{event.repo.name}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(event.created_at)}
                  </p>
                </div>
              </div>
            </SlideUp>
          ))}
        </StaggerContainer>
      </SlideUp>
    </div>
  );
}
