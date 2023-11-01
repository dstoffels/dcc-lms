import React from 'react';
import { AuthProvider } from './context/AuthContext';

const App = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<Component {...pageProps} />
		</AuthProvider>
	);
};

export default App;
