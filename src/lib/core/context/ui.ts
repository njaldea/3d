import { getContext, setContext } from 'svelte';
import { tags } from '$lib/core/tags';

import { getCore } from '$lib/core/context/core';
import { ContainerProxy } from '$lib/core/ContainerProxy';
import type { IContainer } from '$lib/core/ContainerProxy';

export const getCurrentUIContainer = () => {
    const container = getContext(tags.ui_container) as IContainer;
    if (container == null) {
        const { fsui } = getCore();
        if (fsui == null) {
            throw 'FullscreenUI does not exist!';
        }
        return fsui;
    } else {
        return container;
    }
};

export const setFullscreenUI = (container: IContainer) => {
    getCore().fsui = new ContainerProxy(container, 0);
};

export const setCurrentUIContainer = (container: IContainer) => {
    const current = getCurrentUIContainer() as ContainerProxy;
    const depth = current == null ? 1 : current.depth + 1;
    setContext(tags.ui_container, new ContainerProxy(container, depth));
};