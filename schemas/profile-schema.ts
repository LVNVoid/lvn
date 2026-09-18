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

export const socialsSchema = z.object({
  github: flexibleUrl,
  linkedin: flexibleUrl,
  twitter: flexibleUrl,
  instagram: flexibleUrl,
}).nullable().optional();

export const profileSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Name is required"),
  role: z.string().min(1, "Role is required"),
  bio: z.string().min(1, "Bio is required"),
  location: z.string().min(1, "Location is required"),
  email: z.string().email("Please provide a valid email address"),
  avatar: z.string().min(1, "Avatar is required"),
  socials: socialsSchema,
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const updateProfileSchema = profileSchema.omit({ id: true, createdAt: true, updatedAt: true });

export type Socials = z.infer<typeof socialsSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type UpdateProfilePayload = z.infer<typeof updateProfileSchema>;
