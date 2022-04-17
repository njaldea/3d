<script lang="ts">
    import { getCore, destructor } from '$lib/core';

    const { scene, renderLoopStart, renderLoopStop } = getCore();

    if (scene.debugLayer) {
        scene.debugLayer.show({ embedMode: true, enableClose: false });
        renderLoopStart();
    }

    destructor(() => {
        if (scene.debugLayer) {
            scene.debugLayer.hide();
            renderLoopStop();
        }
    });
</script>
