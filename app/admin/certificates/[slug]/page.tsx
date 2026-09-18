import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { ArrowLeft, Calendar, ExternalLink, Link2, User, Edit } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CertificateDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const certificate = await prisma.certificate.findUnique({
    where: { slug },
  });

  if (!certificate) {
    return notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" asChild className="h-9 w-9">
            <Link href="/admin/certificates">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-foreground">
              {certificate.name}
            </h2>
            <p className="text-xs font-mono text-muted-foreground">
              slug: /{certificate.slug} • issuer: {certificate.issuer}
            </p>
          </div>
        </div>
        <Button size="sm" asChild className="gap-1.5 self-start sm:self-auto font-medium">
          <Link href={`/admin/certificates/${certificate.slug}/edit`}>
            <Edit className="h-3.5 w-3.5" /> Edit Certificate
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Image Section */}
        <div className="relative aspect-4/3 overflow-hidden rounded-xl border border-border/80 bg-muted/40 flex items-center justify-center">
          {certificate.image ? (
            <Image
              src={certificate.image}
              alt={certificate.name}
              fill
              className="object-contain p-2"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground text-xs font-mono">
              No credential document uploaded
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          <div className="rounded-xl border border-border/80 bg-card/60 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold tracking-tight text-foreground">Credential Verification</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-xs">
                <User className="h-4 w-4 text-teal-400 shrink-0" />
                <span className="font-mono text-muted-foreground">Issuer Organization:</span>
                <span className="font-semibold text-foreground">{certificate.issuer}</span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <Calendar className="h-4 w-4 text-teal-400 shrink-0" />
                <span className="font-mono text-muted-foreground">Date Issued:</span>
                <span className="font-semibold text-foreground">{certificate.date}</span>
              </div>
              {certificate.url && (
                <div className="flex items-center gap-3 text-xs">
                  <Link2 className="h-4 w-4 text-teal-400 shrink-0" />
                  <span className="font-mono text-muted-foreground">Accreditation Link:</span>
                  <a
                    href={certificate.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-400 hover:underline inline-flex items-center gap-1 font-mono truncate"
                  >
                    View on Origin <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
