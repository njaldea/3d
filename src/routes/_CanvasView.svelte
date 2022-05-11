<script lang="ts">
    import CanvasView from '@nil-/3d/components/CanvasView.svelte';
    import Camera from './_ArcRotateCamera.svelte';
    import type { Core } from '@nil-/3d/core/types';

    export let id: string;
    export let core: Core;
    export let alpha: number;
    export let beta: number;
</script>

<CanvasView {core}>
    <Camera {id} toggle={true} target={''} {alpha} {beta} />
</CanvasView>
