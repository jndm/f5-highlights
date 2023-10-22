<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/user';
	import { getToastStore } from '@skeletonlabs/skeleton';
	import type { SubmitFunction } from '@sveltejs/kit';

	const toastStore = getToastStore();

	const form = {
		email: '',
		password: ''
	};

	const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
		const { email, password } = Object.fromEntries(formData);

		if (!email || !password) {
			cancel();
		}

		return async ({ result, update }) => {
			if (result.type === 'success') {
				const user = result.data?.user;

				userStore.set(user);

				toastStore.trigger({
					message: '✅ Ja nauttimaan laatu kontentinsta',
					timeout: 3000,
					background: 'variant-filled-primary',
					hideDismiss: true
				});

				await update();

				goto('/');
			} else {
				toastStore.trigger({
					message: '🚫 Valitettavasti tällä kertaa jää kontent väliin',
					timeout: 3000,
					background: 'variant-filled-error',
					hideDismiss: true
				});
			}
		};
	};
</script>

<div class="flex flex-col my-12 gap-4 items-center grow">
	<div>
		<h1 class="h1">Kirjaudu sisään</h1>
		<p class="my-3">
			Valitettavasti näin laadukasta kontaa voi näyttää vaan harvoille ja valituille.
		</p>
	</div>
	<div class="flex flex-col gap-y-2 w-full md:w-[450px]">
		<form method="POST" action="?/login" use:enhance={handleSubmit}>
			<label>
				<span>Tunnus</span>
				<input class="input ba" name="email" value={form?.email ?? ''} />
			</label>
			<label>
				<span>Salasana</span>
				<input class="input" name="password" type="password" value={form?.password ?? ''} />
			</label>

			<div class="flex grow justify-end">
				<button class="btn variant-filled-primary mt-3 w-full md:w-[120px]">
					<span>Kirjaudu</span>
				</button>
			</div>
		</form>
	</div>
</div>
