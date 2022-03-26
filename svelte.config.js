import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: preprocess(),

    kit: {
        adapter: adapter()
    },
    package: {
        exports: (filename) => filename === 'index.ts'
    },
    routes: (filepath) => {
        if (!/(?:(?:^_|\/_)|(?:^\.|\/\.)(?!well-known))/.test(filepath)) {
            if (filepath.endsWith('.svelte')) {
                filepath = filepath.slice('src/routes/'.length);
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
    }
};

export default config;
