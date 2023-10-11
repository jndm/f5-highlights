<script lang="ts">
	import { page } from '$app/stores';
	let videoId = $page.params.videoId;
</script>

{#if videoId}
	<div class="flex flex-row mt-4">
		<div class="flex flex-col grow items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex flex-col grow card variant-ghost-primary w-full">
				<iframe
					id="ytplayer"
					title={'TODO Pitää hakea nimi tähä'}
					src="https://www.youtube.com/embed/{videoId}?autoplay=0"
					frameborder="1"
					allowfullscreen
					class="w-full p-4 h-[720px]"
				/>

				<div class="p-4">
					<div class="h3">TODO: NIMI</div>
					<div>TODO DESC</div>
				</div>
			</div>
		</div>
	</div>
{/if}
