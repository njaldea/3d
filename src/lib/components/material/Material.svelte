<script lang="ts">
    import { destructor } from '$lib/core/lifecycle/destructor';
    import { getCurrentMesh } from '$lib/core/context/mesh';

    import type { Material } from '@babylonjs/core/Materials/material';

    const mesh = getCurrentMesh();

    export let material: Material;
    export let backFaceCulling = true;
    export let frozen = false;

    $: material.backFaceCulling = backFaceCulling;
    $: frozen ? material.freeze() : material.unfreeze();

    if (mesh) {
        mesh.material = material;
    }
    destructor(() => {
        if (mesh) {
            mesh.material = null;
        }
        material.dispose();
    });
</script>
