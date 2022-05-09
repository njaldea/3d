<script lang="ts">
    import { getCore, destructor } from '$lib/core';
    import type { IContainer } from '$lib/core/ContainerProxy';
    import type { Control } from '@babylonjs/gui/2D/controls/control.js';

    export let container: IContainer;
    export let control: Control;
    const { render } = getCore();

    container.addControl(control);
    destructor(() => {
        container.removeControl(control);
        control.dispose(); // should this be called?
        render();
    });

    render();
</script>

<slot />
