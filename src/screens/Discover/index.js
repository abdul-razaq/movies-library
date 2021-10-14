import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';

import classes from './discover.module';

import fetchPopularMovies from '../../store/actions/movies';

import NoData from '../../components/UI/NoData';
import Center from '../../components/customs/Center';
import MoviesList from '../../components/MoviesList';

export default function DiscoverScreen({}) {
	const { category } = useParams();
	const { pathname, search } = useLocation();
	const history = useHistory();

	const {
		loading,
		error,
		movies,
		page: initialPage,
		nextPage,
		totalPages,
	} = useSelector(state => state.popularMovies);

	const page = new window.URLSearchParams(search).get('page') ?? initialPage;

	const dispatch = useDispatch();

	console.log(category, pathname, search, history);

	React.useEffect(() => {
		if (!movies.length)
			dispatch(fetchPopularMovies(category, page));
	}, [category, page]);

	function handleGoToNextPage() {
		// movieActions.updatePage();
		history.push(`${pathname}?page=${nextPage}`);
		dispatch(fetchPopularMovies(category, nextPage));
	}

	let content = (
		<MoviesList
			category={category}
			movies={movies}
			page={page}
			nextPage={nextPage}
			totalPages={totalPages}
			onGoToNextPage={handleGoToNextPage}
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
