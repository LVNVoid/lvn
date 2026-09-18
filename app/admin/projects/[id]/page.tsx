import Link from "next/link";
import Image from "next/image";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChevronLeft, Edit, Github, Globe } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage(props: PageProps) {
  const params = await props.params;
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="h-9 w-9">
            <Link href="/admin/projects">
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-foreground">
              {project.title}
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              slug: /{project.slug} • created: {formatDate(project.createdAt)}
            </p>
          </div>
        </div>
        <Button size="sm" asChild className="gap-1.5 self-start sm:self-auto font-medium">
          <Link href={`/admin/projects/${project.id}/edit`}>
            <Edit className="h-3.5 w-3.5" /> Edit Project
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card className="border border-border/80 bg-card/60 rounded-xl shadow-xs">
            <CardHeader>
              <CardTitle className="text-lg font-bold tracking-tight">System Specification</CardTitle>
              <CardDescription className="text-xs">
                Application overview and architectural context
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Description
                </h3>
                <p className="text-sm leading-relaxed text-foreground whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-2">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="px-2.5 py-0.5 text-xs font-mono border border-border/50 bg-secondary/70"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-border/60">
                {project.link && (
                  <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs font-mono">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-3.5 w-3.5 text-teal-400" />
                      Live Application
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="gap-1.5 text-xs font-mono">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3.5 w-3.5" />
                      GitHub Repository
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="border border-border/80 bg-card/60 rounded-xl shadow-xs">
            <CardHeader>
              <CardTitle className="text-sm font-bold tracking-tight">Showcase Asset</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-xl overflow-hidden border border-border/80 bg-muted/40 aspect-video relative flex items-center justify-center">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-muted-foreground text-xs font-mono">No image provided</span>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
