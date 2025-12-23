"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, ExternalLink, Github, Layers } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface Project {
    id: string
    title: string
    slug: string
    description: string
    tech: string[]
    link: string | null
    github: string | null
    image: string | null
    createdAt: Date
    updatedAt: Date
}

export default function ProjectDetailClient({ project }: { project: Project }) {
    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-end">
                <div className="absolute inset-0 z-0">
                    {project.image ? (
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover opacity-80 dark:opacity-80 blur-sm scale-105"
                            priority
                        />
                    ) : (
                        <div className="w-full h-full bg-linear-to-br from-primary/10 to-secondary/10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </div>

                <div className="container relative z-10 pb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link href="/projects">
                            <Button variant="ghost" className="mb-6 hover:bg-background/20 hover:backdrop-blur-md group">
                                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                                Back to Projects
                            </Button>
                        </Link>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-4xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-linear-to-r from-foreground to-foreground/70"
                    >
                        {project.title}
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-wrap gap-3 items-center text-muted-foreground"
                    >
                        <span className="flex items-center gap-1.5 bg-secondary/50 backdrop-blur-md px-3 py-1 rounded-full text-sm">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(project.createdAt).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'long',
                            })}
                        </span>
                    </motion.div>
                </div>
            </section>

            <div className="container mt-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                <motion.div
                    className="lg:col-span-2 space-y-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="prose dark:prose-invert max-w-none">
                        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                            About Project
                        </h2>
                        <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                            {project.description}
                        </p>
                    </div>

                    {project.image && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="rounded-2xl overflow-hidden shadow-2xl border border-border/50"
                        >
                            <Image
                                src={project.image}
                                alt={project.title}
                                width={1200}
                                height={675}
                                className="w-full h-auto"
                            />
                        </motion.div>
                    )}
                </motion.div>

                <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Card className="border-border/50 shadow-sm bg-card/50 backdrop-blur-xs sticky top-24">
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider flex items-center gap-2">
                                    <Layers className="h-4 w-4" />
                                    Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech) => (
                                        <Badge
                                            key={tech}
                                            variant="secondary"
                                            className="px-3 py-1 text-sm font-normal bg-secondary/50 hover:bg-secondary/80 transition-colors"
                                        >
                                            {tech}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            {(project.link || project.github) && (
                                <div className="pt-6 border-t border-border/50 grid grid-cols-1 gap-3">
                                    {project.link && (
                                        <Link href={project.link} target="_blank" rel="noopener noreferrer" className="w-full">
                                            <Button className="w-full font-semibold shadow-lg shadow-primary/20" size="lg">
                                                <ExternalLink className="mr-2 h-4 w-4" />
                                                Live Demo
                                            </Button>
                                        </Link>
                                    )}
                                    {project.github && (
                                        <Link href={project.github} target="_blank" rel="noopener noreferrer" className="w-full">
                                            <Button variant="outline" className="w-full" size="lg">
                                                <Github className="mr-2 h-4 w-4" />
                                                View Source
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    )
}
