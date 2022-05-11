<script lang="ts">
    import { getCore } from '$lib/core/context/core';
    import { getCurrentCanvas } from '$lib/core/context/canvas';

    const canvas = getCurrentCanvas();
    const { active_canvas } = getCore();
</script>

{#if canvas === $active_canvas}
    <slot />
{/if}
