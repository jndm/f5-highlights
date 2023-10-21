import { FIREBASE_ADMIN_EMAIL } from '$env/static/private';
import { addAdminClaim, createSessionCookie, verifyIdToken } from '$lib/firebase/firebase-admin';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const authHeader = request.headers.get('Authorization');
	if (!authHeader) {
		return json({ error: 'no auth header' }, { status: 401 });
	}

	const [type, token] = authHeader.split(' ');
	if (type !== 'Bearer' || !token) {
		return json({ error: 'invalid token header' }, { status: 401 });
	}

	const { user_id, email } = await verifyIdToken(token);

	const user = { uid: user_id, email, isAdmin: false };

	const sessionCookie = await createSessionCookie(token, 1209600); // 2 weeks

	// Only one admin for now
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

	return json(user, { status: 200 });
}
