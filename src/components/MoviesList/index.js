import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

import classes from './movies_list.modules';

import Poster from '../UI/Poster';
import SecondaryButton from '../UI/SecondaryButton';

import * as shelfActions from '../../store/actions/shelf';

export default function MoviesList({
	category,
	movies,
	page,
	nextPage,
	totalPages,
	onGoToNextPage,
	onGoBack,
}) {
	const { favorites, watching } = useSelector(state => state.shelf);

	const dispatch = useDispatch();

	const history = useHistory();

	function handleToggleShelfMovie(event, movie, shelfType) {
		event.stopPropagation();
		dispatch(shelfActions.toggleMovieInShelf(movie, shelfType));
	}

	function handlePosterClick(movieId) {
		history.push(`/movie/${movieId}`);
	}

	return (
		<article className={classes.moviesList}>
			<header>
				<div className={classes.moviesList__title}>
					<h1>{category}</h1>
					<h3>Movies</h3>
				</div>
				{page && totalPages ? (
					<p>
						Page: {page} of {totalPages}
					</p>
				) : (
					<p>Total Movies: {movies.length}</p>
				)}
			</header>
			<section className={classes.moviesList__content}>
				{movies.map(movie => (
					<Poster
						key={movie.id}
						movie={movie}
						isFavorited={favorites.map(mov => mov.id).includes(movie.id)}
						isWatching={watching.map(mov => mov.id).includes(movie.id)}
						onToggleMovieInShelf={handleToggleShelfMovie}
						onPosterClick={handlePosterClick.bind(null, movie.id)}
					/>
				))}
			</section>
			{page && nextPage && (
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
			)}
		</article>
	);
}

MoviesList.propTypes = {
	category: PropTypes.string.isRequired,
	movies: PropTypes.arrayOf(PropTypes.object).isRequired,
	page: PropTypes.number,
	nextPage: PropTypes.number,
	totalPages: PropTypes.number,
	onGoToNextPage: PropTypes.func,
	onGoBack: PropTypes.func,
};
