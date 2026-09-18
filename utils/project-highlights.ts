import type { Project } from "@/schemas/project-schema";

export type HighlightIconType =
  | "zap"
  | "shield"
  | "database"
  | "server"
  | "cpu"
  | "layers"
  | "layout";

export interface EngineeringHighlight {
  icon: HighlightIconType;
  title: string;
  description: string;
}

const SPECIFIC_PROJECT_HIGHLIGHTS: Record<string, EngineeringHighlight[]> = {
  elviencode: [
    {
      icon: "layout",
      title: "Editorial Design System & Token Architecture",
      description:
        "Built strictly around DESIGN.md token specifications with WCAG AA compliance, zero layout shift, and purposeful micro-interactions.",
    },
    {
      icon: "zap",
      title: "Server Components & Edge Data Access",
      description:
        "Next.js App Router with isolated data-access services, multi-tier caching, and zero client-side database logic.",
    },
    {
      icon: "shield",
      title: "End-to-End Type Safety & Zod Contracts",
      description:
        "Strict TypeScript enforcement with shared Zod validation across Server Actions, forms, and database mutations.",
    },
  ],
  "foman-print": [
    {
      icon: "database",
      title: "Relational Schema & Transactional Safety",
      description:
        "Structured Prisma PostgreSQL data layer with connection pooling, index optimization, and strict relational integrity.",
    },
    {
      icon: "server",
      title: "Full-Stack Next.js Architecture",
      description:
        "Hybrid static-dynamic rendering model delivering rapid initial loads for public catalogs and secured authenticated workflows.",
    },
    {
      icon: "layers",
      title: "Modular Component Primitives",
      description:
        "Decoupled UI primitives built with Tailwind CSS and Radix UI ensuring accessible, reusable interface patterns.",
    },
  ],
  spld: [
    {
      icon: "server",
      title: "Decoupled Express.js REST API",
      description:
        "Lightweight backend service managing business logic, structured routing, and clean JSON response envelopes.",
    },
    {
      icon: "cpu",
      title: "Client-Side SPA State Management",
      description:
        "Single-page application powered by React and React Router for fluid client-side navigation without full-page reloads.",
    },
    {
      icon: "database",
      title: "Structured Data Transactions",
      description:
        "Centralized persistence layer designed for consistent record handling and predictable data querying.",
    },
  ],
  "kopi-sangkara-pos": [
    {
      icon: "cpu",
      title: "Thermal ESC/POS 58mm & Web Bluetooth",
      description:
        "Native receipt generation directly in-browser communicating with 58mm thermal printers over Web Bluetooth with QR-based digital invoice fallback.",
    },
    {
      icon: "layout",
      title: "Hybrid Modular Next.js 16 Architecture",
      description:
        "Feature-driven kebab-case structure with server-only database services, Zero-any TypeScript enforcement, and tablet/iPad touch-first responsive layout.",
    },
    {
      icon: "shield",
      title: "Financial Reconciliation & Cash Audit",
      description:
        "Structured cashier shift cycles, automated drawer cash variance auditing, Zod validation contracts, and complete isolation of payment telemetry.",
    },
  ],
};

export function getProjectHighlights(project: Project): EngineeringHighlight[] {
  // Check predefined specific highlights by slug
  if (project.slug && SPECIFIC_PROJECT_HIGHLIGHTS[project.slug]) {
    return SPECIFIC_PROJECT_HIGHLIGHTS[project.slug];
  }

  // Dynamic rule-based highlights derived from tech stack & metadata
  const highlights: EngineeringHighlight[] = [];
  const techLower = (project.tech || []).map((t) => t.toLowerCase());

  if (techLower.some((t) => t.includes("prisma") || t.includes("postgres") || t.includes("sql") || t.includes("mongo"))) {
    highlights.push({
      icon: "database",
      title: "Database Modeling & Query Optimization",
      description:
        "Structured schemas with relational indexing, connection pooling, and ACID transactional guarantees.",
    });
  }

  if (techLower.some((t) => t.includes("next") || t.includes("express") || t.includes("node") || t.includes("nest"))) {
    highlights.push({
      icon: "server",
      title: "Modern Backend & API Architecture",
      description:
        "Structured route handlers with safe input parsing, error boundaries, and scalable service boundaries.",
    });
  }

  if (techLower.some((t) => t.includes("typescript") || t.includes("zod"))) {
    highlights.push({
      icon: "shield",
      title: "Strict Type Safety & Contract Validation",
      description:
        "Compile-time type verification paired with runtime schema validation eliminating edge-case runtime failures.",
    });
  }

  if (techLower.some((t) => t.includes("tailwind") || t.includes("framer") || t.includes("ui") || t.includes("react"))) {
    highlights.push({
      icon: "layout",
      title: "Responsive Interface & Micro-Interactions",
      description:
        "High-performance design token system with responsive layout scaling and accessible navigation patterns.",
    });
  }

  // Fallback defaults if fewer than 2 highlights matched
  if (highlights.length < 2) {
    highlights.push({
      icon: "zap",
      title: "High Performance & Lean Bundle",
      description:
        "Optimized resource loading with low time-to-interactive and disciplined dependency selection.",
    });
  }

  return highlights.slice(0, 3);
}
