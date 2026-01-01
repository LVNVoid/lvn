"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SlideUp } from "@/components/ui/animated";
import { Github, Linkedin, ArrowUpRight, Send } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/ui/page-header";

export default function ContactClient() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        alert("Message sent! (This is a demo)");
    }

    const socialLinks = [
        {
            title: "Explore the code",
            description: "Explore the source code for all my projects on GitHub.",
            icon: Github,
            href: "https://github.com/lvnvoid",
            cta: "Go to GitHub",
            color: "bg-zinc-900/50 hover:bg-zinc-900/80 border-zinc-800",
            textColor: "text-zinc-100",
            btnColor: "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
        },
        {
            title: "Let's connect",
            description: "Connect for collaboration or explore my professional experience.",
            icon: Linkedin,
            href: "https://linkedin.com/in/elvien",
            cta: "Go to LinkedIn",
            color: "bg-blue-950/30 hover:bg-blue-900/40 border-blue-900/50",
            textColor: "text-blue-100",
            btnColor: "bg-blue-600 hover:bg-blue-500 text-white"
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Contacts"
                description="Let's get in touch"
                icon={Send}
            />

            <section className="space-y-6">
                <SlideUp delay={0.1}>
                    <h2 className="text-lg font-semibold text-muted-foreground">Find me on</h2>
                </SlideUp>

                <div className="grid gap-4 md:grid-cols-2">
                    {socialLinks.map((link, index) => (
                        <SlideUp key={link.title} delay={0.1 + (index * 0.1)}>
                            <Link
                                href={link.href}
                                target="_blank"
                                className={cn(
                                    "group relative flex flex-col justify-between p-6 h-full min-h-[160px] rounded-xl border transition-all duration-300",
                                    link.color
                                )}
                            >
                                <div className="space-y-2 z-10">
                                    <h3 className={cn("text-xl font-bold", link.textColor)}>{link.title}</h3>
                                    <p className={cn("text-sm opacity-80 max-w-[80%]", link.textColor)}>
                                        {link.description}
                                    </p>
                                </div>

                                <div className="flex items-end justify-between mt-6 z-10">
                                    <Button size="sm" className={cn("gap-2 font-medium border-0", link.btnColor)}>
                                        {link.cta}
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                    <link.icon className={cn("h-12 w-12 opacity-80 absolute bottom-4 right-4 transition-transform group-hover:scale-110 duration-500", link.textColor)} />
                                </div>
                            </Link>
                        </SlideUp>
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <SlideUp delay={0.4}>
                    <h2 className="text-lg font-semibold text-muted-foreground">Or send me a message</h2>
                </SlideUp>

                <SlideUp delay={0.5}>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium text-muted-foreground">Name</label>
                                <Input
                                    id="name"
                                    placeholder="Enter your name"
                                    className="bg-secondary/20 border-border/50 focus-visible:ring-primary/20"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium text-muted-foreground">Email</label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="bg-secondary/20 border-border/50 focus-visible:ring-primary/20"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-muted-foreground">Message</label>
                            <Textarea
                                id="message"
                                placeholder="Enter your message"
                                className="min-h-[150px] bg-secondary/20 border-border/50 focus-visible:ring-primary/20 resize-none"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full bg-secondary/80 hover:bg-secondary text-secondary-foreground font-medium h-12">
                            Send Email
                        </Button>
                    </form>
                </SlideUp>
            </section>
        </div>
    );
}
