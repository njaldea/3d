<script lang="ts">
    import { getCore } from '$lib/core/context/core';
    import { afterUpdate } from 'svelte';

    const { render } = getCore();
    afterUpdate(render);
</script>

<slot />
