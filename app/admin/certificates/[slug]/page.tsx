import { Button } from '@/components/ui/button'
import prisma from '@/lib/prisma'
import { ArrowLeft, Calendar, ExternalLink, Link2, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function CertificateDetailsPage({ params }: PageProps) {
    const { slug } = await params
    const certificate = await prisma.certificate.findUnique({
        where: { slug },
    })

    if (!certificate) {
        return notFound()
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/admin/certificates">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{certificate.name}</h2>
                    <p className="text-muted-foreground">
                        Issued by {certificate.issuer}
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Image Section */}
                <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                    {certificate.image ? (
                        <Image
                            src={certificate.image}
                            alt={certificate.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                            No image provided
                        </div>
                    )}
                </div>

                {/* Details Section */}
                <div className="space-y-6">
                    <div className="rounded-lg border bg-card p-6 shadow-sm">
                        <h3 className="font-semibold mb-4">Certificate Details</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Issuer:</span>
                                <span>{certificate.issuer}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Date:</span>
                                <span>{certificate.date}</span>
                            </div>
                            {certificate.url && (
                                <div className="flex items-center gap-3 text-sm">
                                    <Link2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Credential URL:</span>
                                    <a
                                        href={certificate.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline flex items-center gap-1"
                                    >
                                        View Credential <ExternalLink className="h-3 w-3" />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button asChild className="flex-1">
                            <Link href={`/admin/certificates/${certificate.slug}/edit`}>
                                Edit Certificate
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
