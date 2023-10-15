<script lang="ts">
	import { goto } from '$app/navigation';
	import { signIn } from '$lib/firebase/firebase-auth';
	import { userStore, type UserStore } from '$lib/stores/user';

	const login = async () => {
		const userCredential = await signIn('vesipoika@f5hightlights.kek', 'waterboi');
		if (userCredential) {
			const token = await userCredential.user.getIdToken();
			const user: UserStore = await fetch('/login', {
				method: 'POST',
				headers: new Headers({ Authorization: `Bearer ${token}` })
			}).then((resp) => resp.json());

			userStore.set({
				email: user.email,
				isAdmin: user.isAdmin
			});

			goto('/');
		} else {
			userStore.set(null);
		}
	};
</script>

<div class="flex flex-col my-12 gap-4 items-center grow">
	<div>
		<h1 class="h1">Kirjaudu sisään</h1>
		<p class="my-3">
			Valitettavasti näin laadukasta kontsaa joutuu suojaamaan kirjautumisen taakse.
		</p>
	</div>
	<div>
		<button class="btn variant-filled-primary" on:click={login}>
			<span>Kirjaudu</span>
		</button>
	</div>
</div>
