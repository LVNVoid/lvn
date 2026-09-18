'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { deleteProjectAction } from '@/actions/project-actions'
import { deleteCertificateAction } from '@/actions/certificate-actions'
import { deleteSkillAction } from '@/actions/skill-actions'
import { deleteEducationAction } from '@/actions/education-actions'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import toast from 'react-hot-toast'

interface DeleteButtonProps {
    id: string
    section: "skills" | "projects" | "education" | "certificates"
    itemName?: string
}

export function DeleteButton({ id, section, itemName = "Item" }: DeleteButtonProps) {
    const router = useRouter()

    const handleDelete = async () => {
        try {
            let result;
            if (section === 'projects') result = await deleteProjectAction(id);
            else if (section === 'certificates') result = await deleteCertificateAction(id);
            else if (section === 'skills') result = await deleteSkillAction(id);
            else if (section === 'education') result = await deleteEducationAction(id);

            if (result && !result.success) {
                toast.error(result.error.message);
                return;
            }

            toast.success(`${itemName} deleted successfully`)
            router.refresh()
        } catch (error) {
            console.error(`Failed to delete ${itemName.toLowerCase()}:`, error);
            toast.error(`Failed to delete ${itemName.toLowerCase()}`)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20">
                    <Trash className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete {itemName}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This will permanently remove this {itemName.toLowerCase()} from your portfolio.
                        Action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-red-800 hover:bg-red-700 text-white">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
