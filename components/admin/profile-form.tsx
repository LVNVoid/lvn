'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { profileService } from '@/services/profile'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Trash2, Upload, Loader2, Save } from 'lucide-react'
import { useImageUpload } from '@/hooks/use-image-upload'

import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import toast from 'react-hot-toast'

const profileSchema = z.object({
    name: z.string().min(2, {
        message: 'Name must be at least 2 characters.',
    }),
    role: z.string().min(2, {
        message: 'Role must be at least 2 characters.',
    }),
    bio: z.string().optional(),
    location: z.string().optional(),
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    avatar: z.string().optional(),
    socials: z.object({
        github: z.string().optional(),
        linkedin: z.string().optional(),
        twitter: z.string().optional(),
    }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

interface ProfileData {
    id?: string
    name: string
    role: string
    bio: string
    location: string
    email: string
    avatar: string
    socials: {
        github?: string
        linkedin?: string
        twitter?: string
    }
}

export default function ProfileForm({ initialData }: { initialData?: ProfileData }) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const {
        imageFile,
        previewUrl,
        handleFileChange,
        handleRemoveImage,
        uploadImage,
        setPreviewUrl
    } = useImageUpload(initialData?.avatar)

    const defaultValues: Partial<ProfileFormValues> = {
        name: initialData?.name || '',
        role: initialData?.role || '',
        bio: initialData?.bio || '',
        location: initialData?.location || '',
        email: initialData?.email || '',
        avatar: initialData?.avatar || '',
        socials: {
            github: initialData?.socials?.github || '',
            linkedin: initialData?.socials?.linkedin || '',
            twitter: initialData?.socials?.twitter || '',
        },
    }

    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues,
        mode: 'onChange',
    })

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleFileChange(e)
    }

    const onDeleteAvatar = (e: React.MouseEvent) => {
        e.preventDefault()
        handleRemoveImage()
        form.setValue('avatar', '')
    }

    const onSubmit = async (data: ProfileFormValues) => {
        setLoading(true)

        try {
            let avatarUrl = data.avatar

            if (imageFile) {
                const uploadedUrl = await uploadImage('profile')
                if (uploadedUrl) avatarUrl = uploadedUrl
            }

            const payload = {
                ...data,
                avatar: avatarUrl || '',
            }

            await profileService.update(payload)

            router.refresh()
            toast.success('Profile updated successfully!')

        } catch (error) {
            console.error('Error updating profile:', error)
            toast.error('Failed to update profile')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid gap-6 md:grid-cols-2">
                    {/* Left Column: Personal Info */}
                    <Card className="md:col-span-1 bg-transparent">
                        <CardHeader className="">
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>
                                Update your public profile details.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Software Engineer" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="email@example.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Location</FormLabel>
                                        <FormControl>
                                            <Input placeholder="City, Country" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Bio</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us a little bit about yourself"
                                                className="resize-none"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Avatar</CardTitle>
                                <CardDescription>
                                    Review and update your profile picture.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center justify-center space-y-4">
                                <Avatar className="h-32 w-32 border-2 border-muted">
                                    <AvatarImage src={previewUrl || undefined} className="object-cover" />
                                    <AvatarFallback className="text-4xl text-muted-foreground">
                                        {form.getValues('name')?.substring(0, 2).toUpperCase() || 'UD'}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex items-center gap-2 w-full">
                                    <div className="relative flex-1">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full relative overflow-hidden"
                                        >
                                            <Upload className="mr-2 h-4 w-4" />
                                            Change Avatar
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={onFileChange}
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                            />
                                        </Button>
                                    </div>

                                    {(previewUrl || imageFile) && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            onClick={onDeleteAvatar}
                                            title="Remove Avatar"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Socials Section */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Social Profiles</CardTitle>
                                <CardDescription>
                                    Connect your social media accounts.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="socials.github"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Github URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://github.com/username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="socials.linkedin"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>LinkedIn URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://linkedin.com/in/username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="socials.twitter"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Twitter/X URL</FormLabel>
                                            <FormControl>
                                                <Input placeholder="https://twitter.com/username" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                        </Card>
                    </div>
                </div>

                <div className="flex justify-end">
                    <Button type="submit" disabled={loading} className="w-full md:w-auto min-w-[150px]">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {loading ? 'Saving Changes...' : 'Save Profile Changes'}
                    </Button>
                </div>
            </form>
        </Form>
    )
}
