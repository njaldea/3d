<script lang="ts">
    import {
        getCurrentMesh,
        destructor,
        getCurrentUIContainer,
        setCurrentUIContainer
    } from '$lib/core';
    import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle.js';

    const mesh = getCurrentMesh();
    const container = getCurrentUIContainer();

    export const control = new Rectangle();
    control.width = 0.2;
    control.height = '40px';
    control.cornerRadius = 20;
    control.color = 'Orange';
    control.thickness = 4;
    control.background = 'green';
    control.linkOffsetY = -150;

    container.addControl(control);
    control.linkWithMesh(mesh);

    setCurrentUIContainer(control);
    destructor(() => container.removeControl(control));
</script>

<slot />
