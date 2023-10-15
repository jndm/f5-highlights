import type { VideoDoc } from '$lib/models/video';
import { writable } from 'svelte/store';

export const videoStore = writable<VideoDoc[]>([]);
