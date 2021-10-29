import React from 'react';
import ReactDOM from 'react-dom';
import { useParams, useHistory, Redirect, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import { FaArrowLeft, FaFilm, FaLink, FaHome } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';
import ModalVideo from 'react-modal-video';

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

import * as movieActions from '../../store/actions/movie';
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

	const [isWatchingTrailer, setIsWatchingTrailer] = React.useState(true);

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
		error.message.includes('Network Error')
			? (movieDetailsContent = (
					<Center>
						<NoData
							text={`${error.message}. check internet connection and try again.`}
						/>
					</Center>
			  ))
			: (movieDetailsContent = <Redirect to="/error" />);
	} else if (!Object.keys(movieDetails).length) {
		movieDetailsContent = (
			<Center>
				<NoData text={error} />
			</Center>
		);
	} else {
		const trailerVideo = movieDetails.videos.results.find(
			video => video.type === 'Trailer' && video.site === 'YouTube',
		)?.key;
		movieDetailsContent = (
			<>
				{isWatchingTrailer &&
					ReactDOM.createPortal(
						<ModalVideo
							channel="youtube"
							isOpen={isWatchingTrailer}
							videoId={trailerVideo}
							onClose={() => setIsWatchingTrailer(false)}
						/>,
						document.getElementById('root'),
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
						<ul>
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
					<div className={classes.detailsBox}>
						<h3 className={classes.movieDetails__title}>Release Date</h3>
						<p>{new Date(movieDetails.release_date).toDateString()}</p>
					</div>
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
										<FaLink size={10} />
										<span>Website</span>
									</a>
									<a
										className={classes.primary_link}
										href={`https:www.imdb.com/title/${movieDetails.imdb_id}`}
										target={'_blank'}
										rel="noopener noreferrer"
									>
										<FaLink size={10} />
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
				) : (
					<Center>
						<NoData text={'Sorry, there are no recommended movies.'} />
						<PrimaryButton path="/discover/popular">
							<FaHome />
							<span>Home</span>
						</PrimaryButton>
					</Center>
				)}
			</>
		);
	}

	return (
		<section className={classes.movieDetails}>{movieDetailsContent}</section>
	);
}
