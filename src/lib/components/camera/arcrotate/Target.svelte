<script lang="ts">
    import { getContext, getCurrentCamera } from '$lib/context';
    import { onDestroy } from 'svelte';

    import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
    import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh.js';

    const context = getContext();
    const camera = getCurrentCamera() as ArcRotateCamera;

    export let target = '';

    // Once camera targets a mesh, 3~4 frames are rendered to achieve final result.
    // I think this is due to update in target position does not necessarily update the camera.

    function render() {
        camera.update();
        context.render();
    }

    let currentMesh: AbstractMesh = null;

    function setTarget(mesh: AbstractMesh) {
        if (mesh != currentMesh) {
            if (currentMesh) {
                currentMesh.onAfterWorldMatrixUpdateObservable.removeCallback(render);
            }
            if (mesh) {
                mesh.onAfterWorldMatrixUpdateObservable.add(render);
                camera.setTarget(mesh);
                render();
            } else if (currentMesh) {
                camera.setTarget(currentMesh.position.clone());
            }
            currentMesh = mesh;
        }
    }

    function unsetTarget() {
        if (currentMesh) {
            currentMesh.onAfterWorldMatrixUpdateObservable.removeCallback(render);
            camera.setTarget(currentMesh.position.clone());
            currentMesh = null;
        }
    }

    $: setTarget(context.scene.getMeshByID(target));

    function onMeshAdded(mesh: AbstractMesh) {
        if (mesh.id === target) {
            setTarget(mesh);
        }
    }

    function onMeshRemoved(mesh: AbstractMesh) {
        if (mesh.id === target && currentMesh == mesh) {
            unsetTarget();
        }
    }

    context.scene.onNewMeshAddedObservable.add(onMeshAdded);
    context.scene.onMeshRemovedObservable.add(onMeshRemoved);

    onDestroy(() => {
        context.scene.onMeshRemovedObservable.removeCallback(onMeshRemoved);
        context.scene.onNewMeshAddedObservable.removeCallback(onMeshAdded);
        unsetTarget();
    });
</script>
