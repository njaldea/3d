import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    return await resolve(event, {
        ssr: !event.url.pathname.startsWith('/debug')
    });
};
