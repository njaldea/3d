<script lang="ts">
    import { getContext } from '$lib/context';
    import { Vector3, ArcRotateCamera, KeyboardEventTypes, KeyboardInfo } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

    const context = getContext();

    export let id: string;
    export let sensibility: [number, number] = [1000, 1000];

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
    camera.inputs.addKeyboard();
    camera.keysUp = [87];
    camera.keysDown = [83];
    camera.keysLeft = [65];
    camera.keysRight = [68];
    camera.lowerRadiusLimit = 0.1;
    camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = Math.PI / 2 - 0.1;
    camera.wheelPrecision = 50;
    // camera.lowerAlphaLimit = Math.PI;
    // camera.upperAlphaLimit = Math.PI * 2;

    $: camera.angularSensibilityX = context.test(camera.angularSensibilityX, sensibility[0]);
    $: camera.angularSensibilityY = context.test(camera.angularSensibilityY, sensibility[1]);

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

    function onPointerUpdate() {
        context.camera.update();
    }

    function onKeyboardUpdate(info: KeyboardInfo) {
        if ('wasdWASD'.includes(info.event.key)) {
            switch (info.type) {
                case KeyboardEventTypes.KEYDOWN:
                    context.renderLoopStart();
                    break;
                case KeyboardEventTypes.KEYUP:
                    context.renderLoopStop();
                    break;
            }
        }
    }

    function onViewUpdate() {
        context.render();
        context.camera.update();
    }

    camera.onViewMatrixChangedObservable.add(onViewUpdate);
    context.scene.onPointerObservable.add(onPointerUpdate);
    context.scene.onKeyboardObservable.add(onKeyboardUpdate);

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
    context.render();

    onDestroy(() => {
        context.scene.onKeyboardObservable.removeCallback(onKeyboardUpdate);
        context.scene.onPointerObservable.removeCallback(onPointerUpdate);
        camera.onViewMatrixChangedObservable.removeCallback(onViewUpdate);
        context.camera.dispose();
        context.camera = null;
    });
</script>
