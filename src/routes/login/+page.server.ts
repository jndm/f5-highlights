import { FIREBASE_ADMIN_EMAIL } from '$env/static/private';
import { addAdminClaim, createSessionCookie } from '$lib/firebase/firebase-admin';
import { signIn } from '$lib/firebase/firebase-auth';
import { fail, type Actions, redirect } from '@sveltejs/kit';
import type { UserCredential } from 'firebase/auth';

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const { email, password } = Object.fromEntries(data);

		//'vesipoika@f5hightlights.kek', 'waterboi'

		let userCredential: UserCredential | undefined = undefined;
		try {
			userCredential = await signIn(email.toString(), password.toString());
		} catch {
			return fail(401);
		}

		if (!userCredential) {
			return fail(401);
		}

		const user = { uid: userCredential.user.uid, email, isAdmin: false };

		const token = await userCredential.user.getIdToken();

		const sessionCookie = await createSessionCookie(token, 1209600); // 2 weeks

		// Only one admin for now, for more would prob need to add firebase docs for auth roles but can't be bothered
		if (FIREBASE_ADMIN_EMAIL === user.uid) {
			await addAdminClaim(user.uid);
			user.isAdmin = true;
		}

		cookies.set('firebase-jwt', sessionCookie, {
			httpOnly: true,
			secure: true,
			maxAge: 31536000,
			sameSite: 'strict',
			path: '/'
		});

		throw redirect(301, '/');
	}
} satisfies Actions;
