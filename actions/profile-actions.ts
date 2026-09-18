"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";
import { db } from "@/services/db";
import { deleteFromCloudinary } from "@/lib/cloudinary";
import {
  updateProfileSchema,
  type Profile,
  type Socials,
} from "@/schemas/profile-schema";
import type { ApiResponse } from "@/types/api";

export async function updateProfileAction(
  payload: unknown
): Promise<ApiResponse<Profile>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Sesi tidak valid atau telah berakhir." },
    };
  }

  const parsed = updateProfileSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Data profil tidak valid.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const firstProfile = await db.profile.findFirst();
    const data = parsed.data;

    let profile;
    if (firstProfile) {
      profile = await db.profile.update({
        where: { id: firstProfile.id },
        data: {
          name: data.name,
          role: data.role,
          bio: data.bio,
          location: data.location,
          email: data.email,
          avatar: data.avatar,
          socials: data.socials ? JSON.parse(JSON.stringify(data.socials)) : undefined,
        },
      });

      if (data.avatar !== firstProfile.avatar && firstProfile.avatar) {
        try {
          await deleteFromCloudinary(firstProfile.avatar);
        } catch (e) {
          console.error("Gagal menghapus avatar lama dari Cloudinary:", e);
        }
      }
    } else {
      profile = await db.profile.create({
        data: {
          name: data.name,
          role: data.role,
          bio: data.bio,
          location: data.location,
          email: data.email,
          avatar: data.avatar,
          socials: data.socials ? JSON.parse(JSON.stringify(data.socials)) : undefined,
        },
      });
    }

    revalidateTag("profile", "max");
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/admin/profile");

    return {
      success: true,
      data: {
        id: profile.id,
        name: profile.name,
        role: profile.role,
        bio: profile.bio,
        location: profile.location,
        email: profile.email,
        avatar: profile.avatar,
        socials: profile.socials as Socials,
        createdAt: profile.createdAt,
        updatedAt: profile.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Gagal memperbarui profil." },
    };
  }
}
