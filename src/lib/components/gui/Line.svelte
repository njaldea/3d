<script lang="ts">
    import ControlComponent from '$lib/components/gui/Control.svelte';
    import { getCurrentUIContainer, getCore } from '$lib/core';
    import type { Control } from '@babylonjs/gui/2D/controls/control.js';

    import { Line } from '@babylonjs/gui/2D/controls/line.js';

    const { test } = getCore();
    const container = getCurrentUIContainer();

    export let connectedControl: Control = undefined;

    const control = new Line();
    control.lineWidth = 4;
    control.color = 'Orange';
    control.y2 = 20;
    control.linkOffsetY = -20;
    $: control.connectedControl = test(control.connectedControl, connectedControl);
</script>

<ControlComponent {container} {control} />
