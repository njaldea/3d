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
    import { destructor } from '$lib/core/lifecycle/destructor';
    import { setCurrentCamera } from '$lib/core/context/camera';
    import { getCurrentCanvas } from '$lib/core/context/canvas';
    import { getCore } from '$lib/core/context/core';

    import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

    const { engine, scene, test, render } = getCore();
    const canvas = getCurrentCanvas();

    export let id: string;
    export let sensibility: [number, number] = [1000, 1000];
    export let alphalimit: [number | null, number | null] = [null, null];
    export let betalimit: [number, number] = [0, 0];
    export let radiuslimit: [number | null, number | null] = [null, null];

    export let alpha = 0;
    export let beta = 0;
    export let radius = 10;

    const camera = new ArcRotateCamera(id, alpha, beta, radius, Vector3.Zero(), scene, true);

    camera.setTarget(Vector3.Zero());
    if ($babylonjs_view) {
        // only register if not main view (canvas)
        // necessary when `views` is not imported
        // TODO: find proper way to handle case for:
        //  -  with/without views
        //  -  active camera in engine
        if (canvas !== engine.getInputElement()) {
            engine.registerView(canvas, camera);
        }
    }

    // add controls via child component
    camera.inputs.attached.keyboard.detachControl();
    camera.inputs.attached.pointers.detachControl();
    camera.inputs.attached.mousewheel.detachControl();

    $: camera.alpha = test(camera.alpha, alpha);
    $: camera.beta = test(camera.beta, beta);
    $: camera.radius = test(camera.radius, radius);
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
