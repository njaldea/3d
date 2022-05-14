<script lang="ts">
    import Material from '$lib/components/material/Material.svelte';

    import { getCurrentMesh } from '$lib/core/context/mesh';
    import { getCore } from '$lib/core/context/core';

    import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';

    const { scene } = getCore();
    const mesh = getCurrentMesh();

    export let id: string;
    export let color: [number, number, number] = [0.3, 0.3, 0.3];
    export let alpha = 1.0;
    export let useLogarithmicDepth = false;

    const material = new StandardMaterial(id, scene);
    $: material.emissiveColor.r = color[0];
    $: material.emissiveColor.g = color[1];
    $: material.emissiveColor.b = color[2];
    $: material.alpha = alpha;
    $: material.useLogarithmicDepth = useLogarithmicDepth;
</script>

{#if mesh != null}
    <Material {mesh} {material} />
{/if}
