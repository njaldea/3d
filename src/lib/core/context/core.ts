import type { Core } from '$lib/core/types/Core';
import { tags } from '$lib/core/tags';
import { getContext, setContext } from 'svelte';

export const getCore = () => {
    return getContext(tags.core) as Core;
};

export const setCore = (core: Core) => {
    setContext(tags.core, core);
};
