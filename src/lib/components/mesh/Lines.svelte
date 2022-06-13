<script lang="ts">
    import MeshComponent from '$lib/components/mesh/Mesh.svelte';
    import { CreateLineSystem } from '@babylonjs/core/Meshes/Builders/linesBuilder.js';
    import { getCore } from '$lib/core/context/core';

    import type { Vector3 } from '@babylonjs/core';

    const { scene } = getCore();

    export let id: string;
    export let vertices: Vector3[][];
    export let frozen: undefined | boolean = undefined;

    const lines = CreateLineSystem(
        `lines_${id}`,
        {
            lines: vertices,
            updatable: false
        },
        scene
    );
</script>

<MeshComponent mesh={lines} {frozen}>
    <slot />
</MeshComponent>
