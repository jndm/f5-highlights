<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.videoId}
	<div class="flex flex-row">
		<div class="flex basis-1/4">
			<div class="card variant-ghost-primary w-full">muita filmejä</div>
		</div>

		<div class="flex flex-col items-center basis-3/4">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="card variant-ghost-primary w-full">
				<iframe
					id="ytplayer"
					title={'TODO Pitää hakea nimi tähä'}
					src="https://www.youtube.com/embed/{data.videoId}?autoplay=0"
					frameborder="1"
					allowfullscreen
					class="w-full p-4 h-[700px]"
				/>

				<div class="p-4">
					<div class="h3">TODO: NIMI</div>
					<div>TODO DESC</div>
				</div>
			</div>
		</div>
	</div>
{/if}
