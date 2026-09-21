"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ExternalLink,
  Github,
  Layers,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe,
  Database,
  Server,
  Cpu,
  Layout,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import type { Project } from "@/schemas/project-schema";
import {
  getProjectHighlights,
  type HighlightIconType,
} from "@/utils/project-highlights";

function HighlightIcon({ type }: { type: HighlightIconType }) {
  switch (type) {
    case "database":
      return <Database className="h-4 w-4" />;
    case "server":
      return <Server className="h-4 w-4" />;
    case "cpu":
      return <Cpu className="h-4 w-4" />;
    case "shield":
      return <ShieldCheck className="h-4 w-4" />;
    case "layout":
      return <Layout className="h-4 w-4" />;
    case "layers":
      return <Layers className="h-4 w-4" />;
    case "zap":
    default:
      return <Zap className="h-4 w-4" />;
  }
}

interface ProjectDetailClientProps {
  project: Project;
  adjacent?: {
    prev: { title: string; slug: string } | null;
    next: { title: string; slug: string } | null;
  };
}

export default function ProjectDetailClient({
  project,
  adjacent,
}: ProjectDetailClientProps) {
  const formattedDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Production";

  const highlights = getProjectHighlights(project);

  return (
    <div className="min-h-screen bg-background text-foreground pb-24">
      {/* Top Header & Breadcrumbs */}
      <div className="space-y-6 pt-4 pb-8 border-b border-border/60">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link
              href="/projects"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Projects
            </Link>
            <span className="text-border">/</span>
            <span className="text-teal-400 truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-mono text-teal-400">
            <span className="h-1.5 w-1.5 rounded-full bg-teal-400 animate-pulse" />
            Engineering Case Study
          </div>
        </motion.div>

        {/* Title and Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-foreground leading-[1.12]">
            {project.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground pt-1">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground/80" />
              {formattedDate}
            </span>
            <span className="text-border">•</span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-muted-foreground/80" />
              {project.tech.length} Technologies
            </span>
            {project.link && (
              <>
                <span className="text-border">•</span>
                <span className="inline-flex items-center gap-1 text-teal-400">
                  <Globe className="h-3.5 w-3.5" />
                  Deployed
                </span>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Architectural Showcase Frame (Clean Desktop Window) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-8 rounded-xl border border-border/80 bg-card/40 overflow-hidden shadow-sm"
      >
        {/* Window Chrome Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-muted/30">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
            <span className="ml-2 text-xs font-mono text-muted-foreground/80 hidden sm:inline">
              case-study://{project.slug}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-teal-400 hover:underline"
              >
                live-preview
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        {/* Crisp Preview Visual */}
        <div className="relative w-full aspect-16/9 max-h-[550px] bg-muted/50 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-950/20 to-teal-900/10">
              <span className="text-6xl font-bold text-muted-foreground/20">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Case Study Content Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Narrative Prose & Technical Highlights (8 cols) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="lg:col-span-8 space-y-10"
        >
          {/* Overview Narrative */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-teal-500" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                Overview &amp; Architecture
              </h2>
            </div>
            <div className="max-w-none text-muted-foreground">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => (
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-8 mb-3">
                      {children}
                    </h3>
                  ),
                  h2: ({ children }) => (
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground mt-6 mb-3 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-teal-400 inline-block" />
                      {children}
                    </h3>
                  ),
                  h3: ({ children }) => (
                    <h4 className="text-base sm:text-lg font-semibold text-foreground mt-6 mb-2 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-teal-500 inline-block" />
                      {children}
                    </h4>
                  ),
                  p: ({ children }) => (
                    <p className="text-base sm:text-lg leading-[1.8] text-muted-foreground font-normal mb-4">
                      {children}
                    </p>
                  ),
                  ul: ({ children }) => (
                    <ul className="space-y-2.5 my-4 text-base sm:text-lg text-muted-foreground">
                      {children}
                    </ul>
                  ),
                  ol: ({ children }) => (
                    <ol className="list-decimal space-y-2.5 my-4 pl-5 text-base sm:text-lg text-muted-foreground">
                      {children}
                    </ol>
                  ),
                  li: ({ children }) => (
                    <li className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-teal-400 select-none mt-1 text-sm font-bold">•</span>
                      <span className="flex-1">{children}</span>
                    </li>
                  ),
                  strong: ({ children }) => (
                    <strong className="font-semibold text-foreground">{children}</strong>
                  ),
                  code: ({ children }) => (
                    <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs text-teal-400 border border-border/50">
                      {children}
                    </code>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-teal-400 underline hover:text-teal-300 transition-colors"
                    >
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-teal-500/50 pl-4 italic text-muted-foreground my-4">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {project.description
                  .replace(/^[•\u2022]\s*/gm, "- ")
                  .replace(/^(Architectural Overview|Key Capabilities & Features|System Architecture|Core Features|Security & Compliance)/gm, "### $1")}
              </ReactMarkdown>
            </div>
          </div>

          {/* Architectural Pillars */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-2">
              <span className="h-4 w-1 rounded-full bg-teal-500" />
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                Engineering Highlights
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-border/80 bg-card/40 p-4 space-y-2"
                >
                  <div className="flex items-center gap-2 text-teal-400">
                    <HighlightIcon type={item.icon} />
                    <h4 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right Column: Metadata, Tech Stack & Action Card (4 cols) */}
        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-4 space-y-6"
        >
          <Card className="border border-border/80 bg-card/60 shadow-sm sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-teal-400" />
                  Technology Stack
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="border border-border/60 bg-secondary/80 px-2.5 py-0.5 text-xs font-mono text-foreground/90"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>

              {(project.link || project.github) && (
                <div className="pt-6 border-t border-border/60 space-y-3">
                  <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground">
                    Project Artifacts
                  </h3>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button className="w-full font-medium" size="default">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Deployment
                      </Button>
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full"
                    >
                      <Button variant="outline" className="w-full font-medium" size="default">
                        <Github className="mr-2 h-4 w-4" />
                        Source Repository
                      </Button>
                    </a>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Pagination: Adjacent Projects */}
      {adjacent && (adjacent.prev || adjacent.next) && (
        <div className="mt-16 pt-8 border-t border-border/60">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {adjacent.prev && (
              <Link
                href={`/projects/${adjacent.prev.slug}`}
                className={`group flex flex-col justify-between rounded-lg border border-border/80 bg-card/40 p-3 sm:p-4 transition-colors hover:border-teal-500/40 ${
                  !adjacent.next ? "col-span-2 sm:col-span-1" : ""
                }`}
              >
                <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3 shrink-0 transition-transform group-hover:-translate-x-1" />
                  Previous
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-teal-400 transition-colors mt-1 line-clamp-1">
                  {adjacent.prev.title}
                </span>
              </Link>
            )}

            {adjacent.next && (
              <Link
                href={`/projects/${adjacent.next.slug}`}
                className={`group flex flex-col justify-between items-end rounded-lg border border-border/80 bg-card/40 p-3 sm:p-4 transition-colors hover:border-teal-500/40 text-right ${
                  !adjacent.prev ? "col-span-2 sm:col-span-1 sm:col-start-2" : ""
                }`}
              >
                <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  Next
                  <ArrowRight className="h-3 w-3 shrink-0 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-teal-400 transition-colors mt-1 line-clamp-1">
                  {adjacent.next.title}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
