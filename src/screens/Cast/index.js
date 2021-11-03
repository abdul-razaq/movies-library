import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaLink, FaArrowLeft } from 'react-icons/fa';

import * as castActions from '../../store/actions/cast';
import * as moviesActions from '../../store/actions/movies';

import Heading from '../../components/customs/Heading';
import PrimaryLink from '../../components/UI/PrimaryLink';
import SecondaryButton from '../../components/UI/SecondaryButton';

import classes from './cast.module';

export default function CastScreen({}) {
	const { castID } = useParams();

	const dispatch = useDispatch();

	const history = useHistory();

	const { loading, error, castDetails } = useSelector(state => state.cast);
	const { movies } = useSelector(state => state.movies);

	React.useState(() => {
		dispatch(castActions.getCastDetails(castID));
		return () => {
			dispatch(castActions.actionTypes.CLEAR_CAST_DETAILS);
			dispatch(castActions.actionTypes.UNSET_CAST_ERROR);
			dispatch(moviesActions.actionTypes.CLEAR_MOVIES);
		};
	}, [castID]);

	let content;

	if (loading) {
		content = <p>Loading...</p>;
	} else if (error) {
		content = <p>Error...</p>;
	} else {
		const {
			biography,
			birthday,
			gender,
			homepage,
			id,
			imdb_id,
			name,
			place_of_birth,
			profile_path,
		} = castDetails;
		content = (
			<>
				<article className={classes.castDetails}>
					<figure className={classes.castPoster}>
						<img
							src={`https://image.tmdb.org/t/p/w500/${profile_path}`}
							alt={`poster for ${name}`}
						/>
					</figure>

					<figcaption className={classes.details}>
						<header>
							<Heading
								title={name}
								subtitle={new Date(birthday).toDateString()}
								className={classes.heading}
							/>
						</header>

						<article>
							<h3>Biography</h3>
							<p>{biography ? biography : `No biography for ${name}`}</p>
						</article>

						{place_of_birth && (
							<article>
								<h3>Place of birth</h3>
								<p>{place_of_birth}</p>
							</article>
						)}

						<article>
							<h3>Gender</h3>
							<p>{gender === 1 ? 'Female' : 'Male'}</p>
						</article>

						<footer>
							<PrimaryLink to={homepage}>
								<FaLink />
								<span>Website</span>
							</PrimaryLink>
							<PrimaryLink to={`https://www.imdb.com/name/${imdb_id}`}>
								<FaLink />
								<span>IMDB</span>
							</PrimaryLink>
							<SecondaryButton onClick={history.goBack}>
								<FaArrowLeft />
								<span>Back</span>
							</SecondaryButton>
						</footer>
					</figcaption>
				</article>
			</>
		);
	}

	return <section className={classes.cast}>{content}</section>;
}
