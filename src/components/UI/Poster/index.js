import React from 'react';
import PropTypes from 'prop-types';
import { FaEye, FaHeart } from 'react-icons/fa';
import StarRatings from 'react-star-ratings';

import classes from './poster.module';

import noPosterFallback from '../../../../public/assets/images/no-poster.svg';

export default function Poster({
	image,
	title,
	rating,
	isFavorited,
	isWatching,
	onToggleFavorited,
	onToggleWatching,
}) {
	return (
		<article className={classes.poster}>
			<header>
				<FaEye
					size={20}
					onClick={onToggleWatching}
					color={isWatching ? 'var(--color-tertiary)' : 'var(--color-white)'}
				/>
				<FaHeart
					size={20}
					onClick={onToggleFavorited}
					color={isFavorited ? 'var(--color-tertiary)' : 'var(--color-white)'}
				/>
			</header>
			<figure>
				<img
					src={
						image
							? `https://image.tmdb.org/t/p/w200/${image}`
							: noPosterFallback
					}
					alt={`poster for ${title}`}
				/>
			</figure>
			<footer>
				<p>{title}</p>
				<StarRatings
					rating={rating / 2}
					starRatedColor="#F50057"
					starDimension="1.8rem"
					starSpacing="0"
				/>
			</footer>
		</article>
	);
}

Poster.propTypes = {
	image: PropTypes.string,
	title: PropTypes.string.isRequired,
	rating: PropTypes.number.isRequired,
	isFavorited: PropTypes.bool.isRequired,
	isWatching: PropTypes.bool.isRequired,
	onToggleFavorited: PropTypes.func.isRequired,
	onToggleWatching: PropTypes.func.isRequired,
};
