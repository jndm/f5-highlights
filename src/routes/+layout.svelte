<script lang="ts">
	import '../app.postcss';
	import { AppShell, Modal, Toast, initializeStores } from '@skeletonlabs/skeleton';
	import { modalComponentRegistry } from '$lib/modals/index';
	import Header from './_components/Header.svelte';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';
	import { userStore } from '$lib/stores/user';
	import { googleSignin } from '$lib/firebase/firebase-auth';

	initializeStores();

	/* AUTH MANAGEMENT */
	// This is all shit and should be moved somewhere smart
	const authSubscriber = () => {
		onAuthStateChanged(auth, async (userAuthData) => {
			if (userAuthData) {
				const token = await userAuthData.getIdToken();
				const user = await fetch('api/auth/login', {
					method: 'POST',
					headers: new Headers({ Authorization: `Bearer ${token}` })
				}).then((resp) => resp.json());

				userStore.set(user);
			} else {
				userStore.set(null);
			}
		});
	};

	onMount(async () => {
		authSubscriber();
	});
</script>

<Toast class="z-[1000]" />
<Modal components={modalComponentRegistry} />

<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>

	<div class="text-center">
		<button class=" btn variant-filled-primary" on:click={googleSignin}>
			<span>Google Sign In</span>
		</button>
	</div>

	<div class="flex justify-center w-full">
		<div class="w-[1600px]">
			<slot />
		</div>
	</div>
</AppShell>
