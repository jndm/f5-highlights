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

			goto('/videos');
		} else {
			userStore.set(null);
		}
	};
</script>

<div class="flex flex-col my-12 gap-4 items-center grow">
	<div>
		<h1 class="h1">Login</h1>
		<p class="my-3">To see ebin gameplay you must first login.</p>
		<p>{$userStore?.email}</p>
	</div>
	<div>
		<button class="btn variant-filled-primary" on:click={login}>
			<span>Login</span>
		</button>
	</div>
</div>
