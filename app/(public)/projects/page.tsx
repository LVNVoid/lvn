import { Projects } from "@/components/sections/projects";
import { PageHeader } from "@/components/ui/page-header";
import { Cuboid } from "lucide-react";

import prisma from "@/lib/prisma";

export default async function ProjectsPage() {
    const projects = await prisma.project.findMany({
        orderBy: {
            createdAt: 'desc',
        },
    });

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
