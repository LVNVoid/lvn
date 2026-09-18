'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StaggerContainer, staggerItem } from '@/components/ui/animated';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github, Sparkles } from 'lucide-react';
import Image from 'next/image';
import type { Project } from '@/schemas/project-schema';

interface ProjectsProps {
  projects: readonly Project[];
  limit?: number;
  className?: string;
  variant?: 'grid' | 'featured';
}

export function Projects({
  projects,
  limit,
  className,
  variant = 'grid',
}: ProjectsProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  if (displayedProjects.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 p-8 text-center text-sm text-muted-foreground">
        No projects found.
      </div>
    );
  }

  // Editorial Asymmetrical Layout for Featured Showcase
  if (variant === 'featured' && displayedProjects.length > 0) {
    const [flagship, ...restProjects] = displayedProjects;

    return (
      <div className={`space-y-6 ${className || ''}`}>
        {/* Flagship Hero Card */}
        <Card className="overflow-hidden border-border/80 bg-card/60 transition-colors hover:border-teal-500/40">
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Image Preview */}
            <div className="relative h-56 w-full overflow-hidden bg-muted md:col-span-7 md:h-auto">
              {flagship.image ? (
                <Image
                  src={flagship.image}
                  alt={flagship.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center bg-gradient-to-br from-teal-950/20 to-teal-900/10">
                  <span className="text-5xl font-bold text-muted-foreground/20">
                    {flagship.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            {/* Content & Details */}
            <div className="flex flex-col justify-between p-6 md:col-span-5 md:p-8">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-mono text-teal-400">
                  <Sparkles className="h-3 w-3" />
                  Flagship Architecture
                </div>

                <h3 className="text-xl font-bold tracking-tight text-foreground md:text-2xl">
                  {flagship.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3 md:line-clamp-4">
                  {flagship.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {flagship.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="border border-border/50 bg-secondary/80 px-2 py-0 text-[11px] font-mono"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-6">
                <Button size="sm" asChild className="gap-1.5">
                  <Link href={`/projects/${flagship.slug}`}>
                    Case Study
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </Button>

                {flagship.link && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={flagship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Visit project"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}

                {flagship.github && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={flagship.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="View on GitHub"
                    >
                      <Github className="h-3.5 w-3.5" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Secondary Grid */}
        {restProjects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {restProjects.map((project) => (
              <Card
                key={project.id}
                className="group flex flex-col justify-between overflow-hidden border-border/80 bg-card/60 transition-colors hover:border-teal-500/40"
              >
                <div className="relative h-44 w-full overflow-hidden bg-muted">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-950/20 to-teal-900/10">
                      <span className="text-3xl font-bold text-muted-foreground/20">
                        {project.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-5">
                  <div className="space-y-2">
                    <h4 className="text-lg font-semibold tracking-tight text-foreground group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 pt-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="border border-border/50 bg-secondary/70 px-2 py-0 text-[10px] font-mono"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-border/50 mt-4">
                    <Button size="sm" asChild className="flex-1 text-xs">
                      <Link href={`/projects/${project.slug}`}>
                        Details
                        <ArrowRight className="ml-1.5 h-3 w-3" />
                      </Link>
                    </Button>
                    {project.link && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit project"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                    {project.github && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View source code"
                        >
                          <Github className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Standard Balanced Grid for All Projects Page
  return (
    <section className={className}>
      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project) => (
          <motion.div key={project.id} variants={staggerItem}>
            <Card className="group h-full flex flex-col overflow-hidden border-border/80 bg-card/60 transition-colors hover:border-teal-500/40">
              <div className="relative h-44 w-full overflow-hidden bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-teal-950/20 to-teal-900/10">
                    <span className="text-3xl font-bold text-muted-foreground/20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div className="space-y-2">
                  <CardHeader className="p-0">
                    <CardTitle className="text-base font-semibold leading-snug group-hover:text-teal-400 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="mt-1.5 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {project.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="p-0 pt-2">
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="border border-border/50 bg-secondary/70 px-2 py-0 text-[10px] font-mono"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </div>

                <CardFooter className="p-0 pt-4 border-t border-border/50 mt-4">
                  <div className="flex w-full items-center gap-2">
                    <Button size="sm" asChild className="flex-1 text-xs">
                      <Link href={`/projects/${project.slug}`}>
                        Details
                        <ArrowRight className="ml-1.5 h-3 w-3" />
                      </Link>
                    </Button>

                    {project.link && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Visit project"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </Button>
                    )}

                    {project.github && (
                      <Button size="sm" variant="outline" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="View on GitHub"
                        >
                          <Github className="h-3 w-3" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </div>
            </Card>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  );
}
