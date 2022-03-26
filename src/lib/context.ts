import { Engine, Scene } from '@babylonjs/core';
import type { Node, Camera, Mesh, Material } from '@babylonjs/core';

import { getContext as get, setContext, onDestroy, onMount, afterUpdate } from 'svelte';

class Context {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    camera: Camera;

    private frame: number | null;
    private shouldRender = false;

    // render loop currently needed for keyboard controls
    // as event is not fired on "held" keys
    private renderLoop = false;

    render() {
        this.markDirty();
        this.renderCheck();
    }

    renderCheck() {
        if (this.camera && this.shouldRender && !this.frame) {
            this.frame = requestAnimationFrame(() => {
                this.frame = null;
                this.shouldRender = false;
                console.log('render check');
                this.scene.render();

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

    markDirty() {
        this.shouldRender = true;
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
            this.markDirty();
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

export const setCurrentMesh = (mesh: Mesh) => {
    setContext(tags.mesh, mesh);
};

export const setMaterial = (material: Material) => {
    const mesh = get(tags.mesh) as Mesh;
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
