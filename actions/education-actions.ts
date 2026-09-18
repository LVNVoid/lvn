"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";
import { db } from "@/services/db";
import {
  createEducationSchema,
  updateEducationSchema,
  type Education,
} from "@/schemas/education-schema";
import type { ApiResponse } from "@/types/api";

export async function createEducationAction(
  payload: unknown
): Promise<ApiResponse<Education>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  const parsed = createEducationSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid education payload.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const edu = await db.education.create({
      data: {
        school: parsed.data.school,
        degree: parsed.data.degree,
        year: parsed.data.year,
        description: parsed.data.description || null,
      },
    });

    revalidateTag("educations", "max");
    revalidatePath("/about");
    revalidatePath("/admin/education");

    return {
      success: true,
      data: {
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        year: edu.year,
        description: edu.description,
        createdAt: edu.createdAt,
        updatedAt: edu.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error creating education:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to save education record." },
    };
  }
}

export async function updateEducationAction(
  id: string,
  payload: unknown
): Promise<ApiResponse<Education>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  const parsed = updateEducationSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid education update payload.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const edu = await db.education.update({
      where: { id },
      data: {
        ...(parsed.data.school && { school: parsed.data.school }),
        ...(parsed.data.degree && { degree: parsed.data.degree }),
        ...(parsed.data.year && { year: parsed.data.year }),
        ...(parsed.data.description !== undefined && { description: parsed.data.description || null }),
      },
    });

    revalidateTag("educations", "max");
    revalidatePath("/about");
    revalidatePath("/admin/education");

    return {
      success: true,
      data: {
        id: edu.id,
        school: edu.school,
        degree: edu.degree,
        year: edu.year,
        description: edu.description,
        createdAt: edu.createdAt,
        updatedAt: edu.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error updating education:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to update education record." },
    };
  }
}

export async function deleteEducationAction(
  id: string
): Promise<ApiResponse<{ id: string }>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  try {
    await db.education.delete({ where: { id } });

    revalidateTag("educations", "max");
    revalidatePath("/about");
    revalidatePath("/admin/education");

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Error deleting education:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to delete education record." },
    };
  }
}
