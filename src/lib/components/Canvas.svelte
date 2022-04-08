<script lang="ts">
    import { init } from '$lib/context';
    import TransformNode from './node/TransformNode.svelte';

    const context = init();
</script>

<svelte:window on:resize={() => context.resize()} />

<canvas bind:this={context.canvas} on:keyup on:keydown />
{#if context.canvas != null}
    <TransformNode id="rootnode">
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
