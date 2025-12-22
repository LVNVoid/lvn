import { SlideUp } from "@/components/ui/animated";
import { PageHeader } from "@/components/ui/page-header";
import { GraduationCap, User } from "lucide-react";
import prisma from "@/lib/prisma";
import { Education } from "@/components/sections/education";

export default async function AboutPage() {
    const profile = await prisma.profile.findFirst();

    if (!profile) return null;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <PageHeader
                title="About Me"
                description="Who I am and what I do."
                icon={User}
            />

            <SlideUp delay={0.1}>
                <div className="prose dark:prose-invert">
                    <p className="text-lg leading-relaxed">{profile.bio}</p>
                    <p className="mt-4 text-muted-foreground">
                        I am a dedicated developer with a passion for creating elegant solutions to complex problems.
                        My journey in tech has been driven by curiosity and a desire to build things that matter.
                    </p>
                </div>
            </SlideUp>

            <div className="w-full h-[1px] bg-border/50 my-6" />

            <PageHeader
                title="Education"
                description="My education"
                icon={GraduationCap}
            />
            <SlideUp delay={0.2}>
                <div className="prose dark:prose-invert">
                    <Education />
                </div>
            </SlideUp>


        </div >
    );
}
