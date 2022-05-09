<script lang="ts">
    import { setCurrentCanvas } from '$lib/core';
    export let canvas: HTMLCanvasElement;
    setCurrentCanvas(canvas);
</script>

<slot />
