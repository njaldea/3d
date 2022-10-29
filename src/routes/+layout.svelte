<script lang="ts">
    import Nav from './nav.svelte';
</script>

<div class="content">
    <slot />
</div>

<div class="nav">
    <Nav />
</div>

<style>
    .content {
        /* for controls */
        position: relative;
        height: 100%;
        margin-left: 25px;
    }

    .nav {
        position: absolute;
        display: block;
        width: 25px;
        height: 100%;
        top: 0;
        left: 0;
        padding: 5px;
        overflow: hidden;
        transition: width 1s, color 1s;
        background-color: black;
        color: black;
    }

    .nav:hover {
        color: white;
        width: 200px;
    }

    .nav:hover > :global(*) {
        width: auto;
        display: block;
    }
</style>
