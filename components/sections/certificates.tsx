import Image from "next/image";
import { SlideUp } from "../ui/animated";
import { certificates } from "@/data/mock";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowUpRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Certificates() {
    return (
        <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((cert, index) => (
                <SlideUp key={index} delay={0.2 + index * 0.1}>
                    <Card className="overflow-hidden h-full flex flex-col bg-background/60 backdrop-blur-sm transition-all border-transparent hover:border-primary/50 hover:shadow-md group">
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
                            <Image
                                src={cert.image || "/placeholder.svg"}
                                alt={cert.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        <CardHeader className="space-y-2">
                            <div className="flex items-start justify-between gap-4">
                                <CardTitle className="line-clamp-2 text-lg">{cert.name}</CardTitle>
                                <Badge variant="secondary" className="shrink-0 flex gap-1 items-center">
                                    <Calendar className="w-3 h-3" />
                                    {cert.date}
                                </Badge>
                            </div>
                            <CardDescription className="text-base flex items-center justify-between font-medium text-primary">
                                {cert.issuer}

                                <Link href={cert.url}>
                                    <Button size="sm" className={cn("gap-2 font-semibold cursor-pointer")}>
                                        View Certificate
                                        <ArrowUpRight className="h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardDescription>
                        </CardHeader>
                    </Card>
                </SlideUp>
            ))}
        </div>
    );
}