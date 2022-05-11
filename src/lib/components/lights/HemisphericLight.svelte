<script lang="ts">
    import { destructor } from '$lib/core/lifecycle/destructor';
    import { getCore } from '$lib/core/context/core';

    import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
    import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

    const { render, scene, test } = getCore();

    export let id: string;
    export let intensity = 1;
    export let direction: [number, number, number] = [0, 0, 0];

    const light = new HemisphericLight(id, new Vector3(...direction), scene);
    light.onDisposeObservable.add(render);

    $: light.direction.x = test(light.direction.x, direction[0]);
    $: light.direction.y = test(light.direction.y, direction[1]);
    $: light.direction.z = test(light.direction.z, direction[2]);
    $: light.intensity = test(light.intensity, intensity);

    destructor(() => {
        light.dispose();
        light.onDisposeObservable.removeCallback(render);
    });
</script>
