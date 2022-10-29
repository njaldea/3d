<script lang="ts">
    import Lines from '$lib/components/map/Lines.svelte';
    import Polygons from '$lib/components/map/Polygons.svelte';
    import StandardMaterial from '$lib/components/material/Standard.svelte';
    import { AlphaMode } from '$lib/components/material/AlphaMode';
    import type { Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';

    export let type: number;
    export let id: string;
    export let color: [number, number, number];
    export let v2: Vector2[][];
    export let v3: Vector3[][];
</script>

{#if type === 3}
    <Polygons {id} vertices={v2} frozen>
        <StandardMaterial
            id={`feature_${id}`}
            useLogarithmicDepth
            {color}
            alphaMode={AlphaMode.Disable}
            backFaceCulling
            disableLighting
            frozen
        />
    </Polygons>
{:else if type === 2}
    <Lines {id} vertices={v3} {color} frozen />
{/if}
