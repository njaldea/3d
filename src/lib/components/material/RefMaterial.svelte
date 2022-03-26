<script lang="ts">
    import { getContext, setMaterial } from '$lib/context';

    const context = getContext();
    export let id: string;

    $: setMaterial(context.scene.getMaterialByID(id));
</script>
