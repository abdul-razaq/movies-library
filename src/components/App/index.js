import React from 'react';

import { ThemeProvider } from '../../contexts/theme';

import classes from './app.module';

export default function App({}) {
	const [theme, setTheme] = React.useState('light');

	function toggleTheme() {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	}

	return (
		<main className={classes[theme]}>
			<ThemeProvider
				value={{
					theme,
					toggleTheme,
				}}
			>
				<h1>Welcome to Movies library</h1>
			</ThemeProvider>
		</main>
	);
}
