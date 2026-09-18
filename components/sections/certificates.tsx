import Image from "next/image";
import Link from "next/link";
import { SlideUp } from "@/components/ui/animated";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Certificate } from "@/schemas/certificate-schema";

interface CertificatesProps {
  certificates: readonly Certificate[];
}

export function Certificates({ certificates }: CertificatesProps) {
  if (!certificates || certificates.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border/80 p-8 text-center text-sm text-muted-foreground">
        No certificates added yet.
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert, index) => (
        <SlideUp key={cert.id ?? cert.slug} delay={0.1 + index * 0.05}>
          <Card className="group flex flex-col h-full justify-between overflow-hidden rounded-xl border border-border/80 bg-card/60 transition-colors hover:border-teal-500/40">
            <div>
              {/* Certificate Image Frame */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-muted border-b border-border/60">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-teal-950/20 to-teal-900/10">
                    <Award className="h-12 w-12 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              <CardHeader className="p-5 space-y-3 pb-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center rounded-full border border-teal-500/30 bg-teal-500/10 px-2.5 py-0.5 text-[11px] font-mono font-medium text-teal-400">
                    {cert.issuer}
                  </span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    {cert.date}
                  </div>
                </div>

                <CardTitle className="line-clamp-2 text-base font-bold tracking-tight text-foreground leading-snug group-hover:text-teal-400 transition-colors">
                  <Link href={`/certificates/${cert.slug}`}>
                    {cert.name}
                  </Link>
                </CardTitle>
              </CardHeader>
            </div>

            <CardFooter className="p-5 pt-3 border-t border-border/40 mt-3">
              <Button
                asChild
                size="sm"
                variant="outline"
                className="w-full gap-1.5 text-xs font-medium hover:bg-teal-600 hover:text-white hover:border-teal-600 transition-colors"
              >
                <Link href={`/certificates/${cert.slug}`}>
                  View Credential
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </SlideUp>
      ))}
    </div>
  );
}

export default Certificates;
