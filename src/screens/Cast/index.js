import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaLink, FaArrowLeft, FaArrowUp } from 'react-icons/fa';
import { Helmet } from 'react-helmet';

import * as castActions from '../../store/actions/cast';
import * as moviesActions from '../../store/actions/movies';

import Heading from '../../components/customs/Heading';
import SecondaryButton from '../../components/UI/SecondaryButton';
import Error from '../../components/customs/Error';
import Loading from '../../components/customs/Loading';
import Center from '../../components/customs/Center';
import MoviesList from '../../components/MoviesList';
import NoData from '../../components/UI/NoData';

import noPosterImage from '../../../public/assets/images/no-poster.svg';

import classes from './cast.module';

export default function CastScreen({}) {
	const { castID } = useParams();

	const topRef = React.useRef(null);

	const dispatch = useDispatch();

	const history = useHistory();

	const { loading, error, castDetails } = useSelector(state => state.cast);
	const { movies } = useSelector(state => state.movies);

	React.useEffect(() => {
		dispatch(castActions.getCastDetails(castID));
		return () => {
			dispatch({ type: castActions.actionTypes.CLEAR_CAST_DETAILS });
			dispatch({ type: castActions.actionTypes.UNSET_CAST_ERROR });
			dispatch({ type: moviesActions.actionTypes.CLEAR_MOVIES });
		};
	}, [castID]);

	function handleScrollToTop() {
		topRef.current.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}

	let content;

	if (loading) {
		content = <Loading />;
	} else if (error) {
		content = <Error text={error} />;
	} else {
		const {
			biography,
			birthday,
			gender,
			homepage,
			imdb_id,
			name,
			place_of_birth,
			profile_path,
		} = castDetails;
		content = (
			<>
				<Helmet>
					<title>{`${name} - Movies Library`}</title>
				</Helmet>
				<article className={classes.castDetails}>
					<figure className={classes.castPoster}>
						<img
							src={
								profile_path
									? `https://image.tmdb.org/t/p/w500/${profile_path}`
									: noPosterImage
							}
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
							{homepage && (
								<a
									className={classes.primary_link}
									href={homepage}
									target={'_blank'}
									rel="noopener noreferrer"
								>
									<FaLink size={16} />
									<span>Website</span>
								</a>
							)}
							<a
								className={classes.primary_link}
								href={`https://www.imdb.com/name/${imdb_id}`}
								target={'_blank'}
								rel="noopener noreferrer"
							>
								<FaLink size={16} />
								<span>IMDB</span>
							</a>
							<SecondaryButton onClick={history.goBack}>
								<FaArrowLeft />
								<span>Back</span>
							</SecondaryButton>
						</footer>
					</figcaption>
				</article>
				{movies.length ? (
					<>
						<MoviesList category="Featured In" movies={movies} />
						<div className={classes.scrollToTop}>
							<SecondaryButton onClick={handleScrollToTop}>
								<FaArrowUp />
								<span>Scroll to top</span>
							</SecondaryButton>
						</div>
					</>
				) : (
					<Center>
						<NoData
							text={`Sorry, ${name} has not featured in any other movie.`}
						/>
					</Center>
				)}
			</>
		);
	}

	return <section ref={topRef} className={classes.cast}>{content}</section>;
}
