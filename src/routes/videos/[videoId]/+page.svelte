<script lang="ts">
	import { page } from '$app/stores';
	import { videoStore } from '$lib/stores/video';
	import IconLeftArrow from 'virtual:icons/mingcute/arrow-left-fill';
	let videoId = $page.params.videoId;

	$: video = $videoStore?.find((x) => x.videoId === videoId);
</script>

{#if video}
	<div class="flex flex-row mt-4">
		<div class="flex flex-col grow items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex flex-col grow w-full">
				<div>
					<a class="h2 font-bold flex flex-row" href="/">
						<div class="text-primary-500">
							<IconLeftArrow />
						</div>
						Takaisin
					</a>
				</div>
				<div class="card">
					<iframe
						id="ytplayer"
						title={video.name}
						src="https://www.youtube.com/embed/{video.videoId}?autoplay=1"
						frameborder="1"
						allowfullscreen
						class="w-full aspect-video"
					/>

					<hr class="!border-t-2 m-4 variant-filled-primary" />

					<div class="card-footer">
						<h3 class="h3">{video.name}</h3>
						<div>{video.description}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
{/if}
