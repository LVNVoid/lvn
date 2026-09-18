import { unstable_cache } from "next/cache";
import { db } from "@/services/db";
import type { Profile, Socials } from "@/schemas/profile-schema";

export const getProfile = unstable_cache(
  async (): Promise<Profile | null> => {
    try {
      const profile = await db.profile.findFirst();
      if (!profile) return null;

      const socials = profile.socials as Socials;

      return {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        bio: profile.bio,
        location: profile.location,
        email: profile.email,
        avatar: profile.avatar,
        socials: socials ?? null,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      };
    } catch (error) {
      console.error("Failed to get profile from DB:", error);
      return null;
    }
  },
  ["profile-cache"],
  { revalidate: 3600, tags: ["profile"] }
);
