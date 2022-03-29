<script lang="ts">
    import { getContext, getCurrentCamera } from '$lib/context';
    import { KeyboardEventTypes, KeyboardInfo, ArcRotateCamera } from '@babylonjs/core';
    import { onDestroy } from 'svelte';

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

    onDestroy(() => context.scene.onKeyboardObservable.removeCallback(onKeyboardUpdate));
</script>
