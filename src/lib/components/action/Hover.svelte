<script lang="ts">
    import { getCurrentMesh } from '$lib/context';

    import { ActionManager, ExecuteCodeAction } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

    const mesh = getCurrentMesh();

    let hovered = false;

    const actionIn = new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        () => (hovered = true)
    );
    const actionOut = new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        () => (hovered = false)
    );

    mesh.actionManager.registerAction(actionIn);
    mesh.actionManager.registerAction(actionOut);

    onDestroy(() => {
        mesh.actionManager.unregisterAction(actionIn);
        mesh.actionManager.unregisterAction(actionOut);
    });
</script>

{#if hovered}
    <slot />
{/if}
