<script lang="ts">
    import TransformNode from '$lib/components/node/TransformNode.svelte';
    import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js';
    import { getCore, setCurrentUIContainer, destructor } from '$lib/core';
    import type { Container } from '@babylonjs/gui/2D/controls/container.js';

    const ui = AdvancedDynamicTexture.CreateFullscreenUI('fullscreen');
    setCurrentUIContainer(ui as any as Container);
    const { scene, renderLoopStart, renderLoopStop } = getCore();

    if (scene.debugLayer) {
        scene.debugLayer.show({ embedMode: true });
        renderLoopStart();
    }

    destructor(() => {
        if (scene.debugLayer) {
            scene.debugLayer.hide();
            renderLoopStop();
        }
        ui.dispose();
    });
</script>

<TransformNode id="rootnode">
    <slot />
</TransformNode>
