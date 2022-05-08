<script lang="ts">
    import { getCore, setCurrentCamera, destructor } from '$lib/core';

    import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
    import {} from '@babylonjs/core/Culling/ray.js';
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

    // add keyboard via child component
    camera.inputs.remove(camera.inputs.attached.keyboard);

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

    function updateCamera() {
        // this is to force update the matrix
        // by importing only the camera js file,
        // there is some issue with firing viewMatrixChanged
        camera.getViewMatrix();
        camera.update();
    }

    scene.onPointerObservable.add(updateCamera);
    scene.onAfterRenderObservable.add(updateCamera);
    camera.onViewMatrixChangedObservable.add(render);
    camera.onDisposeObservable.add(render);

    camera.attachControl(canvas, true, false);

    destructor(() => {
        camera.dispose();
        scene.onPointerObservable.removeCallback(updateCamera);
        scene.onAfterRenderObservable.removeCallback(updateCamera);
        camera.onViewMatrixChangedObservable.removeCallback(render);
        camera.onDisposeObservable.removeCallback(render);
    });

    setCurrentCamera(camera);
    render();
</script>

<slot />
