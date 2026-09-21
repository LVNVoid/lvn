import { unstable_cache } from "next/cache";
import { db } from "@/services/db";
import type { Project } from "@/schemas/project-schema";

export const GOOGLE_REVIEW_CARD_PROJECT = {
  title: "Google Review Card Generator",
  slug: "google-review-card-generator",
  description: `Google Review Card Generator & Physical QR Platform is an end-to-end web engineering solution and print-ready card design system built to bridge offline customer foot traffic with Google Maps business profiles. Engineered for both on-demand custom card generation and mass retail pre-printing, the platform produces millimeter-precise, 300+ DPI physical cards (PVC CR80 cards, A6/A7 acrylic table standees, and cashier counter stickers) with high-fidelity vector PDF and PNG export.

### Architectural Overview

Developed with Next.js 15 App Router and TypeScript, the system adopts Vercel Geist design principles paired with official Google visual identity tokens. The dynamic QR lifecycle is powered by Prisma ORM and serverless PostgreSQL (Neon), executing sub-50ms HTTP 307 proxy redirects (\`/r/[id]\`), self-activation onboarding flows, salted SHA-256 PIN verification via native Node.js crypto, and asynchronous scan telemetry logging.

### Key Capabilities & Features

- **Millimeter-Accurate WYSIWYG Print Engine:** Client-side vector rendering via jsPDF and html-to-image featuring dynamic ResizeObserver auto-scaling, bleed marks, and strict quiet zones for zero-distortion physical printing.
- **Dual Production Workflows:** Seamlessly toggles between direct branded cards and universal unbranded stock cards ready for retail pre-printing and distribution.
- **Dynamic Proxy & Self-Activation Portal:** Unactivated cards guide merchants through a mobile-first onboarding flow (\`/r/[id]/activate\`) with Google Maps link resolution and PIN-protected destination URL updates.
- **Official Typography & Identity Harmony:** Authentic Google Sans and Google Sans Text font stack, NFC wave indicators, and verified gold star rating assets.`,
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Neon", "Playwright", "jsPDF", "html-to-image"],
  link: "https://review-card-generator-orcin.vercel.app",
  github: "https://github.com/LVNVoid/review-card-generator",
  image: "/projects/google-review-card-generator.png",
};

export const KOPI_SANGKARA_PROJECT = {
  title: "Kopi Sangkara POS",
  slug: "kopi-sangkara-pos",
  description: `Kopi Sangkara POS is a modern, responsive cloud-based Point of Sale and retail operations platform tailored for specialty coffee shops and hospitality environments. Engineered as an installable Progressive Web Application (PWA) optimized for tablet and iPad touch viewports, the system streamlines fast-paced order workflows while maintaining strict financial integrity.

### Architectural Overview

Built with Next.js 16 App Router on top of a kebab-case Hybrid Modular architecture, the platform strictly isolates business logic and transaction processing from presentational components. The database layer utilizes Prisma ORM connected to serverless PostgreSQL (Neon) with connection pooling and Zero-any TypeScript type contracts.

### Key Capabilities & Features

- **Direct ESC/POS Hardware Printing:** Native browser-to-hardware communication generating raw ESC/POS bytecode over Web Bluetooth for 58mm thermal printers with dynamic QR-based digital invoice fallback.
- **Cashier Shift Reconciliation:** Complete shift management lifecycle tracking opening float, expected cash balance, physical cash count, and real-time audit logs for cash discrepancies.
- **Sales & Analytics Intelligence:** Visualized performance telemetry and sales trend charts tracking Total Penjualan, product category popularity, and peak order hours.
- **Enterprise Security & PWA Readiness:** Role-based access control (Admin/Cashier), zero credential data leaks, and service worker caching delivering immediate offline resilience.`,
  tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Web Bluetooth", "PWA"],
  link: "https://kopi-sangkara-pos.vercel.app",
  github: "https://github.com/LVNVoid/kopi-sangkara-pos",
  image: "/projects/kopi-sangkara-pos.png",
};

