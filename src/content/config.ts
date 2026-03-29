import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const music = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    album: z.string().optional(),
    year: z.number(),
    duration: z.string(),
    filename: z.string(),
    cover: z.string().optional(),
    tags: z.array(z.string()).default([]),
    soundcloudUrl: z.string().url().optional(),
  }),
});

export const collections = { blog, music };
