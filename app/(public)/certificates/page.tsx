import Certificates from "@/components/sections/certificates";
import { PageHeader } from "@/components/ui/page-header";
import { Award, ShieldCheck } from "lucide-react";
import { getCertificates } from "@/services/certificate-service";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certificates | Technical Milestones",
  description:
    "Browse verified certifications, completed courses, and technical competencies.",
};

export default async function CertificatesPage() {
  const certificates = await getCertificates();

  return (
    <div className="space-y-8 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <PageHeader
          title="Certificates"
          description="Verified credentials and milestones from professional programs and technical tracks."
          icon={Award}
        />
        <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full border border-teal-500/20 bg-teal-500/10 px-3 py-1 text-xs font-mono text-teal-400 shrink-0">
          <ShieldCheck className="h-3.5 w-3.5" />
          {certificates.length} Verified Credentials
        </div>
      </div>

      <Certificates certificates={certificates} />
    </div>
  );
}
