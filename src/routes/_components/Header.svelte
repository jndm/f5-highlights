<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton';
	import IconCat from 'virtual:icons/noto-v1/cat';
	import { userStore } from '$lib/stores/user';

	$: username = $userStore?.email?.split('@')[0] ?? '';
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/">
			<div class="flex flex-row font-bold items-center h-10">
				<IconCat /> F5 Highlights
			</div>
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		{#if $userStore}
			<div class="flex flex-row items-center gap-2">
				<div
					class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-primary-500"
				>
					<IconCat />
				</div>
				{username}
			</div>
		{/if}
	</svelte:fragment>
</AppBar>
