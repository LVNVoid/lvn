import { SlideUp } from "@/components/ui/animated";
import { PageHeader } from "@/components/ui/page-header";
import { Code, GraduationCap, User } from "lucide-react";
import { profile } from "@/data/mock";
import { Education } from "@/components/sections/education";
import LogoLoop from "@/components/ui/logo-loop";
import {
    SiReact,
    SiNextdotjs,
    SiTypescript,
    SiTailwindcss,
    SiPrisma,
    SiSupabase,
    SiPostgresql,
    SiExpress,
    SiNodedotjs,
    SiPostman,
    SiVite,
    SiVercel,
    SiGithub,
} from "react-icons/si";


const techLogos = [
    { node: <SiReact className="transition-colors duration-300 text-[#61DAFB]" />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs className="transition-colors duration-300 text-foreground" />, title: "Next.js", href: "https://nextjs.org" },
    { node: <SiTypescript className="transition-colors duration-300 text-[#3178C6]" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
    { node: <SiTailwindcss className="transition-colors duration-300 text-[#06B6D4]" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
    { node: <SiPrisma className="transition-colors duration-300 text-[#52b7af]" />, title: "Prisma", href: "https://www.prisma.io" },
    { node: <SiSupabase className="transition-colors duration-300 text-[#3ECF8E]" />, title: "Supabase", href: "https://supabase.com" },
    { node: <SiPostgresql className="transition-colors duration-300 text-[#4169E1]" />, title: "PostgreSQL", href: "https://www.postgresql.org" },
    { node: <SiExpress className="transition-colors duration-300 text-foreground" />, title: "Express.js", href: "https://expressjs.com" },
    { node: <SiNodedotjs className="transition-colors duration-300 text-[#339933]" />, title: "Node.js", href: "https://nodejs.org" },
    { node: <SiPostman className="transition-colors duration-300 text-[#FF6C37]" />, title: "Postman", href: "https://www.postman.com" },
    { node: <SiVite className="transition-colors duration-300 text-[#646CFF]" />, title: "Vite", href: "https://vitejs.dev" },
    { node: <SiVercel className="transition-colors duration-300 text-foreground" />, title: "Vercel", href: "https://vercel.com" },
    { node: <SiGithub className="transition-colors duration-300 text-foreground" />, title: "GitHub", href: "https://github.com" },
];

export default function AboutPage() {
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

            {/* <PageHeader
                title="Skills"
                description="My coding skills and tools I use."
                icon={Code}
            />
            <SlideUp delay={0.4}>
                <div className="prose dark:prose-invert py-6">
                    <div className="h-[180px] md:h-[200px] relative overflow-hidden space-y-8">
                        <LogoLoop
                            logos={techLogos}
                            speed={40}
                            direction="left"
                            logoHeight={48}
                            gap={60}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="bg-primary"
                            ariaLabel="Technology partners"
                        />
                        <LogoLoop
                            logos={techLogos}
                            speed={40}
                            direction="right"
                            logoHeight={48}
                            gap={60}
                            hoverSpeed={0}
                            scaleOnHover
                            fadeOut
                            fadeOutColor="bg-primary"
                            ariaLabel="Technology partners"
                        />
                    </div>
                </div>
            </SlideUp> */}
        </div >
    );
}
