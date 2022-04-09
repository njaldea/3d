<script lang="ts">
    import { getCurrentMesh } from '$lib/context';
    import { onDestroy } from 'svelte';

    import { ActionManager } from '@babylonjs/core/Actions/actionManager.js';
    import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions.js';

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
        if (mesh && mesh.actionManager) {
            mesh.actionManager.unregisterAction(actionIn);
            mesh.actionManager.unregisterAction(actionOut);
        }
    });
</script>

{#if hovered}
    <slot />
{/if}
