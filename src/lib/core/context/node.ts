import { getContext, setContext } from 'svelte';
import { tags } from '$lib/core/tags';
import type { Node } from '@babylonjs/core/node.js';

export const setNode = (node: Node) => {
    setContext(tags.node, node);
};

export const getNode = () => {
    return getContext(tags.node) as Node;
};
