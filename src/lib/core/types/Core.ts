import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine.js';
import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';

import type { ContainerProxy } from '$lib/core/types/ContainerProxy';

import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export class Core {
    public canvas: HTMLCanvasElement;
    public engine: Engine;
    public scene: Scene;
    public fsui: null | ContainerProxy;

    public active_canvas: Writable<HTMLCanvasElement | null>;
    private unsubs: (() => void)[];

    // update only when something has changed
    // called in afterUpdate hook of svelte
    // and in core.render()
    public update: () => void;

    // force render
    public render: () => void;
    public renderLoopStart: () => void;
    public renderLoopStop: () => void;

    private renderFunc: () => void;

    public resize: () => void;
    public test: <Primitive /* extends string | number | boolean | object */>(
        curval: Primitive,
        newval: Primitive
    ) => Primitive;

    private shouldRender: boolean;
    private loopEnabled: number;
    private rendering: boolean;

    public destroy() {
        this.loopEnabled = 0;
        for (const unsub of this.unsubs) {
            unsub();
        }
        this.engine.dispose();
    }

    constructor(canvas: HTMLCanvasElement, webgpu: boolean) {
        this.shouldRender = true;
        this.loopEnabled = 0;
        this.rendering = false;

        this.renderFunc = () => {
            console.log('render frame');
            this.scene.render();
            if (this.loopEnabled === 0 && !this.shouldRender) {
                this.rendering = false;
                this.engine.stopRenderLoop(this.renderFunc);
            }
            this.shouldRender = false;
        };

        this.render = () => {
            this.shouldRender = true;
            this.update();
        };

        this.update = () => {
            if (this.shouldRender) {
                this.shouldRender = false;
                if (!this.rendering) {
                    this.rendering = true;
                    this.engine.runRenderLoop(this.renderFunc);
                }
            }
        };

        this.renderLoopStart = () => {
            this.loopEnabled += 1;
            this.render();
        };

        this.renderLoopStop = () => {
            this.loopEnabled -= 1;
        };

        this.resize = () => {
            this.engine.resize();
            this.render();
        };

        this.test = (curval, newval) => {
            if (curval !== newval) {
                this.shouldRender = true;
            }
            return newval;
        };

        this.canvas = canvas;
        if (webgpu) {
            this.engine = new WebGPUEngine(this.canvas, { antialiasing: true });
        } else {
            this.engine = new Engine(this.canvas, true);
        }
        this.scene = new Scene(this.engine);
        this.scene.onReadyObservable.addOnce(this.render);
        this.fsui = null;

        this.active_canvas = writable(null);
        this.unsubs = [
            this.active_canvas.subscribe((c) => {
                if (this.engine.getInputElement() !== c) {
                    this.scene.detachControl();
                    this.engine.inputElement = c;
                    this.scene.attachControl();
                }
            })
        ];
        this.active_canvas.set(canvas);
    }
}
