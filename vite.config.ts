import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

import { resolve } from 'path';

const config: UserConfig = {
    plugins: [sveltekit()],
    server: { port: 3000 },
    resolve: {
        alias: {
            '@nil-/3d': resolve('./src/lib')
        }
    }
};

export default config;
