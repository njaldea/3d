<script lang="ts">
    import { destructor } from '$lib/core/lifecycle/destructor';

    import type { Material } from '@babylonjs/core/Materials/material';
    import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

    export let material: Material;
    export let mesh: AbstractMesh;

    mesh.material = material;
    destructor(() => {
        mesh.material = null;
        material.dispose();
    });
</script>
