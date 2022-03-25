<script lang="ts">
    import ArcRotateCamera from '$lib/components/ArcRotateCamera.svelte';

    import Box from '$lib/components/Box.svelte';
    import Canvas from '$lib/components/Canvas.svelte';
    import HemisphericLight from '$lib/components/HemisphericLight.svelte';

    let intensity = 0.7;
    let direction: [number, number, number] = [0, 0, 0];
    let position: [number, number, number] = [0, 0, 0];
    let rotation: [number, number, number] = [0, 0, 0];
</script>

<Canvas>
    <ArcRotateCamera id="camera" target={'box1'} />
    <Box id="box" {position} {rotation} />
    <HemisphericLight id="light" {intensity} {direction} />
</Canvas>

<div>
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
