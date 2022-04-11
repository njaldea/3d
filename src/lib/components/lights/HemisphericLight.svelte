<script lang="ts">
    import { getCore, destructor } from '$lib/core';

    import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight.js';
    import { Vector3 } from '@babylonjs/core/Maths/math.vector.js';

    const { scene, test } = getCore();

    export let id: string;
    export let intensity = 1;
    export let direction: [number, number, number] = [0, 0, 0];

    const light = new HemisphericLight(id, new Vector3(...direction), scene);

    $: light.direction.x = test(light.direction.x, direction[0]);
    $: light.direction.y = test(light.direction.y, direction[1]);
    $: light.direction.z = test(light.direction.z, direction[2]);
    $: light.intensity = test(light.intensity, intensity);

    destructor(() => light.dispose());
</script>
