import type { Engine, Scene, Camera, Mesh } from 'babylonjs';
import { setContext as set, getContext as get } from 'svelte';

type Context = {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    camera: Camera;
    frame: null | number;
    render: () => void;
    resize: () => void;
    test: (current: any, newval: any) => any;
};

const tags = {
    base: Symbol(),
    mesh: Symbol()
}

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
        test(current: any, newval: any) {
            if (current != newval) {
                this.render();
            }
            return newval;
        }
    };
    set(tags.base, context);
    return context;
};

export const getContext = () => {
    return get(tags.base) as Context;
};


const mesh = Symbol();

export const setCurrentMesh = (mesh: Mesh) => {
    set(tags.mesh, mesh);
};

export const getCurrentMesh = () => {
    return get(tags.mesh) as Mesh;
};