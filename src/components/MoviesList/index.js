import React from 'react';
import { useSelector } from 'react-redux';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

import classes from './movies_list.modules';

import Poster from '../UI/Poster';
import SecondaryButton from '../UI/SecondaryButton';

export default function MoviesList({
	category,
	movies,
	page,
	nextPage,
	totalPages,
	onGoToNextPage,
	onGoBack,
}) {
	const { favoriteMovies, moviesWatching } = useSelector(state => state.shelf);

	function handleToggleFavoritedMovie(movieId) {
		console.log(`added or removed movie with ${movieId} from list of favorited movies.`)
	}

	function handleToggleWatchingMovie(movieId) {
		console.log(
			`added or removed movie with ${movieId} from list of movies watching.`,
		);
	}

	return (
		<article className={classes.moviesList}>
			<header>
				<div className={classes.moviesList__title}>
					<h1>{category}</h1>
					<h3>Movies</h3>
				</div>
				<p>
					Page: {page} of {totalPages}
				</p>
			</header>
			<section className={classes.moviesList__content}>
				{movies.map(({ poster_path, title, vote_average, id }) => (
					<Poster
						key={id}
						image={poster_path}
						title={title}
						rating={vote_average}
						isFavorited={favoriteMovies.includes(id)}
						isWatching={moviesWatching.includes(id)}
						onToggleWatching={handleToggleWatchingMovie.bind(null, id)}
						onToggleFavorited={handleToggleFavoritedMovie.bind(null, id)}
					/>
				))}
			</section>
			<footer>
				<SecondaryButton onClick={onGoBack}>
					<FaArrowLeft />
					<span>Back</span>
				</SecondaryButton>
				<SecondaryButton onClick={onGoToNextPage}>
					<span>Page {nextPage}</span>
					<FaArrowRight />
				</SecondaryButton>
			</footer>
		</article>
	);
}

MoviesList.propTypes = {
	category: PropTypes.string.isRequired,
	movies: PropTypes.arrayOf(PropTypes.object).isRequired,
	page: PropTypes.number.isRequired,
	nextPage: PropTypes.number.isRequired,
	totalPages: PropTypes.number.isRequired,
	onGoToNextPage: PropTypes.func.isRequired,
	onGoBack: PropTypes.func.isRequired,
};
