<script lang="ts" context="module">
    export enum AlphaMode {
        Disable = 0,
        Add = 1,
        Combine = 2,
        Subtract = 3,
        Multiply = 4,
        Maximize = 5,
        One = 6,
        PreMultiplied = 7,
        PreMultiplied_PorterDuff = 8,
        Interpolate = 9,
        ScreenMode = 10
    }
</script>

<script lang="ts">
    import { destructor } from '$lib/core/lifecycle/destructor';
    import { getCurrentMesh } from '$lib/core/context/mesh';

    import type { Material } from '@babylonjs/core/Materials/material';

    const mesh = getCurrentMesh();

    export let material: Material;
    export let alpha = 0.3;
    export let alphaMode: AlphaMode = AlphaMode.Combine;
    export let backFaceCulling = false;
    export let needDepthPrePass = false;
    export let frozen = false;

    $: material.alpha = alpha;
    $: material.alphaMode = alphaMode;
    $: material.backFaceCulling = backFaceCulling;
    $: material.needDepthPrePass = needDepthPrePass;
    $: frozen ? material.freeze() : material.unfreeze();

    if (mesh) {
        mesh.material = material;
    }
    destructor(() => {
        if (mesh) {
            mesh.material = null;
        }
        material.dispose();
    });
</script>
