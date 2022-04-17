<script lang="ts">
    import Index from './index.svelte';
    import Inspector from '$lib/components/Inspector.svelte';
</script>

<!-- dynamic import needed to delay this this part (to be done in browser); -->
{#await Promise.all( [import('@babylonjs/core/Debug/debugLayer.js'), import('@babylonjs/inspector')] ) then _}
    <Index>
        <Inspector />
    </Index>
{/await}
