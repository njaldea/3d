<script lang="ts">
    import Control from './_Control.svelte';
    import Canvas from './_Canvas.svelte';

    let show = true;
    let target = '';
    let intensity = 0.3;
    let direction: [number, number, number] = [0, 1, 0];
    let position: [number, number, number] = [0, 0.5, 0];
    let rotation: [number, number, number] = [0, 0, 0];
    let scaling: [number, number, number] = [5, 5, 5];
    let color: [number, number, number] = [1, 0, 0];
    let toggle = false;
    let materialID = 'standard';

    function keydown(e: KeyboardEvent) {
        if (e.key === '\\') {
            show = !show;
        }
    }
</script>

<svelte:window on:keydown={keydown} />

{#if show}
    <Canvas
        id="main"
        {target}
        {intensity}
        {direction}
        {position}
        {rotation}
        {scaling}
        {color}
        {toggle}
        {materialID}
    >
        <slot />
    </Canvas>
{/if}

<Control
    bind:target
    bind:intensity
    bind:direction
    bind:position
    bind:rotation
    bind:scaling
    bind:color
    bind:toggle
    bind:materialID
/>
