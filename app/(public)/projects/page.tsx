import { Projects } from '@/components/sections/projects';
import { PageHeader } from '@/components/ui/page-header';
import { Cuboid, Sparkles } from 'lucide-react';
import { getProjects } from '@/services/project-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects | Engineering Works & Case Studies',
  description:
    'Explore production web applications, architectural designs, and open source software.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <PageHeader
          title="Projects"
          description="A curated catalog of production applications built for performance, resilience, and user experience."
          icon={Cuboid}
        />
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-mono text-teal-400 shrink-0">
          <Sparkles className="h-3.5 w-3.5" />
          {projects.length} Engineered Works
        </div>
      </div>

      <Projects projects={projects} />
    </div>
  );
}
