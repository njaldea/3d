<script lang="ts">
    import { setCore, setCurrentCanvas } from '$lib/core';
    import type { Core } from '$lib/core/Core';
    import { afterUpdate } from 'svelte';

    export let core: Core;
    export let canvas: HTMLCanvasElement;

    setCurrentCanvas(canvas);
    setCore(core);

    afterUpdate(() => core.update());
</script>

<slot />
