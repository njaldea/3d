<script lang="ts">
    import { init } from '$lib/context';

    import { Engine, Scene } from 'babylonjs';
    import { afterUpdate, onDestroy, onMount } from 'svelte';

    const context = init();

    onMount(() => {
        context.engine = new Engine(context.canvas, true);
        context.scene = new Scene(context.engine);
        context.scene.onReadyObservable.addOnce(() => context.render());
    });

    onDestroy(() => context.engine?.dispose());
    afterUpdate(() => context.render());
</script>

<svelte:window on:resize={() => context?.engine?.resize()} />

<canvas bind:this={context.canvas} />
{#if context.canvas != null}
    <slot />
{/if}

<style>
    canvas {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
    }
</style>
