import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Plus } from 'lucide-react'
import { DeleteButton } from "@/components/admin/delete-button";
import { getEducations } from '@/services/education-service';

export default async function EducationPage() {
    const education = await getEducations()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Education</h2>
                    <p className="text-muted-foreground">
                        Your academic background and qualifications.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/education/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Education
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>School / Institution</TableHead>
                            <TableHead>Degree</TableHead>
                            <TableHead>Year</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {education.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No education entries found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            education.map((edu) => (
                                <TableRow key={edu.id}>
                                    <TableCell className="font-medium">{edu.school}</TableCell>
                                    <TableCell>{edu.degree}</TableCell>
                                    <TableCell>{edu.year}</TableCell>
                                    <TableCell className="text-right">
                                        <DeleteButton id={edu.id} section="education" itemName="Education" />
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
