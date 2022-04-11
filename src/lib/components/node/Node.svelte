<script lang="ts">
    import { getCore, getParent, setParent, destructor } from '$lib/core';

    import type { TransformNode } from '@babylonjs/core/Meshes/transformNode.js';

    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];
    export let disabled = false;

    const { render, test } = getCore();
    export let node: TransformNode;

    $: node.position.x = test(node.position.x, position[0]);
    $: node.position.y = test(node.position.y, position[1]);
    $: node.position.z = test(node.position.z, position[2]);

    $: node.rotation.x = test(node.rotation.x, rotation[0]);
    $: node.rotation.y = test(node.rotation.y, rotation[1]);
    $: node.rotation.z = test(node.rotation.z, rotation[2]);

    $: node.scaling.x = test(node.scaling.x, scaling[0]);
    $: node.scaling.y = test(node.scaling.y, scaling[1]);
    $: node.scaling.z = test(node.scaling.z, scaling[2]);

    $: node.setEnabled(!disabled);

    node.parent = getParent();
    setParent(node);
    destructor(() => {
        node.dispose();
        render();
    });
</script>

<slot />
