import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
	FaHeart,
	FaChartBar,
	FaTruckLoading,
	FaFilm,
	FaEye,
	FaStar,
} from 'react-icons/fa';

import classes from './navigation.module';

import * as movieActions from '../../store/actions/movies';

export default function Navigation({}) {
	const dispatch = useDispatch();

	const { genresLoading, genresError, genres } = useSelector(
		state => state.movies,
	);

	React.useEffect(() => {
		!genres.length && dispatch(movieActions.getGenres());
	}, []);

	let genresContent = genres.map(({ id, name }) => {
		return (
			<NavLink
				key={id}
				to={`/genres/${name.toLowerCase()}`}
				activeClassName={classes.active}
				className={classes.link}
			>
				<FaFilm />
				<span>{name}</span>
			</NavLink>
		);
	});

	if (genresLoading)
		genresContent = <p style={styles.center}>Loading Genres...</p>;
	if (genresError) genresContent = <p style={styles.center}>{genresError}</p>;

	return (
		<>
			<nav className={classes.navigation}>
				<h4 className={classes.navigation__title}>Discover</h4>
				<NavLink
					to="/discover/popular"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaStar />
					<span>Popular</span>
				</NavLink>
				<NavLink
					to="/discover/top_rated"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaChartBar />
					<span>Top Rated</span>
				</NavLink>
				<NavLink
					to="/discover/upcoming"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaTruckLoading />
					<span>Upcoming</span>
				</NavLink>
			</nav>
			<nav className={classes.navigation}>
				<h4 className={classes.navigation__title}>Genres</h4>
				{genresContent}
			</nav>
			<nav className={classes.navigation}>
				<h4 className={classes.navigation__title}>Shelf</h4>
				<NavLink
					to="/shelf/favorites"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaHeart />
					<span>Favorites</span>
				</NavLink>
				<NavLink
					to="/shelf/watching"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaEye />
					<span>Watching</span>
				</NavLink>
			</nav>
		</>
	);
}

const styles = {
	center: {
		marginTop: '1rem',
		color: 'currentColor',
		textAlign: 'center',
		fontSize: '1.2rem',
		fontWeight: 'var(--font-weight-bold)',
	},
};
