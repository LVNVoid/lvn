import { notFound } from "next/navigation";
import { getProjectBySlug, getAdjacentProjects } from "@/services/project-service";
import ProjectDetailClient from "./client";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects`,
    description: project.description,
  };
}

export default async function DetailProject(props: PageProps) {
  const { slug } = await props.params;
  const [project, adjacent] = await Promise.all([
    getProjectBySlug(slug),
    getAdjacentProjects(slug),
  ]);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} adjacent={adjacent} />;
}
