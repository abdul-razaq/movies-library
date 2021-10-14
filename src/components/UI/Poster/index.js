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
	onAddToFavorite,
	onAddToWatching,
}) {
	return (
		<article className={classes.poster}>
			<header>
				<FaEye size={20} onClick={onAddToWatching} />
				<FaHeart size={20} onClick={onAddToFavorite} />
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
					rating={rating}
					starRatedColor="#F50057"
					starDimension="1.6rem"
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
	onAddToFavorite: PropTypes.func.isRequired,
	onAddToWatching: PropTypes.func.isRequired,
};
