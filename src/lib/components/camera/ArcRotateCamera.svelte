<script lang="ts">
    import { getContext } from '$lib/context';
    import { ArcRotateCamera, Vector3 } from 'babylonjs';
    import { onDestroy } from 'svelte';

    const context = getContext();

    export let id: string;

    const camera = new ArcRotateCamera(
        id,
        Math.PI / 2,
        Math.PI / 2,
        10,
        new Vector3(10, 10, -30),
        context.scene
    );
    camera.setTarget(Vector3.Zero());
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
        camera.setTarget(Vector3.Zero());
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
                camera.setTarget(Vector3.Zero());
            }
        });
    });
    context.camera = camera;

    onDestroy(() => {
        context.camera.dispose();
        context.camera = null;
    });
</script>
