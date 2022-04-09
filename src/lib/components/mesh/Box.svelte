<script lang="ts">
    import MeshComponent from './Mesh.svelte';
    import { getContext } from '$lib/context';

    import type { Mesh } from '@babylonjs/core/Meshes/mesh.js';
    import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder.js';

    const context = getContext();

    export let id: string;
    export let size: [number, number, number] = [1, 1, 1];
    export let position: [number, number, number] = undefined;
    export let rotation: [number, number, number] = undefined;
    export let scaling: [number, number, number] = undefined;
    export let disabled: boolean = undefined;

    export let apply: (m: Mesh) => void = null;

    const box = MeshBuilder.CreateBox(
        id,
        {
            depth: size[0],
            width: size[1],
            height: size[2]
        },
        context.scene
    );
</script>

<MeshComponent mesh={box} {position} {rotation} {scaling} {apply} {disabled}>
    <slot />
</MeshComponent>
