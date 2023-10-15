<script lang="ts">
	import AddVideoModal from '$lib/modals/AddVideoModal.svelte';
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	import UploadIcon from 'virtual:icons/material-symbols/upload';

	const c: ModalComponent = { ref: AddVideoModal };

	const modal: ModalSettings = {
		type: 'component',
		component: c
	};

	const modalStore = getModalStore();

	function openAddVideoModal() {
		modalStore.trigger(modal);
	}
</script>

<button type="button" class="btn variant-filled-primary" on:click={openAddVideoModal}>
	<UploadIcon />
	<span>Uusi video</span>
</button>
