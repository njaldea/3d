<script lang="ts">
    import { setCurrentCanvas } from '$lib/core/context/canvas';
    import { setCore } from '$lib/core/context/core';
    import type { Core } from '$lib/core/types/Core';

    import { afterUpdate } from 'svelte';

    export let core: Core;
    export let canvas: HTMLCanvasElement;

    setCurrentCanvas(canvas);
    setCore(core);

    afterUpdate(() => core.update());
</script>

<slot />
