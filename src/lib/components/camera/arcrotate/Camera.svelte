<script lang="ts">
    import { getContext, setCurrentCamera } from '$lib/context';
    import { onDestroy } from 'svelte';

    import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
    // import necessary for arcrotate to fire onViewMatrixChangedObservable
    import {} from '@babylonjs/core/Gamepads/Controllers/poseEnabledController.js';
    import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

    const context = getContext();

    export let id: string;
    export let sensibility: [number, number] = [1000, 1000];
    export let alphalimit: [number | null, number | null] = [null, null];
    export let betalimit: [number | null, number | null] = [null, null];
    export let radiuslimit: [number | null, number | null] = [null, null];

    const camera = new ArcRotateCamera(
        id,
        Math.PI / 2,
        Math.PI / 2,
        10,
        new Vector3(10, 10, -30),
        context.scene
    );
    camera.setTarget(Vector3.Zero());

    // add keyboard via child component
    camera.inputs.remove(camera.inputs.attached.keyboard);

    $: camera.lowerAlphaLimit = context.test(camera.lowerAlphaLimit, alphalimit[0]);
    $: camera.upperAlphaLimit = context.test(camera.upperAlphaLimit, alphalimit[1]);
    $: camera.lowerBetaLimit = context.test(camera.lowerBetaLimit, betalimit[0]);
    $: camera.upperBetaLimit = context.test(camera.upperBetaLimit, betalimit[1]);
    $: camera.lowerRadiusLimit = context.test(camera.lowerRadiusLimit, radiuslimit[0]);
    $: camera.upperRadiusLimit = context.test(camera.upperRadiusLimit, radiuslimit[1]);
    camera.wheelPrecision = 50;

    $: camera.angularSensibilityX = context.test(camera.angularSensibilityX, sensibility[0]);
    $: camera.angularSensibilityY = context.test(camera.angularSensibilityY, sensibility[1]);

    function onViewUpdate() {
        context.render();
    }

    function updateCamera() {
        camera.update();
    }

    camera.onViewMatrixChangedObservable.add(onViewUpdate);
    context.scene.onAfterRenderObservable.add(updateCamera);
    context.scene.onPointerObservable.add(updateCamera);

    camera.attachControl(context.canvas, true, false);
    context.render();

    onDestroy(() => {
        context.scene.onPointerObservable.removeCallback(updateCamera);
        context.scene.onAfterRenderObservable.removeCallback(updateCamera);
        camera.onViewMatrixChangedObservable.removeCallback(onViewUpdate);
        camera.dispose();
    });

    setCurrentCamera(camera);
</script>

<slot />
