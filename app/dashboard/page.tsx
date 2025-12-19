import { getGitHubStats, getRecentActivity } from "@/lib/github";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { SlideUp, StaggerContainer } from "@/components/ui/animated";
import { Github, Folder, UserCheck, Activity, Star, Users, GitCommit } from "lucide-react";
import { formatDate } from "@/lib/utils";

import { PageHeader } from "@/components/ui/page-header";
import { LayoutDashboard } from "lucide-react";

export default async function DashboardPage() {
    const stats = await getGitHubStats();
    const activity = await getRecentActivity();

    return (
        <div className="space-y-8">
            <PageHeader
                title="Dashboard"
                description="My coding activity and statistics from GitHub."
                icon={LayoutDashboard}
            />

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                <SlideUp delay={0.1}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Public Repos
                            </CardTitle>
                            <Folder className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.public_repos}</div>
                        </CardContent>
                    </Card>
                </SlideUp>

                <SlideUp delay={0.2}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Followers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.followers}</div>
                        </CardContent>
                    </Card>
                </SlideUp>

                <SlideUp delay={0.3}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Following
                            </CardTitle>
                            <UserCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.following}</div>
                        </CardContent>
                    </Card>
                </SlideUp>

                <SlideUp delay={0.4}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Stars
                            </CardTitle>
                            <Star className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_stars}</div>
                        </CardContent>
                    </Card>
                </SlideUp>

                <SlideUp delay={0.5}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Contributions (Year)
                            </CardTitle>
                            <GitCommit className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_contributions}</div>
                        </CardContent>
                    </Card>
                </SlideUp>
            </div>

            {/* Recent Activity */}
            <SlideUp delay={0.5}>
                <h2 className="text-2xl font-bold tracking-tight mb-4">Recent Activity</h2>
            </SlideUp>

            <StaggerContainer className="space-y-4">
                {activity.slice(0, 10).map((event: any) => (
                    <SlideUp key={event.id} className="border rounded-lg p-4 bg-card/50">
                        <div className="flex items-center gap-4">
                            <Activity className="h-5 w-5 text-primary" />
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {event.type.replace("Event", "")} on <span className="text-primary">{event.repo.name}</span>
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {formatDate(event.created_at)}
                                </p>
                            </div>
                        </div>
                    </SlideUp>
                ))}
            </StaggerContainer>
        </div>
    );
}
