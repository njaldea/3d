<script lang="ts">
    import { getCore, getCurrentMesh } from '$lib/core';
    import Material from '$lib/components/material/Material.svelte';

    import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial.js';

    const { scene, test } = getCore();
    const mesh = getCurrentMesh();

    export let id: string;
    export let color: [number, number, number] = [0.3, 0.3, 0.3];
    export let alpha = 1.0;
    export let useLogarithmicDepth = false;

    const material = new StandardMaterial(id, scene);
    $: material.emissiveColor.r = test(material.emissiveColor.r, color[0]);
    $: material.emissiveColor.g = test(material.emissiveColor.g, color[1]);
    $: material.emissiveColor.b = test(material.emissiveColor.b, color[2]);
    $: material.alpha = test(material.alpha, alpha);
    $: material.useLogarithmicDepth = test(material.useLogarithmicDepth, useLogarithmicDepth);
</script>

{#if mesh != null}
    <Material {mesh} {material} />
{/if}
