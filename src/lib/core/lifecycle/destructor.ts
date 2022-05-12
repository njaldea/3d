import { getContext, onDestroy, setContext } from 'svelte';
import { Destructor } from '$lib/core/types/Destructor';
import { tags } from '$lib/core/state/tags';

export const destructor = (cb: () => void) => {
    const current = new Destructor(cb);
    (getContext(tags.destructor) as Destructor)?.add(current);
    setContext(tags.destructor, current);
    onDestroy(() => current.call());
};
