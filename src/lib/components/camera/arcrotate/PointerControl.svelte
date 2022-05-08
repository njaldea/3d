<script lang="ts">
    import { getCore, getCurrentCamera, destructor } from '$lib/core';
    import { updateCamera } from './Camera.svelte';

    import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';

    const { scene } = getCore();
    const camera = getCurrentCamera() as ArcRotateCamera;

    camera.inputs.addPointers();

    const update = updateCamera(camera);
    scene.onPointerObservable.add(update);
    destructor(() => scene.onPointerObservable.removeCallback(update));
</script>
