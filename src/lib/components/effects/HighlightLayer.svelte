<script lang="ts">
    import { getContext } from '$lib/context';

    import { Color3, HighlightLayer } from '@babylonjs/core';
    import type { Mesh } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

    const context = getContext();

    export let id: string;
    export let highlighted: string[] = [];
    export let color: [number, number, number] = [0, 0, 0];

    const layer = new HighlightLayer(id, context.scene);
    // render once to fix the initial color of the highlight
    // at first render, it is always black
    layer.onAfterRenderMeshToEffect.addOnce(() => context.render());
    const highlight = new Color3(...color);

    $: highlight.r = updateColor(highlight.r, color[0]);
    $: highlight.g = updateColor(highlight.g, color[1]);
    $: highlight.b = updateColor(highlight.b, color[2]);

    function updateColor(l: number, r: number) {
        if (l != r) {
            layer.removeAllMeshes();
            for (const c of highlighted) {
                layer.addMesh(context.scene.getMeshByID(c) as Mesh, highlight);
            }
            context.render();
        }
        return r;
    }

    let current: string[] = [];

    function update(old: string[], changes: string[]) {
        for (const o of old) {
            if (!changes.includes(o)) {
                layer.removeMesh(context.scene.getMeshByID(o) as Mesh);
                context.render();
            }
        }
        for (const c of changes) {
            if (!old.includes(c)) {
                layer.addMesh(context.scene.getMeshByID(c) as Mesh, highlight);
                context.render();
            }
        }
        return changes;
    }

    $: current = update(current, highlighted);

    onDestroy(() => layer.dispose());
</script>
