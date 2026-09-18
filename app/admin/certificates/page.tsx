import Link from "next/link";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, ExternalLink, Edit, Eye, Award } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { DeleteButton } from "@/components/admin/delete-button";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

async function getCertificates(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const [certificates, total] = await Promise.all([
    prisma.certificate.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.certificate.count(),
  ]);
  return { certificates, total };
}

export default async function CertificatesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "10");
  const { certificates, total } = await getCertificates(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-foreground">
              Certificates
            </h2>
            <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-xs font-mono text-teal-400">
              {total} Records
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage official certifications, accredited milestones, and verification links.
          </p>
        </div>
        <Button size="sm" asChild className="gap-1.5 self-start sm:self-auto font-medium">
          <Link href="/admin/certificates/new">
            <Plus className="h-4 w-4" /> Add Certificate
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border/80 bg-card/60 overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-secondary/40 border-b border-border/80">
            <TableRow>
              <TableHead className="w-[80px] font-mono text-xs text-muted-foreground uppercase">Image</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase">Credential Name</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase">Issuer</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase">Date</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {certificates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center text-xs font-mono text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <Award className="h-6 w-6 text-muted-foreground/40" />
                    <span>No certificate records found in database.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              certificates.map((cert) => (
                <TableRow key={cert.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell>
                    <Avatar className="h-10 w-10 rounded-lg border border-border/80">
                      <AvatarImage src={cert.image || ""} alt={cert.name} className="object-cover" />
                      <AvatarFallback className="rounded-lg bg-teal-500/10 text-teal-400 font-mono text-xs">
                        {cert.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="font-medium text-sm text-foreground">
                    <div>
                      <div className="font-bold">{cert.name}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">/{cert.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">
                    <span className="border border-border/50 bg-secondary/70 px-2 py-0.5 rounded-md">
                      {cert.issuer}
                    </span>
                  </TableCell>
                  <TableCell className="text-xs font-mono text-muted-foreground">{cert.date}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1.5">
                      {cert.url && (
                        <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-teal-400">
                          <a href={cert.url} target="_blank" rel="noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-teal-400">
                        <Link href={`/admin/certificates/${cert.slug}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-teal-400">
                        <Link href={`/admin/certificates/${cert.slug}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteButton id={cert.slug} section="certificates" itemName="Certificate" />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination className="justify-end w-auto mx-0">
          <PaginationContent>
            <PaginationItem>
              {page > 1 ? (
                <PaginationPrevious href={`/admin/certificates?page=${page - 1}`} />
              ) : (
                <PaginationPrevious
                  href="#"
                  className="pointer-events-none opacity-50"
                  aria-disabled={true}
                  tabIndex={-1}
                />
              )}
            </PaginationItem>
            <PaginationItem>
              <span className="px-3 py-1 text-xs font-mono text-muted-foreground">
                Page {page} of {totalPages}
              </span>
            </PaginationItem>
            <PaginationItem>
              {page < totalPages ? (
                <PaginationNext href={`/admin/certificates?page=${page + 1}`} />
              ) : (
                <PaginationNext
                  href="#"
                  className="pointer-events-none opacity-50"
                  aria-disabled={true}
                  tabIndex={-1}
                />
              )}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
