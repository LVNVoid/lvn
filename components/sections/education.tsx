import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SlideUp } from "@/components/ui/animated";
import prisma from "@/lib/prisma";

export async function Education() {
    const education = await prisma.education.findMany({
        orderBy: { year: 'desc' }
    });

    return (
        <section className=" py-6">
            <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <SlideUp key={edu.id} delay={index * 0.1}>
                            <Card className="bg-background/70 backdrop-blur-sm border-muted">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{edu.school}</CardTitle>
                                            <CardDescription className="text-base font-medium text-primary mt-1">
                                                {edu.degree}
                                            </CardDescription>
                                        </div>
                                        <span className="text-sm text-muted-foreground whitespace-nowrap bg-secondary px-2 py-1 rounded-md">
                                            {edu.year}
                                        </span>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">{edu.description}</p>
                                </CardContent>
                            </Card>
                        </SlideUp>
                    ))}
                </div>

            </div>
        </section>
    );
}
