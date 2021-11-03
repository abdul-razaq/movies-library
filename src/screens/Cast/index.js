import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import * as castActions from '../../store/actions/cast';
import * as moviesActions from '../../store/actions/movies';

import classes from './cast.module';

export default function CastScreen({}) {
	const { castID } = useParams();

	const dispatch = useDispatch();

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
		content = (
			<div>
				<pre>{JSON.stringify(castDetails, null, 2)}</pre>
				<pre>{JSON.stringify(movies, null, 2)}</pre>
			</div>
		);
	}

	return (
		<section className={classes.cast}>
			<h1>CAST SCREEN - Showing Details for {castID} cast.</h1>
			{content}
		</section>
	);
}
