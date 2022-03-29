<script lang="ts">
    import { getContext, setCurrentCamera } from '$lib/context';
    import { Vector3, ArcRotateCamera } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

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
    camera.attachControl(context.canvas, true, false);

    $: camera.lowerAlphaLimit = context.test(camera.lowerAlphaLimit, alphalimit[0]);
    $: camera.upperAlphaLimit = context.test(camera.upperAlphaLimit, alphalimit[1]);
    $: camera.lowerBetaLimit = context.test(camera.lowerBetaLimit, betalimit[0]);
    $: camera.upperBetaLimit = context.test(camera.upperBetaLimit, betalimit[1]);
    $: camera.lowerRadiusLimit = context.test(camera.lowerRadiusLimit, radiuslimit[0]);
    $: camera.upperRadiusLimit = context.test(camera.upperRadiusLimit, radiuslimit[1]);
    camera.wheelPrecision = 50;

    $: camera.angularSensibilityX = context.test(camera.angularSensibilityX, sensibility[0]);
    $: camera.angularSensibilityY = context.test(camera.angularSensibilityY, sensibility[1]);

    function onPointerUpdate() {
        camera.update();
    }

    function onViewUpdate() {
        context.render();
        camera.update();
    }

    camera.onViewMatrixChangedObservable.add(onViewUpdate);
    context.scene.onPointerObservable.add(onPointerUpdate);

    context.render();

    onDestroy(() => {
        context.scene.onPointerObservable.removeCallback(onPointerUpdate);
        camera.onViewMatrixChangedObservable.removeCallback(onViewUpdate);
        camera.dispose();
    });

    setCurrentCamera(camera);
</script>

<slot />
