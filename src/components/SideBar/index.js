import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaHeart, FaChartBar, FaTruckLoading } from 'react-icons/fa';

import classes from './sidebar.module';

import logo from '../../../public/assets/images/logo.svg';

import { getMovieGenres } from '../../api/themoviedb';

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
				console.log(genres);
			} catch (error) {
				setError('unable to fetch movie genres!');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	let genresContent = <pre>{JSON.stringify(genres, null, 2)}</pre>;

	if (loading) genresContent = <p>Loading Genres...</p>;
	if (error) genresContent = error;

	return (
		<aside className={classes.sidebar}>
			<div className={classes.logo}>
				<Link to="/discover/popular">
					<img src={logo} alt="movie logo" />
				</Link>
			</div>
			<nav className={classes.navigation}>
				<h4 className={classes.navigation__title}>Discover</h4>
				<NavLink
					to="/discover/popular"
					activeClassName={classes.active}
					className={classes.link}
				>
					<FaHeart />
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
			<nav>
				<h4 className={classes.navigation__title}>Genres</h4>
				{genresContent}
			</nav>
		</aside>
	);
}
