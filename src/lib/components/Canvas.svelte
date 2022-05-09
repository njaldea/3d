<script lang="ts">
    import { init } from '$lib/core';
    import CanvasContext from '$lib/components/CanvasContext.svelte';
    export let webgpu = false;
    const ref = init(webgpu);
</script>

<svelte:window on:resize={() => ref.core?.resize()} />

<canvas bind:this={ref.canvas} />
{#if ref.canvas != null}
    <CanvasContext canvas={ref.canvas}>
        <slot />
    </CanvasContext>
{/if}

<style>
    canvas {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: block;
    }
</style>
