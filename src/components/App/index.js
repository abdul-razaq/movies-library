import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '../../contexts/theme';

import AllMovies from '../../screens/AllMovies';
import FourOhFour from '../../screens/FourOhFour';

import Layout from '../Layout';

import classes from './app.module';

export default function App({}) {
	const [theme, setTheme] = React.useState('light');

	function toggleTheme() {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	}

	return (
		<Router>
			<div className={classes[theme]}>
				<ThemeProvider
					value={{
						theme,
						toggleTheme,
					}}
				>
					<Layout>
						<Switch>
							<Route exact path="/">
								<AllMovies />
							</Route>
							<Route path="/discover/:category">
								<AllMovies />
							</Route>
							<Route path="/genres/:genre">
								<AllMovies />
							</Route>
							<Route path="/shelf/:type">
								<AllMovies />
							</Route>
							<Route path="/shelf/:type">
								<AllMovies />
							</Route>
							<Route path="*">
								<FourOhFour />
							</Route>
						</Switch>
					</Layout>
				</ThemeProvider>
			</div>
		</Router>
	);
}
