import { z } from "zod";

export const certificateSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, "Nama sertifikat wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  issuer: z.string().min(1, "Penerbit sertifikat wajib diisi"),
  date: z.string().min(1, "Tanggal sertifikat wajib diisi"),
  url: z.string().url("URL kredensial tidak valid").nullable().optional().or(z.literal("")),
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
