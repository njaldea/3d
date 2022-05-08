<script lang="ts" context="module">
    import { tick } from 'svelte';
    import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';

    export function updateCamera(camera: ArcRotateCamera) {
        return async () => {
            // need to defer update in next frame to guarantee retrigger
            // after scene is renderered
            await tick();

            // this is to force update the matrix
            // by importing only the camera js file
            camera.getViewMatrix();
            camera.update();
        };
    }
</script>

<script lang="ts">
    import { getCore, setCurrentCamera, destructor } from '$lib/core';

    import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

    const { canvas, scene, test, render } = getCore();

    export let id: string;
    export let sensibility: [number, number] = [1000, 1000];
    export let alphalimit: [number | null, number | null] = [null, null];
    export let betalimit: [number, number] = [0, 0];
    export let radiuslimit: [number | null, number | null] = [null, null];

    const camera = new ArcRotateCamera(
        id,
        Math.PI / 2,
        Math.PI / 2,
        10,
        new Vector3(10, 10, -30),
        scene
    );
    camera.setTarget(Vector3.Zero());

    // add controls via child component
    camera.inputs.remove(camera.inputs.attached.keyboard);
    camera.inputs.remove(camera.inputs.attached.pointer);

    $: camera.lowerAlphaLimit = test(camera.lowerAlphaLimit, alphalimit[0]);
    $: camera.upperAlphaLimit = test(camera.upperAlphaLimit, alphalimit[1]);
    $: camera.lowerBetaLimit = test(camera.lowerBetaLimit, betalimit[0]);
    $: camera.upperBetaLimit = test(camera.upperBetaLimit, betalimit[1]);
    $: camera.lowerRadiusLimit = test(camera.lowerRadiusLimit, radiuslimit[0]);
    $: camera.upperRadiusLimit = test(camera.upperRadiusLimit, radiuslimit[1]);
    camera.wheelPrecision = 50;

    $: camera.angularSensibilityX = test(camera.angularSensibilityX, sensibility[0]);
    $: camera.angularSensibilityY = test(camera.angularSensibilityY, sensibility[1]);
    camera.mapPanning = true;

    const update = updateCamera(camera);

    scene.onAfterRenderObservable.add(update);
    camera.onViewMatrixChangedObservable.add(render);
    camera.onDisposeObservable.add(render);

    camera.attachControl(canvas, true, false);

    destructor(() => {
        camera.dispose();
        scene.onAfterRenderObservable.removeCallback(update);
        camera.onViewMatrixChangedObservable.removeCallback(render);
        camera.onDisposeObservable.removeCallback(render);
    });

    setCurrentCamera(camera);
    render();
</script>

<slot />
