'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createProjectAction, updateProjectAction } from '@/actions/project-actions'
import type { Project } from '@/schemas/project-schema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Loader2, Upload } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'
import { useImageUpload } from '@/hooks/use-image-upload'

export default function ProjectForm({ initialData }: { initialData?: Partial<Project> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {
        imageFile,
        previewUrl,
        handleFileChange,
        handleRemoveImage,
        uploadImage
    } = useImageUpload(initialData?.image ?? undefined)

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        tech: initialData?.tech || [],
        link: initialData?.link || '',
        github: initialData?.github || '',
        image: initialData?.image || '',
    })
    const [techInput, setTechInput] = useState(initialData?.tech?.join(', ') || '')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTechInput(e.target.value)
        const techs = e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
        setFormData({ ...formData, tech: techs })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            let imageUrl = formData.image

            if (imageFile) {
                const uploadedUrl = await uploadImage('projects')
                if (uploadedUrl) imageUrl = uploadedUrl
            }

            const payload = { ...formData, image: imageUrl }

            const result = initialData?.id
                ? await updateProjectAction(initialData.id, payload)
                : await createProjectAction(payload)

            if (!result.success) {
                toast.error(result.error.message)
                return
            }

            router.push('/admin/projects')
            router.refresh()
            toast.success(initialData?.id ? 'Project updated successfully' : 'Project created successfully')
        } catch (error) {
            console.error('Error saving project:', error)
            toast.error('Failed to save project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-2xl mx-auto border-muted/40 shadow-sm">
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Project' : 'Add New Project'}</CardTitle>
                <CardDescription>
                    Share details about your latest work or case study.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="title">Project Title *</Label>
                        <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. E-Commerce Platform"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Briefly describe the project..."
                            required
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tech">Tech Stack</Label>
                        <Input
                            id="tech"
                            value={techInput}
                            onChange={handleTechChange}
                            placeholder="React, Node.js, Prisma (comma separated)"
                        />
                        <div className="flex flex-wrap gap-2 mt-2">
                            {formData.tech.map((t, i) => (
                                <Badge key={i} variant="secondary">{t}</Badge>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="link">Live Demo URL</Label>
                            <Input
                                id="link"
                                name="link"
                                value={formData.link || ''}
                                onChange={handleChange}
                                placeholder="https://"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="github">GitHub URL</Label>
                            <Input
                                id="github"
                                name="github"
                                value={formData.github || ''}
                                onChange={handleChange}
                                placeholder="https://github.com/..."
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Project Cover Image</Label>
                        <Input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="cursor-pointer"
                        />
                        {previewUrl && (
                            <div className="mt-4 relative w-full h-48 bg-muted/30 rounded-lg border-2 border-dashed border-muted flex items-center justify-center overflow-hidden">
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className="object-contain"
                                    unoptimized
                                />
                                {imageFile && (
                                    <div className="absolute bottom-2 right-2 bg-black/75 text-white text-xs px-2 py-1 rounded-md flex items-center">
                                        <Upload className="mr-1 h-3 w-3" /> Selected: {imageFile.name}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

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
                                'Save Project'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
