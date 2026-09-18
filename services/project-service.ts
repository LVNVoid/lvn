import { unstable_cache } from "next/cache";
import { db } from "@/services/db";
import type { Project } from "@/schemas/project-schema";

export const KOPI_SANGKARA_PROJECT = {
  title: "Kopi Sangkara POS",
  slug: "kopi-sangkara-pos",
  description: `Kopi Sangkara POS is a modern, responsive cloud-based Point of Sale and retail operations platform tailored for specialty coffee shops and hospitality environments. Engineered as an installable Progressive Web Application (PWA) optimized for tablet and iPad touch viewports, the system streamlines fast-paced order workflows while maintaining strict financial integrity.

Architectural Overview
Built with Next.js 16 App Router on top of a kebab-case Hybrid Modular architecture, the platform strictly isolates business logic and transaction processing from presentational components. The database layer utilizes Prisma ORM connected to serverless PostgreSQL (Neon) with connection pooling and Zero-any TypeScript type contracts.

Key Capabilities & Features
• Direct ESC/POS Hardware Printing: Native browser-to-hardware communication generating raw ESC/POS bytecode over Web Bluetooth for 58mm thermal printers with dynamic QR-based digital invoice fallback.
• Cashier Shift Reconciliation: Complete shift management lifecycle tracking opening float, expected cash balance, physical cash count, and real-time audit logs for cash discrepancies.
• Sales & Analytics Intelligence: Visualized performance telemetry and sales trend charts tracking Total Penjualan, product category popularity, and peak order hours.
• Enterprise Security & PWA Readiness: Role-based access control (Admin/Cashier), zero credential data leaks, and service worker caching delivering immediate offline resilience.`,
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Web Bluetooth", "PWA"],
  link: "https://kopi-sangkara-pos.vercel.app",
  github: "https://github.com/LVNVoid/kopi-sangkara-pos",
  image: "/projects/kopi-sangkara-pos.png",
};

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      try {
        await db.project.upsert({
          where: { slug: KOPI_SANGKARA_PROJECT.slug },
          update: {
            title: KOPI_SANGKARA_PROJECT.title,
            description: KOPI_SANGKARA_PROJECT.description,
            image: KOPI_SANGKARA_PROJECT.image,
            link: KOPI_SANGKARA_PROJECT.link,
            github: KOPI_SANGKARA_PROJECT.github,
            tech: KOPI_SANGKARA_PROJECT.tech,
          },
          create: KOPI_SANGKARA_PROJECT,
        });
      } catch (upsertErr) {
        console.warn("Could not auto-upsert Kopi Sangkara POS:", upsertErr);
      }

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
      const projects = await getProjects();
      return projects.slice(0, limit);
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

    if (!project) {
      if (slug === KOPI_SANGKARA_PROJECT.slug) {
        return {
          id: "kopi-sangkara-pos-id",
          ...KOPI_SANGKARA_PROJECT,
          createdAt: new Date("2026-09-08T00:00:00.000Z"),
          updatedAt: new Date("2026-09-17T00:00:00.000Z"),
        };
      }
      return null;
    }

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
    if (slug === KOPI_SANGKARA_PROJECT.slug) {
      return {
        id: "kopi-sangkara-pos-id",
        ...KOPI_SANGKARA_PROJECT,
        createdAt: new Date("2026-09-08T00:00:00.000Z"),
        updatedAt: new Date("2026-09-17T00:00:00.000Z"),
      };
    }
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

export async function getAdjacentProjects(currentSlug: string): Promise<{
  prev: { title: string; slug: string } | null;
  next: { title: string; slug: string } | null;
}> {
  try {
    const projects = await getProjects();
    const currentIndex = projects.findIndex((p) => p.slug === currentSlug);
    if (currentIndex === -1) return { prev: null, next: null };

    const prev = currentIndex > 0 ? { title: projects[currentIndex - 1].title, slug: projects[currentIndex - 1].slug } : null;
    const next = currentIndex < projects.length - 1 ? { title: projects[currentIndex + 1].title, slug: projects[currentIndex + 1].slug } : null;

    return { prev, next };
  } catch (error) {
    console.error("Failed to get adjacent projects:", error);
    return { prev: null, next: null };
  }
}
