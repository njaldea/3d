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

<Canvas {target} {intensity} {direction} {position} {rotation} {scaling} {color} {toggle}>
    <slot />
</Canvas>

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
