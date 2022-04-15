<script lang="ts">
    import Index from './index.svelte';
</script>

<!-- dynamic import needed to delay this this part (to be done in browser); -->
{#await Promise.all( [import('@babylonjs/core/Debug/debugLayer.js'), import('@babylonjs/inspector')] ) then _}
    <Index />
{/await}
