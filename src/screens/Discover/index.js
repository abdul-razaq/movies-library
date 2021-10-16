import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';

import classes from './discover.module';

import discoverMovies from '../../store/actions/movies/discover';

import NoData from '../../components/UI/NoData';
import Center from '../../components/customs/Center';
import MoviesList from '../../components/MoviesList';

export default function DiscoverScreen({}) {
	let { category } = useParams();
	const discoverCategories = ['popular', 'top_rated', 'upcoming'];
	if (discoverCategories.indexOf(category) === -1)
		category = discoverCategories[0];

	const { pathname, search } = useLocation();

	const history = useHistory();

	const {
		loading,
		error,
		movies,
		currentPage,
		initialPage,
		nextPage,
		totalPages,
	} = useSelector(state => state.discoverMovies);

	const page = new window.URLSearchParams(search).get('page') ?? initialPage;

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(discoverMovies(category, page));
	}, [category, page]);

	function handleGoToNextPage() {
		history.push(`${pathname}?page=${nextPage}`);
	}

	let content = (
		<MoviesList
			category={
				category === 'top_rated' ? category.replace(/_/g, ' ') : category
			}
			movies={movies}
			page={currentPage}
			nextPage={nextPage}
			totalPages={totalPages}
			onGoToNextPage={handleGoToNextPage}
			onGoBack={history.goBack}
		/>
	);

	if (loading)
		content = (
			<Center>
				<BounceLoader loading={loading} color="#F50057" />
			</Center>
		);

	if (!movies.length) {
		content = (
			<Center>
				<NoData text="No data found." />
			</Center>
		);
	}

	if (error)
		content = (
			<Center>
				<NoData text={error} />
			</Center>
		);
	return <section className={classes.discover}>{content}</section>;
}
