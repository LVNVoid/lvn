import Link from "next/link";
import ProfileForm from "@/components/admin/profile-form";
import { getProfile } from "@/services/profile-service";
import { ShieldCheck, ArrowRight } from "lucide-react";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
          <p className="text-muted-foreground text-sm">
            Manage your public profile, bio, and online presence.
          </p>
        </div>
        <Link
          href="/admin/security"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-border/80 bg-secondary/30 hover:border-teal-500/40 text-muted-foreground hover:text-teal-400 transition-colors w-fit"
        >
          <ShieldCheck className="h-4 w-4 text-teal-400" />
          <span>Security & Password</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
      <div>
        <ProfileForm initialData={profile ?? undefined} />
      </div>
    </div>
  );
}
