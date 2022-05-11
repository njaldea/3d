import { getContext, setContext } from 'svelte';
import { tags } from '$lib/core/tags';

export const getCurrentCanvas = () => {
    return getContext(tags.canvas) as HTMLCanvasElement;
};

export const setCurrentCanvas = (canvas: HTMLCanvasElement) => {
    return setContext(tags.canvas, canvas);
};
