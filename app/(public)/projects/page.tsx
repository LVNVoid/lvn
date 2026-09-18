import { Projects } from '@/components/sections/projects';
import { PageHeader } from '@/components/ui/page-header';
import { Cuboid } from 'lucide-react';
import { getProjects } from '@/services/project-service';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Explore my portfolio of projects, featuring web applications, open source contributions, and experiments.',
};

export const revalidate = 60;

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Projects"
        description="A selection of real apps built to solve real problems."
        icon={Cuboid}
      />
      <Projects projects={projects} />
    </div>
  );
}
