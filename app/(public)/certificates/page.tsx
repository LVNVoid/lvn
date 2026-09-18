import Certificates from "@/components/sections/certificates";
import { PageHeader } from "@/components/ui/page-header";
import { Award } from "lucide-react";
import { getCertificates } from "@/services/certificate-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates",
  description: "Browse my collection of certificates and achievements from various programs and technical milestones.",
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Certificates"
        description="Milestones from programs, projects, and communities."
        icon={Award}
      />
      <Certificates certificates={certificates} />
    </div>
  );
}
