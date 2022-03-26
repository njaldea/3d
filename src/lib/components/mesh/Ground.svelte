<script lang="ts">
    import MeshComponent from './Mesh.svelte';
    import { getContext } from '$lib/context';
    import { MeshBuilder } from '@babylonjs/core';
    import type { Mesh } from '@babylonjs/core';

    const context = getContext();

    export let position: [number, number, number] = undefined;
    export let rotation: [number, number, number] = undefined;
    export let scaling: [number, number, number] = undefined;
    export let disabled: boolean = undefined;

    export let id: string;
    export let apply: (m: Mesh) => void = null;

    const ground = MeshBuilder.CreateGround(
        id,
        {
            width: 10000,
            height: 10000,
            subdivisions: 2,
            subdivisionsX: 10,
            subdivisionsY: 10
        },
        context.scene
    );
</script>

<MeshComponent mesh={ground} {apply} {position} {rotation} {scaling} {disabled}>
    <slot />
</MeshComponent>
