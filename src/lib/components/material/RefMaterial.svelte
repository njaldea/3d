<script lang="ts">
    import { getContext, getCurrentMesh } from '$lib/context';
    import { onDestroy } from 'svelte';

    import type { Material } from '@babylonjs/core/Materials/material.js';

    const context = getContext();
    const mesh = getCurrentMesh();

    export let id: string;

    function updateMaterial(m: Material) {
        const currentMaterial = mesh.material;
        mesh.material = m;
        if (currentMaterial !== m) {
            context.render();
        }
    }

    $: updateMaterial(context.scene.getMaterialByName(id));

    function materialAdded(m: Material) {
        if (m.id === id) {
            updateMaterial(mesh.material);
        }
    }

    function materialRemoved(m: Material) {
        if (m.id === id) {
            updateMaterial(null);
        }
    }

    context.scene.onNewMaterialAddedObservable.add(materialAdded);
    context.scene.onMaterialRemovedObservable.add(materialRemoved);

    onDestroy(() => {
        context.scene.onNewMaterialAddedObservable.removeCallback(materialAdded);
        context.scene.onMaterialRemovedObservable.removeCallback(materialRemoved);
        if (mesh) {
            mesh.material = null;
        }
    });
</script>
