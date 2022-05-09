import { getContext, setContext } from 'svelte';
import { tags } from '$lib/core/tags';

export const getCurrentCanvas = () => {
    return getContext(tags.canvas) as HTMLCanvasElement;
};

export const setCurrentCanvas = (canvas: HTMLCanvasElement) => {
    return setContext(tags.canvas, canvas);
};

export const withRenderViews = () => {
    return getContext(tags.canvas_views) === true;
};

export const setRenderViews = () => {
    return setContext(tags.canvas_views, true);
};