export const MAGANGHUB_BOT_PROJECT = {
  title: "MagangHub Bot Attendance",
  slug: "maganghub-bot-attendance",
  description: `MagangHub Bot Attendance & Automated Daily Reporting Platform is an enterprise-grade multi-user workflow automation and attendance management system engineered for Indonesian Ministry of Manpower (Kemnaker) MagangHub interns. The platform completely automates daily check-in, check-out, and formal tri-part internship activity reporting (Uraian, Pembelajaran, Kendala) via intelligent proxy routing and background cron daemon execution.

### Architectural Overview

Built with Next.js 16 App Router following the Simple Scalable Architecture, the application leverages NextAuth (Auth.js v5) with OAuth and Personal Access Token (PAT) authentication, serverless PostgreSQL (Neon) via Prisma ORM, and Tailwind CSS mobile-first responsive interfaces complying with strict touch target and anti-zoom ergonomics.

### Key Capabilities & Features

- **Cloudflare WAF Forward Proxy Bypass:** Transparent HTTP CONNECT forward proxy architecture routing outbound requests through dedicated VPS infrastructure to seamlessly bypass Kemnaker SSO datacenter IP blocks.
- **AI-Driven Multi-Source Daily Reporting:** Real-time synchronization of developer commits via GitHub REST API and public Atom feed fallback, generating structured, context-rich daily logs compliant with Kemnaker standards.
- **Automated Cron Daemon Execution:** Robust serverless cron trigger architecture integrated with VPS Crontab and Asia/Jakarta (WIB) timezone alignment for scheduled automated submission and notification dispatch.
- **Mobile-First Responsive Experience:** Touch-optimized stacked card views, modal activity inspectors, and protected report locking preventing accidental edits to submitted filings.`,
  tech: ["Next.js 16", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Neon", "NextAuth", "Zod", "Tinyproxy", "Vitest"],
  link: "https://maganghub-bot-attendance.vercel.app",
  github: "https://github.com/LVNVoid/maganghub-bot-attendance",
  image: "https://res.cloudinary.com/dmvludl4w/image/upload/v1789998667/projects/bybb9teoo7iyrzgcmio5.png",
};

const STATIC_PROJECTS: Project[] = [
  {
    id: "maganghub-bot-attendance-id",
    ...MAGANGHUB_BOT_PROJECT,
    createdAt: new Date("2026-09-21T00:00:00.000Z"),
    updatedAt: new Date("2026-09-21T00:00:00.000Z"),
  },
  {
    id: "google-review-card-generator-id",
    ...GOOGLE_REVIEW_CARD_PROJECT,
    createdAt: new Date("2026-09-19T00:00:00.000Z"),
    updatedAt: new Date("2026-09-19T00:00:00.000Z"),
  },
  {
    id: "kopi-sangkara-pos-id",
    ...KOPI_SANGKARA_PROJECT,
    createdAt: new Date("2026-09-08T00:00:00.000Z"),
    updatedAt: new Date("2026-09-17T00:00:00.000Z"),
  },
];

export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    if (!process.env.DATABASE_URL) {
      return STATIC_PROJECTS;
    }

    try {
      // Ensure seed records exist
      const defaultProjects = [
        MAGANGHUB_BOT_PROJECT,
        GOOGLE_REVIEW_CARD_PROJECT,
        KOPI_SANGKARA_PROJECT,
      ];
      for (const p of defaultProjects) {
        try {
          const existing = await db.project.findUnique({
            where: { slug: p.slug },
            select: { id: true },
          });
          if (!existing) {
            await db.project.create({
              data: p,
            });
          }
        } catch (seedErr) {
          console.warn(`Could not ensure ${p.title} record:`, seedErr);
        }
      }

      const projects = await db.project.findMany({
        orderBy: { createdAt: "desc" },
      });

      if (!projects || projects.length === 0) {
        return STATIC_PROJECTS;
      }

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
      return STATIC_PROJECTS;
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
      return STATIC_PROJECTS.slice(0, limit);
    }
  },
  ["featured-projects-cache"],
  { revalidate: 3600, tags: ["projects"] }
);

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!process.env.DATABASE_URL) {
    return STATIC_PROJECTS.find((p) => p.slug === slug) || null;
  }

  try {
    const project = await db.project.findUnique({
      where: { slug },
    });

    if (!project) {
      const staticMatch = STATIC_PROJECTS.find((p) => p.slug === slug);
      if (staticMatch) return staticMatch;
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
    const staticMatch = STATIC_PROJECTS.find((p) => p.slug === slug);
    if (staticMatch) return staticMatch;
    return null;
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!process.env.DATABASE_URL) {
    return STATIC_PROJECTS.find((p) => p.id === id) || null;
  }

  try {
    const project = await db.project.findUnique({
      where: { id },
    });
    if (!project) {
      const staticMatch = STATIC_PROJECTS.find((p) => p.id === id);
      if (staticMatch) return staticMatch;
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
    console.error(`Failed to get project by id '${id}':`, error);
    const staticMatch = STATIC_PROJECTS.find((p) => p.id === id);
    if (staticMatch) return staticMatch;
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

    const prev =
      currentIndex > 0
        ? { title: projects[currentIndex - 1].title, slug: projects[currentIndex - 1].slug }
        : null;
    const next =
      currentIndex < projects.length - 1
        ? { title: projects[currentIndex + 1].title, slug: projects[currentIndex + 1].slug }
        : null;

    return { prev, next };
  } catch (error) {
    console.error("Failed to get adjacent projects:", error);
    return { prev: null, next: null };
  }
}
