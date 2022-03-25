<script lang="ts">
    import { getContext } from '$lib/context';
    import { HemisphericLight, Vector3 } from 'babylonjs';
    import { onDestroy } from 'svelte';

    const context = getContext();

    export let id: string;
    export let intensity: number = 1;
    export let direction: [number, number, number] = [0, 0, 0];

    const light = new HemisphericLight(id, new Vector3(...direction), context.scene);
    $: light.direction.x = direction[0];
    $: light.direction.y = direction[2];
    $: light.direction.z = direction[1];
    $: light.intensity = intensity;

    onDestroy(() => light.dispose());
</script>
