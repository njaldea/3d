import { tags } from '$lib/core/state/tags';
import { create } from './_generator';

const { get, set } = create<HTMLCanvasElement>(tags.camera);
export const setCurrentCanvas = set;
export const getCurrentCanvas = get;
