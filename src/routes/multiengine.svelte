<script lang="ts">
    import Control from './_Control.svelte';
    import Canvas from './_Canvas.svelte';
    import CanvasView from './_CanvasView.svelte';
    import type { Core } from '@nil-/3d/core/types';

    let target = '';
    let intensity = 0.3;
    let direction: [number, number, number] = [0, 1, 0];
    let position: [number, number, number] = [0, 0.5, 0];
    let rotation: [number, number, number] = [0, 0, 0];
    let scaling: [number, number, number] = [5, 5, 5];
    let color: [number, number, number] = [255, 0, 0];
    let toggle = true;

    let core1: Core;
    let core2: Core;
</script>

<div class="views">
    <Canvas
        bind:core={core1}
        {target}
        {intensity}
        {direction}
        {position}
        {rotation}
        {scaling}
        {color}
        {toggle}
    />
    <CanvasView id={'cam-2'} core={core1} alpha={0.1} beta={0.1} />

    <Canvas
        bind:core={core2}
        {target}
        {intensity}
        {direction}
        {position}
        {rotation}
        {scaling}
        {color}
        {toggle}
    />
    <CanvasView id={'cam2-2'} core={core2} alpha={0.3} beta={0.3} />
</div>

<Control
    bind:target
    bind:intensity
    bind:direction
    bind:position
    bind:rotation
    bind:scaling
    bind:color
    bind:toggle
/>

<style>
    .views {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr 1fr;
        outline: 1px black;
    }
</style>
