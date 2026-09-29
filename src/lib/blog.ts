import type { CollectionEntry } from 'astro:content';

export function postSlug(post: CollectionEntry<'blog'>): string {
	return post.id.replace(/\.mdx?$/, '');
}
