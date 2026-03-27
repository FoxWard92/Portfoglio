import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: '404.html', // Importante per GitHub Pages
			precompress: false,
			strict: true
		}),
		paths: {
			// SOSTITUISCI 'nome-del-tuo-repo' con il nome reale del tuo progetto su GitHub
			// Se il sito è su username.github.io lasciarlo vuoto: ''
			base: process.env.NODE_ENV === 'production' ? '/nome-del-tuo-repo' : '',
		}
	}
};

export default config;