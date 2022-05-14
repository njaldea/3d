NOTES:

```
 -  currently supports only 1 scene, 1 camera per engine
     -  switching of active camera to be supported later
 - views for multiple canvases is not yet supported
     -  runRenderLoop does not run when `registerView` is used
     -  switching controls per canvas (maybe via focus/click) needs better handling
 -  multiple engines can be created (<Canvas> component)
 -  treeshaking behavior changes is handled by `core/state/treeshake.ts`.
     -  some js files introduces some behavioral differences in some of the classes provided by babylon
     -  one example of this is for camera update. without importing `ray.js`, a manual call to `getViewMatrix` is required to fire `viewMatrixObservable`
 -  `core/lifecycle/destructor.ts` adds a behavior parallel to component constructor
     -  `onMount` guarantees that children are created before execution
     -  `onDestroy` follows a reverse order with `onMount`
     -  script tag body (constructor) is parent -> children
     -  destructor is children -> parent
     -  this is necessary to better handle resource acquisition (done in constructor) and release (done in destructor)
 -  actionmanager for instance meshes are not yet supported
 -  Canvas is self updating. anything that changes in the direct child (slot) of it will trigger a render
 -  Component.svelte is dedicated to provide automatic render when a "local" variable of a svelte component has changed. See example below for "RotatingBox"
```

```html
<script lang="ts">
    import { Box } from '@nil-/3d/components/mesh/Box.svelte';
    import { Component } from '@nil-/3d/components/Component.svelte';
    import { onMount } from 'svelte';

    // rotation is a local variable
    // any change to it will trigger svelte afterUpdate lifecycle
    // which will trigger render (enabled by Component.svelte)
    let rotation = [0, 0, 0] as [number, number, number];

    function rotate() {
        rotation[0] += 0.1;
    }

    onMount(() => {
        const interval = setInterval(rotate, 100);
        return () => clearInterval(interval);
    });
</script>

<Component>
    <Box id="rotating" position={[5, 0, 5]} {rotation}>
        <slot />
    </Box>
</Component>
```

TODO:

```
 -  check plugin support like integration with mapbox
 -  better camera support (include other available cameras)
```
