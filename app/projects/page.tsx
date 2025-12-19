import { Projects } from "@/components/sections/projects";
import { PageHeader } from "@/components/ui/page-header";
import { Cuboid } from "lucide-react";

export default function ProjectsPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Projects"
                description="A selection of real apps built to solve real problems."
                icon={Cuboid}
            />
            <Projects />
        </div>
    );
}
