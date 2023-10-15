<script lang="ts">
	import '../app.postcss';
	import { AppShell, Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { modalComponentRegistry } from '$lib/modals/index';
	import Header from './_components/Header.svelte';
	import type { LayoutData } from './$types';
	import { userStore } from '$lib/stores/user';
	initializeStores();

	export let data: LayoutData;
	userStore.set(data.user);
</script>

<Toast class="z-[1000]" />
<Modal components={modalComponentRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<div class="flex justify-center h-full w-full">
		<div class="w-[1600px]">
			<slot />
		</div>
	</div>
</AppShell>
