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
import { Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface Project {
  id: string; // Changed from inferred to explicit or any
  title: string;
  description: string;
  tech: string[];
  link?: string | null;
  github?: string | null;
  // image?
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
          <motion.div key={index} variants={staggerItem}>
            <Card className="h-full flex flex-col justify-between overflow-hidden border-muted-foreground/10 bg-card/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{project.title}</CardTitle>
                <CardDescription className="mt-2 text-base line-clamp-3">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4">
                {project.github && (
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href={project.github} target="_blank">
                      <Github className="mr-2 h-4 w-4" /> Code
                    </Link>
                  </Button>
                )}
                {project.link && (
                  <Button size="sm" asChild className="w-full">
                    <Link href={project.link} target="_blank">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </StaggerContainer>
    </section>
  );
}
