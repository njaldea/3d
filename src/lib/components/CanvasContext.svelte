<script lang="ts">
    import { setCurrentCanvas, setRenderViews } from '$lib/core';
    export let canvas: HTMLCanvasElement;
    export let views = false;
    setCurrentCanvas(canvas);
    if (views) {
        setRenderViews();
    }
</script>

<slot />
