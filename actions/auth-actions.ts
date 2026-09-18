"use server";

import { getServerSession } from "next-auth";
import bcrypt from "bcryptjs";
import { authOptions } from "@/lib/auth";
import { db } from "@/services/db";
import { changePasswordSchema } from "@/schemas/auth-schema";
import type { ApiResponse } from "@/types/api";

export async function changePasswordAction(
  payload: unknown
): Promise<ApiResponse<{ message: string }>> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return {
      success: false,
      error: { code: "UNAUTHORIZED", message: "Session invalid or expired. Please sign in again." },
    };
  }

  const parsed = changePasswordSchema.safeParse(payload);
  if (!parsed.success) {
    return {
      success: false,
      error: {
        code: "VALIDATION_ERROR",
        message: "Invalid password data.",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
    };
  }

  const { currentPassword, newPassword } = parsed.data;

  const sessionUser = session.user as { id?: string; email?: string | null };
  const user = sessionUser.id
    ? await db.user.findUnique({ where: { id: sessionUser.id } })
    : sessionUser.email
    ? await db.user.findUnique({ where: { email: sessionUser.email } })
    : null;

  if (!user) {
    return {
      success: false,
      error: { code: "NOT_FOUND", message: "User account not found." },
    };
  }

  const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
  if (!isCurrentValid) {
    return {
      success: false,
      error: {
        code: "BAD_REQUEST",
        message: "Current password is incorrect.",
        details: [{ field: "currentPassword", message: "Current password is incorrect." }],
      },
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return {
    success: true,
    data: { message: "Password updated successfully." },
  };
}
