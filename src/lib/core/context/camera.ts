import { getContext, setContext } from 'svelte';
import { tags } from '$lib/core/tags';
import type { Camera } from '@babylonjs/core/Cameras/camera.js';

export const setCurrentCamera = (camera: Camera) => {
    setContext(tags.camera, camera);
};

export const getCurrentCamera = () => {
    return getContext(tags.camera) as Camera;
};
