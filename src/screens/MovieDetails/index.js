import React from 'react';
import { useParams, useHistory, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { BounceLoader } from 'react-spinners';
import { FaArrowLeft, FaFilm } from 'react-icons/fa';

import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import MovieBackdrop from '../../components/UI/MovieBackdrop';

import * as movieActions from '../../store/actions/movie';
import * as shelfActions from '../../store/actions/shelf';

import Movie from '../../models/Movie';
import MoviesList from '../../components/MoviesList';

import classes from './movie_details.module';

export default function MovieDetailsScreen({}) {
	const { movieID } = useParams();

	const { loading, error, movieDetails } = useSelector(
		state => state.movieDetails,
	);
	const { favorites, watching } = useSelector(state => state.shelf);
	const { movies, currentPage, nextPage, totalPages, initialPage } =
		useSelector(state => state.movies);

	const history = useHistory();

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(movieActions.getMovie(movieID));
	}, [movieID]);

	function handleToggleMovieInShelf(event, shelfType) {
		dispatch(
			shelfActions.toggleMovieInShelf(new Movie(movieDetails), shelfType),
		);
	}

	let movieDetailsContent;

	if (loading) {
		movieDetailsContent = (
			<Center>
				<BounceLoader loading={loading} color="#F50057" speedMultiplier={1.8} />
			</Center>
		);
	} else if (error) {
		movieDetailsContent = <Redirect to="/error" />;
	} else if (!Object.keys(movieDetails).length) {
		movieDetailsContent = (
			<Center>
				<NoData text={error} />
			</Center>
		);
	} else {
		movieDetailsContent = (
			<>
				<header className={classes.movieDetails__header}>
					<div>
						<h1>{movieDetails.title}</h1>
						<h2>{movieDetails.tagline}</h2>
					</div>
					<div>
						<SecondaryButton onClick={history.goBack}>
							<FaArrowLeft />
							<span>Back</span>
						</SecondaryButton>
					</div>
				</header>
				<MovieBackdrop
					onWatchTrailer={() => {}}
					backdropImage={movieDetails.backdrop_path}
					onToggleMovieInShelf={handleToggleMovieInShelf}
					isFavoriteMovie={favorites.some(({ id }) => id === movieDetails.id)}
					isWatchLaterMovie={watching.some(({ id }) => id === movieDetails.id)}
					overview={movieDetails.overview}
				/>
				<section className={classes.movieDetails__details}>
					<h3>GENRES</h3>
					<ul>
						{movieDetails.genres.map(({ name }) => (
								<Link to={`/genres/${name.toLowerCase()}`}>
									<FaFilm />
									<span>{name}</span>
								</Link>
						))}
					</ul>
				</section>
				{movies.length && (
					<MoviesList
						category="Recommended"
						movies={movies}
						page={currentPage}
						nextPage={nextPage}
						totalPages={totalPages}
						onGoBack={() =>
							dispatch(
								movieActions.getRecommendedMovies(movieDetails.id, initialPage),
							)
						}
						onGoToNextPage={() =>
							dispatch(
								movieActions.getRecommendedMovies(movieDetails.id, nextPage),
							)
						}
						showBackButton={currentPage > initialPage}
					/>
				)}
			</>
		);
	}

	return (
		<section className={classes.movieDetails}>{movieDetailsContent}</section>
	);
}
