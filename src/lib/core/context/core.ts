import { Core } from '$lib/core/Core';
import { tags } from '$lib/core/tags';
import { afterUpdate, getContext, onDestroy, onMount, setContext } from 'svelte';

type InitRef = {
    core: null | Core;
    canvas: null | HTMLCanvasElement;
};

export const init = (webgpu: boolean): InitRef => {
    const ref: InitRef = { core: null, canvas: null };

    setContext(tags.core, ref);

    onMount(async () => {
        if (ref.canvas) {
            ref.core = new Core(ref.canvas, webgpu);
        }
    });

    onDestroy(async () => ref.core?.destroy());
    afterUpdate(() => ref.core?.update());
    return ref;
};

export const getCore = () => {
    return (getContext(tags.core) as InitRef).core as Core;
};
