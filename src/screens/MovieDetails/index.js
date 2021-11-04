import React from 'react';
import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, Redirect, Link } from 'react-router-dom';
import { FaArrowLeft, FaFilm, FaLink, FaHome } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

import Center from '../../components/customs/Center';
import PrimaryText from '../../components/customs/PrimaryText';
import NoData from '../../components/UI/NoData';
import PrimaryLink from '../../components/UI/PrimaryLink';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import MovieBackdrop from '../../components/UI/MovieBackdrop';
import Avatar from '../../components/UI/Avatar';
import Cast from '../../components/UI/Cast';
import Movie from '../../models/Movie';
import MoviesList from '../../components/MoviesList';
import Loading from '../../components/customs/Loading';
import Error from '../../components/customs/Error';

import * as movieActions from '../../store/actions/movie';
import * as moviesActions from '../../store/actions/movies';
import * as shelfActions from '../../store/actions/shelf';

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

	const [isWatchingTrailer, setIsWatchingTrailer] = React.useState(false);

	const elRef = React.useRef(null);
	const topRef = React.useRef(null);

	React.useEffect(() => {
		scrollToTop();
		dispatch(movieActions.getMovie(movieID));

		return () => {
			dispatch({ type: movieActions.actionTypes.CLEAR_MOVIE_DETAILS });
			dispatch({ type: moviesActions.actionTypes.CLEAR_MOVIES });
			dispatch({ type: movieActions.actionTypes.UNSET_MOVIE_ERROR });
		};
	}, [movieID]);

	function handleToggleMovieInShelf(event, shelfType) {
		dispatch(
			shelfActions.toggleMovieInShelf(new Movie(movieDetails), shelfType),
		);
	}

	function handleGoBack() {
		scrollToElement();
		dispatch(movieActions.getRecommendedMovies(movieDetails.id, initialPage));
	}

	function handleGoToNextPage() {
		scrollToElement();
		dispatch(movieActions.getRecommendedMovies(movieDetails.id, nextPage));
	}

	function scrollToElement() {
		elRef.current.scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		});
	}

	function scrollToTop() {
		topRef.current.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	let movieDetailsContent;

	if (loading) {
		movieDetailsContent = <Loading />;
	} else if (error) {
		error.message.includes('Network Error')
			? (movieDetailsContent = (
					<Error
						text={`${error.message}. check internet connection and try again.`}
					/>
			  ))
			: (movieDetailsContent = <Redirect to="/error" />);
	} else if (!Object.keys(movieDetails).length) {
		movieDetailsContent = <Error text={error} />;
	} else {
		const trailerVideo = movieDetails.videos.results.find(
			video => video.type === 'Trailer' && video.site === 'YouTube',
		)?.key;
		movieDetailsContent = (
			<>
				{isWatchingTrailer && (
					<ModalVideo
						channel="youtube"
						isOpen={isWatchingTrailer}
						videoId={trailerVideo}
						onClose={() => setIsWatchingTrailer(false)}
					/>
				)}
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
					showTrailerButton={!!trailerVideo}
					onWatchTrailer={() => setIsWatchingTrailer(true)}
					backdropImage={movieDetails.backdrop_path}
					onToggleMovieInShelf={handleToggleMovieInShelf}
					isFavoriteMovie={favorites.some(({ id }) => id === movieDetails.id)}
					isWatchLaterMovie={watching.some(({ id }) => id === movieDetails.id)}
					overview={movieDetails.overview}
				/>
				<section className={classes.movieDetails__details}>
					<PrimaryText style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
						Movie Information
					</PrimaryText>
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>Genres</h3>
						<ul className={classes.genres}>
							{movieDetails.genres.map(({ name, id }) => (
								<PrimaryLink key={id} to={`/genres/${name.toLowerCase()}`}>
									<FaFilm />
									<span>{name}</span>
								</PrimaryLink>
							))}
						</ul>
					</div>
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>
							Production Countries
						</h3>
						<ul style={{ justifyContent: 'center' }}>
							<li>
								{movieDetails.production_countries
									.map(country => country.name)
									.join(', ')}
							</li>
						</ul>
					</div>
					{movieDetails.budget ? (
						<div className={classes.detailsBox}>
							<h3 className={classes.movieDetails__title}>Budget</h3>

							<p>${window.Number(movieDetails.budget).toLocaleString()}</p>
						</div>
					) : null}
					{movieDetails.runtime > 0 ? (
						<div className={classes.detailsBox}>
							<h3 className={classes.movieDetails__title}>Runtime</h3>
							<p>{movieDetails.runtime} Min.</p>
						</div>
					) : null}
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>Adult Movie</h3>
						<p>{movieDetails.adult ? 'Yes' : 'No'}</p>
					</div>
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>Spoken Language(s)</h3>
						<p>
							{movieDetails.spoken_languages
								.map(lang => lang.english_name)
								.join(', ')}
						</p>
					</div>
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>Movie Status</h3>
						<p>{movieDetails.status}</p>
					</div>
					<div ref={elRef}></div>
					{movieDetails.release_date ? (
						<div className={classes.detailsBox}>
							<h3 className={classes.movieDetails__title}>Release Date</h3>
							<p>{new Date(movieDetails.release_date).toDateString()}</p>
						</div>
					) : null}
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>Links</h3>
						<ul>
							{movieDetails.homepage && movieDetails.imdb_id ? (
								<li>
									<a
										className={classes.primary_link}
										href={movieDetails.homepage}
										target={'_blank'}
										rel="noopener noreferrer"
									>
										<FaLink size={16} />
										<span>Website</span>
									</a>
									<a
										className={classes.primary_link}
										href={`https:www.imdb.com/title/${movieDetails.imdb_id}`}
										target={'_blank'}
										rel="noopener noreferrer"
									>
										<FaLink size={16} />
										<span>IMDB</span>
									</a>
								</li>
							) : null}
						</ul>
					</div>
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>Rating</h3>
						<div className={classes.ratings}>
							<StarRatings
								rating={movieDetails.vote_average / 2}
								starRatedColor="#F50057"
								starDimension="2.1rem"
								starSpacing="1"
							/>
							<span>{movieDetails.vote_average}</span>
						</div>
					</div>
					<div className={classes.detailsBox}>
						{movieDetails.credits.cast.length ? (
							<>
								<h3 className={classes.movieDetails__title}>Cast</h3>
								<div className={classes.cast}>
									<Cast>
										{movieDetails.credits.cast.map(
											({ id, profile_path, name }) => (
												<Link key={id} to={`/cast/${id}`}>
													<Avatar image={profile_path} name={name} />
												</Link>
											),
										)}
									</Cast>
								</div>
							</>
						) : null}
					</div>
				</section>

				{movies.length ? (
					<MoviesList
						category="Recommended"
						movies={movies}
						page={currentPage}
						nextPage={nextPage}
						totalPages={totalPages}
						onGoBack={handleGoBack}
						onGoToNextPage={handleGoToNextPage}
						showBackButton={currentPage > initialPage}
					/>
				) : (
					<Center>
						<NoData text={'Sorry, there are no recommended movies.'} />
					</Center>
				)}
			</>
		);
	}

	return (
		<>
			<Helmet>
				<title>{`${movieDetails.title} - Movies Library`}</title>
			</Helmet>
			<section ref={topRef} className={classes.movieDetails}>
				{movieDetailsContent}
			</section>
		</>
	);
}
