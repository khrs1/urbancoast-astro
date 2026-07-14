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
    // --- Affiliate (optional) ---
    // Ids from src/data/products.ts. When present, the BlogPost layout renders
    // product boxes / a comparison table + the affiliate disclosure.
    products: z.array(z.string()).optional(),
    comparison: z.array(z.string()).optional(),
    comparisonTitle: z.string().optional(),
    recommendationsTitle: z.string().optional(),
  }),
});

export const collections = { blog };
