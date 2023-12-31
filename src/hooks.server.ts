import { verifySessionToken } from '$lib/firebase/firebase-admin';
import { redirect, type Handle, type Cookies } from '@sveltejs/kit';

const unauthorizedPaths = ['/login'];

export const handle: Handle = async ({ event, resolve }) => {
	const user = await verifyToken(event.cookies);

	if (!!user && event.url.pathname === '/login') {
		throw redirect(307, '/');
	}

	if (unauthorizedPaths.some((x) => x === event.url.pathname)) {
		const response = await resolve(event);
		return response;
	}

	if (!user) {
		throw redirect(307, '/login');
	}

	event.locals.user = {
		email: user.email!,
		isAdmin: user.admin!
	};

	const response = await resolve(event);
	return response;
};

const verifyToken = async (cookies: Cookies) => {
	const token = cookies.get('firebase-jwt');
	if (!token) return undefined;

	const user = await verifySessionToken(token);

	return user;
};
