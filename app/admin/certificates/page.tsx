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
import { Plus, MoreHorizontal, ExternalLink, Trash } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DeleteButton } from '@/components/admin/DeleteButton'

async function getCertificates() {
    const certificates = await prisma.certificate.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return certificates
}

export default async function CertificatesPage() {
    const certificates = await getCertificates()

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
                                            <DeleteButton id={cert.id} section="certificates" itemName="Certificate" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
