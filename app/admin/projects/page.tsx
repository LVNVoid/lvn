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
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Eye, FolderGit2 } from "lucide-react";
import { DeleteButton } from "@/components/admin/delete-button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  searchParams: Promise<{
    page?: string;
    limit?: string;
  }>;
}

async function getProjects(page: number, limit: number) {
  const skip = (page - 1) * limit;
  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.project.count(),
  ]);
  return { projects, total };
}

export default async function ProjectsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1");
  const limit = parseInt(params.limit || "10");
  const { projects, total } = await getProjects(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.035em] text-foreground">
              Projects
            </h2>
            <span className="inline-flex items-center rounded-full border border-teal-500/20 bg-teal-500/10 px-2.5 py-0.5 text-xs font-mono text-teal-400">
              {total} Records
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Manage production software applications, architectural case studies, and code links.
          </p>
        </div>
        <Button size="sm" asChild className="gap-1.5 self-start sm:self-auto font-medium">
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" /> Add Project
          </Link>
        </Button>
      </div>

      <div className="rounded-xl border border-border/80 bg-card/60 overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-secondary/40 border-b border-border/80">
            <TableRow>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase">Project Name</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase">Tech Stack</TableHead>
              <TableHead className="font-mono text-xs text-muted-foreground uppercase text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-32 text-center text-xs font-mono text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-1.5">
                    <FolderGit2 className="h-6 w-6 text-muted-foreground/40" />
                    <span>No project records found in database.</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium text-sm text-foreground">
                    <div>
                      <div className="font-bold">{project.title}</div>
                      <div className="text-[11px] font-mono text-muted-foreground">/{project.slug}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {project.tech.map((t) => (
                        <Badge
                          key={t}
                          variant="secondary"
                          className="text-[10px] font-mono border border-border/50 bg-secondary/70 px-1.5 py-0"
                        >
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <div className="flex justify-end gap-1.5">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-teal-400">
                        <Link href={`/admin/projects/${project.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 hover:text-teal-400">
                        <Link href={`/admin/projects/${project.id}/edit`}>
                          <Pencil className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DeleteButton id={project.id} section="projects" itemName="Project" />
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
                <PaginationPrevious href={`/admin/projects?page=${page - 1}`} />
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
                <PaginationNext href={`/admin/projects?page=${page + 1}`} />
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
