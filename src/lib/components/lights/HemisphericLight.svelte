<script lang="ts">
    import { getContext } from '$lib/context';
    import { onDestroy } from 'svelte';
    import * as BABYLON from 'babylonjs';

    const context = getContext();

    export let id: string;
    export let intensity = 1;
    export let direction: [number, number, number] = [0, 0, 0];

    const light = new BABYLON.HemisphericLight(
        id,
        new BABYLON.Vector3(...direction),
        context.scene
    );

    $: light.direction.x = context.test(light.direction.x, direction[0]);
    $: light.direction.y = context.test(light.direction.y, direction[1]);
    $: light.direction.z = context.test(light.direction.z, direction[2]);
    $: light.intensity = context.test(light.intensity, intensity);

    onDestroy(() => light.dispose());
</script>
