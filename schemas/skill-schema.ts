import { z } from "zod";

export const skillSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Nama keahlian wajib diisi"),
  category: z.string().nullable().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createSkillSchema = skillSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type Skill = z.infer<typeof skillSchema>;
export type CreateSkillPayload = z.infer<typeof createSkillSchema>;
