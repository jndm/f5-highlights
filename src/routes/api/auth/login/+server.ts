import { createSessionCookie, verifyIdToken } from '$lib/firebase/firebase-admin';
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

	const user = { uid: user_id, email };

	const sessionCookie = await createSessionCookie(token, 1209600); // 2 weeks

	cookies.set('firebase-jwt', sessionCookie, {
		httpOnly: true,
		secure: true,
		maxAge: 31536000,
		sameSite: 'strict',
		path: '/'
	});

	return json({ user }, { status: 200 });
}
