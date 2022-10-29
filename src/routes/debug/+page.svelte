<script lang="ts">
    import Control from '../components/control.svelte';
    import Canvas from '../components/canvas.svelte';
    import Inspector from '$lib/components/Inspector.svelte';

    import { createData } from '../components/control';

    const control = createData();

    function keydown(e: KeyboardEvent) {
        if (e.key === '\\') {
            control.show = !control.show;
        }
    }
</script>

<svelte:window on:keydown={keydown} />

{#if control.show}
    <Canvas
        id="main"
        target={control.target}
        intensity={control.intensity}
        direction={control.direction}
        position={control.position}
        rotation={control.rotation}
        scaling={control.scaling}
        color={control.color}
        toggle={control.toggle}
        materialID={control.materialID}
    >
        <Inspector />
    </Canvas>
{/if}

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
