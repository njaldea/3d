<script lang="ts">
    import { getContext } from '$lib/context';
    import { MeshBuilder, StandardMaterial } from 'babylonjs';
    import { onDestroy } from 'svelte';

    const context = getContext();

    export let id: string;
    export let size: [number, number, number] = [1, 1, 1];
    export let position: [number, number, number] = [0, 0, 0];
    export let rotation: [number, number, number] = [0, 0, 0];

    const box = MeshBuilder.CreateBox(
        id,
        {
            depth: size[0],
            width: size[1],
            height: size[2]
        },
        context.scene
    );

    $: box.position.x = position[0];
    $: box.position.y = position[2];
    $: box.position.z = position[1];

    $: box.rotation.x = rotation[0];
    $: box.rotation.y = rotation[2];
    $: box.rotation.z = rotation[1];

    const material = new StandardMaterial('material', context.scene);
    material.emissiveColor = new BABYLON.Color3(0.3, 0.3, 0.3);
    material.alpha = 0.4;

    box.material = material;

    onDestroy(() => box.dispose());
</script>
