import { unstable_cache } from "next/cache";
import { db } from "@/services/db";
import type { Education } from "@/schemas/education-schema";

export const getEducations = unstable_cache(
  async (): Promise<Education[]> => {
    try {
      const educations = await db.education.findMany({
        orderBy: { year: "desc" },
      });
      return educations.map((e) => ({
        id: e.id,
        school: e.school,
        degree: e.degree,
        year: e.year,
        description: e.description,
        createdAt: e.createdAt,
        updatedAt: e.updatedAt,
      }));
    } catch (error) {
      console.error("Failed to get educations from DB:", error);
      return [];
    }
  },
  ["educations-cache"],
  { revalidate: 3600, tags: ["educations"] }
);
