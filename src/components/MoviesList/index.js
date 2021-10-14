import React from 'react';
import PropTypes from 'prop-types';

import classes from './movies_list.modules';

import Poster from '../UI/Poster';

export default function MoviesList({ category, movies }) {
	return (
		<section className={classes.moviesList}>
			<div className={classes.moviesList__title}>
				<h1>{category}</h1>
				<h3>Movies</h3>
			</div>
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
		</section>
	);
}

MoviesList.propTypes = {
	category: PropTypes.string.isRequired,
	movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};
