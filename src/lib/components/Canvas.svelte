<script lang="ts">
    import { Core } from '$lib/core/types/Core';
    import Context from '$lib/components/Context.svelte';

    let canvas: HTMLCanvasElement;
</script>

<canvas bind:this={canvas}>
    {#if canvas}
        <Context core={new Core(canvas, false)}>
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
