import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import prisma from "@/lib/prisma"
import { Briefcase, Code2, Award, GraduationCap } from "lucide-react"

export default async function AdminDashboard() {
    const [projectCount, skillCount, certificateCount, educationCount] = await Promise.all([
        prisma.project.count(),
        prisma.skill.count(),
        prisma.certificate.count(),
        prisma.education.count(),
    ])

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Projects
                        </CardTitle>
                        <Briefcase className="h-4 w-4 text-pink-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{projectCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Active projects in portfolio
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Skills
                        </CardTitle>
                        <Code2 className="h-4 w-4 text-orange-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{skillCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Technologies mastered
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Total Certificates
                        </CardTitle>
                        <Award className="h-4 w-4 text-green-700" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{certificateCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Credentials earned
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Education
                        </CardTitle>
                        <GraduationCap className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{educationCount}</div>
                        <p className="text-xs text-muted-foreground">
                            Academic milestones
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
