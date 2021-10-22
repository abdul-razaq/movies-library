import React from 'react';
import { useParams, useHistory, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { BounceLoader } from 'react-spinners';
import { FaArrowLeft, FaVideo, FaEye, FaHeart } from 'react-icons/fa';

import Center from '../../components/customs/Center';
import NoData from '../../components/UI/NoData';
import PrimaryButton from '../../components/UI/PrimaryButton';
import SecondaryButton from '../../components/UI/SecondaryButton';

import * as movieActions from '../../store/actions/movie';
import * as shelfActions from '../../store/actions/shelf';

import noPosterImage from '../../../public/assets/images/no-poster.png';

import Movie from '../../models/Movie';

import classes from './movie_details.module';

export default function MovieDetailsScreen({}) {
	const { movieID } = useParams();

	const { loading, error, movieDetails } = useSelector(
		state => state.movieDetails,
	);
	const { favorites, watching } = useSelector(state => state.shelf);

	const history = useHistory();

	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(movieActions.getMovie(movieID));
	}, [movieID]);

	function handleToggleMovieInShelf(event, shelfType) {
		dispatch(
			shelfActions.toggleMovieInShelf(new Movie(movieDetails), shelfType),
		);
	}

	let movieDetailsContent;

	if (loading) {
		movieDetailsContent = (
			<Center>
				<BounceLoader loading={loading} color="#F50057" />
			</Center>
		);
	} else if (error) {
		movieDetailsContent = <Redirect to="/error" />;
	} else if (!Object.keys(movieDetails).length) {
		movieDetailsContent = (
			<Center>
				<NoData text={error} />
			</Center>
		);
	} else {
		movieDetailsContent = (
			<>
				<header className={classes.movieDetails__header}>
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
					<header className={classes.backdrop__header}>
						<FaEye
							className={classes.shelfIcon}
							onClick={event => handleToggleMovieInShelf(event, 'watching')}
							color={
								watching.some(({ id }) => id === movieDetails.id)
									? 'var(--color-tertiary)'
									: 'var(--color-white)'
							}
						/>
						<SecondaryButton className={classes.button} onClick={() => {}}>
							<FaVideo />
							<span>Watch Trailer</span>
						</SecondaryButton>
						<FaHeart
							className={classes.shelfIcon}
							onClick={event => handleToggleMovieInShelf(event, 'favorites')}
							color={
								favorites.some(({ id }) => id === movieDetails.id)
									? 'var(--color-tertiary)'
									: 'var(--color-white)'
							}
						/>
					</header>
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
