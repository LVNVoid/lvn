"use client";

import { Button } from "@/components/ui/button";
import { FadeIn, SlideUp } from "@/components/ui/animated";
import { ArrowRight, Github, Linkedin, FileText } from "lucide-react";
import Link from "next/link";
import { profile } from "@/data/mock";

export function Hero() {
    return (
        <section className="container flex flex-col justify-center min-h-[calc(100vh-4rem)] py-12 md:py-24">
            <div className="flex flex-col gap-6 max-w-3xl">
                <FadeIn delay={0.1}>
                    <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm text-primary">
                        Available for work
                    </div>
                </FadeIn>

                <SlideUp delay={0.2}>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-6xl text-foreground">
                        Hi, I&apos;m {profile.name}. <br />
                        <span className="text-muted-foreground">{profile.role}</span>
                    </h1>
                </SlideUp>

                <SlideUp delay={0.3}>
                    <p className="text-xl text-muted-foreground max-w-[600px]">
                        {profile.bio}
                    </p>
                </SlideUp>

                <SlideUp delay={0.4} className="flex flex-wrap gap-4">
                    <Button asChild size="lg">
                        <Link href="/contact">
                            Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href={profile.socials.github} target="_blank">
                            <Github className="mr-2 h-4 w-4" /> GitHub
                        </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                        <Link href={profile.socials.linkedin} target="_blank">
                            <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                        </Link>
                    </Button>
                </SlideUp>
            </div>
        </section>
    );
}
