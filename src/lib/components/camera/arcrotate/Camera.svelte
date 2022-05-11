<script lang="ts" context="module">
    import { tick } from 'svelte';
    import { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
    import { view as babylonjs_view } from '$lib/core/state/treeshake';
    import { ray as babylonjs_ray } from '$lib/core/state/treeshake';
    import { get } from 'svelte/store';

    export function updateCamera(camera: ArcRotateCamera) {
        return async () => {
            // need to defer update in next frame to guarantee retrigger
            // after scene is renderered
            await tick();
            if (get(babylonjs_ray)) {
                camera.getViewMatrix();
            }
            camera.update();
        };
    }
</script>

<script lang="ts">
    import { getCore, setCurrentCamera, getCurrentCanvas, destructor } from '$lib/core';

    import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

    const { engine, scene, test, render } = getCore();
    const canvas = getCurrentCanvas();

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
    if ($babylonjs_view) {
        engine.registerView(canvas, camera);
    }

    // add controls via child component
    camera.inputs.attached.keyboard.detachControl();
    camera.inputs.attached.pointers.detachControl();
    camera.inputs.attached.mousewheel.detachControl();

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
