<script lang="ts">
    import Control from '../components/control.svelte';
    import Canvas from '../components/canvas.svelte';

    import { createData } from '../components/control';

    const control = createData();
</script>

<div class="views">
    <Canvas
        id="canvas-1"
        target={control.target}
        intensity={control.intensity}
        direction={control.direction}
        position={control.position}
        rotation={control.rotation}
        scaling={control.scaling}
        color={control.color}
        toggle={control.toggle}
        materialID={control.materialID}
    />

    <Canvas
        id="canvas-2"
        target={control.target}
        intensity={control.intensity}
        direction={control.direction}
        position={control.position}
        rotation={control.rotation}
        scaling={control.scaling}
        color={control.color}
        toggle={control.toggle}
        materialID={control.materialID}
    />
</div>

<Control
    bind:target={control.target}
    bind:intensity={control.intensity}
    bind:direction={control.direction}
    bind:position={control.rotation}
    bind:rotation={control.rotation}
    bind:scaling={control.scaling}
    bind:color={control.color}
    bind:toggle={control.toggle}
    bind:materialID={control.materialID}
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
