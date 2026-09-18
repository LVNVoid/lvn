import { z } from "zod";

const flexibleUrl = z
  .string()
  .trim()
  .transform((val) => {
    if (!val) return "";
    if (!/^https?:\/\//i.test(val)) {
      return `https://${val}`;
    }
    return val;
  })
  .refine((val) => val === "" || /^https?:\/\/[^\s$.?#].[^\s]*$/i.test(val), {
    message: "Please provide a valid URL.",
  })
  .nullable()
  .optional()
  .or(z.literal(""));

export const projectSchema = z.object({
  id: z.string().cuid(),
  title: z.string().min(1, "Project title is required").max(200),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().min(1, "Project description is required"),
  tech: z.array(z.string()).default([]),
  link: flexibleUrl,
  github: flexibleUrl,
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
