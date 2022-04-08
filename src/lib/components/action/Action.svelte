<script lang="ts">
    import { getContext, getCurrentMesh } from '$lib/context';

    import { ActionManager } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

    const context = getContext();
    const mesh = getCurrentMesh();

    mesh.actionManager = new ActionManager(context.scene);

    onDestroy(() => {
        mesh.actionManager.dispose();
        mesh.actionManager = null;
    });
</script>

<slot />
