import { writable } from 'svelte/store';

type User = {
	uid: string;
	email: string | null;
};

export const userStore = writable<User | null>(null);
