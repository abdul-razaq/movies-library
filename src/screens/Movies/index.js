import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';

import classes from './movies.module';

import * as movieActions from '../../store/actions/movies';

import NoData from '../../components/UI/NoData';
import Center from '../../components/customs/Center';
import MoviesList from '../../components/MoviesList';

export default function DiscoverScreen({}) {
	let { category, genre } = useParams();
	const discoverCategories = ['popular', 'top_rated', 'upcoming'];
	if (discoverCategories.indexOf(category) === -1)
		category = discoverCategories[0];

	const { pathname, search, state } = useLocation();

	const [genreId, setGenreId] = React.useState(state?.genreId);

	const history = useHistory();

	const {
		loading,
		error,
		movies,
		currentPage,
		initialPage,
		nextPage,
		totalPages,
	} = useSelector(state => state.movies);

	const page = new window.URLSearchParams(search).get('page') ?? initialPage;

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(movieActions.getMovies(category, page, genre, genreId));
	}, [category, page, genre, genreId]);

	let content = (
		<MoviesList
			category={
				genre ? genre : category === 'top_rated' ? category.replace(/_/g, ' ') : category
			}
			movies={movies}
			page={currentPage}
			nextPage={nextPage}
			totalPages={totalPages}
			onGoToNextPage={() => history.push(`${pathname}?page=${nextPage}`)}
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
