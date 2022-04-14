{#await import('./_page.svelte') then m}
    <svelte:component this={m.default} />
{/await}
