<script lang="ts">
    const pos = [54823, 30205];
    // https://docs.microsoft.com/en-us/azure/azure-maps/zoom-levels-and-tile-grid?tabs=csharp
    const mapscale = [611.496, 1, 611.496] as [number, number, number]; //
    // 121.153096, 13.943640

    const colors: Record<string, [number, number, number]> = {
        building: [255, 255, 255],
        housenum_label: [50, 0, 0],
        landuse: [0, 50, 0],
        natural_label: [0, 0, 50],
        place_label: [50, 50, 0],
        poi_label: [0, 50, 50],
        road: [50, 0, 50],
        waterway: [50, 50, 50],
        landcover: [100, 0, 0],
        contour: [0, 100, 0],
        unknown: [0, 0, 100]
    };

    import { request } from './request';

    import Canvas from './canvas.svelte';
    import Box from '../components/box.svelte';
    import StandardMaterial from '$lib/components/material/Standard.svelte';
    import TransformNode from '$lib/components/node/TransformNode.svelte';
    import Features from './features.svelte';

    function* gridIndices() {
        for (let x = -1; x <= 1; ++x) {
            for (let y = -1; y <= 1; ++y) {
                yield [x, y];
            }
        }
    }
</script>

<Canvas id="c" target={''} intensity={0.3} direction={[0, 1, 0]}>
    <Box id={'bx'} position={[0, 0, 0]}>
        <StandardMaterial
            id="standard1"
            useLogarithmicDepth
            alpha={0.7}
            color={[255, 0, 0]}
            frozen
        />
    </Box>
    <Box id={'bx'} position={[1, 0, 0]}>
        <StandardMaterial
            id="standard2"
            useLogarithmicDepth
            alpha={0.7}
            color={[255, 0, 0]}
            frozen
        />
    </Box>

    <TransformNode id={'scale'} scaling={mapscale}>
        {#each [...gridIndices()] as [xindex, yindex]}
            {#await request(pos[0] + xindex, pos[1] - yindex) then layers}
                {#each Object.entries(layers) as [id, features], index (index)}
                    <TransformNode id={`${xindex}${yindex}`} position={[xindex, 0, yindex]}>
                        {#if !['contour', 'landuse', 'landcover'].includes(id)}
                            <Features {id} {features} color={colors[id] ?? [0, 0, 0]} />
                        {/if}
                    </TransformNode>
                {/each}
            {/await}
        {/each}
    </TransformNode>
</Canvas>
