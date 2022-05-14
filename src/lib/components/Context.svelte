<script lang="ts">
    import Component from '$lib/components/Component.svelte';
    import { setCurrentCanvas } from '$lib/core/context/canvas';
    import { setCore } from '$lib/core/context/core';
    import { destructor } from '$lib/core/lifecycle';
    import type { Core } from '$lib/core/types/Core';

    export let core: Core;
    export let canvas: HTMLCanvasElement;

    setCurrentCanvas(canvas);
    setCore(core);

    destructor(() => core.destroy());
</script>

<Component>
    <slot />
</Component>
