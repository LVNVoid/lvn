import Certificates from "@/components/sections/certificates";
import { PageHeader } from "@/components/ui/page-header";
import { Award } from "lucide-react";

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
