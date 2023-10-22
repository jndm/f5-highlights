<script lang="ts">
	import type { PageData } from './$types';
	import { userStore } from '$lib/stores/user';
	import { videoStore } from '$lib/stores/video';
	import AddNewVideoButton from './_components/AddNewVideoButton.svelte';

	export let data: PageData;

	$: videoStore.set(data.videos);
	$: isAdmin = $userStore?.isAdmin;
</script>

<div class="flex flex-col grow items-center gap-y-3 p-4">
	{#if isAdmin}
		<div class="flex flex-row justify-between w-full">
			<h1 class="h1">Laatua</h1>
			<AddNewVideoButton />
		</div>
	{/if}
	<div class="w-full">
		{#if !!$videoStore}
			<div
				class="grid gap-4 grid-cols-1 auto-rows-fr md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
			>
				{#each $videoStore as video}
					<div class="flex flex-col items-center">
						<div class="card card-hover w-full h-full">
							<a href="/videos/{video.id}">
								<div class="flex flex-col h-full">
									<div class="flex justify-center h-full basis-5/6">
										<img
											class="min-h-full"
											src="https://img.youtube.com/vi/{video.videoId}/maxresdefault.jpg"
											alt="{video.name} thumbnail"
										/>
									</div>

									<hr class="!border-t-2 m-2" />

									<div
										class="card-footer min-h-[96px] max-h-[96px] overflow-auto"
									>
										<h3 class="h3">
											{video.name}
										</h3>
										<div>
											{video.description}
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>
