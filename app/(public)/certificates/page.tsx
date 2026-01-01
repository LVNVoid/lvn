import Certificates from "@/components/sections/certificates";
import { PageHeader } from "@/components/ui/page-header";
import { Award } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Certificates",
    description: "Browse my collection of certificates and achievements from various programs and technical milestones.",
};

export default function CertificatesPage() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Certificates"
                description="Milestones from programs, projects, and communities."
                icon={Award}
            />
            <Certificates />
        </div>
    );
}
