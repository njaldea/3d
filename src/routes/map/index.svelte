<script lang="ts">
    import { VectorTile } from '@mapbox/vector-tile';
    import ProtoBuf from 'pbf';
    import { Vector2, Vector3 } from '@babylonjs/core';

    const token =
        'pk.eyJ1IjoiZmFic2hhcnAiLCJhIjoiY2pkb2JmaHZ2MG5laTMycXV6MW9hbnR6biJ9.UMH3HUf54_y7l-2YpeE8oA';
    const url = 'https://api.mapbox.com/v4/mapbox.mapbox-streets-v8,mapbox.mapbox-terrain-v2';
    // const zoom = 16;
    // const x = 59888;
    // const y = 39666;
    // 148.9819, -35.3981
    const zoom = 16;
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

    function format(str: string, args: any[], kwargs: Record<string, any>) {
        args = args ?? [];
        kwargs = kwargs ?? {};
        str = str.replace(/{(\d+)}/g, (match, number) => args[number] ?? match);
        for (const [key, value] of Object.entries(kwargs)) {
            str = str.replace(new RegExp(`{(${key})}`, 'g'), value);
        }
        return str;
    }

    type Result = { type: number; v2: Vector2[][]; v3: Vector3[][] };
    const service = `${url}/${zoom}/{x}/{y}.vector.pbf?sku=101jDpRuC1GUm&access_token=${token}`;
    async function request(x: number, y: number) {
        let layers: Record<string, Result[]> = {};
        const resp = await fetch(format(service, [], { x, y }));
        const body = await resp.blob();
        const pbf = new ProtoBuf(await body.arrayBuffer());
        const tile = new VectorTile(pbf);
        for (const [key, value] of Object.entries(tile.layers)) {
            layers[key] = [];
            for (let index = 0; index < value.length; ++index) {
                const feature = value.feature(index);
                if (feature.type === 3) {
                    const geom = feature.loadGeometry();
                    const res = feature.extent;
                    layers[key].push({
                        type: feature.type,
                        v2: geom.map((points) =>
                            points.map((p) => new Vector2(p.x / res, -p.y / res))
                        ),
                        v3: []
                    });
                } else if (feature.type === 2) {
                    const geom = feature.loadGeometry();
                    const res = feature.extent;
                    layers[key].push({
                        type: feature.type,
                        v2: [],
                        v3: geom.map((points) =>
                            points.map((p) => new Vector3(p.x / res, 0, -p.y / res))
                        )
                    });
                }
            }
        }
        return layers;
    }

    import Canvas from './_Canvas.svelte';
    import Polygons from '$lib/components/mesh/Polygons.svelte';
    import Lines from '$lib/components/mesh/Lines.svelte';
    import StandardMaterial from '$lib/components/material/Standard.svelte';
    import TransformNode from '$lib/components/node/TransformNode.svelte';
    import Box from '../_Box.svelte';
    import Reference from '$lib/components/material/Reference.svelte';

    // import Hover from '$lib/components/action/Hover.svelte';
    // import Highlight from '$lib/components/action/Highlight.svelte';
    // import TextBlock from '$lib/components/gui/TextBlock.svelte';
    // import Rectangle from '$lib/components/gui/container/Rectangle.svelte';
    // import Action from '$lib/components/action/Action.svelte';

    // <Action>
    //     <Hover>
    //         <Rectangle>
    //             <TextBlock text={key} />
    //         </Rectangle>
    //     </Hover>
    // </Action>;

    function* gridIndices() {
        for (let x = -1; x <= 1; ++x) {
            for (let y = -1; y <= 1; ++y) {
                yield [x, y];
            }
        }
    }
</script>

<Canvas id="c" target={''} intensity={0.3} direction={[0, 1, 0]}>
    {#if false}
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
    {/if}

    {#each Object.entries(colors) as [key, value]}
        <StandardMaterial
            id={`feature_${key}`}
            useLogarithmicDepth
            alpha={0.7}
            color={value}
            disableLighting
            frozen
        />
    {/each}
    <TransformNode id={'scale'} scaling={mapscale}>
        {#each [...gridIndices()] as [xindex, yindex]}
            {#await request(pos[0] + xindex, pos[1] - yindex) then layers}
                {#each Object.entries(layers) as [key, features]}
                    <TransformNode id={`${xindex}${yindex}`} position={[xindex, 0, yindex]}>
                        {#if !['contour', 'landuse', 'landcover'].includes(key)}
                            {#each features as { type, v2, v3 }}
                                {#if type === 3}
                                    <Polygons id={key} vertices={v2} frozen>
                                        <Reference id={`feature_${key}`} />
                                    </Polygons>
                                {:else if type === 2}
                                    <Lines id={key} vertices={v3} frozen>
                                        <Reference id={`feature_${key}`} />
                                    </Lines>
                                {/if}
                            {/each}
                        {/if}
                    </TransformNode>
                {/each}
            {/await}
        {/each}
    </TransformNode>
</Canvas>
