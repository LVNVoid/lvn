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
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  tech: string[];
  link?: string | null;
  github?: string | null;
  image?: string | null;
}

interface ProjectsProps {
  projects: Project[];
  limit?: number;
  className?: string;
}

export function Projects({ projects, limit, className }: ProjectsProps) {
  const displayedProjects = limit ? projects.slice(0, limit) : projects;

  return (
    <section className={className}>
      <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayedProjects.map((project, index) => (
          <motion.div key={project.id} variants={staggerItem}>
            <Card className="group h-full flex flex-col overflow-hidden border-muted-foreground/10 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10">
              <div className="relative h-48 w-full overflow-hidden bg-muted">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                    <span className="text-4xl font-bold text-muted-foreground/20">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              <div className="flex flex-1 flex-col">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="mt-2 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 pb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs font-medium px-2.5 py-0.5"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/50">
                  <div className="flex w-full gap-2">
                    <Button size="sm" asChild className="flex-1 group/btn">
                      <Link href={`/projects/${project.slug}`}>
                        View Details
                        <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>

                    {/* Optional Links */}
                    {(project.link || project.github) && (
                      <div className="flex gap-2">
                        {project.link && (
                          <Button size="sm" variant="outline" asChild>
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Visit project"
                            >
                              <ExternalLink className="h-3.5 w-3.5" />
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
                              <Github className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        )}
                      </div>
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