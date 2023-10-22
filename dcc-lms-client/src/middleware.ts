import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
	const requestHeaders = new Headers(request.headers);
	requestHeaders.set('x-url', request.nextUrl.pathname);
	return NextResponse.next({ request: { ...request, headers: requestHeaders } });
}
