import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
	if (request.nextUrl.pathname.startsWith('/login')) {
		if (request.cookies.has('access_token')) {
			return NextResponse.rewrite(new URL('/', request.url));
		}
	}
}
