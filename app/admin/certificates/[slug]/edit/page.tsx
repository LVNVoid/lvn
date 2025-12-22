import prisma from '@/lib/prisma'
import CertificateForm from "@/components/admin/certificate-form";
import { notFound } from 'next/navigation'

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

export default async function EditCertificatePage({ params }: PageProps) {
    const { slug } = await params
    const certificate = await prisma.certificate.findUnique({
        where: { slug: slug },
    })

    if (!certificate) {
        notFound()
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Edit Certificate</h2>
                <p className="text-muted-foreground">
                    Update certificate details.
                </p>
            </div>

            <CertificateForm initialData={{
                ...certificate,
                url: certificate.url ?? undefined,
                image: certificate.image ?? undefined,
            }} />
        </div>
    )
}
