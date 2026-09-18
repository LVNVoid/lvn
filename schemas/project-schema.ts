import { z } from "zod";

export const projectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Judul proyek wajib diisi").max(200),
  slug: z.string().min(1, "Slug wajib diisi"),
  description: z.string().min(1, "Deskripsi proyek wajib diisi"),
  tech: z.array(z.string()).default([]),
  link: z.string().url("URL demo tidak valid").nullable().optional().or(z.literal("")),
  github: z.string().url("URL GitHub tidak valid").nullable().optional().or(z.literal("")),
  image: z.string().nullable().optional().or(z.literal("")),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createProjectSchema = projectSchema.omit({ id: true, slug: true }).extend({
  slug: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type Project = z.infer<typeof projectSchema>;
export type CreateProjectPayload = z.infer<typeof createProjectSchema>;
export type UpdateProjectPayload = z.infer<typeof updateProjectSchema>;
