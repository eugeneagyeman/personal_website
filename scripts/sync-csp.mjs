// Derive the CSP script-src hashes from the built HTML so they can never
// drift from the minified inline scripts. Runs as part of `npm run build`.
//
// The hashes in _headers fingerprint the exact bytes of every inline <script>
// in dist/. Those bytes come from the minifier, not from anything a human
// edits, so keeping them correct by hand is a losing game: an Astro or Vite
// upgrade that changes minification silently invalidates them, and the site
// boots with the theme toggle and mobile menu blocked by its own CSP. This
// module owns that invariant instead: it rewrites the script-src directive in
// both dist/_headers (what gets deployed) and public/_headers (so the
// committed source stays truthful for the next build).
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const distDir = join(root, 'dist');

function* htmlFiles(dir) {
	for (const name of readdirSync(dir)) {
		const path = join(dir, name);
		if (statSync(path).isDirectory()) yield* htmlFiles(path);
		else if (name.endsWith('.html')) yield path;
	}
}

const hashes = new Set();
const inlineScript = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

for (const file of htmlFiles(distDir)) {
	const html = readFileSync(file, 'utf8');
	for (const match of html.matchAll(inlineScript)) {
		const body = match[1];
		if (!body.trim()) continue;
		const digest = createHash('sha256').update(body, 'utf8').digest('base64');
		hashes.add(`'sha256-${digest}'`);
	}
}

if (hashes.size === 0) {
	console.error('sync-csp: found no inline scripts in dist/ — refusing to rewrite _headers');
	process.exit(1);
}

// script-src is the final directive on the Content-Security-Policy line.
const scriptSrc = `script-src 'self' ${[...hashes].sort().join(' ')}`;

for (const target of [join(distDir, '_headers'), join(root, 'public', '_headers')]) {
	const text = readFileSync(target, 'utf8');
	const updated = text.replace(/script-src [^\n]*/, scriptSrc);
	if (updated === text) {
		console.error(`sync-csp: no script-src directive found in ${target}`);
		process.exit(1);
	}
	writeFileSync(target, updated);
	console.log(`sync-csp: wrote ${hashes.size} script hash(es) to ${target}`);
}
