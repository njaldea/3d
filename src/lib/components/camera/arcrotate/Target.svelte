<script lang="ts">
    import { getContext, getCurrentCamera } from '$lib/context';
    import { Vector3 } from '@babylonjs/core';
    import type { AbstractMesh, ArcRotateCamera } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

    const context = getContext();
    const camera = getCurrentCamera() as ArcRotateCamera;

    export let target = '';

    function render() {
        context.render();
    }

    camera.onMeshTargetChangedObservable.add(render);

    function retarget(t: string) {
        if (t) {
            const mesh = context.scene.getMeshByID(t);
            if (mesh) {
                camera.setTarget(mesh);
            }
        } else {
            camera.setTarget(Vector3.Zero());
        }
    }

    $: retarget(target);

    function onMeshAdded(mesh: AbstractMesh) {
        if (target && mesh.id === target) {
            camera.setTarget(mesh);
        }
    }

    function onMeshRemoved(mesh: AbstractMesh) {
        if (target && mesh.id === target) {
            camera.setTarget(Vector3.Zero());
        }
    }

    context.scene.onReadyObservable.addOnce(() => {
        context.scene.onNewMeshAddedObservable.add(onMeshAdded);
        context.scene.onMeshRemovedObservable.add(onMeshRemoved);
    });

    onDestroy(() => {
        camera.onMeshTargetChangedObservable.add(render);
        context.scene.onNewMeshAddedObservable.removeCallback(onMeshAdded);
        context.scene.onMeshRemovedObservable.removeCallback(onMeshRemoved);
        camera.setTarget(Vector3.Zero());
    });
</script>
