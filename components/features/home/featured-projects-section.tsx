'use client';

import { Projects } from '@/components/sections/projects';
import { SlideUp } from '@/components/ui/animated';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { ArrowRight, FolderOpen } from 'lucide-react';
import Link from 'next/link';

interface FeaturedProjectsSectionProps {
    projects: any[];
}

export function FeaturedProjectsSection({ projects }: FeaturedProjectsSectionProps) {
    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <SlideUp delay={0.4}>
                    <PageHeader title="Featured Projects" icon={FolderOpen} />
                </SlideUp>
                <SlideUp delay={0.4}>
                    <Button variant="ghost" className="gap-2 group" asChild>
                        <Link href="/projects">
                            View All{' '}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </SlideUp>
            </div>
            <SlideUp delay={0.5}>
                <Projects projects={projects} limit={3} />
            </SlideUp>
        </section>
    );
}
