<script lang="ts">
    import MeshComponent from './Mesh.svelte';
    import { getCore } from '$lib/core';

    import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js';

    const { scene } = getCore();

    export let position: undefined | [number, number, number] = undefined;
    export let rotation: undefined | [number, number, number] = undefined;
    export let scaling: undefined | [number, number, number] = undefined;
    export let disabled: undefined | boolean = undefined;

    export let id: string;

    const ground = MeshBuilder.CreateGround(
        id,
        {
            width: 10000,
            height: 10000,
            subdivisions: 2,
            subdivisionsX: 10,
            subdivisionsY: 10
        },
        scene
    );
</script>

<MeshComponent mesh={ground} {position} {rotation} {scaling} {disabled}>
    <slot />
</MeshComponent>
