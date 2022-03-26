<script lang="ts">
    import { init } from '$lib/context';
    import TransformNode from './core/TransformNode.svelte';

    const context = init();
</script>

<svelte:window on:resize={() => context.resize()} />

<canvas bind:this={context.canvas} />
{#if context.canvas != null}
    <TransformNode id="canvas">
        <slot />
    </TransformNode>
{/if}

<style>
    canvas {
        width: 100%;
        height: 100%;
        margin: 0px;
        padding: 0px;
        box-sizing: border-box;
    }
</style>
