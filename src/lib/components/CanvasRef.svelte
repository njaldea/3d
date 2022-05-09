<script lang="ts">
    import CanvasContext from './CanvasContext.svelte';
    import '@babylonjs/core/Engines/Extensions/engine.views.js';
    export let canvas: HTMLCanvasElement;
</script>

{#if canvas != null}
    <CanvasContext {canvas}>
        <slot />
    </CanvasContext>
{/if}
