import { z } from "zod";

export const socialsSchema = z.object({
  github: z.string().url("URL GitHub tidak valid").optional().or(z.literal("")),
  linkedin: z.string().url("URL LinkedIn tidak valid").optional().or(z.literal("")),
  twitter: z.string().optional().or(z.literal("")),
  instagram: z.string().optional().or(z.literal("")),
}).nullable().optional();

export const profileSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Nama wajib diisi"),
  role: z.string().min(1, "Role wajib diisi"),
  bio: z.string().min(1, "Bio wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  email: z.string().email("Email tidak valid"),
  avatar: z.string().min(1, "Avatar wajib diisi"),
  socials: socialsSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const updateProfileSchema = profileSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type Socials = z.infer<typeof socialsSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
