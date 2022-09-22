<script lang="ts">
    import Feature from './_feature.svelte';
    import { writable } from 'svelte/store';
    import type { Subscriber } from 'svelte/store';
    import type { Vector2, Vector3 } from '@babylonjs/core/Maths/math.vector';

    import { getCore } from '$lib/core/context/core';
    const { render } = getCore();

    type Res = { type: number; v2: Vector2[][]; v3: Vector3[][] };
    export let id: string;
    export let color: [number, number, number];
    export let features: Res[];

    function delayed(value: Res[]) {
        const count = value.length;
        const batch = 25;
        const { subscribe, update } = writable<Res[]>([]);
        let tm: null | ReturnType<typeof setTimeout>;
        function add(i: number) {
            update((v) => [...v, ...value.slice(i, Math.min(count, i + batch))]);
            render();

            const next = i + batch;
            if (next < count) {
                tm = setTimeout(() => add(next), 1000 / 30);
            } else {
                tm = null;
            }
        }
        if (count > 0) {
            add(0);
            render();
        }
        let subscribers = 0;
        return {
            subscribe: (cb: Subscriber<Res[]>) => {
                subscribers += 1;
                const unsubscriber = subscribe(cb);
                return () => {
                    subscribers -= 1;
                    unsubscriber();
                    if (subscribers === 0 && tm != null) {
                        clearTimeout(tm);
                    }
                };
            }
        };
    }

    let dfeat = delayed(features);
</script>

{#each $dfeat as { type, v2, v3 }, index (index)}
    <Feature {id} {type} {v2} {v3} {color} />
{/each}
