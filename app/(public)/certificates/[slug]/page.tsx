import prisma from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ExternalLink, Calendar, Award } from 'lucide-react'

interface PageProps {
    params: Promise<{ slug: string }>
}

export default async function CertificateDetailPage({ params }: PageProps) {
    const { slug } = await params
    const certificate = await prisma.certificate.findUnique({
        where: { slug },
    })

    if (!certificate) {
        notFound()
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
                        <h1 className="text-3xl font-bold tracking-tight mb-2">{certificate.name}</h1>
                        <p className="text-xl text-muted-foreground">{certificate.issuer}</p>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Issued: {certificate.date}</span>
                    </div>

                    {certificate.url && (
                        <Button asChild size="lg" className="w-full md:w-auto">
                            <a href={certificate.url} target="_blank" rel="noreferrer">
                                View Credential <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
