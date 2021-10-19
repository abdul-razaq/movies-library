import { getDiscoverMovies } from '../../../api/themoviedb';

export const actionTypes = {
	SET_LOADING: 'SET_LOADING',
	SET_ERROR: 'SET_ERROR',
	GET_MOVIES: 'GET_MOVIES',
};

export function getMovies(category, page) {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: actionTypes.SET_LOADING,
				payload: {
					loading: true,
				},
			});
			const movies = await getDiscoverMovies(category, page);
			dispatch({
				type: actionTypes.GET_MOVIES,
				payload: {
					movies,
				},
			});
		} catch (error) {
			dispatch({
				type: actionTypes.SET_ERROR,
				payload: {
					error: `unable to fetch ${category} movies. check internet connection and try again.`,
				},
			});
		} finally {
			dispatch({
				type: actionTypes.SET_LOADING,
				payload: {
					loading: false,
				},
			});
		}
	};
}
