'use client';

import { Projects } from '@/components/sections/projects';
import { SlideUp } from '@/components/ui/animated';
import TextType from '@/components/ui/text-type';
import { profile } from '@/data/mock';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Code2, Download, FolderOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import LogoLoop from '@/components/ui/logo-loop';
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
} from 'react-icons/si';
import { PageHeader } from '@/components/ui/page-header';

const techLogos = [
  {
    node: <SiReact className="transition-colors duration-300 text-[#61DAFB]" />,
    title: 'React',
    href: 'https://react.dev',
  },
  {
    node: (
      <SiNextdotjs className="transition-colors duration-300 text-foreground" />
    ),
    title: 'Next.js',
    href: 'https://nextjs.org',
  },
  {
    node: (
      <SiTypescript className="transition-colors duration-300 text-[#3178C6]" />
    ),
    title: 'TypeScript',
    href: 'https://www.typescriptlang.org',
  },
  {
    node: (
      <SiTailwindcss className="transition-colors duration-300 text-[#06B6D4]" />
    ),
    title: 'Tailwind CSS',
    href: 'https://tailwindcss.com',
  },
  {
    node: (
      <SiPrisma className="transition-colors duration-300 text-[#52b7af]" />
    ),
    title: 'Prisma',
    href: 'https://www.prisma.io',
  },
  {
    node: (
      <SiSupabase className="transition-colors duration-300 text-[#3ECF8E]" />
    ),
    title: 'Supabase',
    href: 'https://supabase.com',
  },
  {
    node: (
      <SiPostgresql className="transition-colors duration-300 text-[#4169E1]" />
    ),
    title: 'PostgreSQL',
    href: 'https://www.postgresql.org',
  },
  {
    node: (
      <SiExpress className="transition-colors duration-300 text-foreground" />
    ),
    title: 'Express.js',
    href: 'https://expressjs.com',
  },
  {
    node: (
      <SiNodedotjs className="transition-colors duration-300 text-[#339933]" />
    ),
    title: 'Node.js',
    href: 'https://nodejs.org',
  },
  {
    node: (
      <SiPostman className="transition-colors duration-300 text-[#FF6C37]" />
    ),
    title: 'Postman',
    href: 'https://www.postman.com',
  },
  {
    node: <SiVite className="transition-colors duration-300 text-[#646CFF]" />,
    title: 'Vite',
    href: 'https://vitejs.dev',
  },
  {
    node: (
      <SiVercel className="transition-colors duration-300 text-foreground" />
    ),
    title: 'Vercel',
    href: 'https://vercel.com',
  },
  {
    node: (
      <SiGithub className="transition-colors duration-300 text-foreground" />
    ),
    title: 'GitHub',
    href: 'https://github.com',
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-10 pb-24 w-full">
      <section className="space-y-6">
        <SlideUp>
          <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-start">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold tracking-tight lg:text-4xl flex flex-wrap gap-2 items-center">
                <span>Hi, I&apos;m</span>
                <TextType
                  text={[profile.name, 'Software Engineer']}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                />
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mt-3">
                <span className="flex items-center gap-1">
                  • Based in {profile.location}{' '}
                  <span className="text-xs border px-1 rounded">ID</span>
                </span>
                <span className="flex items-center gap-1">
                  •{' '}
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />{' '}
                  Hire me
                </span>
              </div>
            </div>

            <motion.a
              href="/cv.pdf"
              download="CV_Elvien.pdf"
              className={buttonVariants({
                className: 'gap-2 select-none shrink-0 self-start lg:self-auto',
              })}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Download className="h-4 w-4" /> Download CV
            </motion.a>
          </div>
        </SlideUp>

        <SlideUp delay={0.1}>
          <p className="text-muted-foreground leading-relaxed max-w-3xl text-base">
            I&rsquo;m a passionate and detail-oriented Informatics Engineering
            graduate based in Jakarta, Indonesia, specializing in JavaScript and
            modern frontend frameworks. I enjoy building clean, responsive, and
            user-focused web interfaces while continuously exploring new
            technologies. As a fast learner with strong adaptability, I thrive
            in collaborative environments and strive to contribute meaningful
            impact to every development team I join.
          </p>
        </SlideUp>
      </section>

      <div className="w-full h-[1px] bg-border/50" />

      {/* Skills Section */}
      <section className="space-y-6">
        <SlideUp delay={0.2}>
          <PageHeader title="Tech Stack" icon={Code2} />
        </SlideUp>
        <SlideUp delay={0.3}>
          <div className="space-y-6">
            <LogoLoop
              logos={techLogos}
              speed={40}
              direction="left"
              logoHeight={30}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="bg-primary"
              ariaLabel="Tech Stack"
            />
            <LogoLoop
              logos={techLogos}
              speed={40}
              direction="right"
              logoHeight={30}
              gap={60}
              hoverSpeed={0}
              scaleOnHover
              fadeOut
              fadeOutColor="bg-primary"
              ariaLabel="Tech Stack"
            />
          </div>
        </SlideUp>
      </section>

      <div className="w-full h-[1px] bg-border/50" />

      {/* Featured Projects Section */}
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
          <Projects limit={3} />
        </SlideUp>
      </section>

      <section className="py-12 relative rounded-2xl overflow-hidden bg-primary/5 border border-primary/10">
        <div className="absolute inset-0 bg-linear-to-r from-primary/10 to-transparent opacity-50" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 p-6">
          <SlideUp delay={0.6}>
            <h2 className="text-3xl font-bold">Ready to work together?</h2>
            <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
              I&apos;m always open to discussing product design work or
              partnership opportunities.
            </p>
          </SlideUp>
          <SlideUp delay={0.7}>
            <Button size="lg" className="gap-2" asChild>
              <Link href="/contact">
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
