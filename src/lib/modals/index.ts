import AddVideoModal from './AddVideoModal.svelte';
import type { ModalComponent } from '@skeletonlabs/skeleton';

export const modalComponentRegistry: Record<string, ModalComponent> = {
	modalAddNewVideo: { ref: AddVideoModal }
};
