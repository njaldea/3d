<script lang="ts">
    import Control from './_Control.svelte';
    import Canvas from './_Canvas.svelte';

    let target = '';
    let intensity = 0.3;
    let direction: [number, number, number] = [0, 1, 0];
    let position: [number, number, number] = [0, 0.5, 0];
    let rotation: [number, number, number] = [0, 0, 0];
    let scaling: [number, number, number] = [5, 5, 5];
    let color: [number, number, number] = [255, 0, 0];
    let toggle = true;
</script>

<div class="views">
    <Canvas
        id="canvas-1"
        {target}
        {intensity}
        {direction}
        {position}
        {rotation}
        {scaling}
        {color}
        {toggle}
    />

    <Canvas
        id="canvas-2"
        {target}
        {intensity}
        {direction}
        {position}
        {rotation}
        {scaling}
        {color}
        {toggle}
    />
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
        /* grid-template-rows: 1fr 1fr; */
        outline: 1px black;
    }
</style>
