<script lang="ts">
    import { getContext, getCurrentMesh } from '$lib/context';
    import { onDestroy } from 'svelte';

    import { ActionManager } from '@babylonjs/core/Actions/actionManager.js';

    const context = getContext();
    const mesh = getCurrentMesh();

    mesh.actionManager = new ActionManager(context.scene);

    onDestroy(() => {
        if (mesh && mesh.actionManager) {
            mesh.actionManager.dispose();
            mesh.actionManager = null;
        }
    });
</script>

<slot />
