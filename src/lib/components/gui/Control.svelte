<script lang="ts">
    import { getCore } from '$lib/core/context';
    import { destructor } from '$lib/core/lifecycle';

    import type { IContainer } from '$lib/core/types/ContainerProxy';
    import type { Control } from '@babylonjs/gui/2D/controls/control.js';

    export let container: IContainer;
    export let control: Control;

    const { extendedRender } = getCore();
    container.addControl(control);
    destructor(() => {
        container.removeControl(control);
        control.dispose(); // should this be called?
        extendedRender();
    });
    extendedRender();
</script>

<slot />
