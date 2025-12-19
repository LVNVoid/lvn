import { SlideUp } from "@/components/ui/animated";
import { PageHeader } from "@/components/ui/page-header";
import { Code, GraduationCap, User } from "lucide-react";
import { profile } from "@/data/mock";
import Skills from "@/components/sections/skills";
import { Education } from "@/components/sections/education";

export default function AboutPage() {
    return (
        <div className="space-y-6">
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
            <div className="w-full h-[1px] bg-border/50 my-6" />

            <PageHeader
                title="Skills"
                description="My coding skills and tools I use."
                icon={Code}
            />
            <SlideUp delay={0.4}>
                <div className="prose dark:prose-invert">
                    <Skills />
                </div>
            </SlideUp>
        </div>
    );
}
