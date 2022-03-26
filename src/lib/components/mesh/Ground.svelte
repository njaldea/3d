<script lang="ts">
    import { getContext, setCurrentMesh } from '$lib/context';
    import { MeshBuilder } from 'babylonjs';
    import { onDestroy } from 'svelte';

    const context = getContext();

    export let id: string;
    const ground = MeshBuilder.CreateGround(
        id,
        {
            width: 10000,
            height: 10000,
            subdivisions: 2,
            subdivisionsX: 10,
            subdivisionsY: 10
        },
        context.scene
    );

    setCurrentMesh(ground);
    onDestroy(() => ground.dispose());
</script>

<slot />
