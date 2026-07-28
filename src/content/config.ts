import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const glossary = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, glossary };