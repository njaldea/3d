<script lang="ts">
    import { getCurrentMesh, destructor } from '$lib/core';

    import { ActionManager } from '@babylonjs/core/Actions/actionManager.js';
    import { ExecuteCodeAction } from '@babylonjs/core/Actions/directActions.js';

    const { actionManager } = getCurrentMesh();

    let hovered = false;

    const actionIn = new ExecuteCodeAction(
        ActionManager.OnPointerOverTrigger,
        () => (hovered = true)
    );
    const actionOut = new ExecuteCodeAction(
        ActionManager.OnPointerOutTrigger,
        () => (hovered = false)
    );

    actionManager.registerAction(actionIn);
    actionManager.registerAction(actionOut);

    destructor(() => {
        actionManager.unregisterAction(actionIn);
        actionManager.unregisterAction(actionOut);
    });
</script>

{#if hovered}
    <slot />
{/if}
