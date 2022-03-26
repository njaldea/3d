<script lang="ts">
    import ArcRotateCamera from '$lib/components/ArcRotateCamera.svelte';

    import Canvas from '$lib/components/Canvas.svelte';
    import HemisphericLight from '$lib/components/HemisphericLight.svelte';

    import { Box, Ground } from '$lib/components/mesh';
    import { Standard as StandardMaterial, Ref as RefMaterial } from '$lib/components/material';

    let intensity = 0.3;
    let direction: [number, number, number] = [0, 1, 0];
    let position: [number, number, number] = [0, 0.5, 0];
    let rotation: [number, number, number] = [0, 0, 0];

    $: inversepos = [-position[0], -position[1], -position[2]] as [number, number, number];
    $: inverserot = [-rotation[0], -rotation[1], -rotation[2]] as [number, number, number];
</script>

<Canvas>
    <StandardMaterial id="material" useLogarithmicDepth alpha={0.7} color={[255, 0, 0]} />

    <ArcRotateCamera id="camera" target={'box1'} />
    <HemisphericLight id="light" {intensity} {direction} />

    <Ground id="ground">
        <StandardMaterial id="ground" alpha={1} color={[0, 0, 128]} />
    </Ground>

    <Box id="box1" {position} {rotation}>
        <RefMaterial id="material" />
    </Box>
    <Box id="box2" position={inversepos} rotation={inverserot}>
        <RefMaterial id="material" />
    </Box>
    <Box id="box3" position={[5, 2.5, 5]} {rotation} scaling={[5, 5, 5]}>
        <RefMaterial id="material" />
    </Box>
</Canvas>

<div>
    <button on:click={() => (position = position)}>click</button>
    <input type="range" min="0" max="1" step="0.01" bind:value={intensity} />
    <br />
    <input type="range" min="-10" max="10" step="0.01" bind:value={direction[0]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={direction[1]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={direction[2]} />
    <br />
    <input type="range" min="-10" max="10" step="0.01" bind:value={position[0]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={position[1]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={position[2]} />
    <br />
    <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[0]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[1]} />
    <input type="range" min="-10" max="10" step="0.01" bind:value={rotation[2]} />
</div>

<style>
    div {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 0;
        left: 0;
        padding-top: 10px;
        padding-left: 10px;
    }
</style>
