<script lang="ts">
    import { getCurrentUIContainer, destructor, getCore } from '$lib/core';
    import type { Control } from '@babylonjs/gui/2D/controls/control.js';

    import { Line } from '@babylonjs/gui/2D/controls/line.js';

    const { test } = getCore();
    const container = getCurrentUIContainer();

    export let connectedControl: Control = undefined;

    var line = new Line();
    line.lineWidth = 4;
    line.color = 'Orange';
    line.y2 = 20;
    line.linkOffsetY = -20;
    $: line.connectedControl = test(line.connectedControl, connectedControl);

    container.addControl(line);
    destructor(() => container.removeControl(line));
</script>
