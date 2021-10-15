import { getDiscoverMovies } from '../../../api/themoviedb';

export const actionTypes = {
	SET_DISCOVER_LOADING: 'SET_DISCOVER_LOADING',
	SET_DISCOVER_ERROR: 'SET_DISCOVER_ERROR',
	GET_DISCOVER_MOVIES: 'GET_DISCOVER_MOVIES',
};

export function discoverMovies(category, page) {
	return async function (dispatch, getState) {
		try {
			dispatch({
				type: actionTypes.SET_DISCOVER_LOADING,
				payload: {
					loading: true,
				},
			});
			const movies = await getDiscoverMovies(category, page);
			dispatch({
				type: actionTypes.GET_DISCOVER_MOVIES,
				payload: {
					movies,
				},
			});
		} catch (error) {
			dispatch({
				type: actionTypes.SET_DISCOVER_ERROR,
				payload: {
					error: `unable to fetch ${category} movies. check internet connection and try again.`,
				},
			});
		} finally {
			dispatch({
				type: actionTypes.SET_DISCOVER_LOADING,
				payload: {
					loading: false,
				},
			});
		}
	};
}
