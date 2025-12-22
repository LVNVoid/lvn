'use client';

import { SlideUp } from '@/components/ui/animated';
import TextType from '@/components/ui/text-type';
import { buttonVariants } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroSectionProps {
    profile: any;
}

export function HeroSection({ profile }: HeroSectionProps) {
    return (
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
                    {profile.bio || "I'm a passionate and detail-oriented Software Engineer."}
                </p>
            </SlideUp>
        </section>
    );
}
