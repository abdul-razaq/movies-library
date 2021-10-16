import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '../../contexts/theme';

// SCREENS
import CastScreen from '../../screens/Cast';
import DiscoverScreen from '../../screens/Discover';
import GenresScreen from '../../screens/Genres';
import MovieScreen from '../../screens/Movie';
import SearchScreen from '../../screens/Search';
import ShelfScreen from '../../screens/Shelf';
import FourOhFourScreen from '../../screens/FourOhFour';

import Layout from '../Layout';

import classes from './app.module';

export default function App({}) {
	const [theme, setTheme] = React.useState('light');

	function toggleTheme() {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	}

	return (
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
							<DiscoverScreen />
						</Route>
						<Route path="/discover/:category">
							<DiscoverScreen />
						</Route>
						<Route path="/genres/:genre">
							<GenresScreen />
						</Route>
						<Route path="/shelf/:type">
							<ShelfScreen />
						</Route>
						<Route path="/search">
							<SearchScreen />
						</Route>
						<Route path="/cast/:castID">
							<CastScreen />
						</Route>
						<Route path="/movie/:movieID">
							<MovieScreen />
						</Route>
						<Route path="/error">
							<FourOhFourScreen />
						</Route>
						<Route path="*">
							<FourOhFourScreen />
						</Route>
					</Switch>
				</Layout>
			</ThemeProvider>
		</div>
	);
}
