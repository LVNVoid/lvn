'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Skill {
    id?: string
    name: string
    category?: string
}

export default function SkillForm({ initialData }: { initialData?: Skill }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState<Skill>(
        initialData || {
            name: '',
            category: '',
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
            if (initialData?.id) {
                toast.error("Update not implemented yet, please delete and recreate.")
                setLoading(false) // Reset loading as we are returning
                return
            } else {
                await axios.post('/api/skills', formData)
            }

            router.push('/admin/skills')
            router.refresh()
            toast.success(initialData ? 'Skill updated successfully' : 'Skill created successfully')
        } catch (error: any) {
            console.error('Error saving skill:', error)
            toast.error(error.response?.data?.error || 'Failed to save skill')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Card className="max-w-xl mx-auto border-muted/40 shadow-sm">
            <CardHeader>
                <CardTitle>{initialData ? 'Edit Skill' : 'Add New Skill'}</CardTitle>
                <CardDescription>
                    Add a new technology or tool to your skills list.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <Label htmlFor="name">Skill Name *</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. React.js"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Input
                            id="category"
                            name="category"
                            value={formData.category || ''}
                            onChange={handleChange}
                            placeholder="e.g. Frontend, Backend, Tools"
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
                                'Save Skill'
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </CardContent>
        </Card>
    )
}
