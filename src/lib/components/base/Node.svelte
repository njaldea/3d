<script lang="ts">
    import { getContext, getParent, setParent } from '$lib/context';
    import type { TransformNode } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];
    export let disabled = false;

    const context = getContext();
    export let node: TransformNode;

    $: node.position.x = context.test(node.position.x, position[0]);
    $: node.position.y = context.test(node.position.y, position[1]);
    $: node.position.z = context.test(node.position.z, position[2]);

    $: node.rotation.x = context.test(node.rotation.x, rotation[0]);
    $: node.rotation.y = context.test(node.rotation.y, rotation[1]);
    $: node.rotation.z = context.test(node.rotation.z, rotation[2]);

    $: node.scaling.x = context.test(node.scaling.x, scaling[0]);
    $: node.scaling.y = context.test(node.scaling.y, scaling[1]);
    $: node.scaling.z = context.test(node.scaling.z, scaling[2]);

    $: node.setEnabled(!disabled);

    node.parent = getParent();
    setParent(node);
    onDestroy(() => node.dispose());
</script>

<slot />
