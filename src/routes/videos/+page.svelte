<script lang="ts">
	import AddNewVideoButton from './_components/AddNewVideoButton.svelte';
	import type { PageData } from './$types';
	import { userStore } from '$lib/stores/user';

	export let data: PageData;
	const { videos } = data;

	$: isAdmin = $userStore?.isAdmin;
</script>

<div class="flex flex-col grow items-center gap-y-3 p-4">
	{#if isAdmin}
		<div class="flex flex-row justify-between w-full">
			<h1 class="text-5xl font-bold">Videos</h1>
			<AddNewVideoButton />
		</div>
	{/if}
	<div class="w-full">
		{#if !!videos}
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
				{#each videos as video}
					<div class="flex flex-col items-center">
						<div class="card card-hover variant-ghost-primary w-full">
							<a href="/videos/{video.videoId}">
								<img
									src="https://img.youtube.com/vi/{video.videoId}/maxresdefault.jpg"
									alt="{video.name} thumbnail"
								/>

								<div class="p-4">
									<div class="h3">
										{video.name}
									</div>
									<div>
										{video.description}
									</div>
								</div>
							</a>
						</div>
					</div>
				{/each}

				<div class="card p-4 variant-ghost-primary">Video 2</div>
				<div class="card p-4 variant-ghost-primary">Video 3</div>
				<div class="card p-4 variant-ghost-primary">Video 4</div>
				<div class="card p-4 variant-ghost-primary">Video 5</div>
				<div class="card p-4 variant-ghost-primary">Video 6</div>
				<div class="card p-4 variant-ghost-primary">Video 7</div>
				<div class="card p-4 variant-ghost-primary">Video 8</div>
			</div>
		{/if}
	</div>
</div>
