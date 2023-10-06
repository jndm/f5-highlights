/** @type {import('tailwindcss').Config} */
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import forms from '@tailwindcss/forms';

export default {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {
			gridTemplateColumns: {
				// Complex site-specific column configuration
				fluid: 'repeat(auto-fill, minmax(min(100%/2, max(450px, 100%/5)), 1fr))'
			}
		}
	},
	plugins: [skeleton({ themes: { preset: ['gold-nouveau'] } }), forms]
};
