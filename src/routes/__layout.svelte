<slot />

<style>
    :global(*),
    :global(*::before),
    :global(*::after) {
        box-sizing: border-box;
        margin: 0px;
        padding: 0px;
    }

    :global(html),
    :global(body),
    :global(body > div) {
        width: 100%;
        height: 100%;
    }
</style>
