import type { Camera } from '@babylonjs/core/Cameras/camera.js';
import { tags } from '$lib/core/state/tags';
import { create } from './_generator';

const { get, set } = create<Camera>(tags.camera);
export const setCurrentCamera = set;
export const getCurrentCamera = get;
