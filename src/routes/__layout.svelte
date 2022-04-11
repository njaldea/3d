<script>
    import { onMount } from 'svelte';
    let load = false;
    onMount(() => (load = true));
</script>

{#if load}
    <slot />
{/if}

<style>
    :global(*),
    :global(*::before),
    :global(*::after) {
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
    }
</style>
