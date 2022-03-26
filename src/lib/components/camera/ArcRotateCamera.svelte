<script lang="ts">
    import { getContext } from '$lib/context';
    import { onDestroy } from 'svelte';
    import * as BABYLON from 'babylonjs';

    const context = getContext();

    export let id: string;

    const camera = new BABYLON.ArcRotateCamera(
        id,
        Math.PI / 2,
        Math.PI / 2,
        10,
        new BABYLON.Vector3(10, 10, -30),
        context.scene
    );
    camera.setTarget(BABYLON.Vector3.Zero());
    camera.attachControl(context.canvas, true, false);
    camera.onViewMatrixChangedObservable.add(() => {
        context.render();
        context.camera.update();
    });

    export let target = '';

    function retarget(t: string) {
        if (t) {
            const mesh = context.scene.getMeshByID(t);
            if (mesh) {
                camera.setTarget(mesh);
                return;
            }
        }
        camera.setTarget(BABYLON.Vector3.Zero());
    }

    $: retarget(target);

    context.scene.onPointerObservable.add(() => context.camera.update());
    context.scene.onReadyObservable.addOnce(() => {
        context.scene.onNewMeshAddedObservable.add((mesh) => {
            if (target && mesh.id === target) {
                camera.setTarget(mesh);
            }
        });

        context.scene.onMeshRemovedObservable.add((mesh) => {
            if (target && mesh.id === target) {
                camera.setTarget(BABYLON.Vector3.Zero());
            }
        });
    });
    context.camera = camera;

    onDestroy(() => {
        context.camera.dispose();
        context.camera = null;
    });
</script>
