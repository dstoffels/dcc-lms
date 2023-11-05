import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import api, { ResponseCookie } from 'utils/api';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
	// const cookieStore = cookies();
	const hasAccess = request.cookies.has('access_token');
	if (request.nextUrl.pathname.startsWith('/login')) {
		if (hasAccess) {
			return NextResponse.rewrite(new URL('/', request.url));
		}
	}

	// if (!hasAccess) {
	// 	const refreshResponse = await api.post('/auth/refresh', {
	// 		refresh: request.cookies.get('refresh_token')?.value,
	// 	});
	// }
}
