import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import fetchPopularMovies from '../../store/actions/movies';

export default function DiscoverScreen({}) {
	const { category } = useParams();

	const { loading, error, movies } = useSelector(state => state.popularMovies);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!movies.length) dispatch(fetchPopularMovies(category));
	}, [category]);

	let content = (
		<div>
			<h1>DISCOVER SCREEN - Showing list of {category} movies</h1>
			<pre>{JSON.stringify(movies, null, 2)}</pre>
		</div>
	);

	if (!movies.length || loading) content = <p>Loading Movies...</p>;

	if (error) content = <p>{error}</p>;
	return content;
}
