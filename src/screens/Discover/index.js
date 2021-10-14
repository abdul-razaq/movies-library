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
				{movies.map(movie => (
					<div className={classes.poster}>
						<header>
							<FaEye size={20} onClick={() => console.log('added movie to watching')} />
							<FaHeart size={20}
								onClick={() => console.log('added movie to favorites')}
							/>
						</header>
						<figure>
							<img
								src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
								alt={`poster for ${movie.original_title}`}
							/>
						</figure>
						<footer>
							<p>{movie.original_title}</p>
							<StarRatings
								rating={movie.vote_average}
								starRatedColor="#F50057"
								starDimension="1.6rem"
								starSpacing="0"
							/>
						</footer>
					</div>
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
