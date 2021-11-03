import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

import classes from './movies_list.modules';

import Poster from '../UI/Poster';
import SecondaryButton from '../UI/SecondaryButton';
import DropDown from '../UI/DropDown';

import * as shelfActions from '../../store/actions/shelf';

import Movie from '../../models/Movie';
import Heading from '../customs/Heading';

const filterOptions = [
	{ value: 'popularity.desc', label: 'Popularity' },
	{ value: 'original_title.asc', label: 'Title' },
	{
		value: 'release_date.desc',
		label: 'Release Date',
	},
	{
		value: 'vote_average.desc',
		label: 'Votes Average',
	},
];

export default function MoviesList({
	category,
	movies,
	page,
	nextPage,
	totalPages,
	onGoToNextPage,
	onGoBack,
	showBackButton,
	onChangeFilter,
	genre,
	filterLabel,
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

	function handleFilterSelect(selectedFilter) {
		onChangeFilter(selectedFilter);
	}

	return (
		<article className={classes.moviesList}>
			<header>
				<Heading
					title={category}
					subtitle={'Movies'}
					className={classes.moviesList__title}
				/>
				{page && totalPages ? (
					<p>
						Page: {page} of {totalPages}
					</p>
				) : (
					<p>Total Movies: {movies.length}</p>
				)}
			</header>
			{genre && (
				<DropDown
					label={filterLabel}
					options={filterOptions}
					onSelect={handleFilterSelect}
				/>
			)}
			<section className={classes.moviesList__content}>
				{movies.map(movie => (
					<Poster
						key={movie.id}
						movie={new Movie(movie)}
						isFavorite={favorites.map(mov => mov.id).includes(movie.id)}
						isWatching={watching.map(mov => mov.id).includes(movie.id)}
						onToggleMovieInShelf={handleToggleShelfMovie}
						onPosterClick={handlePosterClick.bind(null, movie.id)}
					/>
				))}
			</section>
			{page && nextPage && (
				<footer>
					{showBackButton && (
						<SecondaryButton onClick={onGoBack}>
							<FaArrowLeft />
							<span>Back</span>
						</SecondaryButton>
					)}
					{nextPage > 1 && (
						<SecondaryButton onClick={onGoToNextPage}>
							<span>Page {nextPage}</span>
							<FaArrowRight />
						</SecondaryButton>
					)}
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
	showBackButton: PropTypes.bool,
};
