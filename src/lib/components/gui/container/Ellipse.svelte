<script lang="ts">
    import { getCurrentUIContainer, destructor } from '$lib/core';
    import Container from './Container.svelte';

    import { Ellipse } from '@babylonjs/gui/2D/controls/ellipse.js';

    const container = getCurrentUIContainer();

    export let control = new Ellipse();
    control.width = '40px';
    control.height = '40px';
    control.color = 'Orange';
    control.thickness = 4;
    control.background = 'green';

    container.addControl(control);
    destructor(() => container.removeControl(control));
</script>

<Container container={control} />
