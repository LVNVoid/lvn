'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createCertificateAction, updateCertificateAction } from '@/actions/certificate-actions'
import type { Certificate } from '@/schemas/certificate-schema'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Loader2, Upload } from 'lucide-react'
import toast from 'react-hot-toast'
import { useImageUpload } from '@/hooks/use-image-upload'

export default function CertificateForm({ initialData }: { initialData?: Partial<Certificate> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {
        imageFile,
        previewUrl,
        handleFileChange,
        uploadImage
    } = useImageUpload(initialData?.image ?? undefined)

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        issuer: initialData?.issuer || '',
        date: initialData?.date || '',
        url: initialData?.url || '',
        image: initialData?.image || '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = formData.image

            if (imageFile) {
                const uploadedUrl = await uploadImage('certificates')
                if (uploadedUrl) imageUrl = uploadedUrl
            }

            const payload = { ...formData, image: imageUrl }

            const result = initialData?.slug
                ? await updateCertificateAction(initialData.slug, payload)
                : await createCertificateAction(payload)

            if (!result.success) {
                toast.error(result.error.message)
                return
            }

            router.push('/admin/certificates')
            router.refresh()
            toast.success(initialData?.slug ? 'Certificate updated successfully' : 'Certificate created successfully')
        } catch (error) {
            console.error('Error saving certificate:', error)
            toast.error('Failed to save certificate')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-2xl mx-auto border-muted/40 shadow-sm">
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Certificate' : 'Add New Certificate'}</CardTitle>
                <CardDescription>
                    Fill in the details below to add a new certification to your portfolio.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Certificate Name *</Label>
                            <Input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="e.g. AWS Certified Solutions Architect"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="issuer">Issuer *</Label>
                            <Input
                                id="issuer"
                                name="issuer"
                                value={formData.issuer}
                                onChange={handleChange}
                                placeholder="e.g. Amazon Web Services"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="date">Date / Year *</Label>
                            <Input
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                placeholder="e.g. 2024 or Dec 2024"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="url">Credential URL</Label>
                            <Input
                                id="url"
                                name="url"
                                value={formData.url || ''}
                                onChange={handleChange}
                                placeholder="https://..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                        />
                    </div>

                    {(imageFile || previewUrl) && (
                        <div className="mt-4 relative w-full h-48 bg-muted/30 rounded-lg border-2 border-dashed border-muted flex items-center justify-center overflow-hidden">
                            <Image
                                src={previewUrl || ''}
                                alt="Preview"
                                fill
                                className="object-contain"
                                unoptimized
                            />
                            {imageFile && (
                                <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded-md flex items-center">
                                    <Upload className="mr-1 h-3 w-3" />
                                    {imageFile.name}
                                </div>
                            )}
                        </div>
                    )}

                    <CardFooter className="px-0 pt-4 flex gap-4 justify-end">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() => router.back()}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                'Save Certificate'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card >
    )
}
