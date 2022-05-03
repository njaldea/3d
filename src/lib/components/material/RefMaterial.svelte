<script lang="ts">
    import { getCore, getCurrentMesh, destructor } from '$lib/core';

    import type { Material } from '@babylonjs/core/Materials/material.js';

    export let id: string;

    const { render, scene } = getCore();
    const mesh = getCurrentMesh();

    scene.onNewMaterialAddedObservable.add(materialAdded);
    scene.onMaterialRemovedObservable.add(materialRemoved);
    mesh.onMaterialChangedObservable.add(render);

    $: mesh.material = scene.getMaterialByName(id);

    function materialAdded(m: Material) {
        if (m.id === id) {
            mesh.material = m;
        }
    }

    function materialRemoved(m: Material) {
        if (m.id === id) {
            mesh.material = null;
        }
    }

    destructor(() => {
        mesh.material = null;
        scene.onNewMaterialAddedObservable.removeCallback(materialAdded);
        scene.onMaterialRemovedObservable.removeCallback(materialRemoved);
        mesh.onMaterialChangedObservable.removeCallback(render);
    });
</script>
