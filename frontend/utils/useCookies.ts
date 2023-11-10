import { cookies } from 'next/headers';

const useCookies = () => {
	const cookieStore = cookies();
	const access_token = cookieStore.get('access_token');
	const refresh_token = cookieStore.get('refresh_token');

	return { cookieStore, access_token, refresh_token };
};

export default useCookies;
