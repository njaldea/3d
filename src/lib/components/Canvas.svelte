<script lang="ts">
    import { Core } from '$lib/core/types/Core';
    import Context from '$lib/components/Context.svelte';

    import { onMount, onDestroy } from 'svelte';
    export let webgpu = false;
    export let core: null | Core = null;

    let canvas: HTMLCanvasElement;

    onMount(() => (core = new Core(canvas, webgpu)));
    onDestroy(() => core?.destroy());
</script>

<svelte:window on:resize={() => core?.resize()} />

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
