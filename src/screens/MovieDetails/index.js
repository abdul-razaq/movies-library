import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { BounceLoader } from 'react-spinners';

import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';

import * as movieActions from '../../store/actions/movie';

import noPosterImage from '../../../public/assets/images/no-poster.png';

import classes from './movie_details.module';

export default function MovieDetailsScreen({}) {
	const { movieID } = useParams();

	const { loading, error, movieDetails } = useSelector(
		state => state.movieDetails,
	);

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(movieActions.getMovie(movieID));
	}, [movieID]);

	let movieDetailsContent;

	if (loading) {
		movieDetailsContent = (
			<Center>
				<BounceLoader loading={loading} color="#F50057" />
			</Center>
		);
	} else if (error || !Object.keys(movieDetails).length) {
		movieDetailsContent = (
			<Center>
				<NoData text={`Unable to fetch movie details.`} />
			</Center>
		);
	} else {
		movieDetailsContent = (
			<>
				<h1>{movieDetails.title}</h1>
				<h2>{movieDetails.tagline}</h2>
				<figure
					className={classes.backdrop}
					style={{
						backgroundImage: movieDetails.backdrop_path
							? `url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`
							: `url(${noPosterImage})`,
					}}
				>
					<figcaption className={classes.backdrop__caption}>
						{movieDetails.overview}
					</figcaption>
				</figure>
			</>
		);
	}

	return (
		<section className={classes.movieDetails}>{movieDetailsContent}</section>
	);
}
