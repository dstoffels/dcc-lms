import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	// const refresh_token = request.cookies.get('refresh_token');
	// const access_token = request.cookies.get('access_token');
	// // const cookieStore = cookies();
	// // refresh_token && cookieStore.set(refresh_token?.name, refresh_token?.value);
	// // access_token && cookieStore.set(access_token.name, access_token.value);
	// if (!refresh_token?.value) {
	// 	const publicRoutes = ['/', '/login', '/register'];
	// 	if (!publicRoutes.includes(request.nextUrl.pathname)) {
	// 		if (!access_token?.value) return NextResponse.redirect(new URL('/login', request.url));
	// 	}
	// }
	// if (request.nextUrl.pathname.startsWith('/login')) {
	// 	if (access_token?.value) {
	// 		return NextResponse.rewrite(new URL('/dashboard', request.url));
	// 	}
	// }
}
