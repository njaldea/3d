<script lang="ts">
    import { getContext, getCurrentMesh } from '$lib/context';
    import { onDestroy } from 'svelte';

    import { Color3 } from '@babylonjs/core/Maths/math.color.js';
    import { HighlightLayer } from '@babylonjs/core/Layers/highlightLayer.js';
    import type { Mesh } from '@babylonjs/core/Meshes/mesh.js';

    const context = getContext();
    const mesh = getCurrentMesh() as Mesh;

    export let id = 'hl';
    export let color: [number, number, number] = [0, 0, 0];

    function render() {
        context.render();
    }

    const layer = new HighlightLayer(`${mesh.id}-${id}`, context.scene);
    layer.onBeforeRenderMainTextureObservable.addOnce(render);
    layer.onBeforeRenderMeshToEffect.addOnce(render);
    layer.onBeforeComposeObservable.addOnce(render);
    layer.onBeforeBlurObservable.addOnce(render);
    const highlight = new Color3(...color);

    $: highlight.r = updateColor(highlight.r, color[0]);
    $: highlight.g = updateColor(highlight.g, color[1]);
    $: highlight.b = updateColor(highlight.b, color[2]);

    function updateColor(l: number, r: number) {
        if (l != r) {
            layer.removeMesh(mesh);
            layer.addMesh(mesh as Mesh, highlight);
            render();
        }
        return r;
    }

    layer.addMesh(mesh as Mesh, highlight);
    context.render();

    onDestroy(() => {
        layer.removeMesh(mesh);
        layer.onBeforeRenderMainTextureObservable.removeCallback(render);
        layer.onBeforeRenderMeshToEffect.removeCallback(render);
        layer.onBeforeComposeObservable.removeCallback(render);
        layer.onBeforeBlurObservable.removeCallback(render);
        layer.dispose();
        render();
    });
</script>
