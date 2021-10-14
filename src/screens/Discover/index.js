import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BounceLoader } from 'react-spinners';
import StarRatings from 'react-star-ratings';
import { FaEye, FaHeart } from 'react-icons/fa';

import classes from './discover.module';

import fetchPopularMovies from '../../store/actions/movies';

import NoData from '../../components/UI/NoData';
import Center from '../../components/customs/Center';
import Poster from '../../components/UI/Poster';

export default function DiscoverScreen({}) {
	const { category } = useParams();

	const { loading, error, movies, page, total_pages } = useSelector(
		state => state.popularMovies,
	);

	const dispatch = useDispatch();

	React.useEffect(() => {
		if (!movies.length) dispatch(fetchPopularMovies(category));
	}, [category]);

	let content = (
		<>
			<div className={classes.discover__title}>
				<h1>{category}</h1>
				<h3>Movies</h3>
			</div>
			<section className={classes.content}>
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
		</>
	);

	if (loading)
		content = (
			<Center>
				<BounceLoader loading={loading} color="#F50057" />
			</Center>
		);

	if (error)
		content = (
			<Center>
				<NoData text={error} />
			</Center>
		);
	return <section className={classes.discover}>{content}</section>;
}
