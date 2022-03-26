<script lang="ts">
    import MeshComponent from './Mesh.svelte';
    import { getContext } from '$lib/context';
    import { MeshBuilder } from '@babylonjs/core';
    import type { Mesh } from '@babylonjs/core';

    const context = getContext();

    export let id: string;
    export let size: [number, number, number] = [1, 1, 1];
    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];
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

<MeshComponent mesh={box} {position} {rotation} {scaling} {apply}>
    <slot />
</MeshComponent>
