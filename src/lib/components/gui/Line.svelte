<script lang="ts">
    import { getCurrentMesh, getCurrentUIContainer, destructor, getCore } from '$lib/core';

    import { Line } from '@babylonjs/gui/2D/controls/line.js';

    const { test } = getCore();
    const mesh = getCurrentMesh();
    const container = getCurrentUIContainer();

    export let connectedControl = undefined;

    var line = new Line();
    line.lineWidth = 4;
    line.color = 'Orange';
    line.y2 = 20;
    line.linkOffsetY = -20;
    $: line.connectedControl = test(line.connectedControl, connectedControl);

    container.addControl(line);
    line.linkWithMesh(mesh);

    destructor(() => container.removeControl(line));
</script>
