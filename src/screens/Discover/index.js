import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';

import classes from './discover.module';

import fetchPopularMovies from '../../store/actions/movies';

import NoData from '../../components/UI/NoData';
import Center from '../../components/customs/Center';
import MoviesList from '../../components/MoviesList';

export default function DiscoverScreen({}) {
	const { category } = useParams();

	const { loading, error, movies, page, total_pages } = useSelector(
		state => state.popularMovies,
	);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!movies.length) dispatch(fetchPopularMovies(category));
	}, [category]);

	let content = (
		<MoviesList
			category={category}
			movies={movies}
			page={page}
			totalPages={total_pages}
		/>
	);

	if (loading)
		content = (
			<Center>
				<BounceLoader loading={loading} color="#F50057" />
			</Center>
		);

	if (error)
		content = (
			<Center>
				<NoData text={error} />
			</Center>
		);
	return <section className={classes.discover}>{content}</section>;
}
