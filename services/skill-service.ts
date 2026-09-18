import { unstable_cache } from "next/cache";
import { db } from "@/services/db";
import type { Skill } from "@/schemas/skill-schema";

export const getSkills = unstable_cache(
  async (): Promise<Skill[]> => {
    try {
      const skills = await db.skill.findMany({
        orderBy: { name: "asc" },
      });
      return skills.map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
      }));
    } catch (error) {
      console.error("Failed to get skills from DB:", error);
      return [];
    }
  },
  ["skills-cache"],
  { revalidate: 3600, tags: ["skills"] }
);
