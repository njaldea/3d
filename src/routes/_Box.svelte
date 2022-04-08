<script lang="ts">
    import { components as FREKI } from '$lib';
    import UI from '$lib/components/gui/DynamicTexture.svelte';
    const { Box } = FREKI.mesh;
    const { Action, Hover, Highlight } = FREKI.action;

    export let id: string;

    export let position: [number, number, number] = [0, 0.5, 0];
    export let rotation: [number, number, number] = [0, 0, 0];
    export let scaling: [number, number, number] = [1, 1, 1];
    export let color: [number, number, number] = [0, 1, 0];
</script>

<Box {id} {position} {rotation} {scaling}>
    <slot />
    <Action>
        <Hover>
            <Highlight {color} />
            <UI id={`${id}-ui`} text={id} />
        </Hover>
    </Action>
</Box>
