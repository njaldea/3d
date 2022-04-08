<script lang="ts">
    import { getContext, getCurrentMesh } from '$lib/context';
    import { StandardMaterial } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

    const context = getContext();
    const mesh = getCurrentMesh();

    export let id: string;
    export let color: [number, number, number] = [0.3, 0.3, 0.3];
    export let alpha = 1.0;
    export let useLogarithmicDepth = false;

    export let apply: (m: StandardMaterial) => void = null;

    const material = new StandardMaterial(id, context.scene);
    $: material.emissiveColor.r = context.test(material.emissiveColor.r, color[0]);
    $: material.emissiveColor.g = context.test(material.emissiveColor.g, color[1]);
    $: material.emissiveColor.b = context.test(material.emissiveColor.b, color[2]);
    $: material.alpha = context.test(material.alpha, alpha);
    $: material.useLogarithmicDepth = context.test(
        material.useLogarithmicDepth,
        useLogarithmicDepth
    );

    if (apply) {
        apply(material);
    }

    mesh && (mesh.material = material);
    onDestroy(() => {
        mesh && (mesh.material = null);
        material.dispose();
    });
</script>
