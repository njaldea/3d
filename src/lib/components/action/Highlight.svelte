<script lang="ts">
    import { getCore, getCurrentMesh, destructor } from '$lib/core';

    import { Color3 } from '@babylonjs/core/Maths/math.color.js';
    import { HighlightLayer } from '@babylonjs/core/Layers/highlightLayer.js';
    import type { Mesh } from '@babylonjs/core/Meshes/mesh.js';

    const { render, scene } = getCore();
    const mesh = getCurrentMesh() as Mesh;

    export let id = 'hl';
    export let color: [number, number, number] = [0, 0, 0];

    const layer = new HighlightLayer(`${mesh.id}-${id}`, scene);
    const highlight = new Color3(...color);

    $: highlight.r = updateColor(highlight.r, color[0]);
    $: highlight.g = updateColor(highlight.g, color[1]);
    $: highlight.b = updateColor(highlight.b, color[2]);

    function updateColor(l: number, r: number) {
        if (l != r) {
            layer.removeMesh(mesh);
            layer.addMesh(mesh, highlight);
            render();
        }
        return r;
    }

    layer.addMesh(mesh, highlight);

    layer.onBeforeRenderMainTextureObservable.addOnce(render);
    layer.onBeforeRenderMeshToEffect.addOnce(render);
    layer.onBeforeComposeObservable.addOnce(render);
    layer.onBeforeBlurObservable.addOnce(render);
    layer.onDisposeObservable.add(render);

    destructor(() => {
        layer.dispose();
        layer.onBeforeRenderMainTextureObservable.removeCallback(render);
        layer.onBeforeRenderMeshToEffect.removeCallback(render);
        layer.onBeforeComposeObservable.removeCallback(render);
        layer.onBeforeBlurObservable.removeCallback(render);
        layer.onDisposeObservable.removeCallback(render);
    });
    render();
</script>
