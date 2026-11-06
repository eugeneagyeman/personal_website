// The tiny shell behind the editable name in the header. Pure: it takes the
// typed line and says what to do, so Header.astro owns only the DOM.
import { site } from './site';

export type Outcome = { reply?: string; go?: string };

// Directory names a visitor might `cd` into, mapped to real routes.
const dirs: Record<string, string> = {
	'': '/',
	'~': '/',
	'/': '/',
	'..': '/',
	home: '/',
	about: '/about',
	cv: '/cv',
	contact: '/contact',
	thoughts: '/blog',
	blog: '/blog',
};

export function run(line: string): Outcome {
	const text = line.trim().replace(/\s+/g, ' ');
	const lower = text.toLowerCase();
	const [cmd = '', ...rest] = lower.split(' ');
	// `cd /cv/` and `cd cv` are the same place.
	const arg = rest.join(' ').replace(/^\/+|\/+$/g, '');

	if (lower === '' || lower === 'clear') return {};
	if (lower === site.name.toLowerCase()) return { reply: "that's my line" };

	switch (cmd) {
		case 'help':
			return { reply: 'try: whoami, ls, cd <dir>, status, sudo' };
		case 'whoami':
			return { reply: 'you, apparently' };
		case 'ls':
			return { reply: 'about  cv  contact  thoughts' };
		case 'cd':
			return arg in dirs ? { go: dirs[arg] } : { reply: `cd: no such directory: ${arg}` };
		case 'echo':
			// Echoes the rest of the line as typed, case and all.
			return { reply: `non authorised content: ${text.slice(cmd.length).trim()}` };
		case 'status':
			return { reply: `status: ${site.availability.toLowerCase()}` };
		case 'sudo':
			return { reply: 'nice try' };
		case 'rm':
			return { reply: 'permission denied. this site is load-bearing.' };
		case 'exit':
			return { reply: 'there is no escape' };
		default:
			return { reply: `command not found: ${cmd}` };
	}
}
