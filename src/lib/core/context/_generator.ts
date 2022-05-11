import { getContext, setContext } from 'svelte';

export function create<T>(tag: symbol) {
    return {
        get: () => getContext(tag) as T,
        set: (o: T) => setContext(tag, o)
    };
}
