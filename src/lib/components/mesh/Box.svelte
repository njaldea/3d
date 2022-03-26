<script lang="ts">
    import { getContext, setCurrentMesh } from '$lib/context';
    import { MeshBuilder } from 'babylonjs';
    import { onDestroy } from 'svelte';

    const context = getContext();

    export let id: string;
    export let size: [number, number, number] = [1, 1, 1];
    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];

    const box = MeshBuilder.CreateBox(
        id,
        {
            depth: size[0],
            width: size[1],
            height: size[2]
        },
        context.scene
    );

    $: box.position.x = context.test(box.position.x, position[0]);
    $: box.position.y = context.test(box.position.y, position[1]);
    $: box.position.z = context.test(box.position.z, position[2]);
    $: box.rotation.x = context.test(box.rotation.x, rotation[0]);
    $: box.rotation.y = context.test(box.rotation.y, rotation[1]);
    $: box.rotation.z = context.test(box.rotation.z, rotation[2]);
    $: box.scaling.x = context.test(box.scaling.x, scaling[0]);
    $: box.scaling.y = context.test(box.scaling.y, scaling[1]);
    $: box.scaling.z = context.test(box.scaling.z, scaling[2]);

    setCurrentMesh(box);

    onDestroy(() => box.dispose());
</script>

<slot />
