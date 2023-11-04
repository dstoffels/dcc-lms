import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	// let cookies = request.cookies.get('access_token');
	// console.log(cookies);
	// const response = NextResponse.next();
	// cookies.forEach((cookie) =>
	// 	response.cookies.set({...cookie});
	// );
	// return response;
}
