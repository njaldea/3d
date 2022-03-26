<script lang="ts">
    import { init } from '$lib/context';

    import { Engine, Scene } from 'babylonjs';
    import { onDestroy, onMount } from 'svelte';
    import TransformNode from './TransformNode.svelte';

    const context = init();

    onMount(() => {
        context.engine = new Engine(context.canvas, true);
        context.scene = new Scene(context.engine);
        context.scene.onReadyObservable.addOnce(() => context.render());
    });

    onDestroy(() => context.engine?.dispose());
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
