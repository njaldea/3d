import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine.js';
import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';

import type { ContainerProxy } from '$lib/core/types/ContainerProxy';

export class Core {
    public canvas: HTMLCanvasElement;
    public engine: Engine;
    public scene: Scene;
    public fsui: null | ContainerProxy;

    private renderCount: number;
    public render: () => void;
    // extended render is used for cases where some addition/removal of objects
    // needs a few frame to finalize the scene. For example, highlight, and gui
    // controls. For now, the default is to render at least 2 frames if argument
    // is not provided
    public extendedRender: (count?: number) => void;
    public renderLoopStart: () => void;
    public renderLoopStop: () => void;

    private renderFunc: () => void;

    public resize: () => void;

    private loopEnabled: number;
    private rendering: boolean;

    public destroy() {
        this.loopEnabled = 0;
        this.engine.dispose();
    }

    constructor(canvas: HTMLCanvasElement, webgpu: boolean) {
        this.loopEnabled = 0;
        this.rendering = false;
        this.renderCount = 0;

        this.renderFunc = () => {
            console.log('render frame');
            if (this.scene.activeCamera) {
                if (this.renderCount > 0) {
                    this.renderCount -= 1;
                }
                this.rendering = false;
                this.scene.render();
            }
            if (this.loopEnabled > 0 || this.renderCount > 0) {
                this.render();
            }
        };

        this.render = () => {
            if (!this.rendering) {
                this.rendering = true;
                requestAnimationFrame(this.renderFunc);
            }
        };

        this.extendedRender = (count?: number) => {
            this.renderCount = count ?? 2;
            this.render();
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

        this.canvas = canvas;
        if (webgpu) {
            this.engine = new WebGPUEngine(this.canvas, { antialiasing: true });
        } else {
            this.engine = new Engine(this.canvas, true);
        }
        this.scene = new Scene(this.engine);
        this.scene.onReadyObservable.addOnce(this.render);
        this.fsui = null;
    }
}
