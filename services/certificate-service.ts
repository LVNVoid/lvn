import { unstable_cache } from "next/cache";
import { db } from "@/services/db";
import type { Certificate } from "@/schemas/certificate-schema";

export const getCertificates = unstable_cache(
  async (): Promise<Certificate[]> => {
    try {
      const certificates = await db.certificate.findMany({
        orderBy: { createdAt: "desc" },
      });
      return certificates.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        issuer: c.issuer,
        date: c.date,
        url: c.url,
        image: c.image,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt,
      }));
    } catch (error) {
      console.error("Failed to get certificates from DB:", error);
      return [];
    }
  },
  ["certificates-cache"],
  { revalidate: 3600, tags: ["certificates"] }
);

export async function getCertificateBySlug(slug: string): Promise<Certificate | null> {
  try {
    const cert = await db.certificate.findUnique({
      where: { slug },
    });
    if (!cert) return null;
    return {
      id: cert.id,
      name: cert.name,
      slug: cert.slug,
      issuer: cert.issuer,
      date: cert.date,
      url: cert.url,
      image: cert.image,
      createdAt: cert.createdAt,
      updatedAt: cert.updatedAt,
    };
  } catch (error) {
    console.error(`Failed to get certificate by slug '${slug}':`, error);
    return null;
  }
}
