<script lang="ts">
    import { getContext, getParent, setCurrentMesh } from '$lib/context';
    import { onDestroy } from 'svelte';
    import type { Mesh } from '@babylonjs/core';

    const context = getContext();

    export let mesh: Mesh;

    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];

    export let apply: (m: Mesh) => void = null;

    $: mesh.position.x = context.test(mesh.position.x, position[0]);
    $: mesh.position.y = context.test(mesh.position.y, position[1]);
    $: mesh.position.z = context.test(mesh.position.z, position[2]);

    $: mesh.rotation.x = context.test(mesh.rotation.x, rotation[0]);
    $: mesh.rotation.y = context.test(mesh.rotation.y, rotation[1]);
    $: mesh.rotation.z = context.test(mesh.rotation.z, rotation[2]);

    $: mesh.scaling.x = context.test(mesh.scaling.x, scaling[0]);
    $: mesh.scaling.y = context.test(mesh.scaling.y, scaling[1]);
    $: mesh.scaling.z = context.test(mesh.scaling.z, scaling[2]);

    if (apply) {
        apply(mesh);
    }

    mesh.parent = getParent();
    setCurrentMesh(mesh);
    onDestroy(() => mesh.dispose());
</script>

<slot />
