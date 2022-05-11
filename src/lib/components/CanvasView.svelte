<script lang="ts" context="module">
    import '@babylonjs/core/Engines/Extensions/engine.views.js';
    view.set(true);
</script>

<script lang="ts">
    import Context from '$lib/components/Context.svelte';
    import type { Core } from '$lib/core/Core';
    import { view } from '$lib/core/state/treeshake';

    export let core: Core;
    let canvas: HTMLCanvasElement;
</script>

<canvas bind:this={canvas} />
{#if canvas != null && core != null}
    <Context {core} {canvas}>
        <slot />
    </Context>
{/if}

<style>
    canvas {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: block;
        outline: none;
        user-select: none;
    }
</style>
