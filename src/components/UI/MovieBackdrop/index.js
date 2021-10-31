import React from 'react';
import PropTypes from 'prop-types';

import { FaVideo, FaEye, FaHeart } from 'react-icons/fa';
import SecondaryButton from '../SecondaryButton';

import noPosterImage from '../../../../public/assets/images/no-poster.png';

import classes from './movie_backdrop.module';

export default function MovieBackdrop({
	backdropImage,
	onToggleMovieInShelf,
	isFavoriteMovie,
	isWatchLaterMovie,
	onWatchTrailer,
	overview,
	showTrailerButton,
}) {
	return (
		<figure
			className={classes.backdrop}
			style={{
				backgroundImage: backdropImage
					? `url(https://image.tmdb.org/t/p/original${backdropImage})`
					: `url(${noPosterImage})`,
			}}
		>
			<header className={classes.backdrop__header}>
				<FaEye
					className={classes.shelfIcon}
					onClick={event => onToggleMovieInShelf(event, 'watching')}
					color={
						isWatchLaterMovie ? 'var(--color-tertiary)' : 'var(--color-white)'
					}
				/>
				{showTrailerButton && (
					<SecondaryButton className={classes.button} onClick={onWatchTrailer}>
						<FaVideo />
						<span>Watch Trailer</span>
					</SecondaryButton>
				)}
				<FaHeart
					className={classes.shelfIcon}
					onClick={event => onToggleMovieInShelf(event, 'favorites')}
					color={
						isFavoriteMovie ? 'var(--color-tertiary)' : 'var(--color-white)'
					}
				/>
			</header>
			<figcaption className={classes.backdrop__caption}>{overview ? overview : "There is no overview at the moment..."}</figcaption>
		</figure>
	);
}

MovieBackdrop.propTypes = {
	backdropImage: PropTypes.string,
	onToggleMovieInShelf: PropTypes.func.isRequired,
	onWatchTrailer: PropTypes.func.isRequired,
	isFavoriteMovie: PropTypes.bool.isRequired,
	isWatchLaterMovie: PropTypes.bool.isRequired,
	overview: PropTypes.string,
};
