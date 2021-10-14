import React from 'react';
import PropTypes from 'prop-types';
import { FaArrowRight } from 'react-icons/fa';

import classes from './movies_list.modules';

import Poster from '../UI/Poster';
// import SecondaryButton from '../UI/SecondaryButton';

export default function MoviesList({ category, movies, page, totalPages }) {
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
			<SecondaryButton disabled={page === totalPages} onClick={() => {}}>
				<span>Page {page <= totalPages ? page + 1 : totalPages}</span>
				<FaArrowRight />
			</SecondaryButton>
		</article>
	);
}

MoviesList.propTypes = {
	category: PropTypes.string.isRequired,
	movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
