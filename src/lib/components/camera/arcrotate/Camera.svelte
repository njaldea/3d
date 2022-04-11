<script lang="ts">
    import { getCore, setCurrentCamera, destructor } from '$lib/core';

    import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
    // import necessary for arcrotate to fire onViewMatrixChangedObservable
    import {} from '@babylonjs/core/Gamepads/Controllers/poseEnabledController.js';
    import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

    const { canvas, scene, test, render } = getCore();

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
        camera.update();
    }

    camera.onViewMatrixChangedObservable.add(render);
    scene.onAfterRenderObservable.add(updateCamera);
    scene.onPointerObservable.add(updateCamera);

    camera.attachControl(canvas, true, false);
    render();

    destructor(() => {
        scene.onPointerObservable.removeCallback(updateCamera);
        scene.onAfterRenderObservable.removeCallback(updateCamera);
        camera.onViewMatrixChangedObservable.removeCallback(render);
        camera.dispose();
    });

    setCurrentCamera(camera);
</script>

<slot />
