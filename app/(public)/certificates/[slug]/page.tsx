import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Calendar,
  Award,
  ShieldCheck,
  CheckCircle2,
  Building2,
} from "lucide-react";
import {
  getCertificateBySlug,
  getAdjacentCertificates,
} from "@/services/certificate-service";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const certificate = await getCertificateBySlug(slug);

  if (!certificate) {
    return {
      title: "Certificate Not Found",
    };
  }

  return {
    title: `${certificate.name} | Verified Certificate`,
    description: `Certificate for ${certificate.name} issued by ${certificate.issuer}.`,
    openGraph: {
      title: certificate.name,
      description: `Certificate for ${certificate.name} issued by ${certificate.issuer}.`,
      images: certificate.image ? [certificate.image] : [],
    },
  };
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [certificate, adjacent] = await Promise.all([
    getCertificateBySlug(slug),
    getAdjacentCertificates(slug),
  ]);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Header & Breadcrumbs */}
      <div className="space-y-4 pt-2 pb-6 border-b border-border/60">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <Link
              href="/certificates"
              className="hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Certificates
            </Link>
            <span className="text-border">/</span>
            <span className="text-teal-400 truncate max-w-[200px] sm:max-w-none">
              {certificate.name}
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-mono text-teal-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            Verified Credential
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-[-0.035em] text-foreground leading-[1.15]">
            {certificate.name}
          </h1>
          <p className="text-base sm:text-lg font-medium text-teal-500/90">
            Issued by {certificate.issuer}
          </p>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Document Showcase Frame (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-border/80 bg-card/40 overflow-hidden shadow-sm">
          {/* Window Chrome Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-muted/30">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-border/80" />
              <span className="ml-2 text-xs font-mono text-muted-foreground/80 hidden sm:inline">
                credential://{certificate.slug}
              </span>
            </div>

            {certificate.url && (
              <a
                href={certificate.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-mono text-teal-400 hover:underline"
              >
                view-origin
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>

          {/* Certificate Image Frame */}
          <div className="relative aspect-4/3 sm:aspect-16/10 w-full overflow-hidden bg-muted/50">
            {certificate.image ? (
              <Image
                src={certificate.image}
                alt={certificate.name}
                fill
                className="object-contain sm:object-cover p-2 sm:p-0"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-950/20 to-teal-900/10">
                <Award className="h-16 w-16 text-muted-foreground/20" />
              </div>
            )}
          </div>
        </div>

        {/* Verification & Metadata Sidebar Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border border-border/80 bg-card/60 shadow-sm sticky top-24">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="text-xs font-mono font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                  Credential Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">Issuing Organization</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{certificate.issuer}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-secondary/60 border border-border/60 text-muted-foreground shrink-0">
                      <Calendar className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">Issue Date</p>
                      <p className="text-sm font-semibold text-foreground mt-0.5">{certificate.date}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 shrink-0">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs font-mono text-muted-foreground">Authenticity</p>
                      <p className="text-sm font-semibold text-teal-400 mt-0.5">Verified &amp; Authentic</p>
                    </div>
                  </div>
                </div>
              </div>

              {certificate.url && (
                <div className="pt-6 border-t border-border/60">
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full"
                  >
                    <Button className="w-full font-medium gap-2" size="default">
                      <ExternalLink className="h-4 w-4" />
                      Verify on {certificate.issuer}
                    </Button>
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Adjacent Pagination */}
      {adjacent && (adjacent.prev || adjacent.next) && (
        <div className="mt-12 pt-8 border-t border-border/60">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {adjacent.prev ? (
              <Link
                href={`/certificates/${adjacent.prev.slug}`}
                className="group flex flex-col justify-between rounded-lg border border-border/80 bg-card/40 p-4 transition-colors hover:border-teal-500/40"
              >
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-1" />
                  Previous Certificate
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-teal-400 transition-colors mt-1 line-clamp-1">
                  {adjacent.prev.name}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {adjacent.next && (
              <Link
                href={`/certificates/${adjacent.next.slug}`}
                className="group flex flex-col justify-between items-end rounded-lg border border-border/80 bg-card/40 p-4 transition-colors hover:border-teal-500/40 text-right"
              >
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1">
                  Next Certificate
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-teal-400 transition-colors mt-1 line-clamp-1">
                  {adjacent.next.name}
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
