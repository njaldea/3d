import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter(),
        routes: (filepath) => {
            if (!/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath)) {
                if (filepath.endsWith('.svelte')) {
                    if (filepath.endsWith('index.svelte')) {
                        console.log(
                            '  - http://localhost:3000/' + filepath.slice(0, -'index.svelte'.length)
                        );
                    } else {
                        console.log(
                            '  - http://localhost:3000/' + filepath.slice(0, -'.svelte'.length)
                        );
                    }
                }
                return true;
            }
            return false;
        },
        trailingSlash: 'never',
        vite: {
            build: {
                rollupOptions: {
                    output: {
                        // need to disable vendor chunk
                        manualChunks: undefined
                    }
                }
            },
            resolve: {
                alias: {
                    // these are to be used in routes to easily copy code to svelte repl
                    '@nil-/3d': resolve('./src/lib')
                }
            }
        }
    }
};

export default config;
