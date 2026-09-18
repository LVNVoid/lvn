import { SlideUp } from "@/components/ui/animated";
import { PageHeader } from "@/components/ui/page-header";
import { GraduationCap, User, Sparkles, Terminal, Code2, Database } from "lucide-react";
import { getProfile } from "@/services/profile-service";
import { getEducations } from "@/services/education-service";
import { Education } from "@/components/sections/education";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me | Engineering Journey",
  description:
    "Learn more about Elvien, his background, education, and journey as a Software Engineer.",
};

const CORE_COMPETENCIES = [
  {
    icon: Code2,
    title: "Full-Stack Web Systems",
    desc: "Next.js App Router, Server Actions, React, and modular design systems.",
  },
  {
    icon: Database,
    title: "Database Modeling & Optimization",
    desc: "PostgreSQL, Prisma ORM, relational schema indexing, and connection pooling.",
  },
  {
    icon: Terminal,
    title: "Strict Type Safety",
    desc: "End-to-end TypeScript enforcement with Zod runtime validation contracts.",
  },
  {
    icon: Sparkles,
    title: "Performance & Craft",
    desc: "Minimal runtime bundle, zero layout shift (CLS), and accessible semantics.",
  },
];

export default async function AboutPage() {
  const [profile, educations] = await Promise.all([
    getProfile(),
    getEducations(),
  ]);

  return (
    <div className="space-y-12 pb-16">
      {/* Bio & Background Section */}
      <section className="space-y-6">
        <PageHeader
          title="About Me"
          description="Background, technical philosophy, and engineering craft."
          icon={User}
        />

        <SlideUp delay={0.1}>
          <div className="rounded-xl border border-border/80 bg-card/40 p-6 sm:p-8 space-y-6">
            <div className="space-y-4">
              <p className="text-base sm:text-lg leading-[1.8] text-foreground/90 font-normal">
                {profile?.bio ||
                  "Software Engineer specializing in architecting resilient web applications, data systems, and polished digital experiences."}
              </p>
              <p className="text-sm sm:text-base leading-[1.8] text-muted-foreground">
                I focus on building software where reliability, performance, and clean architectural separation matter most. My approach pairs modern web standards with rigorous engineering discipline — favoring simple, scalable primitives over bloated abstractions.
              </p>
            </div>

            {/* Core Competencies Grid */}
            <div className="pt-4 border-t border-border/60">
              <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                Core Engineering Focus
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {CORE_COMPETENCIES.map((comp) => {
                  const Icon = comp.icon;
                  return (
                    <div
                      key={comp.title}
                      className="rounded-lg border border-border/60 bg-secondary/30 p-3.5 sm:p-4 space-y-1.5 transition-colors hover:border-teal-500/40"
                    >
                      <div className="flex items-center gap-2 text-teal-400">
                        <Icon className="h-4 w-4 shrink-0" />
                        <h4 className="text-xs sm:text-sm font-semibold text-foreground">
                          {comp.title}
                        </h4>
                      </div>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {comp.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </SlideUp>
      </section>

      {/* Education Timeline Section */}
      <section className="space-y-6 pt-2">
        <PageHeader
          title="Education"
          description="Academic foundation and formal training in computer science."
          icon={GraduationCap}
        />

        <SlideUp delay={0.2}>
          <Education educations={educations} />
        </SlideUp>
      </section>
    </div>
  );
}
