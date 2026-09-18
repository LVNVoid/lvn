"use server";

import { getServerSession } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { authOptions } from "@/lib/auth";
import { db } from "@/services/db";
import { slugify } from "@/utils/slugify";
import {
  createCertificateSchema,
  updateCertificateSchema,
  type Certificate,
} from "@/schemas/certificate-schema";
import type { ApiResponse } from "@/types/api";

export async function createCertificateAction(
  payload: unknown
): Promise<ApiResponse<Certificate>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  const parsed = createCertificateSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid certificate payload.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const slug = parsed.data.slug?.trim() || slugify(parsed.data.name);
    const cert = await db.certificate.create({
      data: {
        name: parsed.data.name,
        slug,
        issuer: parsed.data.issuer,
        date: parsed.data.date,
        url: parsed.data.url || null,
        image: parsed.data.image || null,
      },
    });

    revalidateTag("certificates", "max");
    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");

    return {
      success: true,
      data: {
        id: cert.id,
        name: cert.name,
        slug: cert.slug,
        issuer: cert.issuer,
        date: cert.date,
        url: cert.url,
        image: cert.image,
        createdAt: cert.createdAt,
        updatedAt: cert.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error creating certificate:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to save certificate." },
    };
  }
}

export async function updateCertificateAction(
  slug: string,
  payload: unknown
): Promise<ApiResponse<Certificate>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  const parsed = updateCertificateSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid certificate update payload.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  try {
    const cert = await db.certificate.update({
      where: { slug },
      data: {
        ...(parsed.data.name && { name: parsed.data.name }),
        ...(parsed.data.issuer && { issuer: parsed.data.issuer }),
        ...(parsed.data.date && { date: parsed.data.date }),
        ...(parsed.data.url !== undefined && { url: parsed.data.url || null }),
        ...(parsed.data.image !== undefined && { image: parsed.data.image || null }),
      },
    });

    revalidateTag("certificates", "max");
    revalidatePath("/certificates");
    revalidatePath(`/certificates/${cert.slug}`);
    revalidatePath("/admin/certificates");

    return {
      success: true,
      data: {
        id: cert.id,
        name: cert.name,
        slug: cert.slug,
        issuer: cert.issuer,
        date: cert.date,
        url: cert.url,
        image: cert.image,
        createdAt: cert.createdAt,
        updatedAt: cert.updatedAt,
      },
    };
  } catch (error) {
    console.error("Error updating certificate:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to update certificate." },
    };
  }
}

export async function deleteCertificateAction(
  slug: string
): Promise<ApiResponse<{ slug: string }>> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  try {
    await db.certificate.delete({ where: { slug } });

    revalidateTag("certificates", "max");
    revalidatePath("/certificates");
    revalidatePath("/admin/certificates");

    return { success: true, data: { slug } };
  } catch (error) {
    console.error("Error deleting certificate:", error);
    return {
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to delete certificate." },
    };
  }
}
