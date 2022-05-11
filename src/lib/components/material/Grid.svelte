<script lang="ts">
    import Material from '$lib/components/material/Material.svelte';

    import { getCurrentMesh } from '$lib/core/context/mesh';
    import { getCore } from '$lib/core/context/core';

    import { GridMaterial } from '@babylonjs/materials/grid/gridMaterial.js';

    const { scene, test } = getCore();
    const mesh = getCurrentMesh();

    export let id: string;
    export let mainColor: [number, number, number] = [1, 1, 1];
    export let lineColor: [number, number, number] = [1, 1, 1];
    export let gridRatio = 2;
    export let opacity = 0.2;

    var material = new GridMaterial(id, scene);
    material.majorUnitFrequency = 1;
    material.minorUnitVisibility = 0.1;
    material.backFaceCulling = false;

    $: material.opacity = test(material.opacity, opacity);
    $: material.gridRatio = test(material.gridRatio, gridRatio);
    $: material.mainColor.r = test(material.mainColor.r, mainColor[0]);
    $: material.mainColor.g = test(material.mainColor.g, mainColor[1]);
    $: material.mainColor.b = test(material.mainColor.b, mainColor[2]);
    $: material.lineColor.r = test(material.lineColor.r, lineColor[0]);
    $: material.lineColor.g = test(material.lineColor.g, lineColor[1]);
    $: material.lineColor.b = test(material.lineColor.b, lineColor[2]);
</script>

{#if mesh != null}
    <Material {mesh} {material} />
{/if}
