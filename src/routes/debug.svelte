<script lang="ts">
    import Index from './index.svelte';
    import Inspector from '@nil-/3d/components/Inspector.svelte';
    import '@babylonjs/core/Debug/debugLayer.js';
    import '@babylonjs/inspector';
</script>

<Index>
    <Inspector />
</Index>
