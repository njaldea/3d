<script lang="ts">
    import { getContext, getCurrentMesh } from '$lib/context';

    const context = getContext();
    const mesh = getCurrentMesh();

    export let id: string;

    mesh.material = context.scene.getMaterialByID(id);
</script>
