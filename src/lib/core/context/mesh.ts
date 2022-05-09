import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh.js';
import { getContext, setContext } from 'svelte';
import { tags } from '$lib/core/tags';

export const getCurrentMesh = () => {
    return getContext(tags.mesh) as AbstractMesh;
};

export const setCurrentMesh = (mesh: AbstractMesh) => {
    setContext(tags.mesh, mesh);
};
