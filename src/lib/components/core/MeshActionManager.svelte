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

    const pick = () => {
        console.log('pick');
        dispatch('pick', { id: mesh.id });
    };

    const trigger_hoverin = new ExecuteCodeAction(ActionManager.OnPointerOverTrigger, hoverIn);
    const trigger_hoverout = new ExecuteCodeAction(ActionManager.OnPointerOutTrigger, hoverOut);
    const trigger_pick = new ExecuteCodeAction(ActionManager.OnLeftPickTrigger, pick);

    mesh.actionManager.registerAction(trigger_hoverin);
    mesh.actionManager.registerAction(trigger_hoverout);
    mesh.actionManager.registerAction(trigger_pick);

    onDestroy(() => {
        hoverOut();
        mesh.actionManager.unregisterAction(trigger_hoverin);
        mesh.actionManager.unregisterAction(trigger_hoverout);
        mesh.actionManager.unregisterAction(trigger_pick);
    });
</script>
