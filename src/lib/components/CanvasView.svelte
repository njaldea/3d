<script lang="ts" context="module">
    import '@babylonjs/core/Engines/Extensions/engine.views.js';
    import { view } from '$lib/core/state/treeshake';
    view.set(true);
</script>

<script lang="ts">
    import Context from '$lib/components/Context.svelte';
    import type { Core } from '$lib/core/types/Core';

    export let core: Core;
    let canvas: HTMLCanvasElement;
</script>

<canvas bind:this={canvas} on:click={() => core?.active_canvas.set(canvas)}>
    {#if canvas != null && core != null}
        <Context {core} {canvas}>
            <slot />
        </Context>
    {/if}
</canvas>

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
