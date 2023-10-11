// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import 'unplugin-icons/types/svelte';

interface UserLocal {
	email: string;
	isAdmin: boolean;
}

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: UserLocal;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
