// Capture desktop + mobile screenshots in both themes from a running dev server.
//
//   npm run dev          # in one terminal
//   npx playwright install chromium webkit   # once
//   npm run shots
//
// Output goes to ./screenshots (gitignored by convention; delete as needed).
import { mkdirSync } from 'node:fs';
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://localhost:4321';
const outDir = process.env.OUT_DIR ?? 'screenshots';

const routes = [
	['/', 'home'],
	['/about', 'about'],
	['/cv', 'cv'],
	['/contact', 'contact'],
	['/blog', 'blog'],
];

const viewports = {
	desktop: { width: 1440, height: 900 },
	mobile: { width: 390, height: 844 },
};

mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
for (const [vpName, viewport] of Object.entries(viewports)) {
	for (const theme of ['light', 'dark']) {
		const context = await browser.newContext({ viewport, deviceScaleFactor: 2 });
		await context.addInitScript((t) => {
			try {
				localStorage.setItem('theme', t);
			} catch {}
		}, theme);
		const page = await context.newPage();
		for (const [path, name] of routes) {
			await page.goto(base + path, { waitUntil: 'load' });
			await page.evaluate(() => document.fonts.ready);
			await page.screenshot({
				path: `${outDir}/${name}-${vpName}-${theme}.png`,
				fullPage: true,
			});
		}
		await context.close();
	}
}
await browser.close();
console.log(`Screenshots written to ${outDir}/`);
