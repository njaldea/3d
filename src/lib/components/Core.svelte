<script>
    import TransformNode from '$lib/components/node/TransformNode.svelte';
    import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js';
    import { setFullScreenUI, destructor } from '$lib/core';
    import { getCore } from '$lib/core';

    const ui = AdvancedDynamicTexture.CreateFullscreenUI('fullscreen');
    setFullScreenUI(ui);
    destructor(() => ui.dispose());

    const { scene, renderLoopStart } = getCore();

    if (scene.debugLayer) {
        scene.debugLayer.show({ embedMode: true });
        renderLoopStart();
    }
</script>

<TransformNode id="rootnode">
    <slot />
</TransformNode>
