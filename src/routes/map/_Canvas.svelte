<script lang="ts">
    import Camera from '../_ArcRotateCamera.svelte';
    import Canvas from '@nil-/3d/components/Canvas.svelte';
    import HemisphericLight from '@nil-/3d/components/lights/HemisphericLight.svelte';

    import Ground from '@nil-/3d/components/mesh/Ground.svelte';
    import GridMaterial from '@nil-/3d/components/material/Grid.svelte';
    import TransformNode from '@nil-/3d/components/node/TransformNode.svelte';

    import FSUI from '@nil-/3d/components/gui/FullscreenUI.svelte';

    export let id: string;
    export let target: string;
    export let intensity: number;
    export let direction: [number, number, number];
</script>

<Canvas>
    <Camera
        id={`main-cam-${id}`}
        toggle={true}
        {target}
        alpha={Math.PI / 3}
        beta={Math.PI / 3}
        radius={30}
    />
    <FSUI />

    <HemisphericLight id="light" {intensity} {direction} />

    <TransformNode id="groundgroup" position={[0, -0.001, 0]}>
        <Ground id="ground">
            <GridMaterial id="ground" backFaceCulling={false} frozen />
        </Ground>
    </TransformNode>
    <slot />
</Canvas>
