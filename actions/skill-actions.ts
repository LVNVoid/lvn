"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";
import { db } from "@/services/db";
import {
  createSkillSchema,
  type Skill,
} from "@/schemas/skill-schema";
import type { ApiResponse } from "@/types/api";

export async function createSkillAction(
  payload: unknown
): Promise<ApiResponse<Skill>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Sesi tidak valid atau telah berakhir." },
    };
  }

  const parsed = createSkillSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Data keahlian tidak valid.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const skill = await db.skill.create({
      data: {
        name: parsed.data.name,
        category: parsed.data.category || null,
      },
    });

    revalidateTag("skills", "max");
    revalidatePath("/");
    revalidatePath("/admin/skills");

    return {
      success: true,
      data: {
        id: skill.id,
        name: skill.name,
        category: skill.category,
        createdAt: skill.createdAt,
        updatedAt: skill.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error creating skill:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Gagal menyimpan keahlian." },
    };
  }
}

export async function deleteSkillAction(
  id: string
): Promise<ApiResponse<{ id: string }>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Sesi tidak valid atau telah berakhir." },
    };
  }

  try {
    await db.skill.delete({ where: { id } });

    revalidateTag("skills", "max");
    revalidatePath("/");
    revalidatePath("/admin/skills");

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Error deleting skill:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Gagal menghapus keahlian." },
    };
  }
}
