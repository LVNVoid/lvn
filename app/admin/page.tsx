import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { Briefcase, Code2, Award, GraduationCap } from "lucide-react";

export default async function AdminDashboard() {
  const [projectCount, skillCount, certificateCount, educationCount] =
    await Promise.all([
      prisma.project.count(),
      prisma.skill.count(),
      prisma.certificate.count(),
      prisma.education.count(),
    ]);

  const stats = [
    {
      title: "Total Projects",
      count: projectCount,
      description: "Active engineering works",
      icon: Briefcase,
      color: "text-teal-400 bg-teal-500/10 border-teal-500/20",
    },
    {
      title: "Total Skills",
      count: skillCount,
      description: "Technologies & frameworks",
      icon: Code2,
      color: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    },
    {
      title: "Certificates",
      count: certificateCount,
      description: "Verified credentials",
      icon: Award,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    },
    {
      title: "Education",
      count: educationCount,
      description: "Academic milestones",
      icon: GraduationCap,
      color: "text-indigo-400 bg-indigo-500/10 border-indigo-500/20",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-400">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-foreground">
          Console Overview
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground mt-1">
          High-level inventory of portfolio content and telemetry entities.
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-border/80 bg-card/60 transition-colors hover:border-teal-500/40 rounded-xl"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg border ${stat.color}`}>
                <stat.icon className="h-4 w-4" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                {stat.count}
              </div>
              <p className="text-[11px] font-mono text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
