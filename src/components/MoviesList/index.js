import React from 'react';
import {} from 'react-router-dom';
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
						onAddToWatching={() => console.log('movie added to watching list')}
						onAddToFavorite={() => console.log('movie added to favorites list')}
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
};
