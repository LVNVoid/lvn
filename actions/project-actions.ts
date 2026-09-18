"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";
import { db } from "@/services/db";
import { slugify } from "@/utils/slugify";
import {
  createProjectSchema,
  updateProjectSchema,
  type Project,
} from "@/schemas/project-schema";
import type { ApiResponse } from "@/types/api";

export async function createProjectAction(
  payload: unknown
): Promise<ApiResponse<Project>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  const parsed = createProjectSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid project payload.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const slug = parsed.data.slug?.trim() || slugify(parsed.data.title);
    const project = await db.project.create({
      data: {
        title: parsed.data.title,
        slug,
        description: parsed.data.description,
        tech: parsed.data.tech ?? [],
        link: parsed.data.link || null,
        github: parsed.data.github || null,
        image: parsed.data.image || null,
      },
    });

    revalidateTag("projects", "max");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");

    return {
      success: true,
      data: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        tech: project.tech,
        link: project.link,
        github: project.github,
        image: project.image,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to save project to database." },
    };
  }
}

export async function updateProjectAction(
  id: string,
  payload: unknown
): Promise<ApiResponse<Project>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  const parsed = updateProjectSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid project update payload.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const updateData: Record<string, unknown> = {};
    if (parsed.data.title !== undefined) updateData.title = parsed.data.title;
    if (parsed.data.slug !== undefined) updateData.slug = parsed.data.slug;
    if (parsed.data.description !== undefined) updateData.description = parsed.data.description;
    if (parsed.data.tech !== undefined) updateData.tech = parsed.data.tech;
    if (parsed.data.link !== undefined) updateData.link = parsed.data.link || null;
    if (parsed.data.github !== undefined) updateData.github = parsed.data.github || null;
    if (parsed.data.image !== undefined) updateData.image = parsed.data.image || null;

    const project = await db.project.update({
      where: { id },
      data: updateData,
    });

    revalidateTag("projects", "max");
    revalidatePath("/projects");
    revalidatePath(`/projects/${project.slug}`);
    revalidatePath("/admin/projects");
    revalidatePath("/");

    return {
      success: true,
      data: {
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        tech: project.tech,
        link: project.link,
        github: project.github,
        image: project.image,
        createdAt: project.createdAt,
        updatedAt: project.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error updating project:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to update project." },
    };
  }
}

export async function deleteProjectAction(id: string): Promise<ApiResponse<{ id: string }>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  try {
    await db.project.delete({ where: { id } });

    revalidateTag("projects", "max");
    revalidatePath("/projects");
    revalidatePath("/admin/projects");
    revalidatePath("/");

    return { success: true, data: { id } };
  } catch (error) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to delete project." },
    };
  }
}
