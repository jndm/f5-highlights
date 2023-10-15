<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';
	import type { ActionData } from '../../routes/$types';

	export let form: ActionData = { errors: {} };

	const modalStore = getModalStore();
	const toastStore = getToastStore();

	const clearErrors = () => {
		if (!form) return;
		form.errors = {};
	};

	const handleSubmit: SubmitFunction = ({ formElement, formData, action, cancel, submitter }) => {
		const { name, videoId } = Object.fromEntries(formData);

		let validationFailed = false;
		clearErrors();
		if (!name?.toString().length) {
			form!.errors!.name = { required: true };
			validationFailed = true;
		}

		if (!videoId?.toString().length) {
			form!.errors!.videoId = { required: true };
			validationFailed = true;
		}

		if (validationFailed) {
			cancel();
		}

		return async ({ result, update }) => {
			if (result.type === 'success') {
				toastStore.trigger({
					message: '✅ Video saved successfully',
					timeout: 3000,
					background: 'variant-filled-primary',
					hideDismiss: true
				});

				modalStore.close();
				await update();
			} else {
				toastStore.trigger({
					message: '🚫 Failed to save video',
					timeout: 3000,
					background: 'variant-filled-error',
					hideDismiss: true
				});
			}
		};
	};
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
	<header class="text-2xl font-bold">ADD NEW VIDEO</header>

	<article>To add new video, fill in bit of info for video and youtube video id.</article>

	<form
		class="flex flex-col gap-y-2"
		method="POST"
		action="?/createVideo"
		use:enhance={handleSubmit}
	>
		<div>
			<label class="label">
				Name <span class="font-bold">*</span>
				<input
					name="name"
					class:input={true}
					class:input-error={!!form?.errors?.name?.required}
					title="Name"
					type="text"
					value={form?.name ?? ''}
					on:input={clearErrors}
				/>
			</label>
			{#if form?.errors?.name?.required}
				<div class="text-xs text-red-700">Name is required</div>
			{/if}
		</div>

		<label class="label">
			Description
			<input
				name="description"
				class="input"
				title="Description"
				type="text"
				value={form?.description ?? ''}
			/>
		</label>

		<div>
			<label class="label">
				Youtube Video Id <span class="font-bold">*</span>
				<input
					name="videoId"
					class:input={true}
					class:input-error={!!form?.errors?.videoId?.required}
					title="Video Id"
					type="text"
					value={form?.videoId ?? ''}
					on:input={clearErrors}
				/>
			</label>
			{#if form?.errors?.videoId?.required}
				<div class="text-xs text-red-700">Video Id is required</div>
			{/if}
		</div>

		<footer class="flex justify-end gap-x-4">
			<button class="btn variant-ringed-primary" on:click={modalStore.close}> Cancel </button>
			<button class="btn variant-filled-primary">Add</button>
		</footer>
	</form>
</div>
