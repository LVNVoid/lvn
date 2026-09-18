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

export async function getAdjacentCertificates(currentSlug: string): Promise<{
  prev: { name: string; slug: string } | null;
  next: { name: string; slug: string } | null;
}> {
  try {
    const certificates = await getCertificates();
    const currentIndex = certificates.findIndex((c) => c.slug === currentSlug);
    if (currentIndex === -1) return { prev: null, next: null };

    const prev = currentIndex > 0 ? { name: certificates[currentIndex - 1].name, slug: certificates[currentIndex - 1].slug } : null;
    const next = currentIndex < certificates.length - 1 ? { name: certificates[currentIndex + 1].name, slug: certificates[currentIndex + 1].slug } : null;

    return { prev, next };
  } catch (error) {
    console.error("Failed to get adjacent certificates:", error);
    return { prev: null, next: null };
  }
}
