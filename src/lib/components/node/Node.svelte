<script lang="ts">
    import { destructor } from '$lib/core/lifecycle/destructor';
    import { getNode, setNode } from '$lib/core/context/node';
    import { getCore } from '$lib/core/context/core';

    import type { TransformNode } from '@babylonjs/core/Meshes/transformNode.js';

    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];
    export let disabled = false;

    const { render } = getCore();
    export let node: TransformNode;
    node.onDisposeObservable.add(render);

    $: node.position.x = position[0];
    $: node.position.y = position[1];
    $: node.position.z = position[2];

    $: node.rotation.x = rotation[0];
    $: node.rotation.y = rotation[1];
    $: node.rotation.z = rotation[2];

    $: node.scaling.x = scaling[0];
    $: node.scaling.y = scaling[1];
    $: node.scaling.z = scaling[2];

    $: node.setEnabled(!disabled);

    node.parent = getNode();
    setNode(node);
    destructor(() => {
        node.dispose();
        node.onDisposeObservable.removeCallback(render);
    });
</script>

<slot />
