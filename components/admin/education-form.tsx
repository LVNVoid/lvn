'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { createEducationAction, updateEducationAction } from '@/actions/education-actions'
import type { Education } from '@/schemas/education-schema'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function EducationForm({ initialData }: { initialData?: Partial<Education> }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        school: initialData?.school || '',
        degree: initialData?.degree || '',
        year: initialData?.year || '',
        description: initialData?.description || '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const result = initialData?.id
                ? await updateEducationAction(initialData.id, formData)
                : await createEducationAction(formData)

            if (!result.success) {
                toast.error(result.error.message)
                return
            }

            router.push('/admin/education')
            router.refresh()
            toast.success(initialData?.id ? 'Education updated successfully' : 'Education created successfully')
        } catch (error) {
            console.error('Error saving education:', error)
            toast.error('Failed to save education')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-xl mx-auto border-muted/40 shadow-sm">
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Education' : 'Add New Education'}</CardTitle>
                <CardDescription>
                    Add details about your educational background.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="school">School / University *</Label>
                        <Input
                            id="school"
                            name="school"
                            value={formData.school}
                            onChange={handleChange}
                            placeholder="e.g. Stanford University"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="degree">Degree *</Label>
                        <Input
                            id="degree"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            placeholder="e.g. Bachelor of Science in Computer Science"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="year">Year / Period *</Label>
                        <Input
                            id="year"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            placeholder="e.g. 2018 - 2022"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={formData.description || ''}
                            onChange={handleChange}
                            placeholder="Briefly describe your activities, honors, etc."
                            rows={3}
                        />
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
                                'Save Education'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
