<script>
    import { onMount } from 'svelte';
    let load = false;
    onMount(() => (load = true));
</script>

{#if load}
    <slot />
{/if}
