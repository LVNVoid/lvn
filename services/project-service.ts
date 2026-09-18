import { unstable_cache } from "next/cache";
import { db } from "@/services/db";
import type { Project } from "@/schemas/project-schema";

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      const projects = await db.project.findMany({
        orderBy: { createdAt: "desc" },
      });
      return projects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        tech: p.tech,
        link: p.link,
        github: p.github,
        image: p.image,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));
    } catch (error) {
      console.error("Failed to get projects from DB:", error);
      return [];
    }
  },
  ["projects-cache"],
  { revalidate: 3600, tags: ["projects"] }
);

export const getFeaturedProjects = unstable_cache(
  async (limit = 3): Promise<Project[]> => {
    try {
      const projects = await db.project.findMany({
        orderBy: { createdAt: "desc" },
        take: limit,
      });
      return projects.map((p) => ({
        id: p.id,
        title: p.title,
        slug: p.slug,
        description: p.description,
        tech: p.tech,
        link: p.link,
        github: p.github,
        image: p.image,
        createdAt: p.createdAt,
        updatedAt: p.updatedAt,
      }));
    } catch (error) {
      console.error("Failed to get featured projects from DB:", error);
      return [];
    }
  },
  ["featured-projects-cache"],
  { revalidate: 3600, tags: ["projects"] }
);

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const project = await db.project.findUnique({
      where: { slug },
    });
    if (!project) return null;
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      tech: project.tech,
      link: project.link,
      github: project.github,
      image: project.image,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  } catch (error) {
    console.error(`Failed to get project by slug '${slug}':`, error);
    return null;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await db.project.findUnique({
      where: { id },
    });
    if (!project) return null;
    return {
      id: project.id,
      title: project.title,
      slug: project.slug,
      description: project.description,
      tech: project.tech,
      link: project.link,
      github: project.github,
      image: project.image,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  } catch (error) {
    console.error(`Failed to get project by id '${id}':`, error);
    return null;
  }
}
