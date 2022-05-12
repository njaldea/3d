<script lang="ts">
    import Camera from '@nil-/3d/components/camera/arcrotate/Camera.svelte';
    import KeyboardControl from '@nil-/3d/components/camera/arcrotate/KeyboardControl.svelte';
    import PointerControl from '@nil-/3d/components/camera/arcrotate/PointerControl.svelte';
    import Target from '@nil-/3d/components/camera/arcrotate/Target.svelte';

    export let id: string;
    export let toggle: boolean;
    export let target: string;
    export let alpha: number | undefined = undefined;
    export let beta: number | undefined = undefined;
    export let radius: number | undefined = undefined;
</script>

<Camera
    {id}
    sensibility={[2000, 2000]}
    betalimit={[0, Math.PI / 2 - 0.1]}
    radiuslimit={[0.1, 50]}
    {alpha}
    {beta}
    {radius}
>
    {#if toggle}
        <Target {target} />
        <KeyboardControl />
        <PointerControl />
    {/if}
</Camera>
