<script lang="ts">
    import { getCurrentMesh } from '$lib/context';

    import { AdvancedDynamicTexture } from '@babylonjs/gui/2D/advancedDynamicTexture.js';
    import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle.js';
    import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock.js';
    import { Ellipse } from '@babylonjs/gui/2D/controls/ellipse.js';
    import { Line } from '@babylonjs/gui/2D/controls/line.js';
    import { onDestroy } from 'svelte';

    const mesh = getCurrentMesh();

    export let id: string;
    export let text: string;
    const ui = AdvancedDynamicTexture.CreateFullscreenUI(id);

    var rect1 = new Rectangle();
    rect1.width = 0.2;
    rect1.height = '40px';
    rect1.cornerRadius = 20;
    rect1.color = 'Orange';
    rect1.thickness = 4;
    rect1.background = 'green';
    rect1.linkOffsetY = -150;

    var label = new TextBlock();
    $: label.text = text;

    var target = new Ellipse();
    target.width = '40px';
    target.height = '40px';
    target.color = 'Orange';
    target.thickness = 4;
    target.background = 'green';

    var line = new Line();
    line.lineWidth = 4;
    line.color = 'Orange';
    line.y2 = 20;
    line.linkOffsetY = -20;
    line.connectedControl = rect1;

    ui.addControl(rect1);
    ui.addControl(target);
    ui.addControl(line);
    line.linkWithMesh(mesh);
    rect1.addControl(label);
    rect1.linkWithMesh(mesh);
    target.linkWithMesh(mesh);
    onDestroy(() => {
        ui.dispose();
    });
</script>
