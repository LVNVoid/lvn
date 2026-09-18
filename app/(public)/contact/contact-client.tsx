"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SlideUp } from "@/components/ui/animated";
import { Github, Linkedin, ArrowUpRight, Send, CheckCircle2, Mail } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

export default function ContactClient() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Open default mail client directly with composed message
    const subject = encodeURIComponent(`Collaboration Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:elvien@elvien.net?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  }

  const socialLinks = [
    {
      title: "GitHub Repository",
      description: "Inspect production repositories, open source contributions, and commit activity.",
      icon: Github,
      href: "https://github.com/LVNVoid",
      cta: "Explore Repositories",
      badge: "Code & Architecture",
    },
    {
      title: "LinkedIn Network",
      description: "Connect for professional inquiries, software engineering roles, and consulting.",
      icon: Linkedin,
      href: "https://linkedin.com/in/elvien",
      cta: "Connect on LinkedIn",
      badge: "Professional Track",
    },
  ];

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Contact"
        description="Initiate discussions for software engineering contracts, web architecture consulting, or technical collaborations."
        icon={Mail}
      />

      {/* Social Verification Channels */}
      <section className="space-y-4">
        <SlideUp delay={0.1}>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            Verified Channels
          </h2>
        </SlideUp>

        <div className="grid gap-4 sm:grid-cols-2">
          {socialLinks.map((link, index) => (
            <SlideUp key={link.title} delay={0.1 + index * 0.1}>
              <Link
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between p-5 sm:p-6 h-full min-h-[170px] rounded-xl border border-border/80 bg-card/60 hover:border-teal-500/40 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-teal-400 border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 rounded-full">
                      {link.badge}
                    </span>
                    <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-teal-400 transition-colors" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:text-teal-400 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {link.description}
                  </p>
                </div>

                <div className="pt-4 mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground group-hover:text-teal-400 transition-colors">
                    {link.cta}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </SlideUp>
          ))}
        </div>
      </section>

      {/* Message Dispatch Form */}
      <section className="space-y-4">
        <SlideUp delay={0.3}>
          <h2 className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
            Direct Transmission
          </h2>
        </SlideUp>

        <SlideUp delay={0.4}>
          <div className="rounded-xl border border-border/80 bg-card/60 p-6 sm:p-8">
            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <div className="inline-flex items-center justify-center p-3 rounded-full bg-teal-500/10 text-teal-400">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-foreground">Message Dispatched</h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-sm mx-auto">
                  Your mail client has been opened with pre-filled details. You can also reach me directly at <span className="font-mono text-teal-400">elvien@elvien.net</span>.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 text-xs font-medium"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-xs font-mono text-muted-foreground">
                      Full Name
                    </label>
                    <Input
                      id="name"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-secondary/30 border-border/60 focus-visible:ring-teal-500/30 text-sm"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-xs font-mono text-muted-foreground">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-secondary/30 border-border/60 focus-visible:ring-teal-500/30 text-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-xs font-mono text-muted-foreground">
                    Project Scope / Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Briefly describe your project requirements, timeline, or engineering goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[140px] bg-secondary/30 border-border/60 focus-visible:ring-teal-500/30 resize-none text-sm"
                    required
                  />
                </div>

                <Button type="submit" className="w-full sm:w-auto gap-2 font-medium">
                  <Send className="h-4 w-4" />
                  Transmit Message
                </Button>
              </form>
            )}
          </div>
        </SlideUp>
      </section>
    </div>
  );
}
