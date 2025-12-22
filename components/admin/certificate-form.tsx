'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { certificatesService } from '@/services/certificates'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Loader2, Upload, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { useImageUpload } from '@/hooks/use-image-upload'

interface Certificate {
    id?: string
    slug?: string
    name: string
    issuer: string
    date: string
    url?: string
    image?: string
}

export default function CertificateForm({ initialData }: { initialData?: Certificate }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const {
        imageFile,
        previewUrl,
        handleFileChange,
        uploadImage
    } = useImageUpload(initialData?.image)

    const [formData, setFormData] = useState<Certificate>(
        initialData || {
            name: '',
            issuer: '',
            date: '',
            url: '',
            image: '',
        }
    )

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            let imageUrl = formData.image

            if (imageFile) {
                const uploadedUrl = await uploadImage('certificates')
                if (uploadedUrl) imageUrl = uploadedUrl
            }

            const payload = { ...formData, image: imageUrl }

            if (initialData?.slug) {
                await certificatesService.update(initialData.slug, payload)
            } else {
                await certificatesService.create(payload)
            }

            router.push('/admin/certificates')
            router.refresh()
            toast.success(initialData ? 'Certificate updated successfully' : 'Certificate created successfully')
        } catch (error: any) {
            console.error('Error saving certificate:', error)
            toast.error(error.response?.data?.error || 'Failed to save certificate')
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
                            <img
                                src={previewUrl || ''}
                                alt="Preview"
                                className="h-full w-full object-contain"
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
