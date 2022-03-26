<script lang="ts">
    import { getContext, meshSetup } from '$lib/context';
    import * as BABYLON from 'babylonjs';

    const context = getContext();

    export let id: string;
    const ground = BABYLON.MeshBuilder.CreateGround(
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

    meshSetup(ground);
</script>

<slot />
