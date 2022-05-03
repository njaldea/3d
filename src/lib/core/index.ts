import { getContext, setContext, onDestroy, onMount, afterUpdate } from 'svelte';

import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';
import type { Camera } from '@babylonjs/core/Cameras/camera.js';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh.js';
import type { Node } from '@babylonjs/core/node.js';
import type { Control } from '@babylonjs/gui/2D/controls/control.js';

/**
 * To emulate c++ RAII where children are destroyed first before the parent.
 *
 * onMount and onDestroy from svelte mirrors each other, which is designed
 * to handle DOM element existence properly.
 *
 * In @nil-/3d, it is much intuitive that the children are destroyed first
 * before the parent to cleanup the children first. It is to mirror the order
 * of constructor call (script tag)
 * To do this, the destructor interface masks it to reorder the destroy calls.
 */
class Destructor {
    private parent: Destructor;
    private children: Destructor[];
    private destroyed: boolean;
    private cb: () => void;

    constructor(cb: () => void) {
        this.children = [];
        this.destroyed = false;
        this.cb = cb;
    }

    public add(child: Destructor) {
        child.parent = this;
        this.children.push(child);
    }

    public remove(child: Destructor) {
        this.children = this.children.filter((v) => v !== child);
    }

    public call() {
        // flag is necessary for the case that a A -> B -> C
        // if A is destroyed, the destructor mechanism will call C -> B -> A
        // but the, svelte's onDestroy will call the callbacks A -> B -> C
        // once destructor.call is invoked, the svelte's onDestroy lifecycle
        // should be bypassed.
        if (!this.destroyed) {
            this.destroyed = true;
            const children = [...this.children].reverse();
            for (const child of children) {
                child.call();
            }

            if (this.cb) {
                this.cb();
            }
        }
        this.parent?.remove(this);
    }
}

const tags = {
    core: Symbol(),
    mesh: Symbol(),
    camera: Symbol(),
    node: Symbol(),
    ui: Symbol(),
    ui_container: Symbol(),
    destructor: Symbol()
};

type Core = {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    fsui: ContainerProxy;

    render: () => void;
    renderCheck: () => void;
    renderLoopStart: () => void;
    renderLoopStop: () => void;

    resize: () => void;
    test: <Primitive extends string | number | boolean | object>(
        curval: Primitive,
        newval: Primitive
    ) => Primitive;
};

export const init = (): Core => {
    let shouldRender = false;
    let loopEnabled = 0;
    let renderFunc = null;

    const core: Core = {
        canvas: null,
        engine: null,
        scene: null,
        fsui: null,

        renderCheck: () => {
            if (shouldRender && !renderFunc) {
                shouldRender = false;
                renderFunc = () => {
                    console.log('render check');
                    core.scene.render();
                    if (loopEnabled === 0 && !shouldRender) {
                        core.engine.stopRenderLoop(renderFunc);
                        renderFunc = null;
                    }
                    shouldRender = false;
                };
                core.engine.runRenderLoop(renderFunc);
            }
        },

        render: () => {
            shouldRender = true;
            core.renderCheck();
        },

        renderLoopStart: () => {
            loopEnabled += 1;
            core.render();
        },

        renderLoopStop: () => {
            loopEnabled -= 1;
        },

        resize: () => {
            core.engine.resize();
            core.render();
        },

        test: <Primitive extends string | number | boolean | object>(
            curval: Primitive,
            newval: Primitive
        ): Primitive => {
            if (curval != newval) {
                shouldRender = true;
            }
            return newval;
        }
    };

    setContext(tags.core, core);

    onMount(() => {
        core.engine = new Engine(core.canvas, true);
        core.scene = new Scene(core.engine);
        core.scene.onReadyObservable.addOnce(core.render);
    });

    onDestroy(() => {
        if (renderFunc) {
            core.engine.stopRenderLoop(renderFunc);
            renderFunc = null;
        }

        // null guard due to sveltekit ssr
        core.engine?.dispose();
    });

    afterUpdate(core.renderCheck);
    return core;
};

export const getCore = () => {
    return getContext(tags.core) as Core;
};

export const getCurrentMesh = () => {
    return getContext(tags.mesh) as AbstractMesh;
};

export const setCurrentMesh = (mesh: AbstractMesh) => {
    setContext(tags.mesh, mesh);
};

export const setNode = (node: Node) => {
    setContext(tags.node, node);
};

export const getNode = () => {
    return getContext(tags.node) as Node;
};

export const setCurrentCamera = (camera: Camera) => {
    setContext(tags.camera, camera);
};

export const getCurrentCamera = () => {
    return getContext(tags.camera) as Camera;
};

export type IContainer = {
    addControl: (control: Control) => void;
    removeControl: (control: Control) => void;
};

// this will handle linking with mesh
// for now, linking with mesh is done for all root control
class ContainerProxy {
    constructor(private container: IContainer, public depth: number) {}

    public addControl(control: Control) {
        this.container.addControl(control);
        // depth == 0 | root
        // depth == 1 | mesh
        // depth >= 2 | controls
        if (this.depth === 0) {
            const mesh = getCurrentMesh();
            if (mesh != null) {
                control.linkWithMesh(mesh);
            }
        }
    }

    public removeControl(control: Control) {
        this.container.removeControl(control);
    }
}

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

export const destructor = (cb: () => void) => {
    const current = new Destructor(cb);
    setContext(tags.destructor, current);
    onDestroy(() => current.call());

    (getContext(tags.destructor) as Destructor)?.add(current);
};
