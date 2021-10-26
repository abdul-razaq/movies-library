import React from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { BounceLoader } from 'react-spinners';
import { FaArrowLeft, FaFilm, FaLink, FaHome } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

import Center from '../../components/customs/Center';
import PrimaryText from '../../components/customs/PrimaryText';
import NoData from '../../components/UI/NoData';
import PrimaryLink from '../../components/UI/PrimaryLink';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';
import MovieBackdrop from '../../components/UI/MovieBackdrop';

import * as movieActions from '../../store/actions/movie';
import * as shelfActions from '../../store/actions/shelf';

import Movie from '../../models/Movie';
import MoviesList from '../../components/MoviesList';

import classes from './movie_details.module';

import NoPosterImage from '../../../public/assets/images/no-poster.svg';

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
					<PrimaryText>{`Information about "${movieDetails.title}"`}</PrimaryText>
					<h3 className={classes.movieDetails__title}>Genres</h3>
					<ul>
						{movieDetails.genres.map(({ name, id }) => (
							<PrimaryLink key={id} to={`/genres/${name.toLowerCase()}`}>
								<FaFilm />
								<span>{name}</span>
							</PrimaryLink>
						))}
					</ul>
					<h3 className={classes.movieDetails__title}>Details</h3>
					<ul>
						{movieDetails.budget ? (
							<li>
								<span>Budget: </span>$
								{window.Number(movieDetails.budget).toLocaleString()}
							</li>
						) : null}
						<li>
							<span>Adult Movie: </span>
							{movieDetails.adult ? 'Yes' : 'No'}
						</li>
						<li>
							<span>Spoken Language(s): </span>
							{movieDetails.spoken_languages
								.map(lang => lang.english_name)
								.join(', ')}
						</li>
						<li>
							<span>Status: </span> {movieDetails.status}
						</li>
						<li>
							<span>Runtime: </span>
							{movieDetails.runtime} Mins.
						</li>
						<li>
							<span>Release Date: </span>
							{new Date(movieDetails.release_date).toDateString()}
						</li>
						<li>
							<span>Production Countries: </span>
							{movieDetails.production_countries
								.map(country => country.name)
								.join(', ')}
						</li>
					</ul>
					<h3 className={classes.movieDetails__title}>Links</h3>
					<ul>
						{movieDetails.homepage ? (
							<li>
								<a
									className={classes.primary_link}
									href={movieDetails.homepage}
									target={'_blank'}
									rel="noopener noreferrer"
								>
									<FaLink size={15} />
									<span>Website</span>
								</a>
								<a
									className={classes.primary_link}
									href={`https:www.imdb.com/title/${movieDetails.imdb_id}`}
									target={'_blank'}
									rel="noopener noreferrer"
								>
									<FaLink size={15} />
									<span>IMDB</span>
								</a>
							</li>
						) : null}
					</ul>
					<div className={classes.ratings}>
						<StarRatings
							rating={movieDetails.vote_average / 2}
							starRatedColor="#F50057"
							starDimension="2.1rem"
							starSpacing="1"
						/>
						<span>{movieDetails.vote_average}</span>
					</div>

					<h3 className={classes.movieDetails__title}>Production Companies</h3>
					<div className={classes.logoBox}>
						{movieDetails.production_companies.map(company => (
							<div className={classes.logo}>
								<img
									src={
										company.logo_path
											? `https://image.tmdb.org/t/p/w154/${company.logo_path}`
											: NoPosterImage
									}
									alt={company.name}
								/>
							</div>
						))}
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
