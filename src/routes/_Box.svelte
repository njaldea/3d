<script lang="ts">
    import { components as FREKI } from '$lib';

    import Line from '@nil-/3d/components/gui/Line.svelte';
    import TextBlock from '@nil-/3d/components/gui/TextBlock.svelte';
    import Rectangle from '@nil-/3d/components/gui/container/Rectangle.svelte';
    import Ellipse from '@nil-/3d/components/gui/container/Ellipse.svelte';

    import type { Control } from '@babylonjs/gui/2D/controls/control.js';

    const { Box } = FREKI.mesh;
    const { Action, Hover, Highlight } = FREKI.action;

    export let id: string;

    export let position: [number, number, number] = [0, 0.5, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];
    export let color: [number, number, number] = [0, 1, 0];

    let rect: undefined | Control = undefined;
</script>

<Box {id} {position} {rotation} {scaling}>
    <slot />
    <Action>
        <Hover>
            <Highlight {color} />
            <Rectangle bind:control={rect}>
                <TextBlock text={id} />
            </Rectangle>
            <Line connectedControl={rect} />
            <Ellipse />
        </Hover>
    </Action>
</Box>
