import React from 'react';
import { NavLink } from 'react-router-dom';
import {
	FaHeart,
	FaChartBar,
	FaTruckLoading,
	FaFilm,
	FaEye,
	FaStar,
} from 'react-icons/fa';

import classes from './sidebar.module';

import Logo from '../Logo';

import { getMovieGenres } from '../../../api/themoviedb';

export default function SideBar({}) {
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState('');
	const [genres, setGenres] = React.useState([]);

	React.useEffect(() => {
		(async () => {
			setLoading(true);
			setError('');
			try {
				const genres = await getMovieGenres();
				setGenres(genres);
			} catch (error) {
				setError('unable to fetch movie genres!');
			} finally {
				setLoading(false);
			}
		})();
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

	if (loading) genresContent = <p style={styles.center}>Loading Genres...</p>;
	if (error) genresContent = <p style={styles.center}>{error}</p>;

	return (
		<aside className={classes.sidebar}>
			<Logo />
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
					to="/discover/top-rated"
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
		</aside>
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
