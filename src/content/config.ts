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
    category: z.string().default('Ordbog'),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    category: z.string().default('Værktøj'),
    image: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string(),
    category: z.string(),
    image: z.string().optional(),
    price: z.string().optional(),
    affiliateId: z.string().optional(),
    affiliateUrl: z.string().optional(),
    network: z.enum(['partner-ads', 'adtraction', 'direct']).default('direct'),
    rating: z.number().min(0).max(5).optional(),
    badge: z.string().optional(),
    brand: z.string().optional(),
    tags: z.array(z.string()).optional(),
    updatedDate: z.coerce.date().optional(),
  }),
});

export const collections = { blog, glossary, tools, products };