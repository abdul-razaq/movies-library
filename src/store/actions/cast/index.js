import { fetchCastDetails } from '../../../api/themoviedb';
import { actionTypes as moviesActionsTypes } from '../movies';

export const actionTypes = {
	SET_CAST_LOADING: 'SET_CAST_LOADING',
	UNSET_CAST_LOADING: 'UNSET_CAST_LOADING',
	SET_CAST_ERROR: 'SET_CAST_ERROR',
	UNSET_CAST_ERROR: 'UNSET_CAST_ERROR',
	CLEAR_CAST_DETAILS: 'CLEAR_CAST_DETAILS',
	GET_CAST_DETAILS: 'GET_CAST_DETAILS',
};

export function getCastDetails(castId) {
	return async function (dispatch, getState) {
		try {
			dispatch({ type: actionTypes.SET_CAST_LOADING });
			const castDetails = await fetchCastDetails(castId);
			dispatch({
				type: actionTypes.GET_CAST_DETAILS,
				payload: {
					cast: { ...castDetails, movie_credits: undefined },
				},
			});
			const { cast: results } = castDetails.movie_credits;
			dispatch({
				type: moviesActionsTypes.GET_MOVIES,
				payload: { movies: { results } },
			});
		} catch (error) {
			dispatch({
				type: actionTypes.SET_CAST_ERROR,
				payload: { error },
			});
		} finally {
			dispatch({ type: actionTypes.UNSET_CAST_LOADING });
		}
	};
}
