<script lang="ts">
    import {
        getCurrentMesh,
        getCurrentUIContainer,
        setCurrentUIContainer,
        destructor
    } from '$lib/core';

    import { Ellipse } from '@babylonjs/gui/2D/controls/ellipse.js';

    const mesh = getCurrentMesh();
    const container = getCurrentUIContainer();

    export const control = new Ellipse();
    control.width = '40px';
    control.height = '40px';
    control.color = 'Orange';
    control.thickness = 4;
    control.background = 'green';

    container.addControl(control);
    control.linkWithMesh(mesh);

    setCurrentUIContainer(control);
    destructor(() => container.removeControl(control));
</script>
