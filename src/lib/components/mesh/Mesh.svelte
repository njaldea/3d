<script lang="ts">
    import { setCurrentMesh } from '$lib/context';

    import Node from '$lib/components/node/Node.svelte';

    import type { Mesh } from '@babylonjs/core/Meshes/mesh.js';

    export let mesh: Mesh;

    export let position: [number, number, number] = undefined;
    export let rotation: [number, number, number] = undefined;
    export let scaling: [number, number, number] = undefined;
    export let disabled: boolean = undefined;

    export let apply: (m: Mesh) => void = null;
    if (apply) {
        apply(mesh);
    }
    setCurrentMesh(mesh);
</script>

<Node node={mesh} {position} {rotation} {scaling} {disabled}>
    <slot />
</Node>
