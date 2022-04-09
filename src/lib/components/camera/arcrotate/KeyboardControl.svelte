<script lang="ts">
    import { getContext, getCurrentCamera } from '$lib/context';
    import { onDestroy } from 'svelte';

    import type { ArcRotateCamera } from '@babylonjs/core/Cameras/arcRotateCamera.js';
    import type { KeyboardInfo } from '@babylonjs/core/Events/keyboardEvents.js';
    import { KeyboardEventTypes } from '@babylonjs/core/Events/keyboardEvents.js';

    const context = getContext();
    const camera = getCurrentCamera() as ArcRotateCamera;

    camera.inputs.addKeyboard();
    camera.keysUp = [87];
    camera.keysDown = [83];
    camera.keysLeft = [65];
    camera.keysRight = [68];

    function onKeyboardUpdate(info: KeyboardInfo) {
        if ('wasdWASD'.includes(info.event.key)) {
            switch (info.type) {
                case KeyboardEventTypes.KEYDOWN:
                    context.renderLoopStart();
                    break;
                case KeyboardEventTypes.KEYUP:
                    context.renderLoopStop();
                    break;
            }
        }
    }

    context.scene.onKeyboardObservable.add(onKeyboardUpdate);

    onDestroy(() => {
        context.scene.onKeyboardObservable.removeCallback(onKeyboardUpdate);
        camera.inputs.remove(camera.inputs.attached.keyboard);
        camera.keysUp = [];
        camera.keysDown = [];
        camera.keysLeft = [];
        camera.keysRight = [];
    });
</script>
