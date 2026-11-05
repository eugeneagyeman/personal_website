import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
	}),
});

const periodPoint = z.object({ label: z.string(), iso: z.string() });

// The CV's structured data, schema'd so malformed dates or missing fields fail
// the build rather than shipping. Mirrors the blog pattern. The PDF twin is
// still exported from Overleaf separately.
const cv = defineCollection({
	loader: file('src/data/cv.json'),
	schema: z.object({
		// The line under the name: a description of the work, not a job title.
		// Job titles live on each experience entry and must match the employer's.
		headline: z.string(),
		experience: z.array(
			z.object({
				role: z.string(),
				company: z.string(),
				location: z.string(),
				start: periodPoint,
				end: periodPoint.nullable(),
				highlights: z.array(z.string()),
			}),
		),
		projects: z.array(
			z.object({
				name: z.string(),
				stack: z.string(),
				start: periodPoint,
				end: periodPoint.nullable(),
				highlights: z.array(z.string()),
			}),
		),
		skillGroups: z.array(z.object({ label: z.string(), items: z.array(z.string()) })),
		education: z.array(
			z.object({
				institution: z.string(),
				degree: z.string(),
				honours: z.string().optional(),
				// Set for a course not yet started, e.g. "Incoming".
				status: z.string().optional(),
				start: periodPoint,
				end: periodPoint,
			}),
		),
	}),
});

export const collections = { blog, cv };
