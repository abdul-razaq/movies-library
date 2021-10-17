import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import MoviesList from '../../components/MoviesList';
import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';

import classes from './shelf.module';

export default function ShelfScreen({}) {
	const { type } = useParams();

	const { favoriteMovies, moviesWatching } = useSelector(state => state.shelf);

	const shelf = { favorites: favoriteMovies, watching: moviesWatching };

	return (
		<section className={classes.shelf}>
			{!shelf[type].length ? (
				<Center>
					<NoData
						text={`You have not added any movie to your ${type} shelf. start by adding some.`}
					/>
				</Center>
			) : (
				<MoviesList category={type.replace('s', '')} movies={shelf[type]} />
			)}
		</section>
	);
}
