<script lang="ts">
    import {
        ArcRotateCamera,
        Color3,
        Color4,
        Engine,
        HemisphericLight,
        type Mesh,
        MeshBuilder,
        Scene,
        StandardMaterial,
        Vector3
    } from '@babylonjs/core';

    let canvas: HTMLCanvasElement;

    import { onMount } from 'svelte';
    let engine: Engine;
    let scene: Scene;

    let value = 5;
    let box1: Mesh;

    let running = false;
    const func = () => {
        running = false;
        engine.stopRenderLoop(func);
        scene.render();
    };
    const render = () => {
        if (scene && engine) {
            if (!running) {
                running = true;
                engine.runRenderLoop(func);
            }
        }
    };

    onMount(() => {
        engine = new Engine(canvas, true);
        scene = new Scene(engine);
        scene.clearColor = new Color4(0.9, 0.3, 0.3, 1);
        scene.onReadyObservable.add(render);

        const camera = new ArcRotateCamera(
            'Camera',
            Math.PI / 2,
            Math.PI / 2,
            10,
            new Vector3(10, 10, -30),
            scene
        );
        camera.setTarget(Vector3.Zero());
        // engine.registerView(canvas, camera);
        camera.attachControl(canvas, true, false);

        camera.onViewMatrixChangedObservable.add(() => {
            render();
            camera.update();
        });

        scene.onPointerObservable.add(() => camera.update());

        const light = new HemisphericLight('light', new Vector3(0, 1, -15), scene);
        light.intensity = 0.7;

        const material = new StandardMaterial('material', scene);
        material.emissiveColor = new Color3(0.3, 0.3, 0.3);
        material.alpha = 0.4;
        function createBox(x: number, z: number) {
            const box = MeshBuilder.CreateBox('cube', { height: 5, width: 5, depth: 5 }, scene);
            box.material = material;
            box.position.x = x;
            box.position.y = 0 + 2.5;
            box.position.z = z;
            return box;
        }
        box1 = createBox(0, 0);
        camera.setTarget(box1);
        createBox(2.5, 2.5);
        render();
    });

    function extend(v: number) {
        if (box1 != null) {
            // box1.scaling.x = v;
            // box1.rotation.y = v;
            box1.position.x = v;
            render();
        }
    }

    $: extend(value);
</script>

<svelte:window
    on:resize={() => {
        console.log('window resize');
        engine && engine.resize();
        scene && scene.render();
    }}
/>

<div>
    <button on:click={render}>Render</button>
    <input type="range" min={0.1} max={10.0} step={0.001} bind:value />
</div>
<canvas bind:this={canvas} />

<style>
    div {
        width: 50px;
        position: absolute;
    }
    canvas {
        width: 100%;
        height: 100%;
    }
</style>
