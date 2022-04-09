<script lang="ts">
    import { getContext } from '$lib/context';
    import Node from '$lib/components/node/Node.svelte';

    import { TransformNode } from '@babylonjs/core/Meshes/transformNode.js';

    export let id: string;
    export let position: [number, number, number] = undefined;
    export let rotation: [number, number, number] = undefined;
    export let scaling: [number, number, number] = undefined;
    export let disabled: boolean = undefined;

    const context = getContext();
    const node = new TransformNode(id, context.scene);
</script>

<Node {node} {position} {rotation} {scaling} {disabled}>
    <slot />
</Node>
