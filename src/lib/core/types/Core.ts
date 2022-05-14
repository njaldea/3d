import { WebGPUEngine } from '@babylonjs/core/Engines/webgpuEngine.js';
import { Engine } from '@babylonjs/core/Engines/engine.js';
import { Scene } from '@babylonjs/core/scene.js';

import type { ContainerProxy } from '$lib/core/types/ContainerProxy';

export class Core {
    public canvas: HTMLCanvasElement;
    public engine: Engine;
    public scene: Scene;
    public fsui: null | ContainerProxy;

    // force render
    public render: () => void;
    public renderLoopStart: () => void;
    public renderLoopStop: () => void;

    private renderFunc: () => void;

    public resize: () => void;

    private shouldRender: boolean;
    private loopEnabled: number;
    private rendering: boolean;

    public destroy() {
        this.loopEnabled = 0;
        this.engine.dispose();
    }

    constructor(canvas: HTMLCanvasElement, webgpu: boolean) {
        this.shouldRender = true;
        this.loopEnabled = 0;
        this.rendering = false;

        this.renderFunc = () => {
            console.log('render frame');
            if (this.scene.activeCamera) {
                this.scene.render();
            }
            if (this.loopEnabled === 0 && !this.shouldRender) {
                this.rendering = false;
            } else {
                requestAnimationFrame(this.renderFunc);
            }
            this.shouldRender = false;
        };

        this.render = () => {
            if (!this.rendering) {
                this.rendering = true;
                requestAnimationFrame(this.renderFunc);
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
