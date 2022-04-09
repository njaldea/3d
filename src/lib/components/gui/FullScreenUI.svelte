<script lang="ts">
    import { setFullScreenUI } from '$lib/context';
    import { onDestroy } from 'svelte';

    import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js';

    const ui = AdvancedDynamicTexture.CreateFullscreenUI('fullscreen');
    setFullScreenUI(ui);

    onDestroy(() => ui.dispose());
</script>

<slot />
