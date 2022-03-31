import { Camera, Engine, Scene } from '@babylonjs/core';
import type { Node, AbstractMesh, Material } from '@babylonjs/core';

import { getContext as get, setContext, onDestroy, onMount, afterUpdate } from 'svelte';

class Context {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;

    private frame: number | null;
    private shouldRender = false;

    // render loop currently needed for keyboard controls
    // as event is not fired on "held" keys
    private renderLoop = false;

    render() {
        this.shouldRender = true;
        this.renderCheck();
    }

    renderCheck() {
        if (this.shouldRender && !this.frame) {
            this.frame = requestAnimationFrame(() => {
                this.frame = null;
                this.shouldRender = false;
                console.log('render check');
                this.scene.render(false);

                if (this.renderLoop) {
                    this.render();
                }
            });
        }
    }

    renderLoopStart() {
        this.renderLoop = true;
        this.render();
    }

    renderLoopStop() {
        this.renderLoop = false;
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

    destroy() {
        if (this.frame) {
            cancelAnimationFrame(this.frame);
            this.frame = null;
        }
    }
}

const tags = {
    base: Symbol(),
    mesh: Symbol(),
    camera: Symbol(),
    parent: Symbol()
};

export const init = () => {
    const context = new Context();
    setContext(tags.base, context);

    onMount(() => {
        context.engine = new Engine(context.canvas, true);
        context.scene = new Scene(context.engine);
        context.scene.onReadyObservable.addOnce(() => {
            context.render();
        });
    });

    onDestroy(() => context.engine?.dispose());

    afterUpdate(() => context.renderCheck());

    return context;
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

export const setMaterial = (material: Material) => {
    const mesh = get(tags.mesh) as AbstractMesh;
    if (mesh) {
        mesh.material = material;
    }
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
