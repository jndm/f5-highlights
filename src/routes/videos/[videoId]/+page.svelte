<script lang="ts">
	import { page } from '$app/stores';
	let videoId = $page.params.videoId;
</script>

{#if videoId}
	<div class="flex flex-row mt-4">
		<div class="flex flex-col grow items-center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex flex-col grow card w-[1312px]">
				<iframe
					id="ytplayer"
					title={'TODO Pitää hakea nimi tähä'}
					src="https://www.youtube.com/embed/{videoId}?autoplay=0"
					frameborder="1"
					allowfullscreen
					class="w-full h-[720px]"
				/>

				<hr class="!border-t-2 m-4 variant-filled-primary" />

				<div class="card-footer">
					<h2 class="h2 font-weight-700">TODO: NIMI</h2>
					<div>TODO DESC</div>
				</div>
			</div>
		</div>
	</div>
{/if}
