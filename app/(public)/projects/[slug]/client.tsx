"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, ExternalLink, Github, Layers, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/schemas/project-schema";

export default function ProjectDetailClient({ project }: { project: Project }) {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Hero Header Section */}
            <section className="relative h-[45vh] min-h-[360px] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 z-0">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-60 dark:opacity-40 blur-[2px] scale-105"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-teal-950/20 via-background to-background" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>

                <div className="container relative z-10 pb-10">
                    <motion.div
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Link href="/projects">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="mb-6 gap-2 border border-border/40 bg-background/50 backdrop-blur-md hover:bg-background/80 group"
                            >
                                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Back to Projects
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-[-0.035em] text-foreground leading-[1.12] max-w-4xl"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap gap-2.5 items-center mt-4"
                    >
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-mono text-teal-400">
                            <Calendar className="h-3.5 w-3.5" />
                            {project.createdAt
                              ? new Date(project.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                })
                              : 'Production'}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-secondary/60 px-3 py-1 text-xs font-mono text-muted-foreground">
                            <Layers className="h-3.5 w-3.5" />
                            {project.tech.length} Technologies
                        </span>
                    </motion.div>
                </div>
            </section>

            {/* Main Content Layout */}
            <div className="container mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left Column: Architectural Overview & Showcase */}
                <motion.div
                    className="lg:col-span-2 space-y-10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="h-4 w-1 rounded-full bg-teal-500" />
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                                System Overview &amp; Architecture
                            </h2>
                        </div>
                        <p className="text-base sm:text-lg leading-[1.75] text-muted-foreground whitespace-pre-wrap font-normal">
                            {project.description}
                        </p>
                    </div>

                    {project.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="rounded-xl overflow-hidden border border-border/80 bg-card/60 shadow-sm"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={1200}
                                height={675}
                                className="w-full h-auto object-cover"
                            />
                        </motion.div>
                    )}
                </motion.div>

                {/* Right Column: Sticky Metadata & Action Card */}
                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
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
        </div>
    );
}
