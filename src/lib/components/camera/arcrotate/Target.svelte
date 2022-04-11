<script lang="ts">
    import { getCore, getCurrentCamera, destructor } from '$lib/core';

    import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
    import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh.js';

    const { render, scene } = getCore();
    const camera = getCurrentCamera() as ArcRotateCamera;

    export let target = '';

    // Once camera targets a mesh, 3~4 frames are rendered to achieve final result.
    // I think this is due to update in target position does not necessarily update the camera.

    let currentMesh: AbstractMesh = null;

    function setTarget(mesh: AbstractMesh) {
        if (mesh != currentMesh) {
            if (currentMesh) {
                currentMesh.onAfterWorldMatrixUpdateObservable.removeCallback(render);
            }
            if (mesh) {
                mesh.onAfterWorldMatrixUpdateObservable.add(render);
                camera.setTarget(mesh);
                camera.update();
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

    $: setTarget(scene.getMeshByName(target));

    function onMeshAdded(mesh: AbstractMesh) {
        if (mesh.id === target) {
            setTarget(mesh);
        }
    }

    function onMeshRemoved(mesh: AbstractMesh) {
        if (mesh.id === target) {
            unsetTarget();
        }
    }

    scene.onNewMeshAddedObservable.add(onMeshAdded);
    scene.onMeshRemovedObservable.add(onMeshRemoved);

    destructor(() => {
        scene.onMeshRemovedObservable.removeCallback(onMeshRemoved);
        scene.onNewMeshAddedObservable.removeCallback(onMeshAdded);
        unsetTarget();
    });
</script>
