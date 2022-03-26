import type { Engine, Scene, Camera, Mesh, Node } from 'babylonjs';
import { setContext as set, getContext as get, onDestroy } from 'svelte';

type Context = {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    camera: Camera;
    frame: null | number;
    render(): void;
    resize(): void;
    test<Primitive extends string | number | boolean>(
        current: Primitive,
        newval: Primitive
    ): Primitive;
};

const tags = {
    base: Symbol(),
    mesh: Symbol(),
    parent: Symbol()
};

export const init = () => {
    const context: Context = {
        canvas: null,
        engine: null,
        scene: null,
        camera: null,
        frame: null,
        render() {
            if (this.camera && !this.frame) {
                this.frame = requestAnimationFrame(() => {
                    this.frame = null;
                    console.log('rendered');
                    this.scene.render();
                });
            }
        },
        resize() {
            this.engine.resize();
            this.render();
        },
        test<Primitive>(current: Primitive, newval: Primitive): Primitive {
            if (current != newval) {
                this.render();
            }
            return newval;
        }
    };
    set(tags.base, context);
    return context;
};

export const meshSetup = (node: Mesh) => {
    node.parent = getParent();
    setCurrentMesh(node);
    onDestroy(() => node.dispose());
};

export const getContext = () => {
    return get(tags.base) as Context;
};

export const setCurrentMesh = (mesh: Mesh) => {
    set(tags.mesh, mesh);
};

export const getCurrentMesh = () => {
    return get(tags.mesh) as Mesh;
};

export const setParent = (node: Node) => {
    set(tags.parent, node);
};

export const getParent = () => {
    return get(tags.parent) as Node;
};
