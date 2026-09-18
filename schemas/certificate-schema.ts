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

export const certificateSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Certificate name is required"),
  slug: z.string().min(1, "Slug is required"),
  issuer: z.string().min(1, "Issuer name is required"),
  date: z.string().min(1, "Certificate date is required"),
  url: flexibleUrl,
  image: z.string().nullable().optional().or(z.literal("")),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const createCertificateSchema = certificateSchema.omit({ id: true, slug: true }).extend({
  slug: z.string().optional(),
});

export const updateCertificateSchema = createCertificateSchema.partial();

export type Certificate = z.infer<typeof certificateSchema>;
export type CreateCertificatePayload = z.infer<typeof createCertificateSchema>;
export type UpdateCertificatePayload = z.infer<typeof updateCertificateSchema>;
