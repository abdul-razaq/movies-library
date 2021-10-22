import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaHeart } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

import classes from './poster.module';

import noPosterFallback from '../../../../public/assets/images/no-poster.svg';

export default function Poster({
	movie,
	isFavorite,
	isWatching,
	onToggleMovieInShelf,
	onPosterClick,
}) {
	return (
		<article
			onClick={onPosterClick}
			className={classes.poster}
			style={{
				backgroundImage: `url(${
					movie.poster_path
						? `https://image.tmdb.org/t/p/w200/${movie.poster_path}`
						: noPosterFallback
				})`,
			}}
		>
			<header>
				<FaEye
					size={20}
					onClick={event => onToggleMovieInShelf(event, movie, 'watching')}
					color={isWatching ? 'var(--color-tertiary)' : 'var(--color-white)'}
				/>
				<FaHeart
					size={20}
					onClick={event => onToggleMovieInShelf(event, movie, 'favorites')}
					color={isFavorite ? 'var(--color-tertiary)' : 'var(--color-white)'}
				/>
			</header>
			<footer>
				<p>{movie.title}</p>
				<StarRatings
					rating={movie.vote_average / 2}
					starRatedColor="#F50057"
					starDimension="1.8rem"
					starSpacing="0"
				/>
			</footer>
		</article>
	);
}

Poster.propTypes = {
	movie: PropTypes.object.isRequired,
	isFavorite: PropTypes.bool.isRequired,
	isWatching: PropTypes.bool.isRequired,
	onToggleMovieInShelf: PropTypes.func.isRequired,
	onPosterClick: PropTypes.func.isRequired,
};
