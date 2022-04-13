<script lang="ts">
    import { getCore, destructor, getCurrentUIContainer } from '$lib/core';
    import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock.js';

    export let text: string;

    const { test } = getCore();
    // const mesh = getCurrentMesh();
    const container = getCurrentUIContainer();

    export const control = new TextBlock();
    $: control.text = test(control.text, text);

    // control.linkWithMesh(mesh);
    container.addControl(control);

    destructor(() => container.removeControl(control));
</script>
