import React from 'react';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';

import classes from './movies.module';

import * as movieActions from '../../store/actions/movies';

import MoviesList from '../../components/MoviesList';
import Loading from '../../components/customs/Loading';
import Error from '../../components/customs/Error';

const discoverCategories = ['popular', 'top_rated', 'upcoming'];

export default function MoviesScreen({}) {
	let { category, genre } = useParams();
	if (category && discoverCategories.indexOf(category) === -1) {
		category = discoverCategories[0];
	} else if (!category) {
		category = discoverCategories[0];
	}
	const { pathname, search } = useLocation();

	const [currentFilter, setCurrentFilter] = React.useState('popularity.desc');

	const [filterLabel, setFilterLabel] = React.useState('Filter Movies');

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

	function handleFilterChange({ label, value }) {
		setFilterLabel(label);
		setCurrentFilter(value);
	}

	React.useEffect(() => {
		dispatch(
			movieActions.getMovies(
				category,
				page,
				genre,
				genreId,
				query,
				currentFilter,
			),
		);
	}, [category, page, genre, genreId, query, currentFilter]);

	let content = (
		<MoviesList
			filterLabel={filterLabel}
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
			onChangeFilter={handleFilterChange}
			genre={!!genre}
		/>
	);

	if (query && !movies.length) {
		history.push({
			pathname: '/not-found',
			state: {
				text: query,
			},
		});
	}

	if (loading) content = <Loading />;

	if (error) content = <Error text={error} />;

	return (
		<>
			<Helmet>
				<title>{`${
					query?.toUpperCase() ||
					genre?.toUpperCase() ||
					category?.replace('_', ' ')?.toUpperCase()
				} movies - Movies Library`}</title>
			</Helmet>
			<section className={classes.movies}>{content}</section>
		</>
	);
}
