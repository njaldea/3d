<script lang="ts">
    import { setCurrentUIContainer } from '$lib/core';
    import type { Container } from '@babylonjs/gui/2D/controls/container.js';

    export let container: Container;

    setCurrentUIContainer(container);
</script>

<slot />
