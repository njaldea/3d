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
 -  In case of custom components that is self updating, manual trigger of render is necessary. see the code below on how to update the scene
```

For self updating components where update is not visible to the parent Canvas component

```ts
import { getCore } from '@nil-/3d/core/context';
import { afterUpdate } from 'svelte';
const { render } = getCore();
afterUpdate(render);
```

TODO:

```
 -  check plugin support like integration with mapbox
 -  better camera support (include other available cameras)
```
