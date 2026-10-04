// The site's identity facts, declared once. Pages consume this module instead
// of re-declaring literals; before it existed the email address was already
// drifting between the contact page and the CV.
export const site = {
	name: 'Eugene Agyeman',
	email: 'hi@eugeneagyeman.io',
	location: 'London, United Kingdom',
	description:
		'Software engineer in London, working on real-time backend systems and writing about what I build.',
	links: {
		linkedin: 'https://www.linkedin.com/in/eugene-agyeman',
		github: 'https://github.com/eugeneagyeman',
	},
} as const;
