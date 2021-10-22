import React from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { BounceLoader } from 'react-spinners';
import { FaArrowLeft } from 'react-icons/fa';

import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';

import * as movieActions from '../../store/actions/movie';

import noPosterImage from '../../../public/assets/images/no-poster.png';

import classes from './movie_details.module';

export default function MovieDetailsScreen({}) {
	const { movieID } = useParams();

	const { loading, error, movieDetails } = useSelector(
		state => state.movieDetails,
	);

	const history = useHistory();

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
		movieDetailsContent = <Redirect to="/error" replace />;
	} else {
		movieDetailsContent = (
			<>
				<header>
					<div>
						<h1>{movieDetails.title}</h1>
						<h2>{movieDetails.tagline}</h2>
					</div>
					<div>
						<SecondaryButton onClick={history.goBack}>
							<FaArrowLeft />
							<span>Back</span>
						</SecondaryButton>
					</div>
				</header>
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
