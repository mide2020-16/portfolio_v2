import type { MetadataRoute } from "next";
import { seo } from "@/data/portfolio";
import { achievements } from "@/data/portfolio";
import {
  allProjects,
  experienceGroups,
} from "@/data/experience.data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: seo.siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...allProjects.map((project) => ({
      url: `${seo.siteUrl}/projects/${project.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...experienceGroups
      .filter((group) => group.kind === "employment")
      .flatMap((group) => [
        {
          url: `${seo.siteUrl}/experience/${group.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.8,
        },
        ...(group.achievements ?? []).map((achievement) => ({
          url: `${seo.siteUrl}/experience/${group.id}/achievements/${achievement.id}`,
          lastModified: new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        })),
      ]),
    ...achievements.map((achievement) => ({
      url: `${seo.siteUrl}/achievements/${achievement.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
