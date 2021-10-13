import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';

import fetchPopularMovies from '../../store/actions/movies';

import errorImage from '../../../public/assets/images/error.svg';

import classes from './discover.module';

export default function DiscoverScreen({}) {
	const { category } = useParams();

	const { loading, error, movies, page, total_pages } = useSelector(
		state => state.popularMovies,
	);

	const dispatch = useDispatch();

	React.useEffect(() => {
		// if (!movies.length) dispatch(fetchPopularMovies(category));
		dispatch(fetchPopularMovies(category));
	}, [category]);

	let content = (
		<div>
			<h1>DISCOVER SCREEN - Showing list of {category} movies</h1>
			{movies.map(movie => (
				<p>{movie.original_title}</p>
			))}
		</div>
	);

	if (loading) content = (
		<div className={classes.loading}>
			<BounceLoader loading={loading} color="#F50057" />
		</div>
	);

	if (error)
		content = (
			<div className={classes.error}>
				<div className={classes.image}>
					<img src={errorImage} alt="error image" />
					<h1>{error}</h1>
				</div>
			</div>
		);
	return <section className={classes.discover}>{content}</section>;
}
