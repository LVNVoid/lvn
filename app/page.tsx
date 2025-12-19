'use client'

import Skills from "@/components/sections/skills";
import { SlideUp } from "@/components/ui/animated";
import RotatingText from "@/components/ui/rotating-text";
import { profile } from "@/data/mock";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 pb-24 w-full">
      {/* Intro Section */}
      <section className="space-y-6">
        <SlideUp>
          <h1 className="text-3xl font-bold tracking-tight lg:text-4xl flex flex-wrap gap-2 items-center">
            <span>Hi, I&apos;m</span>
            <RotatingText
              texts={[profile.name, 'Software Engineer', 'Fullstack Developer']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-teal-500 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
            <span className="flex items-center gap-1">• Based in {profile.location} <span className="text-xs border px-1 rounded">ID</span></span>
            <span className="flex items-center gap-1">• <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" /> Onsite</span>
          </div>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="text-muted-foreground leading-relaxed max-w-2xl text-base">
            Experienced and passionate Fullstack Developer specializing in building scalable and efficient digital solutions.
            On the frontend, I work with Next.js, TypeScript, and Tailwind CSS.
            On the backend, I develop robust services using Golang.
            Collaborative, detail-oriented, and committed to high-performance applications.
          </p>
        </SlideUp>
      </section>

      <div className="w-full h-[1px] bg-border/50" />

      {/* Skills Section */}
      <Skills />

      <div className="w-full h-[1px] bg-border/50" />
    </div>
  );
}