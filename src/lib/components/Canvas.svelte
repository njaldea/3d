<script lang="ts">
    import { init } from '$lib/core';
    export let webgpu = false;
    const ref = init(webgpu);
</script>

<svelte:window
    on:resize={() => {
        ref.core?.resize();
    }}
/>

<canvas bind:this={ref.canvas} on:keyup on:keydown />
{#if ref.canvas != null}
    <slot />
{/if}

<style>
    canvas {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: block;
    }
</style>
