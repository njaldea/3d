<script lang="ts">
    import { getContext, getParent, setParent } from '$lib/context';
    import { TransformNode } from '@babylonjs/core';

    export let id: string;
    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];

    const context = getContext();
    const node = new TransformNode(id, context.scene);

    $: node.position.x = context.test(node.position.x, position[0]);
    $: node.position.y = context.test(node.position.y, position[1]);
    $: node.position.z = context.test(node.position.z, position[2]);

    $: node.rotation.x = context.test(node.rotation.x, rotation[0]);
    $: node.rotation.y = context.test(node.rotation.y, rotation[1]);
    $: node.rotation.z = context.test(node.rotation.z, rotation[2]);

    node.parent = getParent();
    setParent(node);
</script>

<slot />
