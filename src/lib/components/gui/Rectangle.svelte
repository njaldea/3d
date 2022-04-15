<script lang="ts">
    import {
        getCurrentMesh,
        destructor,
        getCurrentUIContainer,
        setCurrentUIContainer
    } from '$lib/core';

    import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle.js';
    import type { Control } from '@babylonjs/gui/2D/controls/control.js';

    const mesh = getCurrentMesh();
    const container = getCurrentUIContainer();

    export let control: Control = new Rectangle();
    const rect = control as Rectangle;
    rect.width = 0.2;
    rect.height = '40px';
    rect.cornerRadius = 20;
    rect.color = 'Orange';
    rect.thickness = 4;
    rect.background = 'green';
    rect.linkOffsetY = -150;

    container.addControl(rect);
    rect.linkWithMesh(mesh);

    setCurrentUIContainer(rect);
    destructor(() => container.removeControl(rect));
</script>

<slot />
