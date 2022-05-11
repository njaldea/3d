<script lang="ts">
    import CanvasView from '@nil-/3d/components/CanvasView.svelte';
    import Camera from './_ArcRotateCamera.svelte';
    import type { Core } from '@nil-/3d/core/Core';

    export let core: Core;
</script>

<CanvasView {core}>
    <Camera id="secondary-cam" toggle={true} target={''} />
</CanvasView>
