<script lang="ts">
    import Control from './_Control.svelte';
    import Canvas from './_Canvas.svelte';
    import Camera from './_ArcRotateCamera.svelte';
    import CanvasRef from '@nil-/3d/components/CanvasRef.svelte';

    let target = '';
    let intensity = 0.3;
    let direction: [number, number, number] = [0, 1, 0];
    let position: [number, number, number] = [0, 0.5, 0];
    let rotation: [number, number, number] = [0, 0, 0];
    let scaling: [number, number, number] = [5, 5, 5];
    let color: [number, number, number] = [255, 0, 0];
    let toggle = true;

    let canvas: HTMLCanvasElement;
</script>

<div class="views">
    <Canvas {target} {intensity} {direction} {position} {rotation} {scaling} {color} {toggle}>
        <svelte:fragment slot="cameras">
            <CanvasRef {canvas}>
                <Camera id="camera2" {toggle} {target} />
            </CanvasRef>
        </svelte:fragment>
    </Canvas>
    <canvas bind:this={canvas} />
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
        outline: 1px black;
    }
</style>
