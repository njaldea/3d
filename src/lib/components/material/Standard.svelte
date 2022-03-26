<script lang="ts">
    import { getContext, setMaterial } from '$lib/context';
    import { onDestroy } from 'svelte';
    import * as BABYLON from 'babylonjs';

    const context = getContext();

    export let id: string;
    export let color: [number, number, number] = [0.3, 0.3, 0.3];
    export let alpha = 1.0;
    export let useLogarithmicDepth = false;

    const material = new BABYLON.StandardMaterial(id, context.scene);
    $: material.emissiveColor.r = context.test(material.emissiveColor.r, color[0]);
    $: material.emissiveColor.g = context.test(material.emissiveColor.g, color[1]);
    $: material.emissiveColor.b = context.test(material.emissiveColor.b, color[2]);
    $: material.alpha = context.test(material.alpha, alpha);
    $: material.useLogarithmicDepth = context.test(
        material.useLogarithmicDepth,
        useLogarithmicDepth
    );

    setMaterial(material);
    onDestroy(() => material.dispose());
</script>
