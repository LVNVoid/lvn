'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Loader2, Upload, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import toast from 'react-hot-toast'

interface Project {
    id?: string
    title: string
    description: string
    tech: string[]
    link?: string | null
    github?: string | null
    image?: string | null
}

export default function ProjectForm({ initialData }: { initialData?: Project }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<Project>(
        initialData || {
            title: '',
            description: '',
            tech: [],
            link: '',
            github: '',
            image: '',
        }
    )
    const [techInput, setTechInput] = useState(initialData?.tech.join(', ') || '')
    const [imageFile, setImageFile] = useState<File | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleTechChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTechInput(e.target.value)
        const techs = e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
        setFormData({ ...formData, tech: techs })
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0])
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            let imageUrl = formData.image

            if (imageFile) {
                const uploadData = new FormData()
                uploadData.append('file', imageFile)
                uploadData.append('folder', 'projects')
                const res = await axios.post('/api/upload', uploadData)
                imageUrl = res.data.secure_url
            }

            const payload = { ...formData, image: imageUrl }

            if (initialData?.id) {
                await axios.put(`/api/projects/${initialData.id}`, payload)
            } else {
                await axios.post('/api/projects', payload)
            }

            router.push('/admin/projects')
            router.refresh()
            toast.success(initialData ? 'Project updated successfully' : 'Project created successfully')
        } catch (error: any) {
            console.error('Error saving project:', error)
            toast.error(error.response?.data?.error || 'Failed to save project')
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
                        {formData.image && !imageFile && (
                            <p className="text-xs text-muted-foreground mt-1">
                                Current image: {formData.image.split('/').pop()}
                            </p>
                        )}
                        {imageFile && (
                            <p className="text-xs text-emerald-600 mt-1 flex items-center">
                                <Upload className="mr-1 h-3 w-3" /> Selected: {imageFile.name}
                            </p>
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
