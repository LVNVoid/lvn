import { z } from "zod";

export const educationSchema = z.object({
  id: z.string().cuid(),
  school: z.string().min(1, "Nama institusi wajib diisi"),
  degree: z.string().min(1, "Gelar / jurusan wajib diisi"),
  year: z.string().min(1, "Tahun pendidikan wajib diisi"),
  description: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createEducationSchema = educationSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const updateEducationSchema = createEducationSchema.partial();

export type Education = z.infer<typeof educationSchema>;
export type CreateEducationPayload = z.infer<typeof createEducationSchema>;
export type UpdateEducationPayload = z.infer<typeof updateEducationSchema>;
