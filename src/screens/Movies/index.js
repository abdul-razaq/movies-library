import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';

import classes from './movies.module';

import * as movieActions from '../../store/actions/movies';

import NoData from '../../components/UI/NoData';
import Center from '../../components/customs/Center';
import MoviesList from '../../components/MoviesList';

const discoverCategories = ['popular', 'top_rated', 'upcoming'];

export default function MoviesScreen({}) {
	let { category, genre } = useParams();
	if (category && discoverCategories.indexOf(category) === -1) {
		category = discoverCategories[0];
	} else if (!category) {
		category = discoverCategories[0];
	}
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
		genres,
	} = useSelector(state => state.movies);

	const genreId =
		genre && genres.find(gen => gen.name.toLowerCase() === genre)?.id;

	const page = new window.URLSearchParams(search).get('page') ?? initialPage;

	const query = new window.URLSearchParams(search).get('query');

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(movieActions.getMovies(category, page, genre, genreId, query));
	}, [category, page, genre, genreId, query]);

	let content = (
		<MoviesList
			category={
				query
					? query
					: genre
					? genre
					: category === 'top_rated'
					? category.replace(/_/g, ' ')
					: category
			}
			movies={movies}
			page={currentPage}
			nextPage={nextPage}
			totalPages={totalPages}
			onGoToNextPage={() =>
				history.push(
					`${pathname}${query ? `?query=${query}&` : '?'}page=${nextPage}`,
				)
			}
			onGoBack={history.goBack}
			showBackButton={true}
		/>
	);

	if (loading)
		content = (
			<Center>
				<BounceLoader loading={loading} color="#F50057" speedMultiplier={1.8} />
			</Center>
		);

	if (error)
		content = (
			<Center>
				<NoData text={error} />
			</Center>
		);

	return <section className={classes.movies}>{content}</section>;
}
