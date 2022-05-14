<script lang="ts">
    import { components as FREKI } from '$lib';
    import { onMount } from 'svelte';

    const { Box } = FREKI.mesh;

    let rotation = [0, 0, 0] as [number, number, number];

    function rotate() {
        rotation[0] += 0.1;
    }

    onMount(() => {
        const interval = setInterval(rotate, 100);
        return () => clearInterval(interval);
    });

    import { getCore } from '@nil-/3d/core/context';
    import { afterUpdate } from 'svelte';
    const { render } = getCore();
    afterUpdate(render);
</script>

<Box id="rotating" position={[5, 0, 5]} {rotation}>
    <slot />
</Box>
