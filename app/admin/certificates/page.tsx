import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Plus, ExternalLink, Edit, Eye } from 'lucide-react'
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { DeleteButton } from "@/components/admin/delete-button";

interface Props {
    searchParams: Promise<{
        page?: string
        limit?: string
    }>
}

async function getCertificates(page: number, limit: number) {
    const skip = (page - 1) * limit
    const [certificates, total] = await Promise.all([
        prisma.certificate.findMany({
            orderBy: { createdAt: 'desc' },
            skip,
            take: limit,
        }),
        prisma.certificate.count(),
    ])
    return { certificates, total }
}

export default async function CertificatesPage({ searchParams }: Props) {
    const params = await searchParams;
    const page = parseInt(params.page || '1')
    const limit = parseInt(params.limit || '10')
    const { certificates, total } = await getCertificates(page, limit)
    const totalPages = Math.ceil(total / limit)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Certificates</h2>
                    <p className="text-muted-foreground">
                        Manage your professional certifications and awards.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/certificates/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Certificate
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[80px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Issuer</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {certificates.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No certificates found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            certificates.map((cert) => (
                                <TableRow key={cert.id}>
                                    <TableCell>
                                        <Avatar className="h-10 w-10 rounded-sm">
                                            <AvatarImage src={cert.image || ''} alt={cert.name} />
                                            <AvatarFallback className="rounded-sm">
                                                {cert.name.substring(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell className="font-medium">{cert.name}</TableCell>
                                    <TableCell>{cert.issuer}</TableCell>
                                    <TableCell>{cert.date}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {cert.url && (
                                                <Button variant="ghost" size="icon" asChild>
                                                    <a href={cert.url} target="_blank" rel="noreferrer">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </a>
                                                </Button>
                                            )}
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/certificates/${cert.slug}/edit`}>
                                                    <Edit className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/admin/certificates/${cert.slug}`}>
                                                    <Eye className="h-4 w-4" />
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
                            <span className="text-sm font-medium px-4">
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
    )
}
