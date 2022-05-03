<script lang="ts">
    import Control from '$lib/components/gui/Control.svelte';
    import { getCurrentUIContainer } from '$lib/core';
    import { setCurrentUIContainer } from '$lib/core';
    import { getCore, destructor } from '$lib/core';
    import type { Container } from '@babylonjs/gui/2D/controls/container.js';

    export let container: Container;
    const { render } = getCore();

    const parent = getCurrentUIContainer();
    setCurrentUIContainer(container);

    parent.addControl(container);
    destructor(() => {
        parent.removeControl(container);
        render();
    });

    render();
</script>

<Control container={parent} control={container}>
    <slot />
</Control>
