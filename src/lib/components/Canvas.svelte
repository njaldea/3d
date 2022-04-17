<script lang="ts">
    import { init } from '$lib/core';
    const core = init();
</script>

<svelte:window on:resize={core.resize} />

<canvas bind:this={core.canvas} on:keyup on:keydown />
{#if core.canvas != null}
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
