import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { ThemeProvider } from '../../contexts/theme';

// SCREENS
import CastScreen from '../../screens/Cast';
import MoviesScreen from '../../screens/Movies';
import MovieDetailsScreen from '../../screens/MovieDetails';
import SearchScreen from '../../screens/Search';
import ShelfScreen from '../../screens/Shelf';
import FourOhFourScreen from '../../screens/FourOhFour';

import Layout from '../Layout';

import * as shelfActions from '../../store/actions/shelf';

import classes from './app.module';

export default function App({}) {
	const [theme, setTheme] = React.useState('light');

	function toggleTheme() {
		setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
	}

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(shelfActions.getShelfMovies());
	}, []);

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
							<MoviesScreen />
						</Route>
						<Route path="/discover/:category">
							<MoviesScreen />
						</Route>
						<Route path="/genres/:genre">
							<MoviesScreen />
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
							<MovieDetailsScreen />
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
