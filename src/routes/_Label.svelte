<script lang="ts">
    import { getCurrentMesh, getCurrentUIContainer, destructor } from '@nil-/3d/core';

    import { Rectangle } from '@babylonjs/gui/2D/controls/rectangle.js';
    import { TextBlock } from '@babylonjs/gui/2D/controls/textBlock.js';
    import { Ellipse } from '@babylonjs/gui/2D/controls/ellipse.js';
    import { Line } from '@babylonjs/gui/2D/controls/line.js';

    export let text: string;

    const mesh = getCurrentMesh();
    const ui = getCurrentUIContainer();

    var rect1 = new Rectangle();
    rect1.width = 0.2;
    rect1.height = '40px';
    rect1.cornerRadius = 20;
    rect1.color = 'Orange';
    rect1.thickness = 4;
    rect1.background = 'green';
    ui.addControl(rect1);
    rect1.linkWithMesh(mesh);
    rect1.linkOffsetY = -150;

    var label = new TextBlock();
    label.text = text;
    rect1.addControl(label);

    var target = new Ellipse();
    target.width = '40px';
    target.height = '40px';
    target.color = 'Orange';
    target.thickness = 4;
    target.background = 'green';
    ui.addControl(target);
    target.linkWithMesh(mesh);

    var line = new Line();
    line.lineWidth = 4;
    line.color = 'Orange';
    line.y2 = 20;
    line.linkOffsetY = -20;
    ui.addControl(line);
    line.linkWithMesh(mesh);
    line.connectedControl = rect1;

    destructor(() => {
        ui.removeControl(rect1);
        ui.removeControl(target);
        ui.removeControl(line);
    });
</script>
