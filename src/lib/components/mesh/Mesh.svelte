<script lang="ts">
    import { setCurrentMesh } from '$lib/core';

    import Node from '$lib/components/node/Node.svelte';

    import type { Mesh } from '@babylonjs/core/Meshes/mesh.js';

    export let mesh: Mesh;

    export let position: [number, number, number] = undefined;
    export let rotation: [number, number, number] = undefined;
    export let scaling: [number, number, number] = undefined;
    export let disabled: boolean = undefined;

    setCurrentMesh(mesh);
</script>

<Node node={mesh} {position} {rotation} {scaling} {disabled}>
    <slot />
</Node>
