import Link from 'next/link'
import prisma from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Plus, Tag } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { DeleteButton } from "@/components/admin/delete-button";

async function getSkills() {
    const skills = await prisma.skill.findMany({
        orderBy: { createdAt: 'desc' },
    })
    return skills
}

export default async function SkillsPage() {
    const skills = await getSkills()

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Skills</h2>
                    <p className="text-muted-foreground">
                        Technologies, frameworks, and tools you are proficient in.
                    </p>
                </div>
                <Button asChild>
                    <Link href="/admin/skills/new">
                        <Plus className="mr-2 h-4 w-4" /> Add Skill
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Skill Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {skills.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    No skills found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            skills.map((skill) => (
                                <TableRow key={skill.id}>
                                    <TableCell className="font-medium">{skill.name}</TableCell>
                                    <TableCell>
                                        {skill.category && <Badge variant="secondary">{skill.category}</Badge>}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DeleteButton id={skill.id} section="skills" itemName="Skill" />
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
