import { getContext as get, setContext, onDestroy, onMount, afterUpdate } from 'svelte';

import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';
import type { Camera } from '@babylonjs/core/Cameras/camera.js';
import type { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh.js';
import type { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture';

const tags = {
    base: Symbol(),
    mesh: Symbol(),
    camera: Symbol(),
    parent: Symbol(),
    ui: Symbol()
};

class Context {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;

    private renderFunc: () => void;
    private shouldRender: boolean;

    // render loop currently needed for keyboard controls
    // as event is not fired on "held" keys
    private loopEnabled: boolean;

    constructor() {
        this.canvas = null;
        this.engine = null;
        this.scene = null;
        this.shouldRender = false;
        this.loopEnabled = false;
        this.renderFunc = null;

        setContext(tags.base, this);

        onMount(() => {
            this.engine = new Engine(this.canvas, true);
            this.scene = new Scene(this.engine);
            this.scene.onReadyObservable.addOnce(() => this.render());
        });

        onDestroy(() => {
            if (this.renderFunc) {
                this.engine.stopRenderLoop(this.renderFunc);
                this.renderFunc = null;
            }
            this.engine?.dispose();
        });

        afterUpdate(() => this.renderCheck());
    }

    render() {
        this.shouldRender = true;
        this.renderCheck();
    }

    private renderCheck() {
        if (this.shouldRender && !this.renderFunc) {
            this.shouldRender = false;
            this.renderFunc = () => {
                console.log('render check');
                this.scene.render();
                if (!this.loopEnabled && !this.shouldRender) {
                    this.engine.stopRenderLoop(this.renderFunc);
                    this.renderFunc = null;
                }
                this.shouldRender = false;
            };
            this.engine.runRenderLoop(this.renderFunc);
        }
    }

    renderLoopStart() {
        this.loopEnabled = true;
        this.render();
    }

    renderLoopStop() {
        this.loopEnabled = false;
    }

    resize() {
        this.engine.resize();
        this.render();
    }

    test<Primitive extends string | number | boolean>(
        curval: Primitive,
        newval: Primitive
    ): Primitive {
        if (curval != newval) {
            this.shouldRender = true;
        }
        return newval;
    }
}

export const init = () => {
    return new Context();
};

export const getContext = () => {
    return get(tags.base) as Context;
};

export const getCurrentMesh = () => {
    return get(tags.mesh) as AbstractMesh;
};

export const setCurrentMesh = (mesh: AbstractMesh) => {
    setContext(tags.mesh, mesh);
};

export const setParent = (node: Node) => {
    setContext(tags.parent, node);
};

export const getParent = () => {
    return get(tags.parent) as Node;
};

export const setCurrentCamera = (camera: Camera) => {
    setContext(tags.camera, camera);
};

export const getCurrentCamera = () => {
    return get(tags.camera) as Camera;
};

export const getFullScreenUI = () => {
    return get(tags.ui) as AdvancedDynamicTexture;
};

export const setFullScreenUI = (ui) => {
    setContext(tags.ui, ui);
};
