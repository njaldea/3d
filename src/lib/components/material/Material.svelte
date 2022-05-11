<script lang="ts">
    import { destructor } from '$lib/core/lifecycle/destructor';
    import { getCore } from '$lib/core/context/core';

    import type { Material } from '@babylonjs/core/Materials/material';
    import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';

    export let material: Material;
    export let mesh: AbstractMesh;

    const { render } = getCore();

    mesh.onMaterialChangedObservable.add(render);
    mesh.material = material;
    destructor(() => {
        mesh.material = null;
        mesh.onMaterialChangedObservable.removeCallback(render);
        material.dispose();
    });
</script>
