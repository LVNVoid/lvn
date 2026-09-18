import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Calendar, Award } from 'lucide-react';
import { getCertificateBySlug } from '@/services/certificate-service';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const certificate = await getCertificateBySlug(slug);

  if (!certificate) {
    return {
      title: 'Certificate Not Found',
    };
  }

  return {
    title: `${certificate.name} | Certificates`,
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
  const certificate = await getCertificateBySlug(slug);

  if (!certificate) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Button variant="outline" asChild className="mb-8">
        <Link href="/certificates">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Certificates
        </Link>
      </Button>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl border bg-muted">
          {certificate.image ? (
            <Image
              src={certificate.image}
              alt={certificate.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <Award className="h-16 w-16 opacity-20" />
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-foreground mb-2">{certificate.name}</h1>
            <p className="text-base sm:text-lg font-medium text-teal-500/90">{certificate.issuer}</p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-secondary/50 px-3 py-1 text-xs font-mono text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            <span>Issued: {certificate.date}</span>
          </div>

          {certificate.url && (
            <div>
              <Button asChild size="default" className="w-full sm:w-auto font-medium">
                <a href={certificate.url} target="_blank" rel="noreferrer">
                  View Credential <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
