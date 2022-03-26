<script lang="ts">
    import { getContext, getCurrentMesh } from '$lib/context';

    import { ActionManager, ExecuteCodeAction } from '@babylonjs/core';
    import { onDestroy, createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    const context = getContext();
    const mesh = getCurrentMesh();

    // GUARD WHEN ALREADY REGISTERED
    mesh.actionManager = new ActionManager(context.scene);

    const hoverIn = () => {
        dispatch('hoverIn', { id: mesh.id });
    };

    const hoverOut = () => {
        dispatch('hoverOut', { id: mesh.id });
    };

    mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, hoverIn)
    );

    mesh.actionManager.registerAction(
        new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, hoverOut)
    );

    onDestroy(() => {
        hoverOut();
        mesh.actionManager.dispose();
        mesh.actionManager = null;
    });
</script>
