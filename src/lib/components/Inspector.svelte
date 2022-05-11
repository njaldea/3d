<script lang="ts">
    import { destructor } from '$lib/core/lifecycle/destructor';
    import { getCore } from '$lib/core/context/core';

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
