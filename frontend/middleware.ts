import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	const hasRefresh = request.cookies.has('refresh_token');
	const hasAccess = request.cookies.has('access_token');

	if (!hasRefresh) {
		const publicRoutes = ['/', '/login', '/register'];

		if (!publicRoutes.includes(request.nextUrl.pathname)) {
			if (!hasAccess) return NextResponse.rewrite(new URL('/login', request.url));
		}
	}

	if (request.nextUrl.pathname.startsWith('/login')) {
		if (hasAccess) {
			return NextResponse.rewrite(new URL('/', request.url));
		}
	}
}
