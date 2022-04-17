<script lang="ts">
    import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js';
    import { setFullscreenUI, destructor } from '$lib/core';

    const ui = AdvancedDynamicTexture.CreateFullscreenUI('fullscreen');
    setFullscreenUI(ui);
    destructor(() => ui.dispose());
</script>
