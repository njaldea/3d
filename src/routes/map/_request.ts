import { request as req, format } from '@nil-/map';

export const request = async (x: number, y: number) => {
    const token = import.meta.env.VITE_TOKEN as string;
    const url = import.meta.env.VITE_MAP_URL as string;
    const zoom = 16;
    const service = '{url}/{zoom}/{x}/{y}.vector.pbf?sku=101jDpRuC1GUm&access_token={token}';
    return await req(format(service, { url, zoom, x, y, token }));
};
