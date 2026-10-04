// The theme contract, owned in one place: the storage key, the resolve logic,
// and the DOM ids other modules may rely on. Consumed by the theme toggle, the
// mobile menu script, and the screenshot harness. The inline boot script in
// Layout.astro cannot import (it must render before any bundle loads), so it
// re-declares the key literally — keep it in sync with THEME_STORAGE_KEY.
export const THEME_STORAGE_KEY = 'theme';

export const THEME_IDS = {
	toggle: 'theme-toggle',
	menuToggle: 'menu-toggle',
	mobileMenu: 'mobile-menu',
};

// stored: the value in localStorage (null when unset).
// prefersDark: the result of matchMedia('(prefers-color-scheme: dark)').
export function resolveTheme(stored, prefersDark) {
	return stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
}
