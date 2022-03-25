import type { Engine, Scene, Camera } from 'babylonjs';
import { setContext as set, getContext as get } from 'svelte';

type Context = {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    camera: Camera;
    frame: null | number;
    render: () => void;
};

const tag = Symbol();

export const init = () => {
    const context: Context = {
        canvas: null,
        engine: null,
        scene: null,
        camera: null,
        frame: null,
        render: function () {
            if (this.camera && !this.frame) {
                this.frame = requestAnimationFrame(() => {
                    this.frame = null;
                    this.scene.render();
                });
            }
        }
    };
    set(tag, context);
    return context;
};

export const getContext = () => {
    return get(tag) as Context;
};
