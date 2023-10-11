import { writable } from 'svelte/store';

export type UserStore = {
	email: string | null;
	isAdmin: boolean;
};

export const userStore = writable<UserStore | null>(null);
