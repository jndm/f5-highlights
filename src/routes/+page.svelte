<script lang="ts">
	import AddNewVideoButton from './_components/AddNewVideoButton.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: videos = data.videos;

	let selectedVideoId: string | undefined = undefined;

	const onCardClick = (id: string) => {
		selectedVideoId = id;
	};

	$: isSelected = (id: string) => {
		return id === selectedVideoId;
	};
</script>

<div class="flex flex-col grow items-center gap-y-3 p-4">
	<div class="flex flex-row justify-between w-full">
		<h1 class="text-5xl font-bold">Videos</h1>
		<AddNewVideoButton />
	</div>
	<div class="w-full">
		{#if !!videos}
			<div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
				{#each videos as video}
					<div class={isSelected(video.id) ? 'col-span-2 row-span-2' : ''}>
						<div class="flex flex-col items-center">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<!-- svelte-ignore a11y-no-static-element-interactions -->
							<div
								on:click={() => onCardClick(video.id)}
								class="card variant-ghost-primary w-full"
								class:card-hover={!isSelected(video.id)}
							>
								{#if isSelected(video.id)}
									<div class="w-full px-4">TODO: iconi sulkemiselle X</div>
									<iframe
										id="ytplayer"
										title={video.name}
										src="https://www.youtube.com/embed/{video.videoId}?autoplay=0"
										frameborder="1"
										allowfullscreen
										class="w-full p-4 h-[550px]"
									/>
								{:else}
									<img
										src="https://img.youtube.com/vi/{video.videoId}/maxresdefault.jpg"
										alt="{video.name} thumbnail"
									/>
								{/if}

								<div class="p-4">
									<div class="h3">
										{video.name}
									</div>
									<div>
										{video.description}
									</div>
								</div>
							</div>
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
