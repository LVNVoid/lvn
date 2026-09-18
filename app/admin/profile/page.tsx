import ProfileForm from "@/components/admin/profile-form";
import { getProfile } from "@/services/profile-service";

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div>
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-muted-foreground">
          Manage your public profile and online presence.
        </p>
      </div>
      <div className="my-6">
        <ProfileForm initialData={profile ?? undefined} />
      </div>
    </div>
  );
}
