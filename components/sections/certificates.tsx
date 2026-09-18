import Image from "next/image";
import Link from "next/link";
import { SlideUp } from "@/components/ui/animated";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Certificate } from "@/schemas/certificate-schema";

interface CertificatesProps {
  certificates: readonly Certificate[];
}

export function Certificates({ certificates }: CertificatesProps) {
  if (!certificates || certificates.length === 0) {
    return (
      <div className="py-6">
        <p className="text-muted-foreground text-sm">Belum ada sertifikat yang ditambahkan.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {certificates.map((cert, index) => (
        <SlideUp key={cert.id ?? cert.slug} delay={0.2 + index * 0.1}>
          <Card className="flex flex-col h-full overflow-hidden border-transparent transition-all duration-300 bg-background/60 backdrop-blur-sm hover:border-primary/50 hover:shadow group">
            <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
              <Image
                src={cert.image || "/placeholder.svg"}
                alt={cert.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <CardHeader className="space-y-2 pb-2">
              <div className="flex items-start justify-between gap-2">
                <Badge variant="outline" className="shrink-0">
                  {cert.issuer}
                </Badge>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="mr-1 h-3 w-3" />
                  {cert.date}
                </div>
              </div>
              <CardTitle className="line-clamp-2 text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                <Link href={`/certificates/${cert.slug}`}>
                  {cert.name}
                </Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter className="pt-0">
              <Button asChild className="w-full gap-2 group-hover:bg-primary group-hover:text-primary-foreground transition-colors" variant="outline">
                <Link href={`/certificates/${cert.slug}`}>
                  View Certificate
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
