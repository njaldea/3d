<script lang="ts">
    import { getCore, getCurrentMesh, destructor } from '$lib/core';

    import { ActionManager } from '@babylonjs/core/Actions/actionManager.js';

    const { scene } = getCore();
    const mesh = getCurrentMesh();

    const action = new ActionManager(scene);
    mesh.actionManager = action;

    destructor(() => {
        mesh.actionManager = null;
        action.dispose();
    });
</script>

<slot />
